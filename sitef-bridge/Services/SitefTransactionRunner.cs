using SitefBridge.Models;

namespace SitefBridge.Services;

public sealed class SitefTransactionRunner
{
    private readonly ConfigService _config;
    private readonly NativeProbeService _nativeProbe;
    private readonly TransactionStore _store;
    private readonly ILogger<SitefTransactionRunner> _logger;

    public SitefTransactionRunner(
        ConfigService config,
        NativeProbeService nativeProbe,
        TransactionStore store,
        ILogger<SitefTransactionRunner> logger)
    {
        _config = config;
        _nativeProbe = nativeProbe;
        _store = store;
        _logger = logger;
    }

    public (bool Ok, ApiError? Error, TransactionDetails? Tx) Start(CreateTransactionRequest req)
    {
        if (_config.Mode == SitefMode.Native && !_nativeProbe.IsNativeReady(out var probe))
        {
            return (false, new ApiError("NATIVE_NOT_READY", probe.Message ?? "Nativo não está pronto"), null);
        }

        if (req.AmountCents <= 0)
            return (false, new ApiError("INVALID_REQUEST", "amountCents deve ser > 0"), null);

        if (string.IsNullOrWhiteSpace(req.InvoiceId))
            return (false, new ApiError("INVALID_REQUEST", "invoiceId é obrigatório"), null);

        if (string.IsNullOrWhiteSpace(req.Operator))
            return (false, new ApiError("INVALID_REQUEST", "operator é obrigatório"), null);

        if (!TryParseType(req.Type, out var type))
            return (false, new ApiError("INVALID_REQUEST", "type deve ser CREDIT ou DEBIT"), null);

        var now = DateTimeOffset.UtcNow;
        var id = Guid.NewGuid();

        // SIMULATOR: iniciamos em PENDING e pedimos continua.
        var tx = new TransactionDetails(
            Id: id,
            Type: type,
            AmountCents: req.AmountCents,
            InvoiceId: req.InvoiceId,
            Operator: req.Operator,
            Terminal: req.Terminal,
            Status: TransactionStatus.Pending,
            Message: _config.Mode == SitefMode.Simulator ? "Simulador: transação iniciada" : "Nativo: transação iniciada",
            RequiresUserAction: true,
            Receipt: null,
            CreatedAt: now,
            UpdatedAt: now
        );

        _store.Create(tx);
        _logger.LogInformation("Transaction started {TransactionId} mode={Mode} type={Type} amountCents={AmountCents}", id, _config.Mode, type, req.AmountCents);

        return (true, null, tx);
    }

    public (bool Ok, ApiError? Error, TransactionDetails? Tx) Continue(Guid id)
    {
        if (!_store.TryGet(id, out var tx))
            return (false, new ApiError("NOT_FOUND", "Transação não encontrada"), null);

        if (tx.Status is TransactionStatus.Approved or TransactionStatus.Declined or TransactionStatus.Canceled or TransactionStatus.Error)
            return (true, null, tx);

        if (_config.Mode == SitefMode.Native && !_nativeProbe.IsNativeReady(out var probe))
        {
            return (false, new ApiError("NATIVE_NOT_READY", probe.Message ?? "Nativo não está pronto"), null);
        }

        // SIMULATOR state machine (uma etapa por chamada)
        // Pending -> WaitingPinpad -> Approved
        var now = DateTimeOffset.UtcNow;

        TransactionDetails next;
        switch (tx.Status)
        {
            case TransactionStatus.Pending:
                next = tx with
                {
                    Status = TransactionStatus.WaitingPinpad,
                    Message = "Aguardando pinpad (simulado) - chame /continue novamente",
                    RequiresUserAction = true,
                    UpdatedAt = now,
                };
                break;

            case TransactionStatus.WaitingPinpad:
                var receipt = new ReceiptResponse(
                    CustomerReceipt: "SIMULADOR - COMPROVANTE CLIENTE\nPagamento aprovado\n",
                    MerchantReceipt: "SIMULADOR - COMPROVANTE LOJA\nPagamento aprovado\n",
                    Raw: null,
                    UpdatedAt: now
                );

                next = tx with
                {
                    Status = TransactionStatus.Approved,
                    Message = "Aprovado (simulador)",
                    RequiresUserAction = false,
                    Receipt = receipt,
                    UpdatedAt = now,
                };
                break;

            default:
                next = tx with
                {
                    Status = TransactionStatus.Error,
                    Message = "Estado inválido",
                    RequiresUserAction = false,
                    UpdatedAt = now,
                };
                break;
        }

        _store.Update(next);
        _logger.LogInformation("Transaction {TransactionId} advanced {OldStatus} -> {NewStatus}", id, tx.Status, next.Status);
        return (true, null, next);
    }

    public (bool Ok, ApiError? Error, TransactionDetails? Tx) Cancel(Guid id)
    {
        if (!_store.TryGet(id, out var tx))
            return (false, new ApiError("NOT_FOUND", "Transação não encontrada"), null);

        if (tx.Status is TransactionStatus.Approved or TransactionStatus.Declined)
        {
            // Evita cancelar depois de finalizado
            return (false, new ApiError("CONFLICT", "Transação já finalizada"), null);
        }

        var now = DateTimeOffset.UtcNow;
        var next = tx with
        {
            Status = TransactionStatus.Canceled,
            Message = "Cancelada",
            RequiresUserAction = false,
            UpdatedAt = now,
        };

        _store.Update(next);
        _logger.LogInformation("Transaction {TransactionId} canceled", id);
        return (true, null, next);
    }

    public (bool Ok, ApiError? Error, ReceiptResponse? Receipt) GetReceipt(Guid id)
    {
        if (!_store.TryGet(id, out var tx))
            return (false, new ApiError("NOT_FOUND", "Transação não encontrada"), null);

        if (tx.Receipt is null)
        {
            return (true, null, new ReceiptResponse(
                CustomerReceipt: null,
                MerchantReceipt: null,
                Raw: null,
                UpdatedAt: tx.UpdatedAt
            ));
        }

        return (true, null, tx.Receipt);
    }

    private static bool TryParseType(string? raw, out TransactionType type)
    {
        type = TransactionType.Credit;
        if (string.IsNullOrWhiteSpace(raw)) return false;

        if (raw.Equals("CREDIT", StringComparison.OrdinalIgnoreCase))
        {
            type = TransactionType.Credit;
            return true;
        }

        if (raw.Equals("DEBIT", StringComparison.OrdinalIgnoreCase))
        {
            type = TransactionType.Debit;
            return true;
        }

        return false;
    }
}
