// greekalpha.bet — gera as páginas estáticas a partir do data.js.
//
//   node build.mjs
//
// Escreve, em inglês e em português:
//   /index.html e /pt/index.html                a tabela, já pronta no HTML
//   /<letra>/index.html e /pt/<letra>/index.html  uma página por letra
//   /sitemap.xml e /robots.txt
// Sem dependências: só o Node (18+). O HTML gerado vai para o repositório,
// porque o GitHub Pages serve os arquivos como estão, sem etapa de build.

import { createRequire } from "node:module";
import { mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const { data, uses, writing, confusables, namesPt, examples, MK, modern } = createRequire(import.meta.url)("./data.js");
const SITE = "https://greekalpha.bet";
const VERSION = "8"; // muda quando o CSS/JS mudam, para furar o cache

// 1st, 2nd, 3rd, 4th… 11th, 12th, 13th… 21st, 22nd.
const ordinal = n => {
  const v = n % 100;
  return n + (v >= 11 && v <= 13 ? "th" : ["th", "st", "nd", "rd"][n % 10] || "th");
};
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const nice = s => s[0] + s.slice(1).toLowerCase();

/* ------------------------------------------------------------------ textos */

const T = {
  en: {
    html: "en", og: "en_US", base: "/",
    homeTitle: "Greek Alphabet — Study & Memorize Greek Letters for STEM | greekalpha.bet",
    homeHeading: "Greek alphabet",
    homeDesc: "Interactive Greek alphabet study tool for STEM students — learn glyphs, pronunciations, LaTeX and common math/stat usages, and practice with a quiz.",
    chart: "Greek alphabet table",
    quiz: "Practice: quiz", theme: "Toggle theme", audio: "Play the alphabet pronunciation", print: "Print",
    language: "Language", close: "Close",
    modes: ["Glyph → name", "Name → glyph", "Look-alikes"], next: "Next",
    blocks: ["MATHEMATICS", "PROBABILITY", "STATISTICS"],
    noUse: "(no standard usage; it depends on the author's convention)",
    note: "Note: notations vary between books/fields; these are the most common usages.",
    howToWrite: "HOW TO WRITE IT — click to copy", lower: "lowercase", variant: "variant", upper: "uppercase",
    latinUpper: "same as the Latin letter: LaTeX has no command for it", copy: "Copy",
    dontConfuse: "DON'T CONFUSE IT",
    inFormulas: "IN FORMULAS", seeAt: "See it explained at morrisonkuhlsen.com →", listen: "Listen",
    pronunciation: "PRONUNCIATION", ancient: "Ancient Greek", modernGreek: "Modern Greek", sound: "sound", beforeEI: "before e/i",
    sheetSlug: "cheat-sheet/", sheetLink: "Cheat sheet (print / PDF)",
    sheetTitle: "Greek Alphabet Cheat Sheet — Letters, LaTeX and Uses in Statistics | greekalpha.bet",
    sheetHeading: "Greek alphabet cheat sheet",
    sheetDesc: "The 24 Greek letters on one printable page: glyph, name, LaTeX command, ancient and modern pronunciation, and the most common use in math and statistics.",
    sheetLede: "All 24 letters on one A4 page. Use the print button (or Ctrl+P) and choose “Save as PDF” to keep a copy.",
    sheetCols: ["Letter", "Name", "LaTeX", "Sound (ancient · modern)", "Usual meaning"],
    sheetPrint: "Print or save as PDF",
    all: "All letters", prev: "Previous", nextLetter: "Next",
    position: n => `The ${ordinal(n)} letter of the Greek alphabet.`,
    letterTitle: (name, gl) => `${name} (${gl}) — Greek letter in math and statistics | greekalpha.bet`,
    letterDesc: (name, gl, ipa, tex, use) => `${name} (${gl}): pronunciation ${ipa}, LaTeX ${tex}, and its uses in math, probability and statistics — ${use}`,
    otherLang: "pt", otherLabel: "Português (PT)", thisLabel: "English (EN)",
  },
  pt: {
    html: "pt-BR", og: "pt_BR", base: "/pt/",
    homeTitle: "Alfabeto Grego — Estude e Memorize as Letras Gregas para Exatas | greekalpha.bet",
    homeHeading: "Alfabeto grego",
    homeDesc: "Ferramenta interativa para estudar o alfabeto grego em exatas: glifos, pronúncia, LaTeX e os usos comuns em matemática e estatística, com um quiz para praticar.",
    chart: "Tabela do alfabeto grego",
    quiz: "Praticar: quiz", theme: "Alternar tema", audio: "Ouvir a pronúncia do alfabeto", print: "Imprimir",
    language: "Idioma", close: "Fechar",
    modes: ["Glifo → nome", "Nome → glifo", "Parecidas"], next: "Próxima",
    blocks: ["MATEMÁTICA", "PROBABILIDADE", "ESTATÍSTICA"],
    noUse: "(sem uso “padrão”; depende da convenção do autor)",
    note: "Obs.: notações variam entre livros/áreas; aqui estão os usos mais comuns.",
    howToWrite: "COMO ESCREVER — clique para copiar", lower: "minúscula", variant: "variante", upper: "maiúscula",
    latinUpper: "igual à letra latina: o LaTeX não tem comando para ela", copy: "Copiar",
    dontConfuse: "NÃO CONFUNDA",
    inFormulas: "EM FÓRMULAS", seeAt: "Ver explicado no morrisonkuhlsen.com →", listen: "Ouvir",
    pronunciation: "PRONÚNCIA", ancient: "Grego antigo", modernGreek: "Grego moderno", sound: "som", beforeEI: "antes de e/i",
    sheetSlug: "folha/", sheetLink: "Folha de referência (imprimir / PDF)",
    sheetTitle: "Folha de Referência do Alfabeto Grego — Letras, LaTeX e Usos na Estatística | greekalpha.bet",
    sheetHeading: "Folha de referência do alfabeto grego",
    sheetDesc: "As 24 letras gregas numa página para imprimir: glifo, nome, comando LaTeX, pronúncia antiga e moderna e o uso mais comum na matemática e na estatística.",
    sheetLede: "As 24 letras numa folha A4. Use o botão de imprimir (ou Ctrl+P) e escolha “Salvar como PDF” para guardar uma cópia.",
    sheetCols: ["Letra", "Nome", "LaTeX", "Som (antigo · moderno)", "Uso mais comum"],
    sheetPrint: "Imprimir ou salvar em PDF",
    all: "Todas as letras", prev: "Anterior", nextLetter: "Próxima",
    position: n => `A ${n}ª letra do alfabeto grego.`,
    letterTitle: (name, gl) => `${name} (${gl}) — a letra grega na matemática e na estatística | greekalpha.bet`,
    letterDesc: (name, gl, ipa, tex, use) => `${name} (${gl}): pronúncia ${ipa}, LaTeX ${tex} e os usos em matemática, probabilidade e estatística — ${use}`,
    otherLang: "en", otherLabel: "English (EN)", thisLabel: "Português (PT)",
  },
};
const USES_KEY = { en: "en", pt: "pt-BR" };

const nameOf = (item, lang) => (lang === "pt" ? namesPt[item.id][0] : item.name);
const slugOf = (item, lang) => (lang === "pt" ? namesPt[item.id][1] : item.id);
const letterUrl = (item, lang) => `${T[lang].base}${slugOf(item, lang)}/`;
const glyphs = item => [...item.glyph].join(" "); // "Σ σ ς"

/* ------------------------------------------------------------------ pedaços */

const ICONS = {
  theme: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/></svg>',
  audio: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></svg>',
  print: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>',
  globe: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
};

const btn = (id, label, inner, extra = "") =>
  `<button id="${id}" class="ui-top-btn${extra}" type="button" aria-label="${esc(label)}" title="${esc(label)}">${inner}</button>`;

// O menu de idioma leva à mesma página na outra língua.
function toolbar(lang, otherUrl, { print }) {
  const t = T[lang];
  return `<div class="toolbar">
    ${btn("quizBtn", t.quiz, "Quiz", " quiz-btn")}
    ${btn("themeToggle", t.theme, ICONS.theme).replace('type="button"', 'type="button" aria-pressed="false"')}
    ${btn("audioBtn", t.audio, ICONS.audio).replace('type="button"', 'type="button" aria-pressed="false"')}
    ${print ? btn("printBtn", t.print, ICONS.print) : ""}
    <div class="lang">
      ${btn("langToggle", t.language, ICONS.globe).replace('type="button"', 'type="button" aria-haspopup="true" aria-expanded="false" aria-controls="langMenu"')}
      <div id="langMenu" class="lang-menu" hidden>
        <a class="lang-item" href="${otherUrl}" hreflang="${T[t.otherLang].html}" lang="${T[t.otherLang].html}" data-lang="${T[t.otherLang].html}">${t.otherLabel}</a>
        <span class="lang-item is-current" aria-current="true">${t.thisLabel}</span>
      </div>
    </div>
  </div>`;
}

function quizMarkup(lang) {
  const t = T[lang];
  const [g, n, p] = t.modes;
  return `<div class="backdrop" id="quizBackdrop" hidden>
    <div class="modal quiz" role="dialog" aria-modal="true" aria-labelledby="quizTitle">
      <button class="close" id="quizClose" type="button" aria-label="${t.close}">${ICONS.close}</button>
      <h2 class="modal-title" id="quizTitle">QUIZ</h2>
      <div class="quiz-modes" role="group" id="quizModes">
        <button type="button" data-mode="glyph" aria-pressed="true">${g}</button>
        <button type="button" data-mode="name" aria-pressed="false">${n}</button>
        <button type="button" data-mode="pairs" aria-pressed="false">${p}</button>
      </div>
      <p class="quiz-ask" id="quizAsk"></p>
      <div class="quiz-prompt" id="quizPrompt"></div>
      <div class="quiz-options" id="quizOptions"></div>
      <p class="quiz-feedback" id="quizFeedback" aria-live="polite"></p>
      <div class="quiz-foot">
        <span class="quiz-score" id="quizScore"></span>
        <button type="button" class="quiz-next" id="quizNext">${t.next}</button>
      </div>
      <p class="quiz-review" id="quizReview"></p>
    </div>
  </div>`;
}

const footer = lang => `<footer class="site-footer">
    <div class="site-footer-inner">
      <a class="footer-sheet" href="${T[lang].base}${T[lang].sheetSlug}">${T[lang].sheetLink}</a>
      <small>© 2026 greekalpha.bet — <a href="https://github.com/greekalpha-bet/greekalpha.bet/blob/main/LICENSE">MIT License</a></small>
      <div class="powered-by">
        <span class="powered-text"><strong>Powered</strong> by</span>
        <img src="/assets/mk-logo-white-300x.png" alt="MK" class="powered-by-logo" width="61" height="20" />
      </div>
    </div>
  </footer>`;

// O <head> e a moldura de toda página.
function page({ lang, title, desc, url, alt, ld, htmlClass = "", body }) {
  const t = T[lang], other = T[t.otherLang];
  return `<!doctype html>
<html lang="${t.html}"${htmlClass ? ` class="${htmlClass}"` : ""}>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}" />
  <link rel="canonical" href="${SITE}${url}" />
  <link rel="alternate" hreflang="${t.html}" href="${SITE}${url}" />
  <link rel="alternate" hreflang="${other.html}" href="${SITE}${alt}" />
  <link rel="alternate" hreflang="x-default" href="${SITE}${lang === "en" ? url : alt}" />
  <meta name="theme-color" content="#0b0e14" />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:url" content="${SITE}${url}" />
  <meta property="og:site_name" content="greekalpha.bet" />
  <meta property="og:locale" content="${t.og}" />
  <meta property="og:image" content="${SITE}/assets/social-card.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(desc)}" />
  <meta name="twitter:image" content="${SITE}/assets/social-card.png" />

  <!-- Tema antes de qualquer pintura (sem piscar escuro no tema claro). -->
  <script>
    (function () {
      var t = null;
      try { t = localStorage.getItem('theme'); } catch (e) {}
      if (t !== 'light' && t !== 'dark') t = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      if (t === 'light') document.documentElement.setAttribute('data-theme', 'light');
    })();
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=GFS+Didot:ital@0;1&family=Inter:wght@400;600&display=swap" rel="stylesheet">
  <link rel="icon" href="/assets/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="/assets/icon-180.png">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="stylesheet" href="/style.css?v=${VERSION}" />

  <script async src="https://www.googletagmanager.com/gtag/js?id=G-LGW2XK4ZKC"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-LGW2XK4ZKC');
  </script>

  <script type="application/ld+json">
${JSON.stringify(ld, null, 2).replace(/^/gm, "  ")}
  </script>
</head>
<body>
  ${body}
  <script src="/data.js?v=${VERSION}"></script>
  <script src="/script.js?v=${VERSION}"></script>
</body>
</html>
`;
}

/* ------------------------------------------------------------------ tabela */

function cell(item, lang) {
  return `<a class="cell" href="${letterUrl(item, lang)}" data-id="${item.id}"><span class="glyph">${item.glyph}</span><span class="meta"><span class="latin"><span class="name">${nameOf(item, lang)}</span><span class="ipa">${item.ipa}</span></span><span class="greek">${item.greek}</span></span></a>`;
}

function home(lang) {
  const t = T[lang], other = t.otherLang;
  const rows = [];
  for (let r = 0; r < data.length; r += 6) {
    if (r) rows.push('<div class="rule"></div>');
    rows.push(`<div class="row">${data.slice(r, r + 6).map(i => cell(i, lang)).join("")}</div>`);
  }
  const url = t.base, alt = T[other].base;
  return page({
    lang, url, alt, title: t.homeTitle, desc: t.homeDesc,
    ld: {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebSite", "@id": `${SITE}/#website`, url: `${SITE}/`, name: "greekalpha.bet" },
        { "@type": "WebPage", "@id": `${SITE}${url}#webpage`, url: `${SITE}${url}`, name: t.homeTitle.split(" | ")[0], description: t.homeDesc, inLanguage: t.html, isPartOf: { "@id": `${SITE}/#website` } },
      ],
    },
    body: `${toolbar(lang, alt, { print: true })}

  <main class="wrap">
    <h1 class="visually-hidden">${t.homeHeading}</h1>
    <div class="stage">
      <section class="chart" id="chart" aria-label="${t.chart}">
        ${rows.join("\n        ")}
      </section>
    </div>
  </main>

  <!-- Modal da letra (o script.js preenche ao clicar). -->
  <div class="backdrop" id="backdrop" hidden>
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <button class="close" id="closeBtn" type="button" aria-label="${t.close}">${ICONS.close}</button>
      <div class="modal-head">
        <div class="big-glyph" id="bigGlyph"></div>
        <div class="head-meta">
          <h2 class="modal-title" id="modalTitle"></h2>
          <div class="modal-sub" id="modalSub"></div>
        </div>
      </div>
      <div class="modal-body" id="modalBody"></div>
      <p class="modal-more"><a id="modalLink" href="#"></a></p>
    </div>
  </div>

  ${quizMarkup(lang)}

  ${footer(lang)}`,
  });
}

