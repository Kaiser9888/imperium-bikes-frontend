@echo off
REM Verificar keystore existente
echo.
echo ============================================
echo VERIFICANDO KEYSTORE EXISTENTE
echo ============================================
echo.

echo [1] Verificando debug keystore...
if exist "android\debug.keystore" (
    echo ✓ ENCONTRADO: android\debug.keystore
    dir android\debug.keystore
) else (
    echo ✗ NÃO ENCONTRADO: Nenhum keystore debug
)

echo.
echo [2] Procurando outros keystores...
dir *.keystore /s /b 2>nul
if errorlevel 1 (
    echo ✗ Nenhum keystore encontrado no projeto
)

echo.
echo ============================================
echo OPÇÕES DE KEYSTORE
echo ============================================
echo.
echo PARA DEBUG (teste):
echo - Keystore será criado automaticamente
echo - Senha: android
echo - Alias: androiddebugkey
echo - Arquivo: android/debug.keystore
echo.
echo PARA RELEASE (produção):
echo - Você precisa criar seu próprio keystore
echo - Guarde em local seguro
echo - Nunca versione no Git
echo.
echo ============================================
echo PRÓXIMOS PASSOS
echo ============================================
echo.
echo 1. Para debug: execute build-apk.bat (normal)
echo 2. Para release: crie keystore próprio primeiro
echo.
echo Quer criar keystore release agora?
echo Execute: criar-keystore-release.bat
echo.
pause

