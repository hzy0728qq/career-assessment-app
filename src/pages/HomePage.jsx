import { useNavigate } from 'react-router-dom'
import { loadHistory } from '../utils/storage.js'

export default function HomePage() {
  const navigate = useNavigate()
  const history = loadHistory()
  const latest = history[0]

  return (
    <div className="flex flex-col min-h-screen">
      {/* 顶部 Hero 区 */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 px-6 pt-14 pb-20 text-white">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-16 -left-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" />

        <div className="relative animate-fade-in-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
            AI 驱动 · 精准分析
          </div>
          <h1 className="mt-5 text-3xl font-bold leading-tight">
            发现你的<br />职业方向
          </h1>
          <p className="mt-3 text-sm text-white/80 leading-relaxed">
            通过 12 道科学测评题，AI 即时分析你的兴趣、能力与性格，
            生成专属职业推荐与成长建议。
          </p>
        </div>
      </div>

      {/* 内容区 */}
      <div className="flex-1 -mt-10 px-5 pb-6">
        {/* 主行动卡 */}
        <div className="card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 flex items-center justify-center text-2xl">
              🎯
            </div>
            <div>
              <div className="font-semibold text-slate-800">开始职业测评</div>
              <div className="text-xs text-slate-500">约 3 分钟 · 12 道题</div>
            </div>
          </div>
          <button
            onClick={() => navigate('/assessment')}
            className="btn-primary w-full mt-4"
          >
            立即开始测评
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* 继续上次 */}
        {latest && (
          <div
            className="card mt-4 flex items-center justify-between animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="min-w-0">
              <div className="text-xs text-brand-600 font-medium">最近一次测评</div>
              <div className="font-medium text-slate-700 truncate mt-0.5">
                {latest.nickname || '匿名用户'}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {new Date(latest.createdAt).toLocaleDateString('zh-CN')}
              </div>
            </div>
            <button
              onClick={() => navigate(`/result/${latest.id}`)}
              className="btn-secondary !py-2 !px-4 text-sm whitespace-nowrap"
            >
              查看
            </button>
          </div>
        )}

        {/* 特色介绍 */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          <Feature icon="🧠" title="AI 分析" desc="智能推荐" />
          <Feature icon="📊" title="多维评估" desc="6 大维度" />
          <Feature icon="📄" title="PDF 报告" desc="一键下载" />
        </div>

        {/* 流程说明 */}
        <div className="card mt-5 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="text-sm font-semibold text-slate-800 mb-3">测评流程</div>
          <Step n={1} title="回答测评问题" desc="根据直觉选择最贴近你的选项" />
          <Step n={2} title="AI 即时分析" desc="多维度计算你的职业倾向" />
          <Step n={3} title="查看结果与报告" desc="生成 PDF 可保存分享" />
        </div>
      </div>
    </div>
  )
}

function Feature({ icon, title, desc }) {
  return (
    <div className="card !p-3 text-center">
      <div className="text-2xl">{icon}</div>
      <div className="text-xs font-semibold text-slate-700 mt-1">{title}</div>
      <div className="text-[10px] text-slate-400">{desc}</div>
    </div>
  )
}

function Step({ n, title, desc }) {
  return (
    <div className="flex gap-3 py-2">
      <div className="w-7 h-7 rounded-full bg-brand-100 text-brand-600 text-sm font-bold flex items-center justify-center shrink-0">
        {n}
      </div>
      <div className="pt-0.5">
        <div className="text-sm font-medium text-slate-700">{title}</div>
        <div className="text-xs text-slate-400 mt-0.5">{desc}</div>
      </div>
    </div>
  )
}