/* ------------------------------------------------------------------ página da letra */

// Os mesmos blocos do modal, em HTML estático (o script.js liga a cópia).
function usesHtml(item, lang) {
  const t = T[lang], u = uses[item.id][USES_KEY[lang]];
  return ["math", "prob", "stats"].map((k, i) => {
    const items = u[k] && u[k].length ? u[k] : [t.noUse];
    return `<section class="block"><h2>${t.blocks[i]}</h2><ul>${items.map(x => `<li>${esc(x)}</li>`).join("")}</ul></section>`;
  }).join("\n        ");
}

function writingHtml(item, lang) {
  const t = T[lang], w = writing[item.id];
  const copy = (text, cls) => `<button type="button" class="copy ${cls}" data-copy="${esc(text)}" aria-label="${t.copy}: ${esc(text)}">${esc(text)}</button>`;
  const row = (label, [ch, tex, ent, latin]) =>
    `<div class="writing-row"><span class="writing-label">${label}</span>${copy(ch, "is-char")}${copy(tex, "is-tex")}${copy(ent, "is-ent")}${latin ? `<span class="writing-hint">${t.latinUpper}</span>` : ""}</div>`;
  const rows = [...w.lo.map((f, i) => row(i ? t.variant : t.lower, f)), row(t.upper, w.up)];
  return `<section class="writing"><h2>${t.howToWrite}</h2><div class="writing-rows">${rows.join("")}</div></section>`;
}

