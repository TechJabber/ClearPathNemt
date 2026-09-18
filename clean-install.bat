@echo off
REM Clear Path NEMT - Clean Install Script
REM Fixes pnpm registry issues

echo.
echo ================================
echo Clean Install ^& Setup
echo ================================
echo.
echo This will:
echo 1. Clear pnpm cache
echo 2. Remove node_modules
echo 3. Remove lock files
echo 4. Reinstall everything fresh
echo.

set /p confirm="Continue? (y/n): "
if /i not "%confirm%"=="y" (
    echo Cancelled.
    exit /b 1
)

echo.
echo Step 1: Stopping any running servers...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak

echo Step 2: Clearing pnpm cache...
call pnpm store prune

echo Step 3: Removing lock file...
if exist pnpm-lock.yaml del pnpm-lock.yaml

echo Step 4: Removing node_modules...
if exist node_modules rmdir /s /q node_modules
for /d %%d in (packages\*) do (
    if exist "%%d\node_modules" rmdir /s /q "%%d\node_modules"
)

echo Step 5: Clearing npm cache...
call npm cache clean --force

echo.
echo Step 6: Resetting pnpm config to default registry...
call pnpm config set registry https://registry.npmjs.org/

echo.
echo Step 7: Installing dependencies...
echo This will take a few minutes...
echo.

call pnpm install --force

if errorlevel 0 (
    echo.
    echo [OK] Installation successful!
    echo.
    echo Next steps:
    echo 1. Run: start-dev.bat
    echo 2. Visit: http://localhost:3000
    echo.
) else (
    echo.
    echo [ERROR] Installation failed
    echo.
    echo Try these alternatives:
    echo 1. npm install (use npm instead of pnpm)
    echo 2. Check your internet connection
    echo 3. Check https://registry.npmjs.org is accessible
    echo.
)

pause
