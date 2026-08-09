import { useNavigate } from 'react-router-dom'
import { loadHistory } from '../utils/storage.js'
import { dimensions } from '../data/questions.js'

export default function HomePage() {
  const navigate = useNavigate()
  const history = loadHistory()
  const latest = history[0]

  return (
    <div className="flex flex-col min-h-screen">
      {/* ========== 顶部 Hero ========== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-indigo-600 px-6 pt-10 pb-24 text-white">
        <div className="absolute top-0 right-0 w-56 h-56 -translate-y-20 translate-x-20 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 translate-y-32 -translate-x-20 rounded-full bg-purple-400/20 blur-3xl" />

        <div className="relative">
          {/* 品牌标识 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
                <span className="text-lg">✨</span>
              </div>
              <span className="font-bold text-lg tracking-wide">职业规划助手</span>
            </div>
            <button
              onClick={() => navigate('/history')}
              className="text-xs px-3 py-1.5 rounded-full bg-white/15 backdrop-blur hover:bg-white/25 active:scale-95 transition"
            >
              我的报告
            </button>
          </div>

          <div className="mt-10 animate-fade-in-up">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium backdrop-blur">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
              AI 智能匹配 · 3 分钟出结果
            </div>
            <h1 className="mt-4 text-[30px] leading-[1.25] font-extrabold tracking-tight">
              找到适合你的<br />
              职业方向
            </h1>
            <p className="mt-3 text-sm text-white/85 leading-relaxed">
              基于心理学测评模型,结合 AI 多维度分析,为你定制职业路径、优势分析与成长建议。
            </p>

            {/* 主 CTA */}
            <button
              onClick={() => navigate('/assessment')}
              className="mt-6 w-full rounded-2xl bg-white px-6 py-4 text-base font-bold text-brand-700 shadow-xl active:scale-[0.98] transition flex items-center justify-center gap-2"
            >
              立即免费测评
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* 信任指标 */}
            <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-white/70">
              <span className="flex items-center gap-1">🔒 数据本地安全</span>
              <span className="flex items-center gap-1">📄 一键导出报告</span>
              <span className="flex items-center gap-1">🆓 完全免费</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 内容区 ========== */}
      <div className="flex-1 -mt-14 px-4 pb-10 space-y-4">
        {/* 继续上次 */}
        {latest && (
          <div className="card animate-fade-in-up !py-3.5 flex items-center justify-between border-l-4 !border-l-brand-500">
            <div className="min-w-0 flex-1">
              <div className="text-[11px] text-brand-600 font-semibold">继续上次测评</div>
              <div className="font-semibold text-slate-700 truncate mt-0.5 text-sm">
                {latest.nickname || '匿名用户'} · 最佳匹配 {latest.result.careers[0]?.name}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {new Date(latest.createdAt).toLocaleDateString('zh-CN')}
              </div>
            </div>
            <button
              onClick={() => navigate(`/result/${latest.id}`)}
              className="shrink-0 rounded-xl bg-brand-600 text-white text-xs font-semibold px-3.5 py-2 active:scale-95 transition"
            >
              查看
            </button>
          </div>
        )}

        {/* 核心功能入口 */}
        <div className="grid grid-cols-2 gap-3 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
          <FuncCard
            color="from-orange-400 to-rose-500"
            icon="🎯"
            title="开始测评"
            desc="3 分钟完成 12 道题"
            onClick={() => navigate('/assessment')}
          />
          <FuncCard
            color="from-sky-400 to-indigo-500"
            icon="📋"
            title="历史记录"
            desc={`${history.length} 份历史报告`}
            onClick={() => navigate('/history')}
          />
          <FuncCard
            color="from-emerald-400 to-teal-500"
            icon="📊"
            title="维度解读"
            desc="6 大能力维度说明"
            onClick={() => {
              const el = document.getElementById('dimensions')
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
          />
          <FuncCard
            color="from-violet-400 to-fuchsia-500"
            icon="❓"
            title="常见问题"
            desc="解答你的疑问"
            onClick={() => {
              const el = document.getElementById('faq')
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
          />
        </div>

        {/* 为什么选择我们 */}
        <div className="card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="font-bold text-slate-800">为什么选择 AI 职业测评?</h3>
          <p className="text-xs text-slate-500 mt-1">科学模型 + AI 智能解读</p>
          <div className="mt-4 space-y-3.5">
            <Point
              icon="🧠"
              title="AI 智能分析引擎"
              desc="基于 12 道专业评估题,即时输出 6 大维度得分与综合画像,比传统问卷更高效。"
            />
            <Point
              icon="💼"
              title="18+ 职业方向推荐"
              desc="覆盖技术、设计、商业、服务、研究、执行 6 大职业群,匹配度清晰可见。"
            />
            <Point
              icon="🌱"
              title="可执行的成长建议"
              desc="不仅告诉你适合什么,更告诉你如何发展,让方向落地为具体行动。"
            />
          </div>
        </div>

        {/* 6 大维度说明 */}
        <div id="dimensions" className="card animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-bold text-slate-800">6 大评估维度</h3>
              <p className="text-xs text-slate-500 mt-0.5">全面剖析你的职业倾向</p>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-full bg-brand-50 text-brand-600 font-medium">
              专业模型
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {Object.values(dimensions).map((d) => (
              <div
                key={d.key}
                className="rounded-2xl bg-gradient-to-br from-slate-50 to-white p-3 border border-slate-100"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-sm">
                  {d.key}
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-800">{d.name}</div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{d.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 测评流程 */}
        <div className="card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="font-bold text-slate-800">简单三步,开启职业规划</h3>
          <div className="mt-4 relative">
            <StepLine
              n={1}
              title="回答 12 道测评题"
              desc="根据直觉选择最贴近你的选项,约 3 分钟完成"
              highlight
            />
            <StepLine
              n={2}
              title="AI 即时分析"
              desc="多维度计算你的职业倾向与匹配度"
            />
            <StepLine
              n={3}
              title="获取专属报告"
              desc="查看推荐职业、优势分析,一键导出 PDF"
              last
            />
          </div>
        </div>

        {/* FAQ */}
        <div id="faq" className="card animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
          <h3 className="font-bold text-slate-800">常见问题</h3>
          <div className="mt-3 space-y-3">
            <Faq
              q="测评结果准确吗?"
              a="测评基于职业兴趣、能力、性格与工作方式四大类题目设计,AI 综合输出匹配建议。结果仅供参考,帮助你更好地了解自己。"
            />
            <Faq
              q="需要支付费用吗?"
              a="完全免费。答题、查看结果、导出 PDF 报告都不收取任何费用。"
            />
            <Faq
              q="我的数据会被上传吗?"
              a="不会。所有答题记录都保存在你本机浏览器的 localStorage 中,不上传任何服务器,安全私密。"
            />
            <Faq
              q="可以多次测评吗?"
              a="可以。每次结果都自动保存在「历史记录」中,方便你对比不同阶段的职业倾向变化。"
            />
          </div>
        </div>

        {/* 底部终极 CTA */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-indigo-700 p-5 text-white animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <h3 className="text-xl font-bold leading-tight">准备好找到你的职业方向了吗?</h3>
            <p className="text-sm text-white/80 mt-2">3 分钟,给未来的自己一份礼物。</p>
            <button
              onClick={() => navigate('/assessment')}
              className="mt-4 w-full rounded-2xl bg-white py-3.5 text-base font-bold text-brand-700 shadow-lg active:scale-[0.98] transition"
            >
              🚀 立即开始免费测评
            </button>
          </div>
        </div>

        {/* 版权 */}
        <div className="text-center text-[11px] text-slate-400 pt-2 pb-4">
          © {new Date().getFullYear()} AI 职业规划助手 · 数据仅存于本机
        </div>
      </div>
    </div>
  )
}

function FuncCard({ color, icon, title, desc, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative overflow-hidden rounded-2xl p-4 text-left text-white shadow-md active:scale-[0.98] transition"
      style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
    >
      {/* 用 style 注入渐变以动态使用 color 变量 */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color}`} />
      <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-white/15" />
      <div className="relative">
        <div className="text-2xl">{icon}</div>
        <div className="text-sm font-bold mt-2">{title}</div>
        <div className="text-[11px] text-white/85 mt-0.5">{desc}</div>
      </div>
    </button>
  )
}

function Point({ icon, title, desc }) {
  return (
    <div className="flex gap-3">
      <div className="w-10 h-10 shrink-0 rounded-xl bg-brand-50 flex items-center justify-center text-xl">
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold text-slate-800">{title}</div>
        <div className="text-xs text-slate-500 leading-relaxed mt-0.5">{desc}</div>
      </div>
    </div>
  )
}

function StepLine({ n, title, desc, highlight, last }) {
  return (
    <div className="flex gap-3 relative">
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
          highlight ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30' : 'bg-brand-100 text-brand-600'
        }`}>
          {n}
        </div>
        {!last && <div className="flex-1 w-px bg-slate-200 my-1" />}
      </div>
      <div className={`${last ? '' : 'pb-4'}`}>
        <div className="text-sm font-semibold text-slate-800">{title}</div>
        <div className="text-xs text-slate-500 mt-1 leading-relaxed">{desc}</div>
      </div>
    </div>
  )
}

function Faq({ q, a }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3.5">
      <div className="text-sm font-semibold text-slate-800 flex gap-2">
        <span className="text-brand-600 shrink-0">Q.</span>
        <span>{q}</span>
      </div>
      <div className="text-xs text-slate-500 leading-relaxed mt-1.5 flex gap-2">
        <span className="text-slate-400 shrink-0">A.</span>
        <span>{a}</span>
      </div>
    </div>
  )
}