// O som da letra no grego antigo (o `ipa` da tabela) e no moderno, com o
// nome moderno: por que β soa "v" e η soa "i" na Grécia de hoje.
function pronunciationHtml(item, lang) {
  const t = T[lang], [nome, nomeIpa, som, antes] = modern[item.id];
  return `<section class="pron"><h2>${t.pronunciation}</h2><dl>`
    + `<dt>${t.ancient}</dt><dd>${t.sound} ${item.ipa}</dd>`
    + `<dt>${t.modernGreek}</dt><dd><span lang="el">${nome}</span> ${nomeIpa} · ${t.sound} ${som}${antes ? ` (${t.beforeEI}: ${antes})` : ""}</dd>`
    + `</dl></section>`;
}

// Fórmulas em que a letra aparece, com o link para a explicação no
// morrisonkuhlsen.com quando há uma na língua da página.
function examplesHtml(item, lang) {
  const t = T[lang], list = examples[item.id];
  if (!list) return "";
  const li = e => {
    const f = typeof e.f === "string" ? e.f : e.f[lang];
    const link = e.link && e.link[lang];
    return `<li><span class="ex-f">${esc(f)}</span><span class="ex-d">${esc(e[lang])}</span>${link ? `<a class="ex-link" href="${MK}${link}">${t.seeAt}</a>` : ""}</li>`;
  };
  return `<section class="examples"><h2>${t.inFormulas}</h2><ul>${list.map(li).join("")}</ul></section>`;
}

