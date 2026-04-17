@echo off
REM Script de verificação do ambiente
REM Compatível com cmd.exe (não precisa PowerShell)

echo.
echo =====================================================
echo  VERIFICACAO DO AMBIENTE DE DESENVOLVIMENTO
echo =====================================================
echo.

REM Verificar Node.js
echo [1/8] Verificando Node.js...
node --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%i in ('node --version') do echo OK: %%i
) else (
    echo ERRO: Node.js nao encontrado!
    echo Instale em: https://nodejs.org/
)

REM Verificar npm
echo [2/8] Verificando npm...
npm --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%i in ('npm --version') do echo OK: npm v%%i
) else (
    echo ERRO: npm nao encontrado!
)

REM Verificar Java
echo [3/8] Verificando Java JDK...
java -version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo OK: Java instalado
) else (
    echo ERRO: Java nao encontrado!
    echo Instale em: https://www.oracle.com/java/technologies/downloads/
)

REM Verificar JAVA_HOME
echo [4/8] Verificando JAVA_HOME...
if defined JAVA_HOME (
    echo OK: JAVA_HOME=%JAVA_HOME%
) else (
    echo AVISO: JAVA_HOME nao configurada
)

REM Verificar Android SDK
echo [5/8] Verificando Android SDK...
if defined ANDROID_HOME (
    echo OK: ANDROID_HOME=%ANDROID_HOME%
) else (
    if defined ANDROID_SDK_ROOT (
        echo OK: ANDROID_SDK_ROOT=%ANDROID_SDK_ROOT%
    ) else (
        echo AVISO: Android SDK nao encontrado
    )
)

REM Verificar adb
echo [6/8] Verificando adb...
adb version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo OK: adb encontrado
) else (
    echo AVISO: adb nao encontrado no PATH
)

REM Verificar keytool
echo [7/8] Verificando keytool...
keytool -version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo OK: keytool encontrado
) else (
    echo ERRO: keytool nao encontrado!
)

REM Verificar arquivo .env
echo [8/8] Verificando configuracoes...
if exist ".env" (
    echo OK: Arquivo .env encontrado
    for /f "tokens=*" %%i in (.env) do echo  - %%i
) else (
    echo AVISO: Arquivo .env nao encontrado
)

echo.
echo =====================================================
echo  Verificacao concluida!
echo =====================================================
echo.
pause

