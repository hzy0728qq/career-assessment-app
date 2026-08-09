import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 text-center animate-fade-in">
      <div className="text-7xl mb-4">🧭</div>
      <h2 className="text-2xl font-bold text-slate-800">页面迷路了</h2>
      <p className="text-sm text-slate-500 mt-2">该页面不存在或已被移除</p>
      <div className="flex gap-3 mt-8">
        <button onClick={() => navigate('/history')} className="btn-secondary">
          历史记录
        </button>
        <button onClick={() => navigate('/')} className="btn-primary">
          回到首页
        </button>
      </div>
    </div>
  )
}
