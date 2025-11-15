const CACHE_NAME = 'tongxin-ai-cache-v1';
const FILES_TO_CACHE = [
    '/childhood1/',
    '/childhood1/index.html',
    '/childhood1/style.css',
    '/childhood1/app.js',
    '/childhood1/model-config.js',
    '/childhood1/manifest.json',
    '/childhood1/1763195248351.png'
];

// 安装 Service Worker 并缓存文件
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] 缓存所有文件');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// 激活 SW 并清理旧缓存
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('[ServiceWorker] 删除旧缓存:', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// 拦截请求，优先返回缓存
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
