# 🔧 TROUBLESHOOTING - Soluções de Problemas

## 🆘 Problema: NPM Install Falha

### Erro Típico:
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

### Soluções:

**Solução 1 - Limpar Cache:**
```cmd
npm cache clean --force
npm install
```

**Solução 2 - Usar Flag --legacy-peer-deps:**
```cmd
npm install --legacy-peer-deps
```

**Solução 3 - Deletar node_modules e lock file:**
```cmd
rmdir /s /q node_modules
del package-lock.json
npm install
```

---

## 🆘 Problema: Node.js/Java Não Encontrado

### "node command not found" ou "node: The term 'node' is not recognized"

**Soluções:**

1. **Verificar se está instalado:**
   ```cmd
   node --version
   ```

2. **Se não funcionar, reinstale:**
   - Acesse https://nodejs.org/
   - Baixe versão LTS
   - Instale (usar padrão)
   - **Feche e abra novo Terminal/PowerShell**
   - Tente novamente

3. **Verificar PATH:**
   ```cmd
   where node
   REM Deve retornar: C:\Program Files\nodejs\node.exe
   ```

4. **Se onde não funciona:**
   ```powershell
   Get-Command node      # PowerShell
   ```

---

## 🆘 Problema: Android SDK Não Encontrado

### Erro:
```
Error: ANDROID_HOME not set or invalid
Error: Could not find Android SDK
```

### Soluções:

**Solução 1 - Configurar JAVA_HOME e ANDROID_HOME:**

Para Windows 10/11:
1. Pressione `Windows + X` → "System"
2. Clique "Advanced system settings"
3. Clique "Environment Variables"
4. Clique "New" e adicione:

```
Variable name: JAVA_HOME
Variable value: C:\Program Files\Java\jdk-17
```

```
Variable name: ANDROID_HOME
Variable value: C:\Users\[SEU_USUARIO]\AppData\Local\Android\Sdk
```

5. Clique OK em tudo
6. **Feche Terminal e abra novo**

**Solução 2 - Verificar instalação:**
```cmd
echo %JAVA_HOME%
echo %ANDROID_HOME%
adb version
```

**Solução 3 - Achar SDK:**
Se não sabe onde está:
1. Abra Android Studio
2. File → Settings → SDK Manager
3. Clique em "Android SDK"
4. Procure em "SDK Path" no topo
5. Copie o caminho
6. Configure como ANDROID_HOME

---

## 🆘 Problema: Gradle Build Falha

### Erro Típico:
```
FAILURE: Build failed with an exception
Could not find gradle
```

### Soluções:

**Solução 1 - Atualizar Gradle Wrapper:**
```cmd
cd android
gradlew.bat --version

REM Se error, atualizar:
gradlew.bat wrapper --gradle-version=8.13.0

cd ..
build-apk.bat
```

**Solução 2 - Limpar Cache Gradle:**
```cmd
cd android
gradlew.bat clean
gradlew.bat assembleDebug
cd ..
```

**Solução 3 - Aumentar Memória (se erro de OutOfMemory):**
```cmd
REM Editar: android/gradle.properties
REM Adicionar/atualizar:

org.gradle.jvmargs=-Xmx2048m

REM Tentar novamente:
cd android
gradlew.bat assembleDebug
cd ..
```

**Solução 4 - Verificar Java:**
```cmd
java -version        REM Deve ser 11+
javac -version       REM Deve funcionar
```

---

## 🆘 Problema: Certificado (Keystore) Não Encontrado

### Erro:
```
Error: Keystore file not found: debug.keystore
```

### Soluções:

**Solução 1 - Deixar o Script Criar (Recomendado):**
```cmd
REM Apenas execute o build normal
build-apk.bat
REM O script cria o debug keystore automaticamente
```

**Solução 2 - Verificar se Existe:**
```cmd
verificar-keystore.bat
```

**Solução 3 - Criar Manualmente:**
```cmd
cd android
keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Debug,OU=Android,O=Imperium,C=BR"
cd ..
```

---

## 🆘 Problema: Erro de Assinatura APK

### Erro:
```
Failed to read key from keystore
```

### Soluções:

**Para Debug:**
- Delete o keystore antigo: `del android\debug.keystore`
- Execute novamente: `build-apk.bat`

**Para Release:**
- Verifique se o keystore existe
- Verifique se a senha está correta
- Verifique se o alias está correto
- Configure corretamente no `android/app/build.gradle`

---

## 🆘 Problema: Keystore Release Perdido

### Situação:
```
Criei um keystore release mas perdi o arquivo/senha
```

### Soluções:

**Se perdeu arquivo:**
- ❌ **Não é possível recuperar**
- ✅ **Crie um novo keystore**
- ⚠️ **Mas não poderá atualizar apps existentes no Google Play**
- 📝 **Terá que publicar como app novo**

**Se perdeu senha:**
- ❌ **Não é possível recuperar**
- ✅ **Crie um novo keystore**
- ⚠️ **Mesmo problema: novo app no Google Play**

**Prevenção:**
```cmd
# Sempre faça backup do keystore
# Guarde senha em local seguro
# Nunca versione no Git
# Use gerenciador de senhas
```

---

## 🆘 Problema: Keystore Já Existe Mas Erro

### Erro:
```
Keystore was tampered with, or password was incorrect
```

### Soluções:

**Verificar Senha:**
```cmd
REM Para debug keystore:
keytool -list -v -keystore android\debug.keystore -storepass android
```

**Se senha errada:**
- Delete o arquivo: `del android\debug.keystore`
- Execute novamente: `build-apk.bat`

**Para keystore release:**
- Verifique a senha que você definiu
- Use o script: `verificar-keystore.bat`
````
