@echo off
REM Clear Path NEMT - Start Development Servers
REM Windows Batch Script (Using npm - stable)

echo.
echo ================================
echo Clear Path NEMT - Dev Server
echo ================================
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo Error: package.json not found. Are you in the project root?
    echo Please run this script from: C:\Working\Websites\NEMT
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    echo This may take a few minutes on first run...
    echo.
    call npm install
    if errorlevel 1 (
        echo Error: Installation failed
        pause
        exit /b 1
    )
)

echo.
echo Starting development servers...
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:3001
echo API Docs: http://localhost:3001/api/docs
echo.
echo Press Ctrl+C to stop all servers
echo.

REM Start the dev servers
call npm run dev

pause
