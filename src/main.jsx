import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App.jsx'
import HomePage from './pages/HomePage.jsx'
import AssessmentPage from './pages/AssessmentPage.jsx'
import ResultPage from './pages/ResultPage.jsx'
import ReportPage from './pages/ReportPage.jsx'
import HistoryPage from './pages/HistoryPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* HashRouter:静态托管下任何路径刷新都不会 404,路径形如 #/assessment */}
    <HashRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/result/:id" element={<ResultPage />} />
          <Route path="/report/:id" element={<ReportPage />} />
          <Route path="/history" element={<HistoryPage />} />
          {/* 未知路径:重定向回首页(兼容旧链接) */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
)

// ===== PWA:注册 Service Worker =====
// 只在生产环境与 HTTPS / localhost 下注册
if ('serviceWorker' in navigator) {
  const isSecure =
    window.location.protocol === 'https:' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'

  if (isSecure || import.meta.env.PROD) {
    window.addEventListener('load', () => {
      // 用相对路径注册,与 base:'./' 保持一致,适配任意部署路径
      const swUrl = `${import.meta.env.BASE_URL}sw.js`
      navigator.serviceWorker
        .register(swUrl, { scope: import.meta.env.BASE_URL })
        .then((reg) => {
          // 有新版本可用时立即激活(跳过 waiting)
          if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' })
          reg.addEventListener('updatefound', () => {
            const sw = reg.installing
            if (sw) {
              sw.addEventListener('statechange', () => {
                if (sw.state === 'installed' && navigator.serviceWorker.controller) {
                  // 新版本安装完成,刷新页面即可
                  console.info('[PWA] 新版本已安装,下次打开生效')
                }
              })
            }
          })
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker 注册失败:', err)
        })
    })

    // 新 SW 激活后立即刷新(让新版本立即生效)
    let refreshing = false
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return
      refreshing = true
      window.location.reload()
    })
  }
}
