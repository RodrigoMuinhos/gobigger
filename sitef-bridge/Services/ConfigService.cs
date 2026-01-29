using SitefBridge.Models;

namespace SitefBridge.Services;

public sealed class ConfigService
{
    public SitefMode Mode { get; }
    public string? NativeDir { get; }
    public string? IniPath { get; }
    public string? PinpadCom { get; }

    public ConfigService(IConfiguration config)
    {
        var modeRaw = (config["SITEF_MODE"] ?? "SIMULATOR").Trim();
        Mode = modeRaw.Equals("NATIVE", StringComparison.OrdinalIgnoreCase)
            ? SitefMode.Native
            : SitefMode.Simulator;

        NativeDir = config["SITEF_NATIVE_DIR"]?.Trim();
        IniPath = config["SITEF_INI_PATH"]?.Trim();
        PinpadCom = config["SITEF_PINPAD_COM"]?.Trim();
    }

    public ConfigResponse GetConfigResponse(NativeProbeResult nativeProbe)
    {
        var validations = new List<ConfigValidation>();

        if (Mode == SitefMode.Native)
        {
            validations.Add(new ConfigValidation(
                "SITEF_NATIVE_DIR",
                nativeProbe.DllFound,
                nativeProbe.DllFound ? "DLL encontrada" : nativeProbe.Message ?? "DLL não encontrada"
            ));

            validations.Add(new ConfigValidation(
                "SITEF_INI_PATH",
                nativeProbe.IniExists,
                nativeProbe.IniExists ? "INI encontrado" : "INI não encontrado"
            ));
        }

        validations.Add(new ConfigValidation(
            "SITEF_MODE",
            true,
            $"{Mode}"
        ));

        return new ConfigResponse(
            Mode: Mode.ToString().ToUpperInvariant(),
            NativeDir: NativeDir,
            IniPath: IniPath,
            PinpadCom: PinpadCom,
            Validations: validations
        );
    }
}
