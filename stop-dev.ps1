# Clear Path NEMT - Stop Development Servers
# PowerShell Script

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Clear Path NEMT - Stopping Dev" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Kill any Node processes (dev servers, next, nest)
$processes = Get-Process node -ErrorAction SilentlyContinue

if ($processes) {
    Write-Host "Stopping Node processes..." -ForegroundColor Yellow
    Stop-Process -Name node -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
    Write-Host "Stopped all dev servers" -ForegroundColor Green
} else {
    Write-Host "No dev servers found running" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "All servers stopped successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "To start again, run: ./start-dev.ps1" -ForegroundColor Cyan
Write-Host ""

Read-Host "Press Enter to exit"
