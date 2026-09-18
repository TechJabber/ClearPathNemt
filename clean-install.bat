@echo off
REM Clear Path NEMT - Clean Install Script (npm version)
REM Completely removes pnpm and uses npm instead

echo.
echo ================================
echo Clean Install (Using npm)
echo ================================
echo.
echo This will:
echo 1. Stop any running servers
echo 2. Remove node_modules
echo 3. Clear npm cache
echo 4. Uninstall pnpm (if installed)
echo 5. Reinstall everything with npm
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

echo Step 2: Removing node_modules...
if exist node_modules rmdir /s /q node_modules
for /d %%d in (packages\*) do (
    if exist "%%d\node_modules" rmdir /s /q "%%d\node_modules"
)

echo Step 3: Removing lock files...
if exist pnpm-lock.yaml del pnpm-lock.yaml
if exist package-lock.json del package-lock.json

echo Step 4: Clearing npm cache...
call npm cache clean --force

echo Step 5: Uninstalling pnpm globally (if installed)...
call npm uninstall -g pnpm 2>nul

echo.
echo Step 6: Installing dependencies with npm...
echo This will take 2-5 minutes...
echo.

call npm install

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
    echo Check:
    echo 1. Internet connection
    echo 2. Node.js installed: node --version
    echo 3. npm updated: npm --version (should be 8+)
    echo.
)

pause
