/* ==========================================================
   DADOS DO SITE — é aqui que você cadastra tudo.
   Não precisa de banco de dados: edite este arquivo e faça
   commit no GitHub. O site atualiza sozinho.
   ========================================================== */

const CONFIG = {
  nomeSite: "Guia de Igrejas",
  slogan: "Encontre uma igreja, horários de missas e cultos perto de você",
  // Para onde vai quem clicar em "Anuncie aqui" (WhatsApp ou e-mail):
  contatoAnuncio: "https://wa.me/5511999999999?text=Quero%20anunciar%20no%20Guia%20de%20Igrejas",
  contatoCorrecao: "https://wa.me/5511999999999?text=Quero%20sugerir%20uma%20igreja%20ou%20corre%C3%A7%C3%A3o",
  email: "contato@seusite.com.br"
};

/* ---------- Estados ---------- */
const ESTADOS = [
  { uf: "AC", nome: "Acre", macro: "Norte" },
  { uf: "AP", nome: "Amapá", macro: "Norte" },
  { uf: "AM", nome: "Amazonas", macro: "Norte" },
  { uf: "PA", nome: "Pará", macro: "Norte" },
  { uf: "RO", nome: "Rondônia", macro: "Norte" },
  { uf: "RR", nome: "Roraima", macro: "Norte" },
  { uf: "TO", nome: "Tocantins", macro: "Norte" },
  { uf: "AL", nome: "Alagoas", macro: "Nordeste" },
  { uf: "BA", nome: "Bahia", macro: "Nordeste" },
  { uf: "CE", nome: "Ceará", macro: "Nordeste" },
  { uf: "MA", nome: "Maranhão", macro: "Nordeste" },
  { uf: "PB", nome: "Paraíba", macro: "Nordeste" },
  { uf: "PE", nome: "Pernambuco", macro: "Nordeste" },
  { uf: "PI", nome: "Piauí", macro: "Nordeste" },
  { uf: "RN", nome: "Rio Grande do Norte", macro: "Nordeste" },
  { uf: "SE", nome: "Sergipe", macro: "Nordeste" },
  { uf: "DF", nome: "Distrito Federal", macro: "Centro-Oeste" },
  { uf: "GO", nome: "Goiás", macro: "Centro-Oeste" },
  { uf: "MT", nome: "Mato Grosso", macro: "Centro-Oeste" },
  { uf: "MS", nome: "Mato Grosso do Sul", macro: "Centro-Oeste" },
  { uf: "ES", nome: "Espírito Santo", macro: "Sudeste" },
  { uf: "MG", nome: "Minas Gerais", macro: "Sudeste" },
  { uf: "RJ", nome: "Rio de Janeiro", macro: "Sudeste" },
  { uf: "SP", nome: "São Paulo", macro: "Sudeste" },
  { uf: "PR", nome: "Paraná", macro: "Sul" },
  { uf: "RS", nome: "Rio Grande do Sul", macro: "Sul" },
  { uf: "SC", nome: "Santa Catarina", macro: "Sul" }
];

/* ---------- Regiões dentro de cada estado ----------
   Estados que não estiverem aqui usam REGIOES_PADRAO.
   Ao cadastrar uma igreja, o campo "regiao" deve ser
   exatamente um dos nomes abaixo. */
const REGIOES_PADRAO = ["Capital", "Grande Capital", "Interior", "Litoral"];

const REGIOES = {
  SP: ["Capital - Zona Norte", "Capital - Zona Sul", "Capital - Zona Leste", "Capital - Zona Oeste", "Capital - Centro",
       "Grande São Paulo", "Alto Tietê", "ABC", "Interior", "Litoral", "Vale do Paraíba"],
  RJ: ["Capital - Zona Norte", "Capital - Zona Sul", "Capital - Centro", "Capital - Zona Oeste",
       "Baixada Fluminense", "Niterói e São Gonçalo", "Região Serrana", "Região dos Lagos", "Interior"],
  MG: ["Belo Horizonte", "Grande BH", "Triângulo Mineiro", "Sul de Minas", "Zona da Mata", "Norte de Minas", "Interior"]
};

/* ---------- Banners (espaços de venda) ----------
   Posições disponíveis:
     topo    -> faixa larga no topo de todas as páginas   (728x90)
     lista   -> aparece no meio da lista de igrejas        (728x90)
     lateral -> ao lado das informações da igreja          (300x250)
     rodape  -> faixa antes do rodapé                      (728x90)
   Para ativar um banner, preencha img e link. Exemplo:
     topo: { img: "banners/padaria.jpg", link: "https://...", alt: "Padaria São José" }
   Deixe {} para mostrar o convite "Anuncie aqui".          */
const BANNER_TAMANHOS = { topo: "728 x 90", lista: "728 x 90", lateral: "300 x 250", rodape: "728 x 90" };
const BANNERS = {
  topo: {},
  lista: {},
  lateral: {},
  rodape: {}
};

