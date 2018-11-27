@echo off
IF EXIST %1 (
	echo Yes, this folder contains file %1
) ELSE (
	echo No, this folder does not contain file %1
)
