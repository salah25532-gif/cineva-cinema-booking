@echo off
REM تشغيل المشروع من مجلده الأصلي.
cd /d "%~dp0"
REM التأكد من تثبيت Node.js قبل البدء.
where node >nul 2>nul
if errorlevel 1 (
 echo Node.js was not found. Install Node.js 18+ from https://nodejs.org/
 pause
 exit /b 1
)
echo Starting MOVIE HOUSE on http://127.0.0.1:3000
echo The site will open in your browser shortly.
REM فتح الموقع محليًا في المتصفح.
start "" cmd /c "timeout /t 2 >nul & start http://127.0.0.1:3000"
REM تشغيل خادم الحجز.
node server.js
pause