/* ---------- Igrejas ----------
   ATENÇÃO: os registros abaixo são EXEMPLOS fictícios para
   você ver o site funcionando. Substitua pelos dados reais.

   Campos:
     id        único, sem espaços (ex.: "sp-sao-jose-mooca")
     nome, uf, cidade, bairro
     regiao    um nome da lista REGIOES do estado
     diocese   ex.: "Arquidiocese de São Paulo"
     denominacao  (opcional) ex.: "Católica"
     endereco, telefone, site, instagram, foto (opcionais)
     horarios  lista de { dia, horas: [...] }   dia = "Domingo", "Segunda a sexta"...
     confissoes (opcional) mesma estrutura
     destaque  true = aparece primeiro na lista (bom para vender)
*/
const IGREJAS = [
  {
    id: "sp-exemplo-matriz-centro",
    nome: "Paróquia Exemplo — Matriz Central",
    uf: "SP", cidade: "São Paulo", bairro: "Sé", regiao: "Capital - Centro",
    diocese: "Arquidiocese de São Paulo", denominacao: "Católica",
    endereco: "Praça Exemplo, 100 - Sé, São Paulo - SP",
    telefone: "(11) 3000-0000", site: "", instagram: "",
    horarios: [
      { dia: "Segunda a sexta", horas: ["07h", "12h", "18h30"] },
      { dia: "Sábado", horas: ["07h", "18h"] },
      { dia: "Domingo", horas: ["08h", "10h", "12h", "19h"] }
    ],
    confissoes: [{ dia: "Terça a sexta", horas: ["17h às 18h"] }],
    destaque: true
  },
  {
    id: "sp-exemplo-sao-jose-mooca",
    nome: "Paróquia São José (exemplo)",
    uf: "SP", cidade: "São Paulo", bairro: "Mooca", regiao: "Capital - Zona Leste",
    diocese: "Arquidiocese de São Paulo", denominacao: "Católica",
    endereco: "Rua Exemplo, 250 - Mooca, São Paulo - SP",
    telefone: "(11) 3000-1111", site: "", instagram: "",
    horarios: [
      { dia: "Quarta", horas: ["19h30"] },
      { dia: "Sábado", horas: ["19h"] },
      { dia: "Domingo", horas: ["09h", "11h", "19h"] }
    ],
    confissoes: [{ dia: "Sábado", horas: ["16h às 18h"] }]
  },
  {
    id: "sp-exemplo-santo-andre",
    nome: "Paróquia Nossa Senhora (exemplo)",
    uf: "SP", cidade: "Santo André", bairro: "Centro", regiao: "ABC",
    diocese: "Diocese de Santo André", denominacao: "Católica",
    endereco: "Av. Exemplo, 500 - Centro, Santo André - SP",
    telefone: "(11) 4000-0000", site: "", instagram: "",
    horarios: [
      { dia: "Segunda a sexta", horas: ["19h"] },
      { dia: "Domingo", horas: ["08h", "10h", "18h"] }
    ]
  },
  {
    id: "sp-exemplo-campinas",
    nome: "Catedral Exemplo de Campinas",
    uf: "SP", cidade: "Campinas", bairro: "Centro", regiao: "Interior",
    diocese: "Arquidiocese de Campinas", denominacao: "Católica",
    endereco: "Rua Exemplo, 10 - Centro, Campinas - SP",
    telefone: "(19) 3000-0000", site: "", instagram: "",
    horarios: [
      { dia: "Segunda a sábado", horas: ["07h", "12h"] },
      { dia: "Domingo", horas: ["08h", "10h", "18h", "20h"] }
    ]
  },
  {
    id: "rj-exemplo-copacabana",
    nome: "Paróquia Exemplo de Copacabana",
    uf: "RJ", cidade: "Rio de Janeiro", bairro: "Copacabana", regiao: "Capital - Zona Sul",
    diocese: "Arquidiocese do Rio de Janeiro", denominacao: "Católica",
    endereco: "Rua Exemplo, 80 - Copacabana, Rio de Janeiro - RJ",
    telefone: "(21) 3000-0000", site: "", instagram: "",
    horarios: [
      { dia: "Segunda a sexta", horas: ["07h30", "18h"] },
      { dia: "Domingo", horas: ["09h", "11h", "19h"] }
    ]
  },
  {
    id: "mg-exemplo-bh",
    nome: "Paróquia Exemplo da Savassi",
    uf: "MG", cidade: "Belo Horizonte", bairro: "Savassi", regiao: "Belo Horizonte",
    diocese: "Arquidiocese de Belo Horizonte", denominacao: "Católica",
    endereco: "Rua Exemplo, 300 - Savassi, Belo Horizonte - MG",
    telefone: "(31) 3000-0000", site: "", instagram: "",
    horarios: [
      { dia: "Terça a sexta", horas: ["19h"] },
      { dia: "Domingo", horas: ["08h", "10h", "19h"] }
    ]
  }
];
