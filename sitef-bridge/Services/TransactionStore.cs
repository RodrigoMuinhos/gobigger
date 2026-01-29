using System.Collections.Concurrent;
using SitefBridge.Models;

namespace SitefBridge.Services;

public sealed class TransactionStore
{
    private readonly ConcurrentDictionary<Guid, TransactionDetails> _items = new();

    public TransactionDetails Create(TransactionDetails tx)
    {
        _items[tx.Id] = tx;
        return tx;
    }

    public bool TryGet(Guid id, out TransactionDetails tx) => _items.TryGetValue(id, out tx!);

    public TransactionDetails Update(TransactionDetails tx)
    {
        _items[tx.Id] = tx;
        return tx;
    }
}
