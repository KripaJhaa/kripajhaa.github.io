var CACHE_NAME = 'flappyBird';

var filesToCache = [
    
    '/index.html',
    
    '/css/main.css',
    '/css/reset.css',
    
    '/assets/sounds/sfx_swooshing.ogg',
    '/assets/sounds/sfx_wing.ogg',
    '/assets/sounds/sfx_point.ogg',
    '/assets/sounds/sfx_hit.ogg',
    '/assets/sounds/sfx_die.ogg',
    
   
    '/assets/ic12.png',
    '/assets/ic25.png',
    '/assets/ic48.png',
    '/assets/ic51.png',
    '/assets/ic64.png',
    'myicon.png',
   
    '/assets/ceiling.png',
    '/assets/font_big_0.png',
    '/assets/font_big_1.png',
    '/assets/font_big_2.png',
    '/assets/font_big_3.png',
    '/assets/font_big_4.png',
    '/assets/font_big_5.png',
    '/assets/font_big_6.png',
    '/assets/font_big_7.png',
    '/assets/font_big_8.png',
    '/assets/font_big_9.png',
    '/assets/font_small_0.png',
    '/assets/font_small_1.png',
    '/assets/font_small_2.png',
    '/assets/font_small_3.png',
    '/assets/font_small_4.png',
    '/assets/font_small_5.png',
    '/assets/font_small_6.png',
    '/assets/font_small_7.png',
    '/assets/font_small_8.png',
    '/assets/font_small_9.png',
    '/assets/land.png',
    '/assets/medal_bronze.png',
    '/assets/medal_gold.png',
    '/assets/medal_platinum.png',
    '/assets/medal_silver.png',
    '/assets/pipe.png',
    '/assets/pipe-down.png',
    '/assets/pipe-up.png',
    '/assets/replay.png',
    '/assets/scoreboard.png',
    '/assets/sky.png',
    '/assets/splash.png',
    '/assets/thumb.png',
    
    
    
  'js/buzz.min.js',
  '/js/jquery.min.js',
  '/js/jquery.transit.min.js',
  '/js/main.js'
];


self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});


//self.addEventListener('activate', function(e) {
//  console.log('[ServiceWorker] Activate');
//    
//  e.waitUntil(
//    caches.keys().then(function(keyList) {
//      return Promise.all(keyList.map(function(key) {
//        if (key !== cacheName) {
//          console.log('[ServiceWorker] Removing old cache', key);
//          return caches.delete(key);
//        }
//      }));
//    })
//  );
//       
//  return self.clients.claim();
//});


//self.addEventListener('fetch', function(e) {
//  /*console.log('[ServiceWorker] Fetch', e.request.url);*/
//  e.respondWith(
//    caches.match(e.request).then(function(response) {
//        
////        var fetchPromise=fetch(e.request).then(function(networkResponse){
////            if(networkResponse){
////                cache.put(e.request,networkResponse.clone());
////            }
////            return networkResponse;
////        },function(e){
////            
////        });
//      return response || fetch(e.request);
//    })
//  );
//});


self.addEventListener('fetch', function(event) {
    event.respondWith(caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(response) {
            //console.log("cache request: " + event.request.url);
            var fetchPromise = fetch(event.request).then(function(networkResponse) {
                
                if (networkResponse) {
                   
                    cache.put(event.request, networkResponse.clone());
                }
                return networkResponse;
            }, function (e) {
                
                
            });

            // respond from the cache, or the network
            return response || fetchPromise;
        });
    }));
});

