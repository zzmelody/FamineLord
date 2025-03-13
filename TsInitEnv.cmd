cd /d %~dp0
cd ./Scripts/TypeScript

call mklink /D Protos ..\Protos

call npm install

pause