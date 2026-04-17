# 📱 COMPILE SEU APK - INSTRUÇÕES SIMPLES

## 🚀 COPIE E COLE ISTO NO POWERSHELL:

```powershell
cd C:\Users\Lenovo\Desktop\imperium-bikes-frontend\android
.\gradlew.bat clean
.\gradlew.bat assembleDebug
```

---

## ⏳ AGUARDE

- Pode levar 10-20 minutos
- Verá muito texto
- **Não feche o PowerShell**

---

## ✅ SE VIR ISTO:

```
BUILD SUCCESSFUL in XXs
```

**PERFEITO! APK gerado!** 🎉

---

## 🎯 DEPOIS

### 1. Configurar ADB:
```powershell
$env:Path += ";C:\Users\$env:USERNAME\AppData\Local\Android\Sdk\platform-tools"
```

### 2. Verificar Celular:
```powershell
adb devices
```

### 3. Instalar:
```powershell
adb install -r app\build\outputs\apk\debug\app-debug.apk
```

---

## ❌ SE DER ERRO

### Verificar Java:
```powershell
java -version
```

Deve mostrar `"17.0"`

### Configurar Java:
```powershell
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
java -version
```

### Tentar novamente:
```powershell
cd C:\Users\Lenovo\Desktop\imperium-bikes-frontend\android
.\gradlew.bat clean
.\gradlew.bat assembleDebug
```

---

**Pronto! Agora você tem seu APK! 🚀**

