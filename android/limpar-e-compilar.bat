@echo off
REM Script para limpar Gradle daemon e recompilar

echo.
echo ============================================
echo LIMPANDO GRADLE E RECOMPILANDO
echo ============================================
echo.

cd /d C:\Users\Lenovo\Desktop\imperium-bikes-frontend\android

echo [1] Matando Gradle Daemon...
gradlew.bat --stop
timeout /t 2

echo [2] Deletando cache .gradle...
rmdir /s /q .gradle
if exist ".gradle" (
    echo AVISO: Não conseguiu deletar .gradle na primeira tentativa
)

echo [3] Limpando build...
rmdir /s /q build
rmdir /s /q app\build

echo [4] Executando clean...
gradlew.bat clean

echo.
echo [5] COMPILANDO APK DEBUG...
echo Este é o momento importante!
echo.
gradlew.bat assembleDebug

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================
    echo ✅ APK COMPILADO COM SUCESSO!
    echo ============================================
    echo.
    echo APK: app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo Próximo passo:
    echo   adb install -r app\build\outputs\apk\debug\app-debug.apk
    echo.
) else (
    echo.
    echo ❌ ERRO NA COMPILAÇÃO!
    echo.
    echo Se erro persistir:
    echo 1. Verifique java -version (deve ser 17)
    echo 2. Delete pasta .gradle completamente
    echo 3. Tente novamente
    echo.
)

echo.
pause