// As perguntas do quiz sobre esta letra viram "não confunda": as que a têm
// como resposta e as em que ela é a primeira alternativa errada, que é
// sempre a parecida (Σ em "qual é o somatório ∑?", ε em "qual é o ∈?").
function confusionHtml(item, lang) {
  const t = T[lang], chars = new Set([...item.glyph, ...writing[item.id].lo.map(f => f[0])]);
  const found = confusables.filter(c => chars.has(c.options[0]) || chars.has(c.options[1]));
  if (!found.length) return "";
  return `<section class="confusion"><h2>${t.dontConfuse}</h2><ul>${found.map(c => `<li><span class="confusion-glyphs">${c.options.join(" ")}</span> ${esc(c.why[USES_KEY[lang]])}</li>`).join("")}</ul></section>`;
}

function letter(item, i, lang) {
  const t = T[lang], other = t.otherLang;
  const name = nice(nameOf(item, lang)), gl = glyphs(item);
  const url = letterUrl(item, lang), alt = letterUrl(item, other);
  const tex = writing[item.id].lo[0][1];
  const firstStats = uses[item.id][USES_KEY[lang]].stats[0];
  const desc = t.letterDesc(name, gl, item.ipa, tex, firstStats).slice(0, 300);
  const prev = data[(i + data.length - 1) % data.length], next = data[(i + 1) % data.length];
  return page({
    lang, url, alt, htmlClass: "scroll",
    title: t.letterTitle(name, gl), desc,
    ld: {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      "@id": `${SITE}${url}#term`,
      name: `${name} (${gl})`,
      description: desc,
      inLanguage: t.html,
      url: `${SITE}${url}`,
      inDefinedTermSet: { "@type": "DefinedTermSet", name: t.homeHeading, url: `${SITE}${t.base}` },
    },
    body: `${toolbar(lang, alt, { print: false })}

  <main class="letter-page">
    <nav class="crumbs"><a href="${t.base}">${t.all}</a> › ${name}</nav>
    <article>
      <header class="modal-head letter-head">
        <div class="big-glyph" lang="el">${item.glyph}</div>
        <div class="head-meta">
          <h1 class="modal-title">${nameOf(item, lang)}</h1>
          <div class="modal-sub"><span lang="el">${item.greek}</span> · ${item.ipa} <button type="button" class="listen" data-listen="${item.id}">${ICONS.play}${t.listen}</button></div>
          <p class="letter-pos">${t.position(i + 1)}</p>
        </div>
      </header>
      <div class="modal-body">
        ${usesHtml(item, lang)}
        ${pronunciationHtml(item, lang)}
        ${examplesHtml(item, lang)}
        ${writingHtml(item, lang)}
        ${confusionHtml(item, lang)}
        <p class="note">${t.note}</p>
      </div>
    </article>
    <nav class="letter-pager">
      <a href="${letterUrl(prev, lang)}" rel="prev"><span>${t.prev}</span><b lang="el">${prev.glyph}</b> ${nice(nameOf(prev, lang))}</a>
      <a href="${t.base}" class="letter-all">${t.all}</a>
      <a href="${letterUrl(next, lang)}" rel="next" class="is-next"><span>${t.nextLetter}</span>${nice(nameOf(next, lang))} <b lang="el">${next.glyph}</b></a>
    </nav>
  </main>

  ${quizMarkup(lang)}

  ${footer(lang)}`,
  });
}

