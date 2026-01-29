using System.Globalization;
using System.Runtime.InteropServices;
using SitefBridge.Models;

namespace SitefBridge.Services;

public sealed record NativeProbeResult(
    bool IsNativeMode,
    bool DllFound,
    bool IniExists,
    bool IniHasPinpadSection,
    DateTimeOffset CheckedAt,
    string NativeVersionStatus,
    string? Message
);

public sealed class NativeProbeService
{
    private readonly ConfigService _config;
    private readonly ILogger<NativeProbeService> _logger;

    public NativeProbeService(ConfigService config, ILogger<NativeProbeService> logger)
    {
        _config = config;
        _logger = logger;
    }

    public NativeProbeResult Probe()
    {
        var checkedAt = DateTimeOffset.UtcNow;

        if (_config.Mode != SitefMode.Native)
        {
            return new NativeProbeResult(
                IsNativeMode: false,
                DllFound: true,
                IniExists: true,
                IniHasPinpadSection: true,
                CheckedAt: checkedAt,
                NativeVersionStatus: "pending",
                Message: null
            );
        }

        var dllPath = string.IsNullOrWhiteSpace(_config.NativeDir)
            ? null
            : Path.Combine(_config.NativeDir, "CliSiTef32I.dll");

        var dllFound = dllPath is not null && File.Exists(dllPath);
        var iniExists = !string.IsNullOrWhiteSpace(_config.IniPath) && File.Exists(_config.IniPath);

        bool iniHasPinpadSection = false;
        if (iniExists)
        {
            iniHasPinpadSection = IniHasSection(_config.IniPath!, "PinPad");
        }

        var msgParts = new List<string>();
        if (!dllFound) msgParts.Add($"DLL não encontrada em '{dllPath ?? "(SITEF_NATIVE_DIR vazio)"}'");
        if (!iniExists) msgParts.Add($"INI não encontrado em '{_config.IniPath ?? "(SITEF_INI_PATH vazio)"}'");

        // Versão/estado nativo (na prática: conseguimos carregar a DLL?)
        // - ok: carregou
        // - missing: não existe
        // - bad_image: mismatch 32/64-bit
        // - error: falha ao carregar por outro motivo
        var nativeVersionStatus = dllFound ? "pending" : "missing";

        if (dllFound && dllPath is not null)
        {
            try
            {
                nint handle = NativeLibrary.Load(dllPath);
                try
                {
                    nativeVersionStatus = "ok";
                }
                finally
                {
                    NativeLibrary.Free(handle);
                }
            }
            catch (BadImageFormatException)
            {
                nativeVersionStatus = "bad_image";
                msgParts.Add("DLL encontrada, porém incompatível com a arquitetura do processo (provável DLL 32-bit em processo x64). Gere win-x86.");
            }
            catch (Exception ex)
            {
                nativeVersionStatus = "error";
                msgParts.Add($"Falha ao carregar DLL: {ex.GetType().Name}: {ex.Message}");
            }
        }

        var message = msgParts.Count > 0 ? string.Join("; ", msgParts) : null;

        _logger.LogInformation("Native probe: dllFound={DllFound} iniExists={IniExists} iniHasPinpadSection={IniHasPinpadSection} message={Message}",
            dllFound, iniExists, iniHasPinpadSection, message);

        return new NativeProbeResult(
            IsNativeMode: true,
            DllFound: dllFound,
            IniExists: iniExists,
            IniHasPinpadSection: iniHasPinpadSection,
            CheckedAt: checkedAt,
            NativeVersionStatus: nativeVersionStatus,
            Message: message
        );
    }

    public bool IsNativeReady(out NativeProbeResult probe)
    {
        probe = Probe();
        if (_config.Mode != SitefMode.Native) return true;

        return probe.DllFound && probe.IniExists;
    }

    private static bool IniHasSection(string path, string sectionName)
    {
        // Simples e tolerante: procura por [Section]
        var needle = $"[{sectionName}]";
        foreach (var line in File.ReadLines(path))
        {
            var trimmed = line.Trim();
            if (trimmed.Length == 0) continue;
            if (trimmed.StartsWith(";", StringComparison.Ordinal)) continue;
            if (trimmed.Equals(needle, StringComparison.OrdinalIgnoreCase))
                return true;
        }
        return false;
    }
}
