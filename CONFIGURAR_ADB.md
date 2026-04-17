# 🔧 CONFIGURAR ADB NO PATH

## ❌ ERRO QUE VOCÊ TEVE

```
adb : O termo 'adb' não é reconhecido como nome de cmdlet
```

**Causa:** ADB (Android Debug Bridge) não está no PATH do Windows.

---

## ✅ SOLUÇÃO

### Opção 1: Adicionar ao PATH (Permanente)

1. **Abra Variáveis de Ambiente:**
   - Windows + X
   - Clique em "System"
   - Clique em "Advanced system settings"
   - Clique em "Environment Variables"

2. **Adicione Android SDK tools ao PATH:**
   - Clique em "Path" → "Edit"
   - Clique em "New"
   - Adicione: `C:\Users\SEUNOME\AppData\Local\Android\Sdk\platform-tools`
   - (Substitua SEUNOME pelo seu usuário)
   - Clique OK em tudo
   - **Reinicie PowerShell**

3. **Teste:**
   ```powershell
   adb version
   # Deve funcionar agora!
   ```

### Opção 2: Configurar Temporariamente (Por Sessão)

Se não quer mexer em Variáveis de Ambiente:

```powershell
# Adicionar ao PATH da sessão atual
$env:Path += ";C:\Users\$env:USERNAME\AppData\Local\Android\Sdk\platform-tools"

# Testar
adb version

# Listar dispositivos
adb devices

# Instalar APK
adb install -r C:\Users\Lenovo\Desktop\imperium-bikes-frontend\android\app\build\outputs\apk\debug\app-debug.apk
```

### Opção 3: Usar Caminho Completo

Se não quer mexer em nada:

```powershell
# Instalar com caminho completo
& "C:\Users\$env:USERNAME\AppData\Local\Android\Sdk\platform-tools\adb.exe" install -r "C:\Users\Lenovo\Desktop\imperium-bikes-frontend\android\app\build\outputs\apk\debug\app-debug.apk"
```

---

## 🎯 RESUMO RÁPIDO

```powershell
# Se adb não funciona, execute isto:
$env:Path += ";C:\Users\$env:USERNAME\AppData\Local\Android\Sdk\platform-tools"

# Depois:
adb devices
adb install -r app-debug.apk
```

---

## ✅ CHECKLIST

- [ ] Você tem Android SDK instalado
- [ ] Você sabe seu username do Windows
- [ ] Você adicionou o PATH ou está usando Opção 2
- [ ] Você testou: `adb version`
- [ ] Você conectou celular/emulador
- [ ] Você executou: `adb devices`
- [ ] Você instalou: `adb install -r app.apk`

---

## 📁 PATH CORRETO

Você precisa deste caminho:
```
C:\Users\SEUNOME\AppData\Local\Android\Sdk\platform-tools
```

Para encontrar:
1. Abra Android Studio
2. File → Settings → SDK Manager
3. Procure "SDK Path"
4. Copie o caminho
5. Adicione `\platform-tools` no final

---

## 🚀 AGORA

Escolha uma opção acima e execute!

Após configurar adb, você pode instalar o APK:

```powershell
adb devices          # Ver dispositivos
adb install -r app-debug.apk
```

---

**Próximo passo: Compile APK com `limpar-e-compilar.bat`, depois use ADB para instalar!** 🎉

