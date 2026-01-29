namespace SitefBridge.Models;

public enum TransactionType
{
    Credit,
    Debit,
}

public enum TransactionStatus
{
    Pending,
    WaitingPinpad,
    Approved,
    Declined,
    Canceled,
    Error,
}

public sealed record CreateTransactionRequest(
    int AmountCents,
    string Type,
    string InvoiceId,
    string Operator,
    string? Terminal
);

public sealed record TransactionResponse(
    string TransactionId,
    string Status,
    string Message,
    bool RequiresUserAction
);

public sealed record ReceiptResponse(
    string? CustomerReceipt,
    string? MerchantReceipt,
    string? Raw,
    DateTimeOffset UpdatedAt
);

public sealed record TransactionDetails(
    Guid Id,
    TransactionType Type,
    int AmountCents,
    string InvoiceId,
    string Operator,
    string? Terminal,
    TransactionStatus Status,
    string Message,
    bool RequiresUserAction,
    ReceiptResponse? Receipt,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt
);
