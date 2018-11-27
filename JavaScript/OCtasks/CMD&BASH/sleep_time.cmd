@echo off
set startTime=%time%
rem echo %startTime%
set /a hours=(%startTime:~0,1%*10+%startTime:~1,1%)*60*60*100 rem числа с 0 воспринимаются как восьмеричная система счисления
set /a minutes=(%startTime:~3,1%*10+%startTime:~4,1%)*60*100
set /a seconds=(%startTime:~6,1%*10+%startTime:~7,1%)*100
set /a miliSeconds=%startTime:~9,1%*10+%startTime:~10,1%
set /a startTimeMS=%hours%+%minutes%+%seconds%+%miliSeconds%
:loop
set realTime=%time%
set /a h=(%realTime:~0,1%*10+%realTime:~1,1%)*60*60*100
set /a m=(%realTime:~3,1%*10+%realTime:~4,1%)*60*100
set /a s=(%realTime:~6,1%*10+%realTime:~7,1%)*100
set /a mS=%startTime:~9,1%*10+%startTime:~10,1%
set /a realTimeMS=%h%+%m%+%s%+%mS%
set /a diff = %realTimeMS%-%startTimeMS%
if %diff% GEQ %1 goto :end
    goto :loop
:end