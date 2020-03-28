const appInfo = {"name":"clientv5","version":"0.1.0","publicFiles":["/ciseau.png","/css/chunk-vendors.31652908.css","/feuille.png","/fonts/Roboto-Black.313a6563.woff","/fonts/Roboto-Black.59eb3601.woff2","/fonts/Roboto-BlackItalic.cc2fadc3.woff","/fonts/Roboto-BlackItalic.f75569f8.woff2","/fonts/Roboto-Bold.50d75e48.woff","/fonts/Roboto-Bold.b52fac2b.woff2","/fonts/Roboto-BoldItalic.4fe0f73c.woff","/fonts/Roboto-BoldItalic.94008e69.woff2","/fonts/Roboto-Light.c73eb1ce.woff","/fonts/Roboto-Light.d26871e8.woff2","/fonts/Roboto-LightItalic.13efe6cb.woff","/fonts/Roboto-LightItalic.e8eaae90.woff2","/fonts/Roboto-Medium.1d659482.woff","/fonts/Roboto-Medium.90d16760.woff2","/fonts/Roboto-MediumItalic.13ec0eb5.woff2","/fonts/Roboto-MediumItalic.83e114c3.woff","/fonts/Roboto-Regular.35b07eb2.woff","/fonts/Roboto-Regular.73f0a88b.woff2","/fonts/Roboto-RegularItalic.4357beb8.woff2","/fonts/Roboto-RegularItalic.f5902d5e.woff","/fonts/Roboto-Thin.ad538a69.woff2","/fonts/Roboto-Thin.d3b47375.woff","/fonts/Roboto-ThinItalic.5b4a33e1.woff2","/fonts/Roboto-ThinItalic.8a96edbb.woff","/fonts/materialdesignicons-webfont.541e65fb.eot","/fonts/materialdesignicons-webfont.c61b9c12.woff2","/fonts/materialdesignicons-webfont.fc03f7f1.ttf","/fonts/materialdesignicons-webfont.ff13d121.woff","/icons/android-icon-192x192-dunplab-manifest-1528.png","/icons/apple-icon-114x114-dunplab-manifest-1528.png","/icons/apple-icon-120x120-dunplab-manifest-1528.png","/icons/apple-icon-144x144-dunplab-manifest-1528.png","/icons/apple-icon-152x152-dunplab-manifest-1528.png","/icons/apple-icon-180x180-dunplab-manifest-1528.png","/icons/apple-icon-57x57-dunplab-manifest-1528.png","/icons/apple-icon-60x60-dunplab-manifest-1528.png","/icons/apple-icon-72x72-dunplab-manifest-1528.png","/icons/apple-icon-76x76-dunplab-manifest-1528.png","/icons/favicon-16x16-dunplab-manifest-1528.png","/icons/favicon-32x32-dunplab-manifest-1528.png","/icons/favicon-96x96-dunplab-manifest-1528.png","/index.html","/js/app.3d0b7c72.js","/js/app.3d0b7c72.js.map","/js/chunk-00274929.d39dcef0.js","/js/chunk-00274929.d39dcef0.js.map","/js/chunk-2d0a4fd8.ff15566b.js","/js/chunk-2d0a4fd8.ff15566b.js.map","/js/chunk-vendors.d34a5a07.js","/js/chunk-vendors.d34a5a07.js.map","/manifest.json","/pierre.png"]} /*const appInfo = {
  name: "",
  version: "",
  publicFiles: []
};
/* End For errors */ appInfo.publicFiles.push(
  ...["https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900", "https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css"]
);

const nameCache = `${appInfo.name}-${appInfo.version}`;

async function fromCache(request) {
  const cache = await caches.open(nameCache);
  const matching = await cache.match(request);
  if (matching) return matching;
  if (new URL(request.url).pathname === "/") return fromCache(request.url + "index.html");

  throw new Error("no match");
}

async function fromNetwork(request) {
  return await fetch(request);
}

async function chaineReturn(req) {
  /*if (new URL(req.url).host === "localhost:8085") {
    return await fromNetwork(req);
  }*/
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
