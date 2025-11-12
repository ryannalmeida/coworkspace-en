# Guia de Deploy - GitHub Pages

## ✅ Configuração Necessária no GitHub

### Passo 1: Configurar GitHub Pages
1. Acesse: https://github.com/ryannalmeida/coworkspace-en/settings/pages
2. Em **"Source"**, selecione **"GitHub Actions"** (NÃO selecione "Deploy from a branch")
3. Clique em **"Save"**

### Passo 2: Verificar o Workflow
1. Acesse: https://github.com/ryannalmeida/coworkspace-en/actions
2. Verifique se o workflow **"Deploy to GitHub Pages"** está rodando
3. Aguarde até que apareça um ✅ verde indicando sucesso

### Passo 3: Aguardar o Deploy
- O deploy pode levar 2-5 minutos após o push
- Após o workflow completar, aguarde mais 1-2 minutos para o GitHub Pages atualizar

## 🔍 Verificações

### Se ainda não funcionar:

1. **Verifique os logs do workflow:**
   - Vá em Actions → Clique no workflow mais recente
   - Veja se há algum erro nos logs

2. **Verifique o console do navegador:**
   - Abra o DevTools (F12)
   - Vá na aba Console
   - Veja se há erros de carregamento de arquivos

3. **Limpe o cache:**
   - Pressione Ctrl+Shift+R (ou Cmd+Shift+R no Mac) para forçar reload

## 📝 Notas Importantes

- O site está configurado para funcionar em: `https://ryannalmeida.github.io/coworkspace-en/`
- Todos os caminhos estão configurados com o base path `/coworkspace-en/`
- O React Router está configurado com `basename="/coworkspace-en"`

