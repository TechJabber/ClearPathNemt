@echo off
REM Clear Path NEMT - Open All Dev URLs in Browser
REM This script opens all important development URLs

echo Opening development URLs...
echo.

REM Open Frontend
echo Opening Frontend: http://localhost:3000
start http://localhost:3000

REM Wait a second then open Backend API Docs
timeout /t 1 /nobreak
echo Opening API Docs: http://localhost:3001/api/docs
start http://localhost:3001/api/docs

echo.
echo All URLs opened in browser!
echo.
echo Frontend:  http://localhost:3000
echo API Docs:  http://localhost:3001/api/docs
echo API Health: http://localhost:3001/api/health
echo.

pause
