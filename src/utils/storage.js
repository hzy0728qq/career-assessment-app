// 用户数据持久化：基于 localStorage 保存测评历史
// 结构：[{ id, nickname, answers, result, createdAt }]

const STORAGE_KEY = 'career_assessment_history_v1'

export function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export function saveRecord(record) {
  const list = loadHistory()
  // 同一 id 覆盖，否则插入到最前
  const idx = list.findIndex((r) => r.id === record.id)
  if (idx >= 0) {
    list[idx] = record
  } else {
    list.unshift(record)
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  return record
}

export function getRecord(id) {
  return loadHistory().find((r) => r.id === id) || null
}

export function deleteRecord(id) {
  const list = loadHistory().filter((r) => r.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY)
}

// 生成唯一 id
export function genId() {
  return 'r_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}
