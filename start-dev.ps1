# Clear Path NEMT - Start Development Servers
# PowerShell Script

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Clear Path NEMT - Dev Server" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "Error: package.json not found." -ForegroundColor Red
    Write-Host "Please run this script from: C:\Working\Websites\NEMT" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    Write-Host "This may take a few minutes on first run..." -ForegroundColor Yellow
    Write-Host ""

    & pnpm install

    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: Installation failed" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

Write-Host ""
Write-Host "Starting development servers..." -ForegroundColor Green
Write-Host ""
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend:  http://localhost:3001" -ForegroundColor Cyan
Write-Host "API Docs: http://localhost:3001/api/docs" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop all servers" -ForegroundColor Yellow
Write-Host ""

# Start the dev servers
& pnpm dev

Read-Host "Press Enter to exit"
