@echo off
REM Script de compilacao de APK
REM Compativel com cmd.exe e PowerShell

setlocal enabledelayedexpansion

set "BUILD_TYPE=debug"
set "SKIP_NPM=0"
set "SKIP_BUILD=0"
set "INSTALL_DEVICE=0"

REM Processar argumentos
if "%1"=="release" set "BUILD_TYPE=release"
if "%1"=="--skip-npm" set "SKIP_NPM=1"
if "%1"=="--skip-build" set "SKIP_BUILD=1"
if "%1"=="--install" set "INSTALL_DEVICE=1"

echo.
echo =====================================================
echo  BUILD APK - IMPERIUM BIKES FRONTEND
echo =====================================================
echo.
echo Tipo de build: %BUILD_TYPE%
echo.

REM ETAPA 1: Verificar ambiente
echo [ETAPA 1/6] Verificando ambiente...
echo.

node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERRO: Node.js nao encontrado!
    goto error
)
for /f "tokens=*" %%i in ('node --version') do echo OK: Node.js %%i

java -version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERRO: Java nao encontrado!
    goto error
)
echo OK: Java JDK encontrado

if exist ".env" (
    echo OK: Arquivo .env encontrado
    for /f "tokens=*" %%i in (.env) do echo  - %%i
) else (
    echo AVISO: Arquivo .env nao encontrado
)

echo.

REM ETAPA 2: Instalar dependencias NPM
if %SKIP_NPM% EQU 1 (
    echo [ETAPA 2/6] Pulando instalacao de dependencias
    echo.
) else (
    echo [ETAPA 2/6] Instalando dependencias NPM...
    if exist "node_modules" (
        echo OK: node_modules ja existe
    ) else (
        echo Executando: npm install
        call npm install
        if %ERRORLEVEL% NEQ 0 (
            echo ERRO: npm install falhou!
            goto error
        )
        echo OK: Dependencias instaladas
    )
    echo.
)

REM ETAPA 3: Build da aplicacao React
if %SKIP_BUILD% EQU 1 (
    echo [ETAPA 3/6] Pulando build da aplicacao
    echo.
) else (
    echo [ETAPA 3/6] Compilando aplicacao React (Vite)...
    echo Executando: npm run build
    call npm run build
    if %ERRORLEVEL% NEQ 0 (
        echo ERRO: npm run build falhou!
        goto error
    )
    if exist "dist" (
        echo OK: Build concluido - dist/ gerado
    ) else (
        echo ERRO: dist/ nao foi criado!
        goto error
    )
    echo.
)

REM ETAPA 4: Sincronizar com Capacitor
echo [ETAPA 4/6] Sincronizando com Capacitor...
call npx cap sync android
if %ERRORLEVEL% NEQ 0 (
    echo ERRO: Sincronizacao falhou!
    goto error
)
echo OK: Sincronizacao concluida
echo.

REM ETAPA 5: Preparar certificado
echo [ETAPA 5/6] Preparando certificado de assinatura...
if "%BUILD_TYPE%"=="debug" (
    if exist "android\debug.keystore" (
        echo OK: Debug keystore ja existe
    ) else (
        echo Criando debug keystore...
        cd android
        keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Debug,OU=Android,O=Imperium,C=BR"
        cd ..
        if %ERRORLEVEL% EQU 0 (
            echo OK: Debug keystore criado
        )
    )
) else (
    echo AVISO: Para release use seu keystore proprio
    echo Configure em: android/app/build.gradle
)
echo.

REM ETAPA 6: Compilar APK
echo [ETAPA 6/6] Compilando APK (%BUILD_TYPE%)...
cd android

if "%BUILD_TYPE%"=="debug" (
    echo Executando: gradlew.bat assembleDebug
    call gradlew.bat assembleDebug
    if %ERRORLEVEL% NEQ 0 (
        cd ..
        echo ERRO: Gradle build falhou!
        goto error
    )
    set "APK_PATH=app\build\outputs\apk\debug\app-debug.apk"
) else (
    echo Executando: gradlew.bat assembleRelease
    call gradlew.bat assembleRelease
    if %ERRORLEVEL% NEQ 0 (
        cd ..
        echo ERRO: Gradle build falhou!
        goto error
    )
    set "APK_PATH=app\build\outputs\apk\release\app-release.apk"
)

cd ..

if exist "%APK_PATH%" (
    echo OK: APK compilado com sucesso!
    echo Caminho: %APK_PATH%
) else (
    echo ERRO: APK nao encontrado em: %APK_PATH%
    goto error
)

echo.
echo =====================================================
echo  BUILD CONCLUIDO COM SUCESSO!
echo =====================================================
echo.
echo APK gerado: %APK_PATH%
echo.
echo Proximos passos:
echo   Para instalar em um emulador/dispositivo:
echo     adb install -r "%APK_PATH%"
echo.
echo   Backend configurado em:
echo     https://imperium-bikes-backend.onrender.com
echo.
pause
goto end

:error
echo.
echo =====================================================
echo  ERRO DURANTE O BUILD!
echo =====================================================
echo.
pause
exit /b 1

:end

