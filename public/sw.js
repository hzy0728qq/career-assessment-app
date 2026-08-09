/* AI 职业规划助手 - Service Worker
 * 策略:App Shell 缓存优先 + 运行时 Stale-While-Revalidate
 * 纯静态 SPA,适配 HashRouter(Vite base='./' 产出相对路径引用)
 */
const CACHE_VERSION = 'career-app-v1'
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './favicon.svg',
  './icons/icon-192.svg',
  './icons/icon-512.svg'
]

// 安装:缓存 App Shell 并立即激活
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  )
})

// 激活:清理旧版本缓存,并立即接管所有 client
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

// 消息:收到 SKIP_WAITING 时立即激活新版本(由注册端发送)
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting()
})

// 请求拦截:
// - navigate 请求(index.html):网络优先,失败回退缓存
// - 同源静态资源(assets/):Stale-While-Revalidate
// - 其他请求(跨域、图片等):缓存优先,不缓存失败
self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return

  const url = new URL(req.url)

  // 导航请求(例如刷新页面):网络优先
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE_VERSION).then((c) => c.put(req, copy))
          return res
        })
        .catch(() => caches.match('./index.html').then((r) => r || caches.match('./')))
    )
    return
  }

  // 同源静态资源:SWR
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const fetchPromise = fetch(req)
          .then((res) => {
            if (res && res.status === 200 && res.type !== 'opaque') {
              const copy = res.clone()
              caches.open(CACHE_VERSION).then((c) => c.put(req, copy))
            }
            return res
          })
          .catch(() => cached)
        return cached || fetchPromise
      })
    )
    return
  }

  // 跨域请求:直接通过
  event.respondWith(fetch(req).catch(() => Response.error()))
})
