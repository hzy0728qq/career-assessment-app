// AI 分析引擎：根据答题结果计算各维度得分，生成职业推荐与解读
import { dimensions, careers } from '../data/questions.js'

// 计算各维度得分
export function calcScores(answers) {
  const scores = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 }
  answers.forEach((a) => {
    if (a.dim && scores[a.dim] !== undefined) {
      scores[a.dim] += a.score || 0
    }
  })
  return scores
}

// 归一化为百分比（按最大可能分值）
export function normalize(scores) {
  const max = Math.max(...Object.values(scores), 1)
  const result = {}
  Object.entries(scores).forEach(([k, v]) => {
    result[k] = Math.round((v / max) * 100)
  })
  return result
}

// 取前三维度
export function topDimensions(scores, n = 3) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([key, value]) => ({ ...dimensions[key], score: value }))
}

// 生成完整分析结果
export function analyze(answers) {
  const rawScores = calcScores(answers)
  const scores = normalize(rawScores)
  const top = topDimensions(rawScores, 3)

  // 主维度职业推荐
  const primary = top[0]
  const recommendedCareers = primary ? careers[primary.key] || [] : []

  // 优势 / 发展建议
  const strengths = top
    .filter((d) => d.score > 0)
    .map((d) => `${d.name}（${d.desc}）`)

  const weakKeys = Object.entries(rawScores)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 2)
    .map(([k]) => dimensions[k])
  const developAreas = weakKeys.map((d) => `${d.name}：可适度拓展${d.desc.replace(/擅长|善于|喜欢|注重|富有/g, '')}相关能力`)

  // 综合职业类型描述
  const profile = buildProfile(top)

  return {
    scores,
    topDimensions: top,
    careers: recommendedCareers,
    strengths,
    developAreas,
    profile,
    summary: buildSummary(top, recommendedCareers),
  }
}

function buildProfile(top) {
  const names = top.filter((d) => d.score > 0).map((d) => d.name)
  if (names.length === 0) return '你是一个均衡型的人才，各方面能力较为平均。'
  return `你是一个以「${names.slice(0, 2).join(' + ')}」见长的复合型人才，兼具理性与温度。`
}

function buildSummary(top, recommendedCareers) {
  const primary = top[0]
  if (!primary || recommendedCareers.length === 0) {
    return '根据你的作答，建议你多尝试不同领域，进一步发现自己的热情所在。'
  }
  const best = recommendedCareers[0]
  return `你的核心优势集中在「${primary.name}」方向。综合分析，最匹配你的职业是「${best.name}」，匹配度高达 ${best.match}%。${best.desc}`
}
