/* Lógica do site — normalmente você NÃO precisa mexer aqui. */

const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const params = new URLSearchParams(location.search);
const semAcento = s => String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const regioesDo = uf => REGIOES[uf] || REGIOES_PADRAO;
const estadoPor = uf => ESTADOS.find(e => e.uf === uf);

/* ---------- Banner ---------- */
function banner(pos) {
  const b = BANNERS[pos] || {};
  if (b.img) {
    return `<a class="banner banner-${pos}" href="${esc(b.link || "#")}" target="_blank" rel="sponsored noopener">
      <img src="${esc(b.img)}" alt="${esc(b.alt || "Publicidade")}" loading="lazy"></a>`;
  }
  return `<a class="banner banner-${pos} vazio" href="${esc(CONFIG.contatoAnuncio)}" target="_blank" rel="noopener">
    <span>📢 Anuncie aqui</span><small>${esc(BANNER_TAMANHOS[pos])} px</small></a>`;
}

/* ---------- Layout comum ---------- */
function layout(titulo) {
  document.title = titulo ? `${titulo} | ${CONFIG.nomeSite}` : CONFIG.nomeSite;
  $("#topo").innerHTML = `
    <header class="header">
      <a class="logo" href="index.html"><span class="cruz">✝</span> ${esc(CONFIG.nomeSite)}</a>
      <nav><a href="index.html">Estados</a><a href="${esc(CONFIG.contatoCorrecao)}" target="_blank" rel="noopener">Cadastrar igreja</a></nav>
    </header>
    <div class="wrap">${banner("topo")}</div>`;
  $("#rodape").innerHTML = `
    <div class="wrap">${banner("rodape")}</div>
    <footer class="footer">
      <p><strong>${esc(CONFIG.nomeSite)}</strong> — ${esc(CONFIG.slogan)}.</p>
      <p>Horários podem mudar. Confirme com a paróquia/igreja antes de ir.</p>
      <p><a href="${esc(CONFIG.contatoAnuncio)}" target="_blank" rel="noopener">Anuncie</a> ·
         <a href="mailto:${esc(CONFIG.email)}">${esc(CONFIG.email)}</a></p>
    </footer>`;
}

/* ---------- Página inicial: estados ---------- */
function paginaInicio() {
  layout("");
  const macros = ["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"];
  const contagem = uf => IGREJAS.filter(i => i.uf === uf).length;
  $("#app").innerHTML = `
    <section class="hero">
      <h1>Encontre igrejas em todo o Brasil</h1>
      <p>${esc(CONFIG.slogan)}. Escolha seu estado:</p>
    </section>
    <div class="wrap">
      ${macros.map(m => `
        <h2 class="macro">${m}</h2>
        <div class="grid-estados">
          ${ESTADOS.filter(e => e.macro === m).map(e => `
            <a class="card-estado" href="estado.html?uf=${e.uf}">
              <span class="uf">${e.uf}</span>
              <span class="nome">${esc(e.nome)}</span>
              <small>${contagem(e.uf)} ${contagem(e.uf) === 1 ? "igreja" : "igrejas"}</small>
            </a>`).join("")}
        </div>`).join("")}
    </div>`;
}

/* ---------- Página do estado: filtros + lista ---------- */
function paginaEstado() {
  const uf = (params.get("uf") || "").toUpperCase();
  const est = estadoPor(uf);
  if (!est) { location.replace("index.html"); return; }
  layout(est.nome);

  const doEstado = IGREJAS.filter(i => i.uf === uf);
  const dioceses = [...new Set(doEstado.map(i => i.diocese).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR"));
  const estado = { regiao: params.get("regiao") || "", diocese: params.get("diocese") || "", q: params.get("q") || "" };

  $("#app").innerHTML = `
    <section class="hero pequeno">
      <div class="wrap">
        <p class="migalha"><a href="index.html">Início</a> › ${esc(est.nome)}</p>
        <h1>Igrejas em ${esc(est.nome)}</h1>
      </div>
    </section>
    <div class="wrap">
      <div class="filtros">
        <input id="busca" type="search" placeholder="Buscar por nome, cidade ou bairro..." value="${esc(estado.q)}">
        <select id="sel-diocese" aria-label="Diocese">
          <option value="">Todas as dioceses</option>
          ${dioceses.map(d => `<option ${d === estado.diocese ? "selected" : ""}>${esc(d)}</option>`).join("")}
        </select>
      </div>
      <div class="chips" id="chips"></div>
      <p class="contagem" id="contagem"></p>
      <div id="lista"></div>
    </div>`;

  function chips() {
    const regs = regioesDo(uf);
    const todos = [["", "Todas as regiões"], ...regs.map(r => [r, r])];
    $("#chips").innerHTML = todos.map(([v, t]) =>
      `<button class="chip ${estado.regiao === v ? "ativo" : ""}" data-v="${esc(v)}">${esc(t)}</button>`).join("");
    document.querySelectorAll(".chip").forEach(b => b.onclick = () => { estado.regiao = b.dataset.v; desenhar(); });
  }

  function desenhar() {
    chips();
    const q = semAcento(estado.q);
    let lista = doEstado.filter(i =>
      (!estado.regiao || i.regiao === estado.regiao) &&
      (!estado.diocese || i.diocese === estado.diocese) &&
      (!q || semAcento([i.nome, i.cidade, i.bairro, i.endereco].join(" ")).includes(q)));
    lista.sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0) || a.cidade.localeCompare(b.cidade, "pt-BR") || a.nome.localeCompare(b.nome, "pt-BR"));

    $("#contagem").textContent = `${lista.length} ${lista.length === 1 ? "igreja encontrada" : "igrejas encontradas"}`;
    $("#lista").innerHTML = lista.length ? lista.map((i, n) => `
      ${n > 0 && n % 4 === 0 ? banner("lista") : ""}
      <a class="card-igreja ${i.destaque ? "destaque" : ""}" href="igreja.html?id=${encodeURIComponent(i.id)}">
        <div class="foto">${i.foto ? `<img src="${esc(i.foto)}" alt="" loading="lazy">` : "⛪"}</div>
        <div class="info">
          ${i.destaque ? `<span class="selo">Destaque</span>` : ""}
          <h3>${esc(i.nome)}</h3>
          <p class="local">📍 ${esc(i.bairro)} · ${esc(i.cidade)}/${esc(i.uf)}</p>
          <p class="dio">${esc(i.diocese || "")}</p>
          <p class="prox">🕒 ${esc(resumoHorario(i))}</p>
        </div>
      </a>`).join("") + (lista.length < 4 ? banner("lista") : "")
      : `<div class="vazio-msg">Nenhuma igreja encontrada com esses filtros.<br>
         <a href="${esc(CONFIG.contatoCorrecao)}" target="_blank" rel="noopener">Sugira uma igreja</a></div>${banner("lista")}`;

    const p = new URLSearchParams();
    p.set("uf", uf);
    if (estado.regiao) p.set("regiao", estado.regiao);
    if (estado.diocese) p.set("diocese", estado.diocese);
    if (estado.q) p.set("q", estado.q);
    history.replaceState(null, "", "?" + p.toString());
  }

  $("#busca").oninput = e => { estado.q = e.target.value; desenhar(); };
  $("#sel-diocese").onchange = e => { estado.diocese = e.target.value; desenhar(); };
  desenhar();
}

