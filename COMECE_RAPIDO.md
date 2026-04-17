# ⚡ COMECE AGORA - APK Android em 3 Passos

## 🎯 Objetivo
Você vai ter um APK Android do seu app em poucos minutos!

---

## 📋 Pré-requisitos (Instale se não tiver)

### ✅ Obrigatório:
1. **Node.js** → https://nodejs.org/ (escolha LTS)
2. **Java JDK** → https://oracle.com/java/ (versão 17)
3. **Android Studio** → https://developer.android.com/studio (instale o SDK também)

### ✅ Verificar depois de instalar:
```cmd
node --version         REM Deve mostrar v18+ ou v20+
java -version          REM Deve mostrar Java 17+
```

---

## 🚀 Os 3 Passos

### PASSO 1: Verificar Ambiente ✓
```cmd
check-environment.bat
```

**Resultado esperado:** Todos com ✓ (verde)

Se tiver ✗ (vermelho), instale a ferramenta indicada.

---

### PASSO 2: Gerar APK ✓
```cmd
build-apk.bat
```

**O que vai acontecer:**
1. Instalar dependências Node.js (npm install)
2. Compilar React (npm run build)
3. Sincronizar com Capacitor
4. Compilar APK com Gradle

**Tempo:** 20-60 minutos na primeira vez
(Próximas vezes: 5-10 minutos)

**Resultado final:**
```
APK gerado: android\app\build\outputs\apk\debug\app-debug.apk
```

---

### PASSO 3: Instalar e Testar ✓
```cmd
adb install -r android\app\build\outputs\apk\debug\app-debug.apk
```

**Requisito:** Ter emulador aberto OU celular conectado via USB

**Para emulador:**
1. Abra Android Studio
2. Clique "Device Manager"
3. Crie/inicie um emulador
4. Execute o comando acima

**Para celular USB:**
1. Conecte via USB
2. Ative "Modo de Desenvolvedor"
3. Ative "Depuração USB"
4. Execute o comando acima

---

## ✨ Pronto!

Quando terminar, o app estará instalado. É só abrir!

---

## 📱 Backend

Já está configurado em `.env`:
```
https://imperium-bikes-backend.onrender.com
```

Não precisa mudar nada.

---

## 🐛 Deu Erro?

### Erro durante `build-apk.bat`:
```cmd
cd android
gradlew.bat clean
cd ..
build-apk.bat
```

### APK não instala:
```cmd
adb uninstall com.imperiumbikes.app
adb install -r android\app\build\outputs\apk\debug\app-debug.apk
```

### Outros erros:
Leia: `TROUBLESHOOTING.md`

---

## 📚 Quer Mais Informações?

- `GUIA_RAPIDO_APK.md` - Guia completo
- `GUIA_APK.md` - Detalhes técnicos
- `TROUBLESHOOTING.md` - Solução de problemas

---

## 🎉 Resumo

```
1. check-environment.bat      (Verificar)
   ↓
2. build-apk.bat             (Compilar - espere!)
   ↓
3. adb install -r app.apk    (Instalar)
   ↓
✅ PRONTO!
```

---

**Comece agora:**
```cmd
check-environment.bat
```

Boa sorte! 🚀

