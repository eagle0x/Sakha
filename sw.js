const CACHE_NAME = "sakha-pustika-v1";

const urlsToCache = [

    "/",
    "/articles/content.json",
    "/videos/flag.mp4"

];

/* -------------------------
   INSTALL
-------------------------- */

self.addEventListener(
"install",
event => {

    self.skipWaiting();

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(cache => {

            return cache.addAll(
                urlsToCache
            );

        })

    );

});

/* -------------------------
   ACTIVATE
-------------------------- */

self.addEventListener(
"activate",
event => {

    event.waitUntil(

        Promise.all([

            clients.claim(),

            caches.keys()
            .then(keys => {

                return Promise.all(

                    keys.map(key => {

                        if(
                        key !== CACHE_NAME
                        ){

                            return caches.delete(
                            key
                            );

                        }

                    })

                );

            })

        ])

    );

});

/* -------------------------
   FETCH
-------------------------- */

self.addEventListener(
"fetch",
event => {

    event.respondWith(

        fetch(event.request)

        .then(response => {

            const copy =
            response.clone();

            caches.open(
            CACHE_NAME
            ).then(cache => {

                cache.put(
                event.request,
                copy
                );

            });

            return response;

        })

        .catch(() => {

            return caches.match(
            event.request
            );

        })

    );

});
