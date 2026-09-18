@echo off
REM Clear Path NEMT - Stop Development Servers
REM Windows Batch Script

echo.
echo ================================
echo Clear Path NEMT - Stopping Dev
echo ================================
echo.

REM Kill any Node processes (dev servers, next, nest)
taskkill /F /IM node.exe 2>nul

if errorlevel 1 (
    echo.
    echo No dev servers found running
) else (
    echo.
    echo Stopped all dev servers
)

echo.
echo All servers stopped successfully!
echo.
echo To start again, run: start-dev.bat
echo.

pause
