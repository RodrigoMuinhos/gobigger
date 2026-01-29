# sitef-bridge (siTEF Bridge)

Serviço **Windows** (EXE self-contained) que expõe uma **API HTTP local** para integrar o **siTEF** (via `CliSiTef32I.dll`) e ser consumida pelo **LunaKiosk**.

## Endpoints

- Health: `GET /api/health`
- Config: `GET /api/config`
- Swagger UI: `GET /swagger`
- Swagger JSON: `GET /swagger/v1/swagger.json`

## Variáveis de ambiente

- `ASPNETCORE_URLS` = `http://127.0.0.1:7071`
- `SITEF_MODE` = `SIMULATOR` ou `NATIVE`
- `SITEF_NATIVE_DIR` = `C:\SiTef` (pasta da DLL)
- `SITEF_INI_PATH` = `C:\SiTef\CliSiTef.ini`
- `SITEF_PINPAD_COM` = `COM7`

## Observação importante (32-bit vs 64-bit)

O arquivo citado (`CliSiTef32I.dll`) normalmente é **32-bit**. Se isso se confirmar, você precisa publicar **win-x86** (processo 32-bit) para conseguir carregar a DLL.

O `GET /api/health` tenta carregar a DLL e retorna `nativeVersion.status`:

- `ok` (carregou)
- `bad_image` (mismatch 32/64)
- `missing` (não existe)
- `error` (falha ao carregar)

## Build / Publish

### Dev

- `dotnet run --project .\sitef-bridge\sitef-bridge.csproj`

### Publish win-x64 (self-contained)

- `dotnet publish .\sitef-bridge\sitef-bridge.csproj -c Release -r win-x64 --self-contained true /p:PublishSingleFile=true`

### Publish win-x86 (self-contained) — recomendado se a DLL for 32-bit

- `dotnet publish .\sitef-bridge\sitef-bridge.csproj -c Release -r win-x86 --self-contained true /p:PublishSingleFile=true`

O exe ficará em:

- `.\sitef-bridge\bin\Release\net8.0\win-x64\publish\sitef-bridge.exe`
- ou `.\sitef-bridge\bin\Release\net8.0\win-x86\publish\sitef-bridge.exe`

## Teste via PowerShell

Use o `test.ps1`:

- `./sitef-bridge/test.ps1 -ExePath .\sitef-bridge\bin\Release\net8.0\win-x64\publish\sitef-bridge.exe`

No modo `SIMULATOR`, o fluxo cria uma transação e avança por `/continue` até aprovar, depois lê `/receipt`.
