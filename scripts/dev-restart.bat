@echo off
echo Clearing cache and restarting development server...
echo.

REM Kill any running Node processes
taskkill /f /im node.exe 2>nul

REM Clear npm cache
npm cache clean --force

REM Remove node_modules and reinstall (optional - uncomment if needed)
REM rmdir /s /q node_modules
REM npm install

REM Clear Vite cache
rmdir /s /q node_modules\.vite 2>nul

REM Start development server
echo Starting development server...
npm run dev

pause