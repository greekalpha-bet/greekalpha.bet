// Gerado pelo build.mjs: não edite à mão.
const CACHE = "greekalpha-8";
const PRECACHE = [
  "/",
  "/cheat-sheet/",
  "/alpha/",
  "/beta/",
  "/gamma/",
  "/delta/",
  "/epsilon/",
  "/zeta/",
  "/eta/",
  "/theta/",
  "/iota/",
  "/kappa/",
  "/lambda/",
  "/mu/",
  "/nu/",
  "/xi/",
  "/omicron/",
  "/pi/",
  "/rho/",
  "/sigma/",
  "/tau/",
  "/upsilon/",
  "/phi/",
  "/chi/",
  "/psi/",
  "/omega/",
  "/pt/",
  "/pt/folha/",
  "/pt/alfa/",
  "/pt/beta/",
  "/pt/gama/",
  "/pt/delta/",
  "/pt/epsilon/",
  "/pt/zeta/",
  "/pt/eta/",
  "/pt/teta/",
  "/pt/iota/",
  "/pt/capa/",
  "/pt/lambda/",
  "/pt/mi/",
  "/pt/ni/",
  "/pt/csi/",
  "/pt/omicron/",
  "/pt/pi/",
  "/pt/ro/",
  "/pt/sigma/",
  "/pt/tau/",
  "/pt/upsilon/",
  "/pt/fi/",
  "/pt/qui/",
  "/pt/psi/",
  "/pt/omega/",
  "/style.css?v=8",
  "/data.js?v=8",
  "/script.js?v=8",
  "/assets/favicon.png",
  "/assets/icon-192.png",
  "/assets/mk-logo-white-300x.png"
];

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
