namespace SitefBridge.Models;

public sealed record IniInfo(bool Exists, bool HasPinpadSection);

public sealed record NativeVersionInfo(string Status, DateTimeOffset? CheckedAt);

public sealed record HealthResponse(
    bool Ok,
    string Mode,
    string? NativeDir,
    string? PinpadCom,
    IniInfo Ini,
    NativeVersionInfo NativeVersion,
    string? Message
);