/* ------------------------------------------------------------------ folha de referência */

// O uso mais comum: o primeiro de estatística, a menos que seja um "raro";
// aí o primeiro de matemática.
function usualMeaning(item, lang) {
  const u = uses[item.id][USES_KEY[lang]];
  const raro = /^(rare|seldom|less common|raro|pouco|menos comum)/i;
  return (u.stats && u.stats[0] && !raro.test(u.stats[0])) ? u.stats[0] : u.math[0];
}

function sheet(lang) {
  const t = T[lang], other = t.otherLang;
  const url = `${t.base}${t.sheetSlug}`, alt = `${T[other].base}${T[other].sheetSlug}`;
  const rows = data.map(item => {
    const w = writing[item.id], m = modern[item.id];
    const tex = [w.lo[0][1], w.up[3] ? "" : w.up[1]].filter(Boolean).join("  ");
    return `<tr><td class="s-glyph" lang="el"><a href="${letterUrl(item, lang)}">${item.glyph}</a></td><td class="s-name">${nice(nameOf(item, lang))}</td><td class="s-tex">${esc(tex)}</td><td class="s-sound">${item.ipa} · ${m[2]}</td><td class="s-use">${esc(usualMeaning(item, lang))}</td></tr>`;
  });
  return page({
    lang, url, alt, htmlClass: "scroll",
    title: t.sheetTitle, desc: t.sheetDesc,
    ld: { "@context": "https://schema.org", "@type": "WebPage", url: `${SITE}${url}`, name: t.sheetHeading, description: t.sheetDesc, inLanguage: t.html },
    body: `${toolbar(lang, alt, { print: true })}

  <main class="sheet-page">
    <nav class="crumbs"><a href="${t.base}">${t.all}</a> › ${t.sheetHeading}</nav>
    <h1 class="sheet-title">${t.sheetHeading}</h1>
    <p class="sheet-lede">${t.sheetLede}</p>
    <table class="sheet">
      <thead><tr>${t.sheetCols.map(c => `<th>${c}</th>`).join("")}</tr></thead>
      <tbody>
        ${rows.join("\n        ")}
      </tbody>
    </table>
    <p class="sheet-foot">greekalpha.bet${t.base === "/" ? "" : "/pt"} · ${t.note}</p>
  </main>

  ${quizMarkup(lang)}

  ${footer(lang)}`,
  });
}

