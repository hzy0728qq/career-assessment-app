import { useNavigate, useParams } from 'react-router-dom'
import { getRecord } from '../utils/storage.js'
import { dimensions } from '../data/questions.js'

export default function ResultPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const record = getRecord(id)

  if (!record) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-8 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-lg font-bold text-slate-800">未找到测评记录</h2>
        <p className="text-sm text-slate-500 mt-2">该记录可能已被删除</p>
        <button onClick={() => navigate('/')} className="btn-primary mt-6">
          返回首页
        </button>
      </div>
    )
  }

  const { result, nickname, createdAt } = record
  const { scores, careers, strengths, developAreas, profile, summary } = result
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const best = careers[0]

  return (
    <div className="flex flex-col min-h-screen">
      {/* 顶部 */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 px-5 pt-12 pb-16 text-white">
        <button
          onClick={() => navigate('/')}
          className="btn-ghost !text-white/80 mb-2 -ml-2"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          首页
        </button>

        <div className="text-center animate-fade-in-up">
          <div className="text-xs text-white/70">AI 测评完成</div>
          <div className="mt-1 inline-flex items-center gap-2">
            <span className="text-4xl">🎉</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold">{nickname}，这是你的结果</h1>
          <p className="text-xs text-white/60 mt-1">
            {new Date(createdAt).toLocaleString('zh-CN')}
          </p>
        </div>
      </div>

      <div className="flex-1 -mt-8 px-4 pb-6 space-y-4">
        {/* 最佳匹配卡 */}
        {best && (
          <div className="card animate-fade-in-up !p-0 overflow-hidden">
            <div className="bg-gradient-to-r from-brand-50 to-purple-50 px-5 py-4">
              <div className="text-xs font-medium text-brand-600">最佳职业匹配</div>
              <div className="mt-1 flex items-end justify-between">
                <span className="text-2xl font-bold text-slate-800">{best.name}</span>
                <span className="text-3xl font-bold text-brand-600">{best.match}<span className="text-base">%</span></span>
              </div>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm text-slate-600 leading-relaxed">{best.desc}</p>
            </div>
          </div>
        )}

        {/* AI 综合分析 */}
        <div className="card animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
          <SectionTitle icon="🧠" title="AI 综合分析" />
          <p className="text-sm text-slate-600 leading-relaxed mt-2">{summary}</p>
          <p className="text-sm text-slate-500 leading-relaxed mt-2">{profile}</p>
        </div>

        {/* 维度得分 */}
        <div className="card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <SectionTitle icon="📊" title="维度得分" />
          <div className="mt-3 space-y-3">
            {sortedScores.map(([key, value]) => (
              <ScoreBar key={key} label={dimensions[key].name} value={value} />
            ))}
          </div>
        </div>

        {/* 推荐职业 */}
        <div className="card animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <SectionTitle icon="💼" title="推荐职业方向" />
          <div className="mt-3 space-y-2.5">
            {careers.map((c, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-lg shrink-0">
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800 text-sm">{c.name}</span>
                    <span className="text-sm font-bold text-brand-600">{c.match}%</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 优势与发展 */}
        <div className="grid grid-cols-1 gap-4">
          <div className="card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <SectionTitle icon="💪" title="核心优势" color="text-emerald-600" />
            <ul className="mt-2 space-y-2">
              {strengths.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
                  <span className="text-emerald-500 shrink-0">✓</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
            <SectionTitle icon="🌱" title="发展建议" color="text-amber-600" />
            <ul className="mt-2 space-y-2">
              {developAreas.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
                  <span className="text-amber-500 shrink-0">→</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => navigate('/assessment')}
            className="btn-secondary flex-1"
          >
            重新测评
          </button>
          <button
            onClick={() => navigate(`/report/${id}`)}
            className="btn-primary flex-1"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 2v6h6M9 13h6M9 17h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            生成报告
          </button>
        </div>
      </div>
    </div>
  )
}

function SectionTitle({ icon, title, color = 'text-brand-600' }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg">{icon}</span>
      <span className={`text-sm font-bold ${color}`}>{title}</span>
    </div>
  )
}

function ScoreBar({ label, value }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-600 font-medium">{label}</span>
        <span className="text-brand-600 font-bold">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 animate-progress"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
