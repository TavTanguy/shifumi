const appInfo = {
  name: "",
  version: "",
  publicFiles: []
};
/* End For errors */ appInfo.publicFiles.push(
  ...[
    "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900",
    "https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css",
    "https://cdn.jsdelivr.net/npm/@mdi/font@latest/fonts/materialdesignicons-webfont.woff2?v=5.0.45"
  ]
);

const nameCache = `${appInfo.name}-${appInfo.version}`;

async function fromCache(request) {
  const cache = await caches.open(nameCache);
  const matching = await cache.match(request);
  if (matching) return matching;
  try {
    const url = new URL(request.url);
    if (url.pathname === "/" || url.pathname === "/noInternet") {
      url.pathname = "/index.html";
      return fromCache(url);
    }
  } catch (err) {
    throw new Error("no match");
  }

  throw new Error("no match");
}

async function fromNetwork(request) {
  return await fetch(request);
}

async function chaineReturn(req) {
  if (new URL(req.url).host === "shifumi.ttaverna.fr:8085") {
    return await fromNetwork(req);
  }
  try {
    return await fromCache(req);
  } catch (err) {
    try {
      return await fromNetwork(req);
    } catch (err) {
      return new Response("No internet");
    }
  }
}

async function preCache() {
  return caches.open(nameCache).then(function(cache) {
    cache.addAll(appInfo.publicFiles);
  });
}

self.addEventListener("install", ev => {
  ev.waitUntil(preCache());
});

self.addEventListener("fetch", function(ev) {
  ev.respondWith(chaineReturn(ev.request));
});
