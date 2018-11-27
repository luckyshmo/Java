@echo off
set dir=%1 rem зачем была нужна тильда?
echo %dir%
:createName
set tempFile=%random%.tmp
if exist %dir%\%tempFile% goto :createName
echo %dir%\%tempfile%
rem setLocal endLocal - ЧИТАТЬ