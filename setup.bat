@echo off
REM Imperium Bikes Frontend - Script de Setup para Windows

echo.
echo 🚀 Iniciando setup do Imperium Bikes Frontend...
echo.

REM Verificar se node está instalado
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo ❌ Node.js não está instalado.
  echo Por favor, instale do site: https://nodejs.org
  exit /b 1
)

echo ✅ Node.js encontrado
for /f "tokens=*" %%i in ('node -v') do echo    Versão: %%i

echo ✅ NPM encontrado
for /f "tokens=*" %%i in ('npm -v') do echo    Versão: %%i

echo.
echo 📦 Instalando dependências...
call npm install

if %ERRORLEVEL% NEQ 0 (
  echo ❌ Erro ao instalar dependências
  exit /b 1
)

echo.
echo ✅ Dependências instaladas com sucesso!
echo.

REM Criar arquivo .env
if not exist .env (
  echo 🔧 Criando arquivo .env...
  copy .env.example .env
  echo ✅ Arquivo .env criado
)

echo.
echo 🎉 Setup completo!
echo.
echo Para iniciar o desenvolvimento:
echo   npm run dev
echo.
echo Para build de produção:
echo   npm run build
echo.
pause

