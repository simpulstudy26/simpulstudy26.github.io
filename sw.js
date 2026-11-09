// 심풀 스터디 서비스 워커 — 앱 설치 조건 충족 + 인터넷이 끊겼을 때 안내 화면
// 페이지는 항상 인터넷에서 새로 받아오므로, 사이트를 고치면 앱에도 바로 반영됩니다.
const CACHE = 'simpul-v1';
const OFFLINE_URL = './offline.html';

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll([OFFLINE_URL, './simpul-logo.png'])));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(() => caches.match(OFFLINE_URL)));
  }
});
