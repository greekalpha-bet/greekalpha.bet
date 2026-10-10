/* greekalpha.bet — a interface. Os dados vêm do data.js, carregado antes.
   O HTML já chega pronto do build.mjs (tabela, rótulos na língua da
   página); aqui entram o modal, o quiz, a cópia, o tema, o áudio e o
   ajuste da tabela à tela. */

(() => {
  "use strict";

  const I18N = {
    "en": {
      blockMath: "MATHEMATICS",
      blockProb: "PROBABILITY",
      blockStats: "STATISTICS",
      noUse: "(no standard usage; it depends on the author's convention)",
      note: "Note: notations vary between books/fields; these are the most common usages.",
      audioPlay: "Play the alphabet pronunciation",
      audioStop: "Stop the pronunciation",
      copy: "Copy",
      copied: "Copied",
      howToWrite: "HOW TO WRITE IT — click to copy",
      letterPage: "Open this letter's page →",
      inFormulas: "IN FORMULAS",
      seeAt: "See it explained at morrisonkuhlsen.com →",
      listen: "Listen",
      pronunciation: "PRONUNCIATION",
      ancient: "Ancient Greek",
      modernGreek: "Modern Greek",
      sound: "sound",
      beforeEI: "before e/i",
      lower: "lowercase",
      variant: "variant",
      upper: "uppercase",
      latinUpper: "same as the Latin letter: LaTeX has no command for it",
      whichLetter: "Which letter is this?",
      whichGlyph: "Find this letter:",
      right: "Right!",
      wrong: "Not quite.",
      wrongIs: "It's",
      youChose: "You picked",
      review: "To review:",
      score: (r, n, s, b) => `${r}/${n} right · streak ${s} · best ${b}`,
    },
    "pt-BR": {
      blockMath: "MATEMÁTICA",
      blockProb: "PROBABILIDADE",
      blockStats: "ESTATÍSTICA",
      noUse: "(sem uso “padrão”; depende da convenção do autor)",
      note: "Obs.: notações variam entre livros/áreas; aqui estão os usos mais comuns.",
      audioPlay: "Ouvir a pronúncia do alfabeto",
      audioStop: "Parar a pronúncia",
      copy: "Copiar",
      copied: "Copiado",
      howToWrite: "COMO ESCREVER — clique para copiar",
      letterPage: "Abrir a página da letra →",
      inFormulas: "EM FÓRMULAS",
      seeAt: "Ver explicado no morrisonkuhlsen.com →",
      listen: "Ouvir",
      pronunciation: "PRONÚNCIA",
      ancient: "Grego antigo",
      modernGreek: "Grego moderno",
      sound: "som",
      beforeEI: "antes de e/i",
      lower: "minúscula",
      variant: "variante",
      upper: "maiúscula",
      latinUpper: "igual à letra latina: o LaTeX não tem comando para ela",
      whichLetter: "Que letra é esta?",
      whichGlyph: "Encontre esta letra:",
      right: "Isso!",
      wrong: "Quase.",
      wrongIs: "É",
      youChose: "Você marcou",
      review: "Para revisar:",
      score: (r, n, s, b) => `${r}/${n} acertos · sequência ${s} · recorde ${b}`,
    },
  };

  // localStorage pode não existir (modo privado, bloqueio de cookies).
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sem persistência */ } },
  };

  const $ = id => document.getElementById(id);
  const chart = $("chart");
  const stage = document.querySelector(".stage");
  const footer = document.querySelector(".site-footer");
  const backdrop = $("backdrop");   // só na tabela
  const closeBtn = $("closeBtn");
  const themeToggle = $("themeToggle");
  const audioBtn = $("audioBtn");
  const printBtn = $("printBtn");
  const langToggle = $("langToggle");
  const langMenu = $("langMenu");

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  /* ---------------------------------------------------------- idioma */

  // A língua é a da página (/ ou /pt/), que o build já escreveu em <html>.
  const lang = document.documentElement.lang === "pt-BR" ? "pt-BR" : "en";
  const t = key => I18N[lang][key];
  const label = (btn, text) => { btn.setAttribute("aria-label", text); btn.title = text; };

  // Só a página inicial em inglês (/) manda para /pt/ quem usou o português
  // da última vez — ela é a entrada padrão do site. Nenhuma outra página
  // redireciona: quem abre /pt/ ou /pt/sigma/ (por link, busca ou digitando)
  // fica nela. E nada de decidir pelo idioma do navegador, que o Google
  // desaconselha.
  // O return é essencial: o script não pode continuar e gravar a língua
  // desta página antes de sair dela. Era isso que fazia / e /pt/ se
  // mandarem um para o outro sem parar.
  const otherLink = langMenu.querySelector("a.lang-item");
  if (chart && lang === "en" && otherLink && store.get("lang") === "pt-BR") {
    location.replace(otherLink.href);
    return;
  }

  function closeMenu(focusToggle) {
    langMenu.hidden = true;
    langToggle.setAttribute("aria-expanded", "false");
    if (focusToggle) langToggle.focus();
  }

  langToggle.addEventListener("click", () => {
    if (!langMenu.hidden) return closeMenu(false);
    langMenu.hidden = false;
    langToggle.setAttribute("aria-expanded", "true");
    if (otherLink) otherLink.focus();
  });
  if (otherLink) otherLink.addEventListener("click", () => store.set("lang", otherLink.dataset.lang));
  langMenu.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(true); });
  // Ao abrir esta língua por um link, ela vira a escolhida.
  store.set("lang", lang);
  document.addEventListener("click", e => {
    if (!langMenu.hidden && !e.target.closest(".lang")) closeMenu(false);
  });

  /* ---------------------------------------------------------- tabela */

  const byId = Object.fromEntries(data.map(d => [d.id, d]));
  const nameOf = item => (lang === "pt-BR" ? namesPt[item.id][0] : item.name);

  if (chart) {
    chart.addEventListener("click", e => {
      const cell = e.target.closest(".cell");
      if (!cell || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      openModal(byId[cell.dataset.id], cell.getAttribute("href"));
    });
  }

  /* ---------------------------------------------------------- ajuste à tela */

  // No desktop a tabela inteira cabe na tela, sem rolagem: mede-se o espaço
  // livre e aplica-se uma escala. No celular (ver o CSS) isso deixaria as
  // letras minúsculas; lá a tabela vira uma grade de três colunas que rola.
  const MOBILE = matchMedia("(max-width: 600px)");

  function fitToScreen() {
    if (MOBILE.matches) {
      chart.style.transform = chart.style.left = chart.style.top = "";
      return;
    }
    chart.style.transform = "scale(1)";
    const area = stage.getBoundingClientRect();
    // Quanto o rodapé fixo invade o palco (medido, sem número mágico).
    const overlap = footer ? Math.max(0, area.bottom - footer.getBoundingClientRect().top) : 0;
    const availW = area.width, availH = area.height - overlap;
    const { width: w, height: h } = chart.getBoundingClientRect();
    if (w <= 0 || h <= 0 || availW <= 0 || availH <= 0) return;
    const s = Math.min(availW / w, availH / h) * 0.995;
    chart.style.transform = `scale(${s})`;
    chart.style.left = `${Math.max(0, (availW - w * s) / 2)}px`;
    chart.style.top = `${Math.max(0, (availH - h * s) / 2)}px`;
  }

  // Um ajuste por quadro, venha o pedido de onde vier.
  let fitPending = 0;
  const scheduleFit = () => {
    cancelAnimationFrame(fitPending);
    fitPending = requestAnimationFrame(fitToScreen);
  };

  /* ---------------------------------------------------------- diálogos */

  // O comportamento comum ao modal da letra e ao quiz: o foco entra ao
  // abrir, não sai com Tab, Esc e o clique fora fecham, e ao fechar o foco
  // volta para onde estava.
  function makeDialog(backdropEl, onClose) {
    const box = backdropEl.querySelector(".modal");
    let lastFocus = null;
    const api = {
      get open() { return !backdropEl.hidden; },
      show(focusEl) {
        if (backdropEl.hidden) lastFocus = document.activeElement;
        backdropEl.hidden = false;
        document.body.classList.add("modal-open");
        (focusEl || box.querySelector(".close")).focus();
      },
      hide() {
        if (backdropEl.hidden) return;
        backdropEl.hidden = true;
        document.body.classList.remove("modal-open");
        if (onClose) onClose();
        if (lastFocus) lastFocus.focus();
      },
    };
    box.querySelector(".close").addEventListener("click", () => api.hide());
    backdropEl.addEventListener("click", e => { if (e.target === backdropEl) api.hide(); });
    document.addEventListener("keydown", e => {
      if (!api.open) return;
      if (e.key === "Escape") return api.hide();
      if (e.key === "Tab") {
        const f = [...box.querySelectorAll("button:not([disabled]), [href], [tabindex]:not([tabindex='-1'])")];
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    return api;
  }

  /* ---------------------------------------------------------- copiar */

  async function copyText(text, btn) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      // Sem a API (http, navegador antigo): o caminho antigo, por seleção.
      const ta = el("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    btn.classList.add("is-copied");
    btn.setAttribute("aria-label", `${t("copied")}: ${text}`);
    clearTimeout(btn._t);
    btn._t = setTimeout(() => {
      btn.classList.remove("is-copied");
      btn.setAttribute("aria-label", `${t("copy")}: ${text}`);
    }, 1400);
  }

  document.querySelectorAll("[data-copy]").forEach(b => b.addEventListener("click", () => copyText(b.dataset.copy, b)));

  function copyButton(text, cls) {
    const b = el("button", `copy ${cls}`, text);
    b.type = "button";
    b.setAttribute("aria-label", `${t("copy")}: ${text}`);
    b.addEventListener("click", () => copyText(text, b));
    return b;
  }

  // Uma linha por forma: o caractere, o LaTeX e a entidade HTML, cada um
  // num botão que copia.
  function writingBlock(id) {
    const w = writing[id];
    if (!w) return null;
    const box = el("section", "writing");
    box.appendChild(el("h3", null, t("howToWrite")));
    const table = el("div", "writing-rows");
    const row = (labelText, [ch, tex, ent, latin]) => {
      const r = el("div", "writing-row");
      r.append(el("span", "writing-label", labelText), copyButton(ch, "is-char"), copyButton(tex, "is-tex"), copyButton(ent, "is-ent"));
      if (latin) r.appendChild(el("span", "writing-hint", t("latinUpper")));
      table.appendChild(r);
    };
    w.lo.forEach((f, i) => row(i ? t("variant") : t("lower"), f));
    row(t("upper"), w.up);
    box.appendChild(table);
    return box;
  }

  /* ---------------------------------------------------------- modal da letra */

  let current = null;
  const letterDialog = backdrop ? makeDialog(backdrop, () => { current = null; }) : { open: false, hide() {} };

  function block(title, items) {
    const b = el("section", "block");
    const ul = el("ul");
    (items && items.length ? items : [t("noUse")]).forEach(text => ul.appendChild(el("li", null, text)));
    b.append(el("h3", null, title), ul);
    return b;
  }

  function examplesBlock(id) {
    const list = examples[id];
    if (!list) return "";
    const key = lang === "pt-BR" ? "pt" : "en";
    const box = el("section", "examples");
    const ul = el("ul");
    list.forEach(e => {
      const li = el("li");
      li.append(el("span", "ex-f", typeof e.f === "string" ? e.f : e.f[key]), el("span", "ex-d", e[key]));
      if (e.link && e.link[key]) {
        const a = el("a", "ex-link", t("seeAt"));
        a.href = MK + e.link[key];
        li.appendChild(a);
      }
      ul.appendChild(li);
    });
    box.append(el("h3", null, t("inFormulas")), ul);
    return box;
  }

  function pronBlock(item) {
    const [nome, nomeIpa, som, antes] = modern[item.id];
    const box = el("section", "pron");
    const dl = el("dl");
    const greek = el("span", null, nome);
    greek.lang = "el";
    const dd2 = el("dd");
    dd2.append(greek, ` ${nomeIpa} · ${t("sound")} ${som}${antes ? ` (${t("beforeEI")}: ${antes})` : ""}`);
    dl.append(el("dt", null, t("ancient")), el("dd", null, `${t("sound")} ${item.ipa}`), el("dt", null, t("modernGreek")), dd2);
    box.append(el("h3", null, t("pronunciation")), dl);
    return box;
  }

  function listenButton(id) {
    const b = el("button", "listen");
    b.type = "button";
    b.dataset.listen = id;
    b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';
    b.append(t("listen"));
    return b;
  }

  function fillModal(item) {
    const u = (uses[item.id] || {})[lang] || {};
    $("bigGlyph").textContent = item.glyph;
    $("modalTitle").textContent = nameOf(item);
    $("modalSub").replaceChildren(`${item.greek} · ${item.ipa} `, listenButton(item.id));
    $("modalBody").replaceChildren(
      block(t("blockMath"), u.math),
      block(t("blockProb"), u.prob),
      block(t("blockStats"), u.stats),
      pronBlock(item),
      examplesBlock(item.id),
      writingBlock(item.id) || "",
      el("p", "note", t("note")));
  }

  function openModal(item, href) {
    current = item;
    fillModal(item);
    const link = $("modalLink");
    link.href = href;
    link.textContent = t("letterPage");
    letterDialog.show(closeBtn);
  }
  const closeModal = () => letterDialog.hide();

  /* ---------------------------------------------------------- quiz */

  // Peso de cada letra: errar aumenta, acertar diminui, e as mais pesadas
  // são sorteadas mais vezes. Fica no navegador, entre visitas.
  const quizEls = {
    modes: $("quizModes"), ask: $("quizAsk"), prompt: $("quizPrompt"), options: $("quizOptions"),
    feedback: $("quizFeedback"), score: $("quizScore"), next: $("quizNext"), review: $("quizReview"),
  };
  const quiz = {
    mode: ["glyph", "name", "pairs"].includes(store.get("quizMode")) ? store.get("quizMode") : "glyph",
    weights: (() => { try { return JSON.parse(store.get("quizWeights")) || {}; } catch (e) { return {}; } })(),
    best: Number(store.get("quizBest")) || 0,
    right: 0, total: 0, streak: 0, q: null, last: null,
  };
  const quizDialog = makeDialog($("quizBackdrop"));
  const lower = item => item.glyph[1];
  const nice = name => name[0] + name.slice(1).toLowerCase();
  const shuffle = xs => { const a = [...xs]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const weight = id => quiz.weights[id] || 1;

  function pickLetter() {
    const pool = data.filter(d => d.id !== quiz.last);
    let r = Math.random() * pool.reduce((s, d) => s + weight(d.id), 0);
    for (const d of pool) { r -= weight(d.id); if (r <= 0) return d; }
    return pool[pool.length - 1];
  }

  function newQuestion() {
    quiz.answered = false;
    quizEls.feedback.textContent = "";
    quizEls.feedback.className = "quiz-feedback";
    quizEls.next.hidden = true;
    let q;
    if (quiz.mode === "pairs") {
      const pool = confusables.filter(c => c !== quiz.last);
      const c = pool[Math.floor(Math.random() * pool.length)];
      quiz.last = c;
      q = { ask: c.ask[lang], prompt: "", options: shuffle(c.options), answer: c.options[0], why: c.why[lang], glyphOptions: true };
    } else {
      const item = pickLetter();
      quiz.last = item.id;
      const others = shuffle(data.filter(d => d.id !== item.id)).slice(0, 3);
      const choices = shuffle([item, ...others]);
      if (quiz.mode === "glyph") {
        // Às vezes a maiúscula, mas em geral a minúscula, que confunde mais.
        const ch = Math.random() < 0.3 ? item.glyph[0] : lower(item);
        q = { ask: t("whichLetter"), prompt: ch, promptClass: "is-glyph", options: choices.map(d => nice(nameOf(d))), answer: nice(nameOf(item)), item, choices };
      } else {
        q = { ask: t("whichGlyph"), prompt: nice(nameOf(item)), promptClass: "is-name", options: choices.map(lower), answer: lower(item), item, choices, glyphOptions: true };
      }
    }
    quiz.q = q;
    quizEls.ask.textContent = q.ask;
    quizEls.prompt.textContent = q.prompt;
    quizEls.prompt.className = `quiz-prompt ${q.promptClass || ""}`;
    quizEls.prompt.hidden = !q.prompt;
    quizEls.options.replaceChildren(...q.options.map((text, i) => {
      const b = el("button", `quiz-option${q.glyphOptions ? " is-glyph" : ""}`);
      b.type = "button";
      b.append(el("span", "quiz-key", String(i + 1)), el("span", null, text));
      b.addEventListener("click", () => answer(i));
      return b;
    }));
    renderScore();
    quizEls.options.firstChild.focus();
  }

  function answer(i) {
    const q = quiz.q;
    if (quiz.answered) return;
    quiz.answered = true;
    const ok = q.options[i] === q.answer;
    quiz.total++;
    if (ok) { quiz.right++; quiz.streak++; } else quiz.streak = 0;
    if (quiz.streak > quiz.best) { quiz.best = quiz.streak; store.set("quizBest", quiz.best); }
    if (q.item) {
      const w = weight(q.item.id);
      quiz.weights[q.item.id] = ok ? Math.max(0.5, w * 0.6) : Math.min(8, w * 2 + 1);
      store.set("quizWeights", JSON.stringify(quiz.weights));
    }
    [...quizEls.options.children].forEach((b, j) => {
      b.disabled = true;
      if (q.options[j] === q.answer) b.classList.add("is-right");
      else if (j === i) b.classList.add("is-wrong");
    });
    let msg;
    if (q.item) {
      const it = q.item, tex = writing[it.id].lo[0][1];
      msg = `${lower(it)} = ${nice(nameOf(it))} · ${tex}`;
      if (!ok) {
        const chosen = q.choices[i];
        msg = `${t("wrongIs")} ${lower(it)} = ${nice(nameOf(it))}. ${t("youChose")} ${nice(nameOf(chosen))} (${lower(chosen)}).`;
      }
    } else {
      msg = q.why;
    }
    quizEls.feedback.textContent = `${ok ? t("right") : t("wrong")} ${msg}`;
    quizEls.feedback.className = `quiz-feedback ${ok ? "is-right" : "is-wrong"}`;
    renderScore();
    quizEls.next.hidden = false;
    quizEls.next.focus();
  }

  function renderScore() {
    quizEls.score.textContent = t("score")(quiz.right, quiz.total, quiz.streak, quiz.best);
    const weak = data.filter(d => weight(d.id) >= 2).sort((a, b) => weight(b.id) - weight(a.id)).slice(0, 6);
    quizEls.review.textContent = weak.length ? `${t("review")} ${weak.map(lower).join("  ")}` : "";
  }

  function setMode(mode) {
    quiz.mode = mode;
    store.set("quizMode", mode);
    quizEls.modes.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.mode === mode)));
    newQuestion();
  }

  $("quizBtn").addEventListener("click", () => {
    if (letterDialog.open) letterDialog.hide();
    quizDialog.show();
    setMode(quiz.mode);
  });
  quizEls.modes.addEventListener("click", e => { const b = e.target.closest("button"); if (b) setMode(b.dataset.mode); });
  quizEls.next.addEventListener("click", newQuestion);
  document.addEventListener("keydown", e => {
    if (!quizDialog.open || e.altKey || e.ctrlKey || e.metaKey) return;
    const n = Number(e.key);
    if (n >= 1 && n <= 4 && !quiz.answered) { e.preventDefault(); answer(n - 1); }
  });

  /* ---------------------------------------------------------- tema */

  // O <head> já aplicou o tema antes da primeira pintura; aqui só o botão.
  const isLight = () => document.documentElement.getAttribute("data-theme") === "light";
  themeToggle.setAttribute("aria-pressed", String(isLight()));
  themeToggle.addEventListener("click", () => {
    const next = isLight() ? "dark" : "light";
    if (next === "light") document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
    themeToggle.setAttribute("aria-pressed", String(next === "light"));
    store.set("theme", next);
  });

  /* ---------------------------------------------------------- áudio */

  // O botão do canto toca o alfabeto inteiro; o "Ouvir" de cada letra toca
  // o arquivo dela (assets/audio/letters/, recortado por cortar-audio.mjs).
  // Nada é baixado antes do primeiro clique.
  let alphabet = null, clip = null;
  const setPlaying = on => {
    audioBtn.setAttribute("aria-pressed", String(on));
    label(audioBtn, on ? t("audioStop") : t("audioPlay"));
  };
  const stopClip = () => { if (clip) { clip.pause(); clip = null; } };

  audioBtn.addEventListener("click", () => {
    stopClip();
    if (!alphabet) {
      alphabet = new Audio("/assets/audio/greek-alphabet-pronunciation.mp3");
      alphabet.addEventListener("ended", () => setPlaying(false));
      alphabet.addEventListener("pause", () => setPlaying(false));
    }
    if (alphabet.paused) {
      alphabet.currentTime = 0;
      alphabet.play().then(() => setPlaying(true), () => setPlaying(false));
    } else {
      alphabet.pause();
    }
  });

  document.addEventListener("click", e => {
    const b = e.target.closest("[data-listen]");
    if (!b) return;
    if (alphabet && !alphabet.paused) alphabet.pause();
    stopClip();
    clip = new Audio(`/assets/audio/letters/${b.dataset.listen}.mp3`);
    clip.play().catch(() => { clip = null; });
  });

  /* ---------------------------------------------------------- imprimir */

  if (printBtn) printBtn.addEventListener("click", () => {
    closeModal();
    window.print();
  });

  /* ---------------------------------------------------------- offline */

  // O sw.js (gerado pelo build) guarda o site para abrir sem internet.
  if ("serviceWorker" in navigator) {
    addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
  }

  /* ---------------------------------------------------------- início */

  // Só a tabela é ajustada à tela. Ela muda de tamanho quando as fontes
  // chegam; o palco, quando a janela muda: os dois disparam o ajuste, que
  // roda uma vez por quadro.
  if (chart) {
    const ro = new ResizeObserver(scheduleFit);
    ro.observe(stage);
    ro.observe(chart);
    if (footer) ro.observe(footer);
    if (document.fonts) document.fonts.ready.then(scheduleFit);
    MOBILE.addEventListener("change", scheduleFit);
    scheduleFit();
  }
})();
