# GUIA COMPLETO: Compilação de APK - Imperium Bikes Frontend

## 📋 Índice
1. [Pré-requisitos](#pré-requisitos)
2. [Instalação de Ferramentas](#instalação-de-ferramentas)
3. [Configuração do Projeto](#configuração-do-projeto)
4. [Compilação do APK](#compilação-do-apk)
5. [Solução de Problemas](#solução-de-problemas)

---

## 🔧 Pré-requisitos

Seu sistema precisa ter:
- Windows 10 ou superior
- Pelo menos 10 GB de espaço em disco
- 8 GB de RAM (16 GB recomendado)
- Conexão com internet

### Ferramentas Necessárias

#### 1. Node.js e npm
- **Link:** https://nodejs.org/
- **Versão mínima:** Node.js 16.x e npm 8.x
- **Verificar instalação:**
  ```powershell
  node --version
  npm --version
  ```

#### 2. Java Development Kit (JDK)
- **Link:** https://www.oracle.com/java/technologies/downloads/#java17
- **Versão recomendada:** JDK 17 ou superior
- **Verificar instalação:**
  ```powershell
  java -version
  ```

#### 3. Android Studio (com Android SDK)
- **Link:** https://developer.android.com/studio
- **Tamanho:** ~900 MB + Android SDK (~10 GB)
- **Ao instalar, certifique-se de instalar:**
  - Android SDK Platform 36 (targetSdk)
  - Android SDK Platform Tools
  - Google Play Services
  - Android Emulator (opcional, para testes)

#### 4. Android SDK Manager
Após instalar Android Studio, configure o SDK:
1. Abra Android Studio
2. Menu: File → Settings → SDK Manager
3. Instale:
   - Android API 36 (compileSdkVersion = 36)
   - Android API 24 (minSdkVersion = 24)
   - Build Tools 36.x
   - Android Emulator (opcional)

#### 5. Variáveis de Ambiente
Configure no Windows:

**JAVA_HOME:**
```
C:\Program Files\Java\jdk-17
```

**ANDROID_HOME (ou ANDROID_SDK_ROOT):**
```
C:\Users\[SEU_USUARIO]\AppData\Local\Android\Sdk
```

**PATH:** Adicione:
```
C:\Program Files\Java\jdk-17\bin
C:\Users\[SEU_USUARIO]\AppData\Local\Android\Sdk\platform-tools
C:\Users\[SEU_USUARIO]\AppData\Local\Android\Sdk\tools
```

**Para verificar:**
```powershell
$env:JAVA_HOME
$env:ANDROID_HOME
adb version  # Deve funcionar
```

---

## 📦 Instalação de Ferramentas

### Método 1: Instalação Manual (Recomendado)

1. **Instalar Node.js:**
   - Acesse https://nodejs.org/
   - Baixe LTS (versão 20.x)
   - Execute o instalador
   - Siga as instruções (padrão OK)
   - Reinicie PowerShell para atualizar PATH

2. **Instalar Java JDK:**
   - Acesse https://www.oracle.com/java/technologies/downloads/
   - Baixe JDK 17 (Windows x64)
   - Execute o instalador
   - Anote o caminho de instalação
   - Configure JAVA_HOME (veja acima)

3. **Instalar Android Studio:**
   - Acesse https://developer.android.com/studio
   - Baixe para Windows
   - Execute o instalador
   - Siga o "Setup Wizard"
   - Instale Android SDK quando solicitado
   - Abra Android Studio e execute SDK Manager
   - Instale as versões de SDK necessárias

### Método 2: Instalação via Chocolatey (Alternativa)

Se tem Chocolatey instalado:
```powershell
choco install nodejs jdk17 android-sdk -y
```

---

## ⚙️ Configuração do Projeto

### 1. Clonar/Abrir o Projeto
```powershell
cd C:\Users\Lenovo\Desktop\imperium-bikes-frontend
```

### 2. Verificar Configurações

**Arquivo: `.env`**
Deve conter:
```
VITE_API_URL=https://imperium-bikes-backend.onrender.com
```

✅ Já está configurado! Não precisa alterar.

### 3. Instalar Dependências
```powershell
npm install
```

Esta etapa baixa todas as dependências (React, Vite, Capacitor, etc).
Pode levar 5-10 minutos na primeira vez.

### 4. Verificar Estrutura
```
imperium-bikes-frontend/
├── src/                  # Código React
├── dist/                 # Build web (gerado por npm run build)
├── android/             # Projeto Android nativo
│   ├── app/
│   │   └── build.gradle
│   └── gradlew.bat
├── package.json         # Dependências Node.js
├── capacitor.config.json # Config Capacitor
└── .env                 # Variáveis de ambiente
```

---

## 🚀 Compilação do APK

### Opção 1: Usar Script Automatizado (RECOMENDADO)

#### Verificar Ambiente:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\check-environment.ps1
```

Isso verifica se todas as ferramentas estão instaladas corretamente.

#### Build Debug (Para testes):
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\build-apk.ps1 -BuildType debug
```

Este script automaticamente:
1. ✓ Verifica ambiente
2. ✓ Instala dependências npm
3. ✓ Compila React (Vite build)
4. ✓ Sincroniza Capacitor
5. ✓ Cria certificado debug
6. ✓ Compila APK com Gradle

**Resultado:** `android/app/build/outputs/apk/debug/app-debug.apk`

#### Build Release (Para produção):
```powershell
.\build-apk.ps1 -BuildType release
```

Nota: Para release, você precisa de um keystore próprio.

### Opção 2: Manual - Passo a Passo

#### Passo 1: Instalar dependências npm
```powershell
npm install
```

#### Passo 2: Compilar React para web
```powershell
npm run build
```

Gera: `dist/` com a aplicação compilada

#### Passo 3: Sincronizar com Capacitor
```powershell
npx cap sync android
```

Copia os arquivos `dist/` para Android

#### Passo 4: Compilar APK
```powershell
cd android
.\gradlew.bat assembleDebug
```

Gera: `app/build/outputs/apk/debug/app-debug.apk`

---

## 📲 Testar o APK

### Com Emulador Android:

1. **Abrir Android Studio**
2. **Menu: Tools → Device Manager**
3. **Criar emulador (se não tiver)**
4. **Iniciar emulador**
5. **Instalar APK:**
   ```powershell
   adb install -r android\app\build\outputs\apk\debug\app-debug.apk
   ```

### Com Dispositivo Físico:

1. **Conectar via USB ao computador**
2. **Ativar "Modo de Desenvolvedor":**
   - Configurações → Sobre → Número da Build → Clicar 7x
3. **Ativar "Depuração USB"**
4. **Permitir depuração no dispositivo**
5. **Verificar conexão:**
   ```powershell
   adb devices
   ```
6. **Instalar APK:**
   ```powershell
   adb install -r android\app\build\outputs\apk\debug\app-debug.apk
   ```

### Ver Logs:
```powershell
adb logcat
```

### Desinstalar:
```powershell
adb uninstall com.imperiumbikes.app
```

---

## 🐛 Solução de Problemas

### Problema: "Node.js não encontrado"
**Solução:**
```powershell
$env:Path  # Verificar se tem C:\Program Files\nodejs\
# Se não tiver, instale Node.js novamente
# Ou feche e abra PowerShell novamente
```

### Problema: "Java não encontrado"
**Solução:**
```powershell
$env:JAVA_HOME  # Deve retornar o caminho do JDK
# Se vazio, configure em Variáveis de Ambiente
# Painel de Controle → Sistema → Variáveis de Ambiente
```

### Problema: "Android SDK não encontrado"
**Solução:**
1. Abra Android Studio
2. File → Settings → SDK Manager
3. Instale: API 36, API 24, Build Tools 36.x
4. Configure `ANDROID_HOME`:
   ```powershell
   [Environment]::SetEnvironmentVariable("ANDROID_HOME", "C:\Users\$env:USERNAME\AppData\Local\Android\Sdk", "User")
   ```

### Problema: "Gradle build falhou"
**Solução:**
```powershell
cd android
.\gradlew.bat clean
.\gradlew.bat assembleDebug
```

### Problema: "Erro de certificado (SSL/TLS)"
**Solução:** Verificar conexão com backend:
```powershell
# Testar conectividade
Invoke-WebRequest -Uri "https://imperium-bikes-backend.onrender.com" -UseBasicParsing
```

### Problema: "APK não instala no dispositivo"
**Solução:**
```powershell
# Desinstalar versão antiga
adb uninstall com.imperiumbikes.app

# Instalar nova
adb install -r app-debug.apk

# Se erro de espaço, usar -d flag
adb install -r -d app-debug.apk
```

### Problema: Demora muito para compilar
**Solução:**
- Primeira build é sempre mais lenta (download de dependências)
- Builds subsequentes são mais rápidas
- Se travado, pode interromper (Ctrl+C) e reintentar
- Aumentar memória do Gradle em `android/gradle.properties`:
  ```properties
  org.gradle.jvmargs=-Xmx2048m
  ```

---

## 📊 Informações do Projeto

**Nome:** Imperium Bikes Frontend
**Package:** com.imperiumbikes.app
**Versão:** 1.0
**Min SDK:** 24 (Android 7.0)
**Target SDK:** 36 (Android 15)
**Capacitor:** 8.3.1
**React:** 18.2.0

**Backend:** https://imperium-bikes-backend.onrender.com

---

## ✅ Checklist Final

Antes de gerar o APK definitivo:

- [ ] Node.js instalado e funcionando
- [ ] Java JDK instalado e JAVA_HOME configurada
- [ ] Android Studio instalado com SDK
- [ ] Android SDK APIs 24 e 36 instaladas
- [ ] Arquivo `.env` com URL do backend
- [ ] `npm install` executado sem erros
- [ ] `npm run build` gera pasta `dist/`
- [ ] `npx cap sync android` sincroniza com sucesso
- [ ] Script `build-apk.ps1` executa sem erros
- [ ] APK gerado em `android/app/build/outputs/apk/debug/app-debug.apk`
- [ ] APK instala no emulador/dispositivo
- [ ] App abre sem travamentos
- [ ] Backend conecta corretamente

---

## 🚀 Comandos Rápidos

```powershell
# Verificar ambiente
.\check-environment.ps1

# Build debug (recomendado para testes)
.\build-apk.ps1 -BuildType debug

# Build release (produção)
.\build-apk.ps1 -BuildType release

# Instalar APK no dispositivo
adb install -r android\app\build\outputs\apk\debug\app-debug.apk

# Ver logs
adb logcat

# Limpar cache Gradle
cd android; .\gradlew.bat clean; cd ..

# Reinstalar dependências
rm -r node_modules package-lock.json
npm install
```

---

## 📞 Suporte

Se encontrar problemas:

1. Verificar logs completos:
   ```powershell
   cd android
   .\gradlew.bat assembleDebug --info
   ```

2. Limpar cache:
   ```powershell
   cd android
   .\gradlew.bat clean
   ```

3. Reinstalar dependências:
   ```powershell
   rm -r node_modules
   npm install
   ```

4. Sincronizar novamente:
   ```powershell
   npx cap sync android
   ```

---

**Última atualização:** 2025-04-17
**Versão:** 1.0

