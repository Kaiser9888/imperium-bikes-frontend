# 🎯 INSTRUÇÕES FINAIS - COMPILAR E INSTALAR APK

## 📍 VOCÊ ESTAVA AQUI

Você tentou compilar e teve erro:
```
error: invalid source release: 21
```

## ✅ EU FIZ ISSO POR VOCÊ

Atualizei `android/gradle.properties` para:
- Forçar Java 17
- Aumentar memória JVM

---

## 🚀 AGORA FAÇA ISSO (COPIE E COLE)

### Abra PowerShell e Execute:

```powershell
cd C:\Users\Lenovo\Desktop\imperium-bikes-frontend\android
.\gradlew.bat clean
.\gradlew.bat assembleDebug
```

---

## ✨ RESULTADO ESPERADO

Você verá:
```
BUILD SUCCESSFUL in 5s
```

### APK Gerado em:
```
C:\Users\Lenovo\Desktop\imperium-bikes-frontend\android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 📱 DEPOIS: INSTALAR NO CELULAR

### Passo 1: Conectar Celular

```cmd
# Conecte via USB e ative "Depuração USB"

# Ver dispositivos
adb devices

# Deve listar seu celular
```

### Passo 2: Instalar APK

```cmd
adb install -r android\app\build\outputs\apk\debug\app-debug.apk
```

### Passo 3: Testar

- Procure por "Imperium Bikes" no celular
- Abra o app
- Teste a navegação
- Teste se conecta com backend

---

## 📊 COMANDOS RESUMIDOS

```powershell
# 1. COMPILAR
cd android
.\gradlew.bat clean
.\gradlew.bat assembleDebug

# 2. INSTALAR
adb install -r android\app\build\outputs\apk\debug\app-debug.apk

# 3. VER LOGS
adb logcat

# 4. DESINSTALAR (se precisar)
adb uninstall com.imperiumbikes.app
```

---

## 🔍 SE TIVER ERRO NOVAMENTE

### Verificar Java:
```powershell
java -version
echo $env:JAVA_HOME
```

### Configurar Java 17:
```powershell
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
echo $env:JAVA_HOME
```

### Limpar Cache Gradle:
```powershell
cd android
rmdir -Recurse -Force .gradle
rmdir -Recurse -Force build
rmdir -Recurse -Force app\build
.\gradlew.bat clean
.\gradlew.bat assembleDebug
```

---

## 🌐 GIT (VOCÊ FARÁ MANUALMENTE)

```bash
git add .
git commit -m "Adicionando APK build configuration e solução Java"
git push origin main
```

---

## 📋 CHECKLIST

- [x] gradle.properties atualizado
- [ ] PowerShell aberto
- [ ] Executou: `cd android`
- [ ] Executou: `gradlew.bat clean`
- [ ] Executou: `gradlew.bat assembleDebug`
- [ ] APK gerado: `app-debug.apk`
- [ ] Conectou celular/emulador
- [ ] Executou: `adb install -r app-debug.apk`
- [ ] Testou app no celular
- [ ] (Depois) Fizer commit no Git

---

## 🎉 PRONTO!

Seu APK Android estará funcionando no celular!

**Próximo passo:** Execute os comandos no PowerShell! 🚀

---

**Documentos de Referência:**
- `SOLUCAO_JAVA_ERROR.md` - Detalhes do erro
- `PASSO_A_PASSO_APK.md` - Guia passo-a-passo
- `COMANDOS_COMPLETOS.md` - Todos os comandos
- `TROUBLESHOOTING.md` - Se tiver problemas

**Qualquer dúvida, consulte os documentos acima!** 📚

