import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { questions } from '../data/questions.js'
import { analyze } from '../utils/analysis.js'
import { saveRecord, genId } from '../utils/storage.js'

export default function AssessmentPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0) // 0 = 昵称页, 1..N = 题目, N+1 = 分析中
  const [nickname, setNickname] = useState('')
  const [answers, setAnswers] = useState([]) // [{ qid, dim, score, label }]
  const [analyzing, setAnalyzing] = useState(false)

  const totalSteps = questions.length
  const isIntro = step === 0
  const isQuestion = step >= 1 && step <= totalSteps
  const currentQuestion = isQuestion ? questions[step - 1] : null
  const progress = isQuestion ? (step / totalSteps) * 100 : isIntro ? 0 : 100

  function selectOption(opt) {
    const newAnswers = [...answers]
    newAnswers[step - 1] = {
      qid: currentQuestion.id,
      dim: opt.dim,
      score: opt.score,
      label: opt.label,
    }
    setAnswers(newAnswers)

    // 自动进入下一题
    if (step < totalSteps) {
      setTimeout(() => setStep(step + 1), 180)
    } else {
      // 完成所有题目，进入分析
      setAnalyzing(true)
      setStep(totalSteps + 1)
      setTimeout(() => {
        const result = analyze(newAnswers)
        const id = genId()
        const record = {
          id,
          nickname: nickname.trim() || '匿名用户',
          answers: newAnswers,
          result,
          createdAt: Date.now(),
        }
        saveRecord(record)
        navigate(`/result/${id}`, { replace: true })
      }, 1600)
    }
  }

  function prev() {
    if (step > 0) setStep(step - 1)
  }

  // 分析中页面
  if (analyzing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-8 text-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-4 border-brand-100" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-600 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-3xl">🧠</div>
        </div>
        <h2 className="mt-8 text-xl font-bold text-slate-800">AI 正在分析</h2>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          正在计算你的 6 大职业维度得分，<br />生成专属推荐方案…
        </p>
        <div className="mt-6 flex gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    )
  }

  // 昵称输入页
  if (isIntro) {
    return (
      <div className="flex flex-col min-h-screen px-6 pt-12">
        <button onClick={() => navigate('/')} className="btn-ghost self-start mb-4">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          返回
        </button>

        <div className="animate-fade-in-up">
          <div className="w-14 h-14 rounded-2xl bg-brand-100 flex items-center justify-center text-3xl">
            👋
          </div>
          <h1 className="mt-5 text-2xl font-bold text-slate-800">让我们开始吧</h1>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            请输入你的昵称（可选），便于保存与查找你的测评报告。
          </p>
        </div>

        <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <label className="text-sm font-medium text-slate-600">昵称</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="例如：小明"
            maxLength={20}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base text-slate-800 placeholder-slate-400 outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100 transition"
          />
        </div>

        <div className="mt-auto py-6">
          <button
            onClick={() => setStep(1)}
            className="btn-primary w-full"
          >
            开始答题
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p className="text-center text-xs text-slate-400 mt-3">
            共 {totalSteps} 题 · 约 3 分钟
          </p>
        </div>
      </div>
    )
  }

  // 答题页
  return (
    <div className="flex flex-col min-h-screen px-5 pt-12">
      {/* 顶部进度 */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={prev}
          className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 active:scale-90 transition"
          aria-label="上一题"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <div className="flex justify-between text-xs text-slate-400 mb-1.5">
            <span>第 {step} / {totalSteps} 题</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 题目 */}
      <div key={currentQuestion.id} className="animate-fade-in-up">
        <div className="text-xs font-medium text-brand-600 mb-2">
          {typeLabel(currentQuestion.type)}
        </div>
        <h2 className="text-xl font-bold text-slate-800 leading-snug">
          {currentQuestion.title}
        </h2>
        <p className="text-sm text-slate-400 mt-2">选择最贴近你的一项</p>
      </div>

      {/* 选项 */}
      <div className="mt-6 space-y-3">
        {currentQuestion.options.map((opt, i) => {
          const selected = answers[step - 1]?.label === opt.label
          return (
            <button
              key={i}
              onClick={() => selectOption(opt)}
              className={`w-full text-left rounded-2xl border-2 px-4 py-4 transition active:scale-[0.98] ${
                selected
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-slate-100 bg-white text-slate-700 hover:border-brand-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                    selected ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-[15px] font-medium leading-snug">{opt.label}</span>
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-auto py-6 flex justify-between text-xs text-slate-400">
        <span>凭直觉作答即可</span>
        <span>没有对错之分</span>
      </div>
    </div>
  )
}

function typeLabel(type) {
  const map = { interest: '兴趣倾向', ability: '能力评估', personality: '性格特质', workstyle: '工作方式' }
  return map[type] || '测评'
}