function resumoHorario(i) {
  const h = (i.horarios || [])[0];
  if (!h) return "Horários a confirmar";
  return `${h.dia}: ${h.horas.join(", ")}`;
}

/* ---------- Página da igreja ---------- */
function paginaIgreja() {
  const i = IGREJAS.find(x => x.id === params.get("id"));
  if (!i) { layout("Não encontrada"); $("#app").innerHTML = `<div class="wrap vazio-msg">Igreja não encontrada. <a href="index.html">Voltar ao início</a></div>`; return; }
  layout(i.nome);
  const est = estadoPor(i.uf);
  const mapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(i.endereco || `${i.nome} ${i.cidade} ${i.uf}`)}`;
  const zap = `https://wa.me/?text=${encodeURIComponent(`${i.nome} — horários: ${location.href}`)}`;
  const tabela = (titulo, linhas) => !linhas || !linhas.length ? "" : `
    <h2>${titulo}</h2>
    <table class="horarios">${linhas.map(l => `<tr><th>${esc(l.dia)}</th><td>${l.horas.map(h => `<span class="hora">${esc(h)}</span>`).join("")}</td></tr>`).join("")}</table>`;

  $("#app").innerHTML = `
    <div class="wrap">
      <p class="migalha"><a href="index.html">Início</a> › <a href="estado.html?uf=${i.uf}">${esc(est ? est.nome : i.uf)}</a> › ${esc(i.nome)}</p>
      <div class="detalhe">
        <article>
          <div class="capa">${i.foto ? `<img src="${esc(i.foto)}" alt="${esc(i.nome)}">` : "⛪"}</div>
          <h1>${esc(i.nome)}</h1>
          <p class="dio">${esc([i.denominacao, i.diocese].filter(Boolean).join(" · "))}</p>
          <ul class="dados">
            <li>📍 ${esc(i.endereco || `${i.bairro}, ${i.cidade}/${i.uf}`)}</li>
            ${i.telefone ? `<li>📞 <a href="tel:${esc(i.telefone.replace(/\D/g, ""))}">${esc(i.telefone)}</a></li>` : ""}
            ${i.site ? `<li>🌐 <a href="${esc(i.site)}" target="_blank" rel="noopener">${esc(i.site)}</a></li>` : ""}
            ${i.instagram ? `<li>📷 <a href="${esc(i.instagram)}" target="_blank" rel="noopener">Instagram</a></li>` : ""}
          </ul>
          <div class="acoes">
            <a class="btn" href="${mapa}" target="_blank" rel="noopener">🗺️ Como chegar</a>
            <a class="btn sec" href="${zap}" target="_blank" rel="noopener">Compartilhar no WhatsApp</a>
          </div>
          ${tabela("Horários de missas / cultos", i.horarios)}
          ${tabela("Confissões / atendimento", i.confissoes)}
          <p class="aviso">Horários podem mudar em feriados e datas especiais. Confirme com a igreja.
            <a href="${esc(CONFIG.contatoCorrecao)}" target="_blank" rel="noopener">Informar correção</a></p>
        </article>
        <aside>${banner("lateral")}</aside>
      </div>
    </div>`;
}

/* ---------- Roteador ---------- */
const pagina = document.body.dataset.page;
if (pagina === "inicio") paginaInicio();
else if (pagina === "estado") paginaEstado();
else if (pagina === "igreja") paginaIgreja();
