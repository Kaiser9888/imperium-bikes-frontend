#!/bin/bash
# Script para compilar APK (versão Bash para WSL/Linux)

echo "🚀 COMPILAR APK - Imperium Bikes"
echo "=================================="
echo ""

# Ir para pasta android
cd android

echo "[1] Limpando cache..."
./gradlew clean

echo ""
echo "[2] Compilando APK Debug..."
./gradlew assembleDebug

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ APK COMPILADO COM SUCESSO!"
    echo ""
    echo "Local: android/app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "Para instalar:"
    echo "  adb install -r android/app/build/outputs/apk/debug/app-debug.apk"
else
    echo ""
    echo "❌ ERRO NA COMPILAÇÃO!"
    echo ""
    echo "Se erro de Java:"
    echo "  export JAVA_HOME=/usr/lib/jvm/java-17-openjdk"
    echo "  ./gradlew assembleDebug"
fi

cd ..

