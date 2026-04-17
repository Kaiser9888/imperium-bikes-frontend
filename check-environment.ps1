# Script para verificar ambiente de desenvolvimento

Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "VALIDAÇÃO DO AMBIENTE DE DESENVOLVIMENTO" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar Node.js
Write-Host "[1] Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js não encontrado!" -ForegroundColor Red
}

# Verificar npm
Write-Host "[2] Verificando npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm não encontrado!" -ForegroundColor Red
}

# Verificar Java
Write-Host "[3] Verificando Java JDK..." -ForegroundColor Yellow
try {
    $javaVersion = java -version 2>&1
    Write-Host "✓ Java instalado" -ForegroundColor Green
    Write-Host "  $($javaVersion[0])" -ForegroundColor Gray
} catch {
    Write-Host "✗ Java não encontrado!" -ForegroundColor Red
}

# Verificar JAVA_HOME
Write-Host "[4] Verificando JAVA_HOME..." -ForegroundColor Yellow
$javaHome = $env:JAVA_HOME
if ($javaHome) {
    Write-Host "✓ JAVA_HOME: $javaHome" -ForegroundColor Green
} else {
    Write-Host "✗ JAVA_HOME não configurada!" -ForegroundColor Red
}

# Verificar Android SDK
Write-Host "[5] Verificando Android SDK..." -ForegroundColor Yellow
$androidSdkRoot = $env:ANDROID_SDK_ROOT
if ($androidSdkRoot) {
    Write-Host "✓ ANDROID_SDK_ROOT: $androidSdkRoot" -ForegroundColor Green
} else {
    Write-Host "⚠ ANDROID_SDK_ROOT não encontrada - pode usar valor padrão" -ForegroundColor Yellow
}

# Verificar Gradle
Write-Host "[6] Verificando Gradle..." -ForegroundColor Yellow
try {
    $gradleVersion = gradle --version 2>&1 | Select-Object -First 1
    Write-Host "✓ Gradle: $gradleVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠ Gradle pode ser usado via wrapper (./gradlew)" -ForegroundColor Yellow
}

# Verificar adb
Write-Host "[7] Verificando adb (Android Debug Bridge)..." -ForegroundColor Yellow
try {
    $adbVersion = adb version 2>&1 | Select-Object -First 1
    Write-Host "✓ adb: instalado" -ForegroundColor Green
} catch {
    Write-Host "⚠ adb não encontrado no PATH" -ForegroundColor Yellow
}

# Verificar keytool
Write-Host "[8] Verificando keytool (para certificados)..." -ForegroundColor Yellow
try {
    $keytoolVersion = keytool -version 2>&1 | Select-Object -First 1
    Write-Host "✓ keytool: encontrado" -ForegroundColor Green
} catch {
    Write-Host "✗ keytool não encontrado!" -ForegroundColor Red
}

Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "RESUMO: Ambiente verificado!" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Cyan

