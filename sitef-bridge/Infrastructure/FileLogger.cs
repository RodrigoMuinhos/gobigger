using System.Collections.Concurrent;
using Microsoft.Extensions.Logging;

namespace SitefBridge.Infrastructure;

public sealed class FileLoggerProvider : ILoggerProvider
{
    private readonly BlockingCollection<string> _queue = new(new ConcurrentQueue<string>());
    private readonly CancellationTokenSource _cts = new();
    private readonly Task _worker;
    private readonly string _filePath;

    public FileLoggerProvider(string filePath)
    {
        _filePath = filePath;
        Directory.CreateDirectory(Path.GetDirectoryName(_filePath) ?? ".");
        _worker = Task.Run(WriteLoop);
    }

    public ILogger CreateLogger(string categoryName) => new FileLogger(categoryName, _queue);

    public void Dispose()
    {
        _cts.Cancel();
        _queue.CompleteAdding();
        try { _worker.Wait(TimeSpan.FromSeconds(2)); } catch { /* ignore */ }
        _cts.Dispose();
        _queue.Dispose();
    }

    private async Task WriteLoop()
    {
        try
        {
            await using var stream = new FileStream(_filePath, FileMode.Append, FileAccess.Write, FileShare.ReadWrite);
            await using var writer = new StreamWriter(stream) { AutoFlush = true };

            foreach (var line in _queue.GetConsumingEnumerable(_cts.Token))
            {
                await writer.WriteLineAsync(line);
            }
        }
        catch
        {
            // If file logging fails, we silently stop to avoid crashing the service.
        }
    }

    private sealed class FileLogger : ILogger
    {
        private readonly string _category;
        private readonly BlockingCollection<string> _queue;

        public FileLogger(string category, BlockingCollection<string> queue)
        {
            _category = category;
            _queue = queue;
        }

        public IDisposable? BeginScope<TState>(TState state) where TState : notnull => null;

        public bool IsEnabled(LogLevel logLevel) => logLevel != LogLevel.None;

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception? exception,
            Func<TState, Exception?, string> formatter)
        {
            if (!IsEnabled(logLevel)) return;

            var msg = formatter(state, exception);
            var line = $"{DateTimeOffset.Now:O} [{logLevel}] {_category}: {msg}";
            if (exception is not null)
            {
                line += $" | ex={exception.GetType().Name}: {exception.Message}";
            }

            try { _queue.Add(line); } catch { /* ignore */ }
        }
    }
}