/* ------------------------------------------------------------------ escrita */

const write = (rel, content) => {
  const file = join(ROOT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
};

// Pastas de letras de um build anterior saem antes (um slug renomeado não
// deixa página órfã).
for (const item of data) {
  for (const dir of [item.id, join("pt", namesPt[item.id][1])]) {
    if (existsSync(join(ROOT, dir))) rmSync(join(ROOT, dir), { recursive: true });
  }
}

const urls = [];
for (const lang of ["en", "pt"]) {
  write(join(T[lang].base, "index.html").slice(1), home(lang));
  urls.push([T[lang].base, T[T[lang].otherLang].base, lang]);
  const o = T[lang].otherLang;
  write(join(T[lang].base, T[lang].sheetSlug, "index.html").slice(1), sheet(lang));
  urls.push([T[lang].base + T[lang].sheetSlug, T[o].base + T[o].sheetSlug, lang]);
  data.forEach((item, i) => {
    write(join(letterUrl(item, lang), "index.html").slice(1), letter(item, i, lang));
    urls.push([letterUrl(item, lang), letterUrl(item, T[lang].otherLang), lang]);
  });
}

write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(([u, a, lang]) => `  <url>
    <loc>${SITE}${u}</loc>
    <xhtml:link rel="alternate" hreflang="${T[lang].html}" href="${SITE}${u}"/>
    <xhtml:link rel="alternate" hreflang="${T[T[lang].otherLang].html}" href="${SITE}${a}"/>
  </url>`).join("\n")}
