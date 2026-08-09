import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getRecord } from '../utils/storage.js'
import { generatePdfFromReport } from '../utils/pdfGenerator.js'
import { dimensions } from '../data/questions.js'

export default function ReportPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const record = getRecord(id)
  const [generating, setGenerating] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  if (!record) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-8 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-lg font-bold text-slate-800">未找到测评记录</h2>
        <button onClick={() => navigate('/')} className="btn-primary mt-6">返回首页</button>
      </div>
    )
  }

  const { result, nickname, createdAt } = record
  const sortedScores = Object.entries(result.scores).sort((a, b) => b[1] - a[1])

  async function handleGenerate() {
    setGenerating(true)
    setError('')
    try {
      await generatePdfFromReport(result, { nickname, createdAt })
      setDone(true)
    } catch (e) {
      setError('生成失败，请重试：' + (e?.message || '未知错误'))
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* 顶部 */}
      <div className="bg-gradient-to-br from-brand-600 to-brand-700 px-5 pt-12 pb-10 text-white">
        <button
          onClick={() => navigate(`/result/${id}`)}
          className="btn-ghost !text-white/80 -ml-2 mb-2"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          返回结果
        </button>
        <div className="animate-fade-in-up">
          <div className="text-4xl">📄</div>
          <h1 className="mt-2 text-2xl font-bold">PDF 报告</h1>
          <p className="text-sm text-white/70 mt-1">预览并下载你的专属职业测评报告</p>
        </div>
      </div>

      <div className="flex-1 px-4 -mt-6 pb-6">
        {/* 报告预览 */}
        <div className="card !p-0 overflow-hidden animate-fade-in-up">
          {/* 报告头 */}
          <div className="bg-gradient-to-r from-brand-50 to-purple-50 px-5 py-4 text-center">
            <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 items-center justify-center text-white font-bold">
              AI
            </div>
            <h2 className="mt-2 text-lg font-bold text-slate-800">AI 职业测评报告</h2>
            <div className="text-xs text-slate-400 mt-1">
              {new Date(createdAt).toLocaleString('zh-CN')}
            </div>
          </div>

          <div className="p-5 space-y-4">
            {/* 测评人 */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-brand-600 font-medium">测评人</span>
              <span className="font-bold text-slate-800">{nickname}</span>
            </div>

            {/* AI 分析摘要 */}
            <div>
              <div className="text-xs font-bold text-brand-600 mb-1.5">AI 综合分析</div>
              <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-xl p-3">
                {result.summary}
              </p>
            </div>

            {/* 维度得分 */}
            <div>
              <div className="text-xs font-bold text-brand-600 mb-2">维度得分</div>
              <div className="space-y-2">
                {sortedScores.map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600">{dimensions[key].name}</span>
                      <span className="text-brand-600 font-bold">{value}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 推荐职业 */}
            <div>
              <div className="text-xs font-bold text-brand-600 mb-2">推荐职业方向</div>
              <div className="space-y-2">
                {result.careers.map((c, i) => (
                  <div key={i} className="rounded-xl bg-slate-50 p-3 border-l-2 border-brand-500">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-slate-800">{c.name}</span>
                      <span className="text-brand-600 font-bold">匹配 {c.match}%</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center text-[10px] text-slate-300 border-t border-slate-50 py-3">
            本报告由 AI 职业测评系统生成 · 仅供参考
          </div>
        </div>

        {/* 状态提示 */}
        {done && (
          <div className="mt-4 rounded-2xl bg-emerald-50 border border-emerald-100 px-4 py-3 flex items-center gap-2 animate-fade-in">
            <span className="text-emerald-500 text-lg">✅</span>
            <span className="text-sm text-emerald-700">PDF 已生成并开始下载，请到下载目录查看。</span>
          </div>
        )}
        {error && (
          <div className="mt-4 rounded-2xl bg-red-50 border border-red-100 px-4 py-3 flex items-center gap-2 animate-fade-in">
            <span className="text-red-500 text-lg">⚠️</span>
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        {/* 操作 */}
        <div className="mt-5 space-y-3">
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="btn-primary w-full"
          >
            {generating ? (
              <>
                <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                正在生成 PDF…
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                下载 PDF 报告
              </>
            )}
          </button>
          <button
            onClick={() => navigate('/history')}
            className="btn-secondary w-full"
          >
            查看历史记录
          </button>
        </div>
      </div>
    </div>
  )
}
