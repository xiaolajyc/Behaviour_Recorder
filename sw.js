const CACHE_NAME='personal-behavior-tracker-v19-shell';
const APP_SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||u.origin!==self.location.origin)return;
  e.respondWith(caches.match(r).then(cached=>{
    const net=fetch(r).then(res=>{
      if(res&&res.ok){const copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put(r,copy));}
      return res;
    }).catch(()=>cached);
    return cached||net;
  }));
});