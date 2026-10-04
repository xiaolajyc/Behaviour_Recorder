const CACHE='pbt-v35-shell';
const SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('message',e=>{if(e.data?.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('fetch',e=>{
 const r=e.request,u=new URL(r.url);
 if(r.method!=='GET'||u.origin!==self.location.origin)return;
 if(r.mode==='navigate'||u.pathname.endsWith('.html')||u.pathname.endsWith('/manifest.json')||u.pathname.endsWith('/sw.js')){
  e.respondWith(fetch(r,{cache:'no-store'}).then(x=>{if(x.ok){const c=x.clone();caches.open(CACHE).then(k=>k.put(r,c));}return x;}).catch(()=>caches.match(r).then(x=>x||caches.match('./index.html'))));
 }else{
  e.respondWith(caches.match(r).then(x=>x||fetch(r).then(y=>{if(y.ok){const c=y.clone();caches.open(CACHE).then(k=>k.put(r,c));}return y;})));
 }
});