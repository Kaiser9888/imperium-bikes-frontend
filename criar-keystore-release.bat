@echo off
REM Criar keystore para release (produção)
echo.
echo ============================================
echo CRIAR KEYSTORE PARA RELEASE
echo ============================================
echo.
echo ATENÇÃO: Este keystore será usado para publicar no Google Play!
echo.
echo IMPORTANTE:
echo - Guarde este arquivo em local SEGURO
echo - Nunca perca a senha
echo - Nunca versione no Git
echo - Faça backup em vários locais
echo.
echo Pressione qualquer tecla para continuar...
pause >nul

echo.
echo ============================================
echo CONFIGURANDO KEYSTORE RELEASE
echo ============================================
echo.

set /p KEYSTORE_NAME=Digite o nome do arquivo keystore (ex: release.keystore):
set /p KEYSTORE_ALIAS=Digite o alias (ex: imperium-release):
set /p KEYSTORE_PASS=Digite a senha (mínimo 6 caracteres):

echo.
echo Criando keystore...
echo Arquivo: %KEYSTORE_NAME%
echo Alias: %KEYSTORE_ALIAS%
echo.

keytool -genkey -v -keystore %KEYSTORE_NAME% -storepass %KEYSTORE_PASS% -alias %KEYSTORE_ALIAS% -keypass %KEYSTORE_PASS% -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Imperium Bikes, OU=Mobile, O=Imperium, C=BR"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================
    echo ✅ KEYSTORE CRIADO COM SUCESSO!
    echo ============================================
    echo.
    echo Arquivo: %KEYSTORE_NAME%
    echo Alias: %KEYSTORE_ALIAS%
    echo.
    echo ⚠️  IMPORTANTE:
    echo - Guarde este arquivo em local seguro
    echo - Anote a senha: %KEYSTORE_PASS%
    echo - Faça backup
    echo.
    echo Para usar no build release:
    echo 1. Mova o arquivo para pasta segura
    echo 2. Configure no android/app/build.gradle
    echo 3. Execute: build-apk.bat release
    echo.
) else (
    echo.
    echo ❌ ERRO ao criar keystore!
    echo.
)

echo.
pause

