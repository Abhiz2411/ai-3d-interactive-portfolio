@echo off
rem Double-click or run: dev-servers.cmd start|stop|status|restart [-Only chat|site]
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0dev-servers.ps1" %*
if "%~1"=="" pause
