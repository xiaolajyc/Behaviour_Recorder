const CACHE_NAME='personal-behavior-tracker-v22-shell';
const APP_SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE_NAME).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==self.location.origin)return;e.respondWith(caches.match(r).then(c=>fetch(r).then(x=>{if(x.ok){const z=x.clone();caches.open(CACHE_NAME).then(a=>a.put(r,z))}return x}).catch(()=>c)||c))});