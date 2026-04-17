# 📱 Como Gerar APK - Imperium Bikes

## ⚡ Início Rápido (5 Minutos)

### Passo 1: Executar Verificação
```cmd
check-environment.bat
```
Isso verifica se você tem todas as ferramentas instaladas.

### Passo 2: Gerar APK (DEBUG)
```cmd
build-apk.bat
```
Isso cria o arquivo APK de teste. Vai levar **10-20 minutos** na primeira vez.

### Passo 3: Testar no Dispositivo
```cmd
adb install -r android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 📋 Pré-requisitos Instalados

✅ Você PRECISA ter instalado:

1. **Node.js** (versão 16+)
   - Link: https://nodejs.org/
   - Baixe a versão LTS

2. **Java JDK 17**
   - Link: https://www.oracle.com/java/technologies/downloads/
   - Escolha Windows x64

3. **Android Studio** com SDK
   - Link: https://developer.android.com/studio
   - Instale os SDKs (APIs 24 e 36)

---

## 🎯 Tipos de Build

### Debug (Para Testes)
```cmd
build-apk.bat
```
- ✓ Mais rápido
- ✓ Não precisa de keystore
- ✓ Usa certificado automático
- ✓ Arquivo: `android\app\build\outputs\apk\debug\app-debug.apk`

### Release (Para Google Play)
```cmd
build-apk.bat release
```
- ⚠ Precisa de keystore próprio
- ⚠ Mais lento
- ✓ Seguro para produção
- ✓ Arquivo: `android\app\build\outputs\apk\release\app-release.apk`

---

## 📱 Instalar no Dispositivo

### Com Emulador:
1. Abra Android Studio
2. Tools → Device Manager → Criar/Iniciar Emulador
3. Execute:
```cmd
adb install -r android\app\build\outputs\apk\debug\app-debug.apk
```

### Com Celular USB:
1. Conecte o celular via USB
2. Ative "Modo de Desenvolvedor" (clicar 7x em "Número da Build")
3. Ative "Depuração USB"
4. Permitir na janela do celular
5. Execute:
```cmd
adb devices                          REM Verificar conexão
adb install -r android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 🐛 Problemas Comuns

### "Node.js não encontrado"
- ❌ Instale em: https://nodejs.org/
- ❌ Reinicie PowerShell/CMD após instalar

### "Java não encontrado"
- ❌ Instale em: https://www.oracle.com/java/
- ❌ Configure `JAVA_HOME` em Variáveis de Ambiente

### "Android SDK não encontrado"
- ❌ Abra Android Studio → SDK Manager
- ❌ Instale APIs 24 e 36
- ❌ Configure `ANDROID_HOME`

### "Build muito lento"
- ✓ Primeira vez é normal (30-60 minutos)
- ✓ Próximas builds são mais rápidas (5-10 minutos)

### "APK não instala"
```cmd
adb uninstall com.imperiumbikes.app    REM Desinstalar versão antiga
adb install -r app-debug.apk           REM Instalar nova
```

---

## 🚀 Comandos Úteis

```cmd
REM Verificar ambiente
check-environment.bat

REM Gerar APK debug
build-apk.bat

REM Gerar APK release
build-apk.bat release

REM Listar dispositivos
adb devices

REM Instalar APK
adb install -r android\app\build\outputs\apk\debug\app-debug.apk

REM Ver logs
adb logcat

REM Desinstalar app
adb uninstall com.imperiumbikes.app

REM Limpar cache
cd android
gradlew.bat clean
cd ..
```

---

## 📊 Informações do Projeto

- **Nome:** Imperium Bikes
- **Package:** com.imperiumbikes.app
- **Android Min:** API 24 (Android 7.0)
- **Android Target:** API 36 (Android 15)
- **Backend:** https://imperium-bikes-backend.onrender.com

---

## ✅ Checklist

Antes de gerar o APK:

- [ ] Node.js está instalado (`node -v` funciona)
- [ ] Java está instalado (`java -version` funciona)
- [ ] Android Studio com SDK está instalado
- [ ] APIs 24 e 36 estão instaladas no SDK Manager
- [ ] Arquivo `.env` existe e tem URL do backend
- [ ] Você rodou `check-environment.bat` com sucesso

---

## 📝 Arquivos do Projeto

- `build-apk.bat` → Script para gerar APK (USAR ESTE)
- `check-environment.bat` → Script para verificar ambiente
- `GUIA_APK.md` → Guia completo e detalhado
- `.env` → Configurações (backend URL)
- `capacitor.config.json` → Config do Capacitor

---

## 🎬 Exemplo Prático

```cmd
REM 1. Verificar tudo está OK
check-environment.bat

REM 2. Gerar APK (vai levar tempo na primeira vez)
build-apk.bat

REM 3. Se tiver emulador aberto, instalar:
adb install -r android\app\build\outputs\apk\debug\app-debug.apk

REM 4. Ver se instalou corretamente
adb shell pm list packages | findstr bikes

REM 5. Ver logs enquanto usa
adb logcat
```

---

## 💡 Dicas

- 🔄 Primeira build demora bastante (30-60 min) - é normal
- 📚 Leia `GUIA_APK.md` para guia completo
- 🆘 Qualquer erro, limpe cache: `cd android && gradlew.bat clean && cd ..`
- 📞 Se travar, pode interromper (Ctrl+C) e reintentar
- 🌐 Backend já está configurado: `https://imperium-bikes-backend.onrender.com`

---

**Está tudo pronto! Execute `build-apk.bat` para começar! 🚀**

