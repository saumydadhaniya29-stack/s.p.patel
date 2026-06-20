@echo off
title FlowGem Website Launcher
color 0B
echo.
echo  =============================================
echo   FlowGem - Starting Local Website Server...
echo  =============================================
echo.

:: Check if Python is installed
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo  [OK] Python found. Starting server...
    goto :python
)

py --version >nul 2>&1
if %errorlevel% == 0 (
    echo  [OK] Python found. Starting server...
    goto :py
)

:: Python not found - open as file
echo  [INFO] Python not found. Opening as file...
goto :fallback

:python
echo  [OK] Server running at: http://localhost:8080
echo  [OK] Opening browser...
echo.
echo  Press Ctrl+C to stop the server.
echo.
start "" http://localhost:8080/1.html
python -m http.server 8080
goto :end

:py
echo  [OK] Server running at: http://localhost:8080
echo  [OK] Opening browser...
echo.
echo  Press Ctrl+C to stop the server.
echo.
start "" http://localhost:8080/1.html
py -m http.server 8080
goto :end

:fallback
echo  [INFO] Opening website directly in browser...
start "" "%~dp01.html"

:end
