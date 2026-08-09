import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadHistory, deleteRecord, clearHistory } from '../utils/storage.js'

export default function HistoryPage() {
  const navigate = useNavigate()
  const [history, setHistory] = useState(() => loadHistory())

  function handleDelete(id) {
    deleteRecord(id)
    setHistory(loadHistory())
  }

  function handleClear() {
    if (confirm('确定清空全部测评记录吗？此操作不可恢复。')) {
      clearHistory()
      setHistory([])
    }
  }

  return (
    <div className="flex flex-col min-h-screen px-5 pt-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">历史记录</h1>
          <p className="text-sm text-slate-500 mt-1">
            共 {history.length} 条测评记录
          </p>
        </div>
        {history.length > 0 && (
          <button onClick={handleClear} className="btn-ghost text-red-400">
            清空
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-lg font-bold text-slate-700">还没有测评记录</h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xs">
            完成一次职业测评后，记录会保存在这里，方便随时回顾。
          </p>
          <button
            onClick={() => navigate('/assessment')}
            className="btn-primary mt-6"
          >
            开始第一次测评
          </button>
        </div>
      ) : (
        <div className="mt-5 space-y-3 pb-4">
          {history.map((r, idx) => {
            const best = r.result?.careers?.[0]
            return (
              <div
                key={r.id}
                className="card animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1" onClick={() => navigate(`/result/${r.id}`)}>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800">{r.nickname}</span>
                      {idx === 0 && (
                        <span className="text-[10px] bg-brand-100 text-brand-600 px-1.5 py-0.5 rounded-full font-medium">
                          最新
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {new Date(r.createdAt).toLocaleString('zh-CN')}
                    </div>
                    {best && (
                      <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-brand-600 bg-brand-50 px-2 py-1 rounded-lg">
                        🎯 {best.name} · {best.match}%
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-3">
                    <button
                      onClick={() => navigate(`/result/${r.id}`)}
                      className="text-xs text-brand-600 font-medium"
                    >
                      查看 →
                    </button>
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-xs text-slate-300 active:text-red-400"
                      aria-label="删除"
                    >
                      删除
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
