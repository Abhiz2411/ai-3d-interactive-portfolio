# Start / stop / check the local dev servers.
#   .\dev-servers.ps1 start     chatbot (3001) + main site (5173)
#   .\dev-servers.ps1 stop
#   .\dev-servers.ps1 status
#   .\dev-servers.ps1 restart
# Add -Only chat|site to act on one server.
param(
  [Parameter(Position = 0)][ValidateSet("start", "stop", "status", "restart")][string]$Action = "status",
  [ValidateSet("all", "chat", "site")][string]$Only = "all"
)

$root = $PSScriptRoot
$logs = Join-Path $root ".run"
New-Item -ItemType Directory -Force $logs | Out-Null

$servers = @(
  @{ Name = "chat"; Port = 3001; Dir = Join-Path $root "chatbot"; Args = "server/server.js"; Cmd = "node"; Url = "http://localhost:3001" },
  @{ Name = "site"; Port = 5173; Dir = $root; Args = "vite --port 5173 --strictPort"; Cmd = "npx.cmd"; Url = "http://localhost:5173" }
) | Where-Object { $Only -eq "all" -or $Only -eq $_.Name }

function Get-PortPid($port) {
  (Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1).OwningProcess
}

function Stop-Server($s) {
  $procId = Get-PortPid $s.Port
  if (-not $procId) { Write-Host "[$($s.Name)] not running"; return }
  # kill the process tree (npx spawns child node processes)
  & taskkill /PID $procId /T /F | Out-Null
  Write-Host "[$($s.Name)] stopped (pid $procId)"
}

function Start-Server($s) {
  if (Get-PortPid $s.Port) { Write-Host "[$($s.Name)] already running on $($s.Url)"; return }
  if ($s.Name -eq "chat") {
    if (-not (Test-Path (Join-Path $s.Dir ".env"))) { Write-Host "[chat] missing chatbot\.env (copy .env.example and add GEMINI_API_KEY)"; return }
    if (-not (Test-Path (Join-Path $s.Dir "node_modules"))) { Push-Location $s.Dir; npm install --no-audit --no-fund | Out-Null; Pop-Location }
    $dist = Join-Path $s.Dir "web\dist\index.html"
    if (-not (Test-Path $dist)) {
      Write-Host "[chat] building UI..."
      Push-Location (Join-Path $s.Dir "web"); npm install --no-audit --no-fund | Out-Null; npm run build | Out-Null; Pop-Location
    }
  }
  $out = Join-Path $logs "$($s.Name).log"
  $err = Join-Path $logs "$($s.Name).err.log"
  Start-Process -FilePath $s.Cmd -ArgumentList $s.Args -WorkingDirectory $s.Dir -WindowStyle Hidden `
    -RedirectStandardOutput $out -RedirectStandardError $err | Out-Null
  for ($i = 0; $i -lt 30; $i++) {
    Start-Sleep -Milliseconds 500
    if (Get-PortPid $s.Port) { Write-Host "[$($s.Name)] running -> $($s.Url)"; return }
  }
  Write-Host "[$($s.Name)] failed to start. See $err"
}

switch ($Action) {
  "start"   { $servers | ForEach-Object { Start-Server $_ } }
  "stop"    { $servers | ForEach-Object { Stop-Server $_ } }
  "restart" { $servers | ForEach-Object { Stop-Server $_ }; Start-Sleep 1; $servers | ForEach-Object { Start-Server $_ } }
  "status"  { $servers | ForEach-Object {
      $procId = Get-PortPid $_.Port
      if ($procId) { Write-Host "[$($_.Name)] running (pid $procId) $($_.Url)" } else { Write-Host "[$($_.Name)] stopped" } } }
}
