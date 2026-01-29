# sitef-bridge test script (PowerShell)
# - sets env vars
# - starts the exe
# - calls health
# - runs SIMULATOR transaction
#
# Usage (after publish):
#   ./test.ps1 -ExePath .\publish\sitef-bridge.exe

param(
  [string]$ExePath = "./bin/Release/net8.0/win-x64/publish/sitef-bridge.exe"
)

$ErrorActionPreference = "Stop"

# Env vars (as requested)
$env:ASPNETCORE_URLS = "http://127.0.0.1:7071"
$env:SITEF_MODE = "SIMULATOR"   # SIMULATOR or NATIVE
$env:SITEF_NATIVE_DIR = "C:\SiTef"
$env:SITEF_INI_PATH = "C:\SiTef\CliSiTef.ini"
$env:SITEF_PINPAD_COM = "COM7"

Write-Host "Starting sitef-bridge: $ExePath"

$proc = Start-Process -FilePath $ExePath -PassThru -WindowStyle Hidden

try {
  # Wait for server
  $base = "http://127.0.0.1:7071"
  $healthUrl = "$base/api/health"

  $max = 30
  for ($i=0; $i -lt $max; $i++) {
    try {
      $health = Invoke-RestMethod -Method GET -Uri $healthUrl -TimeoutSec 2
      break
    } catch {
      Start-Sleep -Milliseconds 500
    }
  }

  $health = Invoke-RestMethod -Method GET -Uri $healthUrl
  Write-Host "Health:"; $health | ConvertTo-Json -Depth 10

  # Create a SIMULATOR transaction
  $createUrl = "$base/api/tef/transactions"
  $body = @{
    amountCents = 1234
    type = "CREDIT"
    invoiceId = "pedido-123"
    operator = "01"
  } | ConvertTo-Json

  $tx = Invoke-RestMethod -Method POST -Uri $createUrl -ContentType "application/json" -Body $body
  Write-Host "Create transaction:"; $tx | ConvertTo-Json -Depth 10

  $id = $tx.transactionId
  if (-not $id) { throw "transactionId vazio" }

  # Polling + continue steps
  $statusUrl = "$base/api/tef/transactions/$id"
  $continueUrl = "$base/api/tef/transactions/$id/continue"

  for ($i=0; $i -lt 10; $i++) {
    $current = Invoke-RestMethod -Method GET -Uri $statusUrl
    Write-Host "Status[$i]: $($current.status) - $($current.message)"

    if ($current.status -eq "APPROVED" -or $current.status -eq "DECLINED" -or $current.status -eq "CANCELED" -or $current.status -eq "ERROR") {
      break
    }

    $step = Invoke-RestMethod -Method POST -Uri $continueUrl
    Write-Host "Continue:"; $step | ConvertTo-Json -Depth 10
    Start-Sleep -Milliseconds 500
  }

  $final = Invoke-RestMethod -Method GET -Uri $statusUrl
  Write-Host "Final:"; $final | ConvertTo-Json -Depth 10

  $receiptUrl = "$base/api/tef/transactions/$id/receipt"
  $receipt = Invoke-RestMethod -Method GET -Uri $receiptUrl
  Write-Host "Receipt:"; $receipt | ConvertTo-Json -Depth 10

} finally {
  if ($proc -and -not $proc.HasExited) {
    Write-Host "Stopping sitef-bridge (pid=$($proc.Id))"
    Stop-Process -Id $proc.Id -Force
  }
}
