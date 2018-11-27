@echo off
if "%~x1" neq "" (echo %~$PATH:1
) else (
    for %%e in ("%pathext:;=" "%") do (
		echo %%e
        for %%p in ("%path:;=" "%") do (
			echo %%p
            for %%i in ("%%~p%1%%~e") do (
                if exist %%i echo %%~i
            )
        )
    )
)