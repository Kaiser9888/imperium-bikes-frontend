# Script para compilar APK do projeto Imperium Bikes
# Este script automatiza todo o processo de build

param(
    [ValidateSet("debug", "release")]
    [string]$BuildType = "debug",
    [switch]$SkipNpm = $false,
    [switch]$SkipBuild = $false,
    [switch]$InstallDevice = $false
)

$ErrorActionPreference = "Stop"
$project_root = Get-Location
$android_dir = Join-Path $project_root "android"

Write-Host "╔════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     BUILD APK - IMPERIUM BIKES FRONTEND           ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "Diretório do projeto: $project_root" -ForegroundColor Gray
Write-Host "Tipo de build: $BuildType" -ForegroundColor Gray
Write-Host ""

try {
    # ============================================
    # ETAPA 1: Verificar environment
    # ============================================
    Write-Host "[ETAPA 1/7] Verificando ambiente..." -ForegroundColor Yellow
    Write-Host "─────────────────────────────────────" -ForegroundColor Gray

    # Verificar Node.js
    try {
        $nodeVersion = node --version
        Write-Host "✓ Node.js: $nodeVersion"
    } catch {
        throw "Node.js não encontrado. Instale em https://nodejs.org/"
    }

    # Verificar Java
    try {
        $javaOutput = java -version 2>&1
        Write-Host "✓ Java JDK: instalado"
    } catch {
        throw "Java JDK não encontrado. Instale JDK 11 ou superior."
    }

    # Verificar arquivo .env
    $envFile = Join-Path $project_root ".env"
    if (Test-Path $envFile) {
        $envContent = Get-Content $envFile
        Write-Host "✓ Arquivo .env encontrado:"
        Write-Host "  $envContent" -ForegroundColor Gray
    } else {
        Write-Host "⚠ Arquivo .env não encontrado, usando valores padrão" -ForegroundColor Yellow
    }

    Write-Host "✓ Environment OK!" -ForegroundColor Green
    Write-Host ""

    # ============================================
    # ETAPA 2: Instalar dependências NPM
    # ============================================
    if (-not $SkipNpm) {
        Write-Host "[ETAPA 2/7] Instalando dependências NPM..." -ForegroundColor Yellow
        Write-Host "─────────────────────────────────────" -ForegroundColor Gray

        if (Test-Path "node_modules") {
            Write-Host "✓ node_modules já existe, pulando instalação" -ForegroundColor Green
        } else {
            Write-Host "Executando: npm install"
            npm install
            if ($LASTEXITCODE -ne 0) {
                throw "npm install falhou com código de erro: $LASTEXITCODE"
            }
            Write-Host "✓ Dependências instaladas!" -ForegroundColor Green
        }
    } else {
        Write-Host "[ETAPA 2/7] Pulando instalação de dependências (--SkipNpm)" -ForegroundColor Yellow
    }
    Write-Host ""

    # ============================================
    # ETAPA 3: Build da aplicação React
    # ============================================
    if (-not $SkipBuild) {
        Write-Host "[ETAPA 3/7] Compilando aplicação React (Vite)..." -ForegroundColor Yellow
        Write-Host "─────────────────────────────────────" -ForegroundColor Gray

        Write-Host "Executando: npm run build"
        npm run build
        if ($LASTEXITCODE -ne 0) {
            throw "npm run build falhou com código de erro: $LASTEXITCODE"
        }

        $distPath = Join-Path $project_root "dist"
        if (Test-Path $distPath) {
            $distSize = (Get-ChildItem $distPath -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
            Write-Host "✓ Build concluído! Tamanho: $([Math]::Round($distSize, 2)) MB" -ForegroundColor Green
        }
    } else {
        Write-Host "[ETAPA 3/7] Pulando build da aplicação (--SkipBuild)" -ForegroundColor Yellow
    }
    Write-Host ""

    # ============================================
    # ETAPA 4: Sincronizar com Capacitor
    # ============================================
    Write-Host "[ETAPA 4/7] Sincronizando com Capacitor..." -ForegroundColor Yellow
    Write-Host "─────────────────────────────────────" -ForegroundColor Gray

    # Instalar Capacitor CLI se necessário
    try {
        $capVersion = npx cap --version
        Write-Host "✓ Capacitor CLI: v$capVersion"
    } catch {
        Write-Host "Instalando Capacitor CLI globalmente..."
        npm install -g @capacitor/cli@8.3.1
    }

    Write-Host "Executando: npx cap sync android"
    npx cap sync android
    if ($LASTEXITCODE -ne 0) {
        throw "npx cap sync android falhou com código de erro: $LASTEXITCODE"
    }

    Write-Host "✓ Sincronização concluída!" -ForegroundColor Green
    Write-Host ""

    # ============================================
    # ETAPA 5: Preparar certificado de assinatura
    # ============================================
    Write-Host "[ETAPA 5/7] Preparando certificado de assinatura..." -ForegroundColor Yellow
    Write-Host "─────────────────────────────────────" -ForegroundColor Gray

    if ($BuildType -eq "debug") {
        $keystore_path = Join-Path $android_dir "debug.keystore"

        if (Test-Path $keystore_path) {
            Write-Host "✓ Debug keystore já existe: $keystore_path" -ForegroundColor Green
        } else {
            Write-Host "Criando debug keystore..."
            $keystore_cmd = "keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname `"CN=Debug, OU=Android, O=Imperium, C=BR`""

            Set-Location $android_dir
            Invoke-Expression $keystore_cmd
            Set-Location $project_root

            if (Test-Path $keystore_path) {
                Write-Host "✓ Debug keystore criado!" -ForegroundColor Green
            }
        }
    } else {
        Write-Host "⚠ Para build Release, use seu keystore próprio" -ForegroundColor Yellow
        Write-Host "  Configure em: android/app/build.gradle" -ForegroundColor Gray
    }
    Write-Host ""

    # ============================================
    # ETAPA 6: Compilar APK
    # ============================================
    Write-Host "[ETAPA 6/7] Compilando APK ($BuildType)..." -ForegroundColor Yellow
    Write-Host "─────────────────────────────────────" -ForegroundColor Gray

    Set-Location $android_dir

    if ($BuildType -eq "debug") {
        Write-Host "Executando: ./gradlew.bat assembleDebug"
        & ".\gradlew.bat" assembleDebug
    } else {
        Write-Host "Executando: ./gradlew.bat assembleRelease"
        & ".\gradlew.bat" assembleRelease
    }

    if ($LASTEXITCODE -ne 0) {
        Set-Location $project_root
        throw "Gradle build falhou com código de erro: $LASTEXITCODE"
    }

    Set-Location $project_root

    # Localizar APK gerado
    $apk_path = Join-Path $android_dir "app\build\outputs\apk\$BuildType\app-$BuildType.apk"

    if (Test-Path $apk_path) {
        $apk_size = (Get-Item $apk_path).Length / 1MB
        Write-Host "✓ APK compilado com sucesso!" -ForegroundColor Green
        Write-Host "  Caminho: $apk_path" -ForegroundColor Gray
        Write-Host "  Tamanho: $([Math]::Round($apk_size, 2)) MB" -ForegroundColor Gray
    } else {
        throw "APK não encontrado em: $apk_path"
    }
    Write-Host ""

    # ============================================
    # ETAPA 7: Instalar em dispositivo (opcional)
    # ============================================
    if ($InstallDevice) {
        Write-Host "[ETAPA 7/7] Instalando em dispositivo..." -ForegroundColor Yellow
        Write-Host "─────────────────────────────────────" -ForegroundColor Gray

        try {
            $devices = adb devices -l 2>&1
            Write-Host "Dispositivos conectados:" -ForegroundColor Gray
            Write-Host $devices -ForegroundColor Gray

            Write-Host "Instalando APK..."
            adb install -r $apk_path

            if ($LASTEXITCODE -eq 0) {
                Write-Host "✓ APK instalado com sucesso!" -ForegroundColor Green
            } else {
                Write-Host "⚠ Erro ao instalar APK" -ForegroundColor Yellow
            }
        } catch {
            Write-Host "⚠ adb não disponível, pulando instalação" -ForegroundColor Yellow
        }
    } else {
        Write-Host "[ETAPA 7/7] Pulando instalação em dispositivo" -ForegroundColor Yellow
        Write-Host "  Use flag -InstallDevice para instalar" -ForegroundColor Gray
    }
    Write-Host ""

    # ============================================
    # RESUMO FINAL
    # ============================================
    Write-Host "╔════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║           BUILD CONCLUÍDO COM SUCESSO!            ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host ""
    Write-Host "APK gerado: $apk_path" -ForegroundColor Cyan
    Write-Host "Tamanho: $([Math]::Round($apk_size, 2)) MB" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Próximos passos:" -ForegroundColor Yellow
    Write-Host "  • Para instalar em um emulador/dispositivo:" -ForegroundColor Gray
    Write-Host "    adb install -r `"$apk_path`"" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  • Para ver logs:" -ForegroundColor Gray
    Write-Host "    adb logcat" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  • Backend configurado em: https://imperium-bikes-backend.onrender.com" -ForegroundColor Green
    Write-Host ""

} catch {
    Write-Host ""
    Write-Host "╔════════════════════════════════════════════════════╗" -ForegroundColor Red
    Write-Host "║               ERRO DURANTE O BUILD!               ║" -ForegroundColor Red
    Write-Host "╚════════════════════════════════════════════════════╝" -ForegroundColor Red
    Write-Host ""
    Write-Host "Erro: $_" -ForegroundColor Red
    Write-Host ""
    exit 1
}

