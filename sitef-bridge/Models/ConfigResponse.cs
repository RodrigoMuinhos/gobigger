namespace SitefBridge.Models;

public sealed record ConfigValidation(string Key, bool Ok, string Message);

public sealed record ConfigResponse(
    string Mode,
    string? NativeDir,
    string? IniPath,
    string? PinpadCom,
    IReadOnlyList<ConfigValidation> Validations
);
