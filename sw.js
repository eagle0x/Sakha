const CACHE_NAME = "sakha-pustika-v1";

const urlsToCache = [

"/",
"/index.html",
"/article.html",
"/styles.css",
"/script.js",
"/manifest.json",
"/articles/content.json"

];

self.addEventListener('install', () => {
    self.skipWaiting();
});

self.addEventListener(
"install",
event=>{

event.waitUntil(

caches.open(CACHE_NAME)
.then(cache=>{

return cache.addAll(
urlsToCache
);

})

);

});

self.addEventListener(
"fetch",
event=>{

event.respondWith(

caches.match(
event.request
)

.then(response=>{

return response ||
fetch(event.request);

})

);

});
