# Guia de Igrejas

Site estático (HTML + CSS + JavaScript) para encontrar igrejas por **estado → região → diocese**,
com página de detalhes (horários, endereço, mapa) e **espaços para banners**.
Funciona 100% de graça no GitHub Pages.

## 1. Publicar no GitHub (grátis)

1. Crie uma conta em github.com e clique em **New repository**. Nome sugerido: `guia-de-igrejas`. Deixe **Public**.
2. Clique em **uploading an existing file** e envie todos os arquivos desta pasta
   (`index.html`, `estado.html`, `igreja.html`, `style.css`, `app.js`, `dados.js`, `README.md`).
3. Vá em **Settings → Pages**. Em *Source* escolha **Deploy from a branch**, branch **main**, pasta **/ (root)**, e salve.
4. Em ~1 minuto o site estará em `https://SEU-USUARIO.github.io/guia-de-igrejas/`.
5. (Opcional) Domínio próprio (.com.br, ~R$40/ano): em *Settings → Pages → Custom domain*.

## 2. Cadastrar igrejas

Tudo fica em **`dados.js`**, na lista `IGREJAS`. Copie um bloco existente, troque os dados e salve (commit).
- `regiao` deve ser igual a um nome da lista `REGIOES` do estado.
- `diocese` aparece automaticamente no filtro do estado.
- `destaque: true` coloca a igreja no topo com selo dourado (ótimo para vender).
- As igrejas atuais são **exemplos fictícios**; apague-as ao cadastrar as reais.

Para muitas igrejas (centenas), o ideal é mover os dados para uma planilha/JSON gerado por script — posso ajudar nessa etapa.

## 3. Vender banners

Posições: `topo` (728x90), `lista` (728x90), `lateral` (300x250, página da igreja), `rodape` (728x90).
1. Coloque a imagem do anunciante numa pasta `banners/`.
2. Em `dados.js`, na lista `BANNERS`, preencha, por exemplo:
   `topo: { img: "banners/padaria.jpg", link: "https://...", alt: "Padaria São José" }`
3. Enquanto vazio, o site mostra "Anuncie aqui" levando ao seu WhatsApp (edite `CONFIG.contatoAnuncio`).

Ideias de venda: banner fixo mensal por estado, destaque de igreja, pacote de banners para lojas católicas/evangélicas,
gráficas, buffets, livrarias, fotógrafos de eventos.

## 4. Ajustes iniciais

Em `dados.js`, no `CONFIG`: troque o nome do site, o número de WhatsApp e o e-mail.

## 5. Próximos passos (quando crescer)

- Sitemap e SEO por página (importante para aparecer no Google).
- Google Analytics para provar audiência aos anunciantes.
- Formulário de cadastro de igrejas (Google Forms ou Formspree, gratuitos).
- Geração automática das páginas estáticas para o Google indexar cada igreja.
