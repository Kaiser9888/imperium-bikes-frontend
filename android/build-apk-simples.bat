@echo off
REM Script simples para compilar APK - sem confusão de saída

cls
echo.
echo ================================================
echo COMPILANDO APK - IMPERIUM BIKES
echo ================================================
echo.

cd /d "C:\Users\Lenovo\Desktop\imperium-bikes-frontend\android"

echo [1/5] Parando Gradle Daemon...
call gradlew.bat --stop
echo OK
echo.

echo [2/5] Limpando arquivos antigos...
if exist ".gradle" rmdir /s /q ".gradle" 2>nul
if exist "build" rmdir /s /q "build" 2>nul
if exist "app\build" rmdir /s /q "app\build" 2>nul
echo OK
echo.

echo [3/5] Executando clean...
call gradlew.bat clean
if %ERRORLEVEL% NEQ 0 (
    echo ERRO em clean!
    goto erro
)
echo OK
echo.

echo [4/5] COMPILANDO APK DEBUG...
echo.
call gradlew.bat assembleDebug
if %ERRORLEVEL% NEQ 0 (
    echo ERRO na compilacao!
    goto erro
)
echo.

if exist "app\build\outputs\apk\debug\app-debug.apk" (
    echo [5/5] Verificando APK...
    for /F "tokens=*" %%A in ('dir "app\build\outputs\apk\debug\app-debug.apk" /B') do echo OK - Arquivo gerado: %%A
    echo.
    echo ================================================
    echo ✅ APK COMPILADO COM SUCESSO!
    echo ================================================
    echo.
    echo Localizacao: %CD%\app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo Proximo passo:
    echo 1. Conecte seu celular via USB
    echo 2. Ative Depuracao USB no celular
    echo 3. Execute no PowerShell:
    echo    adb install -r app\build\outputs\apk\debug\app-debug.apk
    echo.
) else (
    echo [5/5] ERRO - APK nao foi gerado!
    goto erro
)

echo.
pause
exit /b 0

:erro
echo.
echo ================================================
echo ❌ ERRO NA COMPILACAO!
echo ================================================
echo.
echo Possivel solucao:
echo 1. Feche PowerShell
echo 2. Abra novo PowerShell como administrador
echo 3. Execute novamente:
echo    cd C:\Users\Lenovo\Desktop\imperium-bikes-frontend\android
echo    .\gradlew.bat clean
echo    .\gradlew.bat assembleDebug
echo.
echo Se persistir, tente:
echo    java -version
echo    echo %JAVA_HOME%
echo.
pause
exit /b 1

