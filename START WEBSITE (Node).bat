@echo off
title FlowGem Website Launcher (Node)
color 0B
echo.
echo  =============================================
echo   FlowGem - Starting Local Website Server...
echo  =============================================
echo.

:: Check Node.js
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo  [OK] Node.js found. Starting server...
    echo  [OK] Server running at: http://localhost:8080
    echo  [OK] Opening browser...
    echo.
    echo  Press Ctrl+C to stop the server.
    echo.
    start "" http://localhost:8080/1.html
    node -e "const http=require('http'),fs=require('fs'),path=require('path');http.createServer((req,res)=>{let f=path.join(__dirname,req.url==='/'?'/1.html':req.url);fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);res.end('Not found');}else{const ext=path.extname(f);const mime={'html':'text/html','css':'text/css','js':'application/javascript','png':'image/png','jpg':'image/jpeg','jpeg':'image/jpeg','gif':'image/gif','svg':'image/svg+xml'};res.writeHead(200,{'Content-Type':mime[ext.slice(1)]||'text/plain'});res.end(d);}});}).listen(8080);"
    goto :end
)

echo  [INFO] Node.js not found. Trying Python...

python --version >nul 2>&1
if %errorlevel% == 0 (
    start "" http://localhost:8080/1.html
    python -m http.server 8080
    goto :end
)

py --version >nul 2>&1
if %errorlevel% == 0 (
    start "" http://localhost:8080/1.html
    py -m http.server 8080
    goto :end
)

echo  [INFO] Opening as file (no server available)...
start "" "%~dp01.html"

:end
