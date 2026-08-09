import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()

  // 每次路由切换滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // 是否显示底部导航：仅首页与历史页显示（HashRouter 下 pathname 与 BrowserRouter 一致，无需处理 hash）
  const showTabBar = ['/', '/history'].includes(location.pathname)

  return (
    <div className="app-container">
      <main className={`flex-1 ${showTabBar ? 'pb-20' : ''}`}>
        <Outlet />
      </main>

      {showTabBar && (
        <nav
          className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 w-full max-w-md bg-white/90 backdrop-blur-lg border-t border-slate-100"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="flex">
            <TabButton
              active={location.pathname === '/'}
              onClick={() => navigate('/')}
              label="首页"
              icon={
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <path d="M3 12l9-9 9 9M5 10v10h14V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
            <TabButton
              active={location.pathname === '/history'}
              onClick={() => navigate('/history')}
              label="历史"
              icon={
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <path d="M12 8v4l3 2M3 12a9 9 0 11.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 4v4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
          </div>
        </nav>
      )}
    </div>
  )
}

function TabButton({ active, onClick, label, icon }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center gap-1 py-2.5 transition ${
        active ? 'text-brand-600' : 'text-slate-400'
      }`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  )
}