</urlset>
`);
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

/* ------------------------------------------------------------------ offline */

write("manifest.webmanifest", JSON.stringify({
  name: "greekalpha.bet — Greek alphabet",
  short_name: "GreekAlpha",
  description: T.en.homeDesc,
  start_url: "/",
  scope: "/",
  display: "standalone",
  background_color: "#0b0e14",
  theme_color: "#0b0e14",
  icons: [
    { src: "/assets/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
    { src: "/assets/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
  ],
}, null, 2) + "\n");

// O service worker guarda todas as páginas e os arquivos de que elas
// precisam na primeira visita (≈ 400 KB); depois o site abre sem internet.
// A lista sai daqui para não esquecer nenhuma página; o nome do cache leva
// a VERSION, então um build novo troca tudo de uma vez.
const precache = [
  ...urls.map(([u]) => u),
  `/style.css?v=${VERSION}`, `/data.js?v=${VERSION}`, `/script.js?v=${VERSION}`,
  "/assets/favicon.png", "/assets/icon-192.png", "/assets/mk-logo-white-300x.png",
];
write("sw.js", `// Gerado pelo build.mjs: não edite à mão.
const CACHE = "greekalpha-${VERSION}";
const PRECACHE = ${JSON.stringify(precache, null, 2)};

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith("greekalpha-") && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Páginas: a rede primeiro (para ver a versão nova), o cache sem internet.
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
      return res;
    }).catch(() => caches.match(req).then(r => r || caches.match("/"))));
    return;
  }

  // Arquivos do site (CSS, JS e imagens com versão no nome, áudios) e as
  // fontes do Google: o cache primeiro, e o que vier da rede fica guardado.
  const proprio = url.origin === location.origin;
  const fonte = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (!proprio && !fonte) return; // analytics e o resto: direto para a rede
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok || res.type === "opaque") {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
    }
    return res;
  })));
});
`);

console.log(`${urls.length} páginas, sitemap.xml e robots.txt`);
