@echo off
if exist helpgen.txt ( ECHO y | DEL helpgen.txt )
for /F %%i in ('help ^| findstr /r rem ^| экранирует ковнвеер
/C:"^[A-Z][^o]" ^| findstr /v "GRAFTABL"') do ( rem ^ -  строка начинается с ...; ^ не символ
help %%i >> helpgen.txt rem ' - воспринимай как команду и анализировать ее вывод(для help)
);