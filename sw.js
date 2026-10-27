const CACHE='kotoba-note-1793069756';
const ASSETS=["./", "index.html", "app.js", "manifest.webmanifest", "icon-192.png", "icon-512.png", "words/kanji.js", "words/rel.js", "words/kinfo.js", "words/n1.js", "words/n2.js", "words/n3.js", "words/n4.js", "words/n5.js"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(res=>{
    if(res.ok&&(new URL(e.request.url).origin===location.origin||/fonts\.g(oogleapis|static)\.com/.test(e.request.url))){const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}
    return res}).catch(()=>caches.match('index.html'))))});
