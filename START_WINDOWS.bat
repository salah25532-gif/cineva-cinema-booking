@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
 echo Node.js was not found. Install Node.js 18+ from https://nodejs.org/
 pause
 exit /b 1
)
echo Starting CINEVA on http://127.0.0.1:3000
echo The site will open in your browser shortly.
start "" cmd /c "timeout /t 2 >nul & start http://127.0.0.1:3000"
node server.js
pause
