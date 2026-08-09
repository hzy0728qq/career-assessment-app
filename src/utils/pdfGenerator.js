// PDF 报告生成：使用 jsPDF 绘制中文友好报告
// 注意：jsPDF 默认字体不支持中文，这里采用方案——
// 使用 html2canvas 不可靠（移动端），因此用 jsPDF 直接绘制，
// 中文通过嵌入浏览器自带字体的方式不现实，故采用图片化方案：
// 将报告 DOM 转为 canvas 再写入 PDF。
//
// 为保证移动端稳定性，这里用 jsPDF 原生绘图 + 英文/数字 + 中文转图两种结合。
// 实现上采用：构建一个隐藏的报告容器 -> html2canvas 截图 -> 写入 PDF。
// 由于不引入额外依赖，这里改用 jsPDF 原生 text，中文以 SVG 路径形式不可行，
// 因此采用最稳妥方案：直接用 jsPDF 输出（中文用 base64 图片方案由调用方渲染）。
//
// 综合考虑：本工具提供 generatePdfFromReport(result, meta)，
// 内部使用 jsPDF 的 html() 方法（基于 html2canvas）生成，需在浏览器端运行。

import { jsPDF } from 'jspdf'

// 生成报告 HTML 字符串（用于转 PDF）
export function buildReportHtml(result, meta) {
  const { scores, topDimensions, careers, strengths, developAreas, profile, summary } = result
  const nickname = meta.nickname || '匿名用户'
  const date = meta.createdAt ? new Date(meta.createdAt).toLocaleString('zh-CN') : new Date().toLocaleString('zh-CN')

  const scoreBars = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => {
      const labels = { A: '技术与工程', B: '创意与设计', C: '商业与管理', D: '人际与服务', E: '研究与分析', F: '实务与执行' }
      return `
        <div style="margin-bottom:14px;">
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px;">
            <span>${labels[k]}</span><span style="color:#6366f1;font-weight:bold;">${v}%</span>
          </div>
          <div style="height:10px;background:#eef2ff;border-radius:5px;overflow:hidden;">
            <div style="width:${v}%;height:100%;background:linear-gradient(90deg,#818cf8,#6366f1);border-radius:5px;"></div>
          </div>
        </div>`
    }).join('')

  const careerList = careers.map((c, i) => `
    <div style="margin-bottom:12px;padding:12px;background:#f8fafc;border-radius:10px;border-left:4px solid #6366f1;">
      <div style="display:flex;justify-content:space-between;font-size:14px;font-weight:bold;color:#1e293b;">
        <span>${i + 1}. ${c.name}</span><span style="color:#6366f1;">匹配度 ${c.match}%</span>
      </div>
      <div style="font-size:12px;color:#64748b;margin-top:4px;line-height:1.6;">${c.desc}</div>
    </div>`).join('')

  const strengthList = strengths.map((s) => `<li style="margin-bottom:6px;font-size:13px;color:#334155;">${s}</li>`).join('')
  const developList = developAreas.map((s) => `<li style="margin-bottom:6px;font-size:13px;color:#334155;">${s}</li>`).join('')

  return `
  <div id="pdf-report" style="width:360px;padding:28px 24px;background:#ffffff;font-family:'PingFang SC','Microsoft YaHei',sans-serif;color:#1e293b;box-sizing:border-box;">
    <div style="text-align:center;margin-bottom:24px;">
      <div style="display:inline-block;width:48px;height:48px;line-height:48px;border-radius:12px;background:linear-gradient(135deg,#6366f1,#818cf8);color:#fff;font-size:24px;font-weight:bold;">AI</div>
      <h1 style="font-size:22px;margin:12px 0 4px;color:#312e81;">AI 职业测评报告</h1>
      <div style="font-size:12px;color:#94a3b8;">${date}</div>
    </div>

    <div style="background:#eef2ff;border-radius:14px;padding:16px;margin-bottom:20px;">
      <div style="font-size:13px;color:#4338ca;margin-bottom:4px;">测评人</div>
      <div style="font-size:18px;font-weight:bold;color:#312e81;">${nickname}</div>
    </div>

    <div style="margin-bottom:22px;">
      <div style="font-size:11px;color:#6366f1;font-weight:bold;letter-spacing:1px;margin-bottom:10px;">AI 综合分析</div>
      <div style="font-size:14px;line-height:1.8;color:#334155;background:#f8fafc;padding:14px;border-radius:10px;">${summary}</div>
      <div style="font-size:13px;line-height:1.7;color:#475569;margin-top:10px;">${profile}</div>
    </div>

    <div style="margin-bottom:22px;">
      <div style="font-size:11px;color:#6366f1;font-weight:bold;letter-spacing:1px;margin-bottom:12px;">维度得分</div>
      ${scoreBars}
    </div>

    <div style="margin-bottom:22px;">
      <div style="font-size:11px;color:#6366f1;font-weight:bold;letter-spacing:1px;margin-bottom:12px;">推荐职业方向</div>
      ${careerList}
    </div>

    <div style="display:flex;gap:12px;margin-bottom:22px;">
      <div style="flex:1;">
        <div style="font-size:11px;color:#16a34a;font-weight:bold;letter-spacing:1px;margin-bottom:8px;">核心优势</div>
        <ul style="list-style:none;padding:0;margin:0;">${strengthList}</ul>
      </div>
      <div style="flex:1;">
        <div style="font-size:11px;color:#f59e0b;font-weight:bold;letter-spacing:1px;margin-bottom:8px;">发展建议</div>
        <ul style="list-style:none;padding:0;margin:0;">${developList}</ul>
      </div>
    </div>

    <div style="text-align:center;font-size:11px;color:#cbd5e1;border-top:1px solid #f1f5f9;padding-top:16px;margin-top:8px;">
      本报告由 AI 职业测评系统生成 · 仅供参考
    </div>
  </div>`
}

// 将报告 HTML 渲染到隐藏容器并用 jsPDF html() 方法导出
export async function generatePdfFromReport(result, meta) {
  const html = buildReportHtml(result, meta)

  // 创建临时容器
  const holder = document.createElement('div')
  holder.style.position = 'fixed'
  holder.style.left = '-9999px'
  holder.style.top = '0'
  holder.innerHTML = html
  document.body.appendChild(holder)

  const reportEl = holder.firstElementChild

  try {
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' })
    await pdf.html(reportEl, {
      x: 0,
      y: 0,
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
      callback: () => {
        const filename = `职业测评报告_${meta.nickname || '报告'}.pdf`
        pdf.save(filename)
      },
    })
  } finally {
    document.body.removeChild(holder)
  }
}
