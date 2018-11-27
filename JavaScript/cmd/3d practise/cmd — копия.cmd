@echo off
if "%1" == "" goto :nofile
for /r %2 %%i in (*) do (
	echo %%i
	if %1 == %%~nxi (echo %%i)
)
goto :eof

:nofile
echo File for searching must be defined.
echo Use this script as follow
echo fsearch.cmd filename [directory]

