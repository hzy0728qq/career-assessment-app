// 职业测评题目库
// 每道题对应一个维度（interest 兴趣 / ability 能力 / personality 性格 / workstyle 工作方式）
// 维度用于后续 AI 分析，选项分值映射到对应维度

export const dimensions = {
  A: { key: 'A', name: '技术与工程', desc: '擅长逻辑分析与系统构建' },
  B: { key: 'B', name: '创意与设计', desc: '富有想象力与审美能力' },
  C: { key: 'C', name: '商业与管理', desc: '善于统筹资源与决策' },
  D: { key: 'D', name: '人际与服务', desc: '乐于沟通与帮助他人' },
  E: { key: 'E', name: '研究与分析', desc: '喜欢探究本质与规律' },
  F: { key: 'F', name: '实务与执行', desc: '注重细节与落地完成' },
}

export const questions = [
  {
    id: 1,
    type: 'interest',
    title: '空闲时你最愿意做的事是？',
    options: [
      { label: '研究一个技术难题或写代码', dim: 'A', score: 2 },
      { label: '画画、写作或设计作品', dim: 'B', score: 2 },
      { label: '策划一个活动或小生意', dim: 'C', score: 2 },
      { label: '陪伴并帮助朋友解决烦恼', dim: 'D', score: 2 },
    ],
  },
  {
    id: 2,
    type: 'interest',
    title: '哪类内容最能吸引你的注意力？',
    options: [
      { label: '科技前沿与新发明', dim: 'A', score: 2 },
      { label: '艺术展览与设计趋势', dim: 'B', score: 2 },
      { label: '商业案例与创业故事', dim: 'C', score: 2 },
      { label: '心理学与人文社科', dim: 'E', score: 2 },
    ],
  },
  {
    id: 3,
    type: 'ability',
    title: '你觉得自己最擅长的是？',
    options: [
      { label: '拆解复杂问题并找到方案', dim: 'A', score: 2 },
      { label: '用视觉或文字表达想法', dim: 'B', score: 2 },
      { label: '协调团队推动事情完成', dim: 'C', score: 2 },
      { label: '耐心倾听并理解他人', dim: 'D', score: 2 },
    ],
  },
  {
    id: 4,
    type: 'ability',
    title: '面对一个全新任务，你的第一反应是？',
    options: [
      { label: '查阅资料、研究原理', dim: 'E', score: 2 },
      { label: '先动手做一个原型', dim: 'F', score: 2 },
      { label: '找有经验的人请教', dim: 'D', score: 2 },
      { label: '制定计划与分工', dim: 'C', score: 2 },
    ],
  },
  {
    id: 5,
    type: 'personality',
    title: '在团队中你通常是？',
    options: [
      { label: '专注技术的核心执行者', dim: 'A', score: 2 },
      { label: '提供灵感与创意的人', dim: 'B', score: 2 },
      { label: '带领方向的管理者', dim: 'C', score: 2 },
      { label: '维系关系的润滑剂', dim: 'D', score: 2 },
    ],
  },
  {
    id: 6,
    type: 'personality',
    title: '你更看重的工作环境是？',
    options: [
      { label: '安静、可深度专注', dim: 'A', score: 2 },
      { label: '开放、充满创意氛围', dim: 'B', score: 2 },
      { label: '高效、目标明确', dim: 'C', score: 2 },
      { label: '温暖、人际关系融洽', dim: 'D', score: 2 },
    ],
  },
  {
    id: 7,
    type: 'workstyle',
    title: '你偏好怎样的工作节奏？',
    options: [
      { label: '持续钻研一个领域', dim: 'E', score: 2 },
      { label: '按部就班完成明确任务', dim: 'F', score: 2 },
      { label: '不断切换有挑战的项目', dim: 'C', score: 2 },
      { label: '与人频繁协作互动', dim: 'D', score: 2 },
    ],
  },
  {
    id: 8,
    type: 'workstyle',
    title: '完成一件事时，你最在意？',
    options: [
      { label: '方案是否严谨正确', dim: 'A', score: 2 },
      { label: '成果是否美观打动人', dim: 'B', score: 2 },
      { label: '是否达成预期目标', dim: 'C', score: 2 },
      { label: '过程是否让大家都舒服', dim: 'D', score: 2 },
    ],
  },
  {
    id: 9,
    type: 'interest',
    title: '如果学一项新技能，你会选？',
    options: [
      { label: '编程或数据分析', dim: 'A', score: 2 },
      { label: '摄影或视频剪辑', dim: 'B', score: 2 },
      { label: '项目管理或财务', dim: 'C', score: 2 },
      { label: '心理咨询或教育', dim: 'D', score: 2 },
    ],
  },
  {
    id: 10,
    type: 'ability',
    title: '朋友最常夸你？',
    options: [
      { label: '聪明、理性', dim: 'A', score: 2 },
      { label: '有品味、有创意', dim: 'B', score: 2 },
      { label: '靠谱、有领导力', dim: 'C', score: 2 },
      { label: '温暖、善解人意', dim: 'D', score: 2 },
    ],
  },
  {
    id: 11,
    type: 'personality',
    title: '遇到分歧时你倾向于？',
    options: [
      { label: '用数据与逻辑说服对方', dim: 'A', score: 2 },
      { label: '提出折中又有创意的方案', dim: 'B', score: 2 },
      { label: '快速决策并推进', dim: 'C', score: 2 },
      { label: '照顾各方感受求共识', dim: 'D', score: 2 },
    ],
  },
  {
    id: 12,
    type: 'workstyle',
    title: '理想中的成就感来自？',
    options: [
      { label: '攻克一个技术难关', dim: 'A', score: 2 },
      { label: '作品被很多人喜爱', dim: 'B', score: 2 },
      { label: '事业做大、影响更多人', dim: 'C', score: 2 },
      { label: '切实帮助了某个人', dim: 'D', score: 2 },
    ],
  },
]

export const careers = {
  A: [
    { name: '软件工程师', match: 95, desc: '设计并构建软件系统，用代码解决实际问题。' },
    { name: '数据工程师', match: 88, desc: '搭建数据管道，让数据驱动决策成为可能。' },
    { name: '产品技术经理', match: 82, desc: '在技术与产品之间架起桥梁，推动落地。' },
  ],
  B: [
    { name: 'UI/UX 设计师', match: 95, desc: '用设计提升产品体验，让美与功能统一。' },
    { name: '内容创作者', match: 88, desc: '通过文字、影像表达观点，打动受众。' },
    { name: '品牌设计师', match: 82, desc: '为品牌塑造视觉语言与情感共鸣。' },
  ],
  C: [
    { name: '产品经理', match: 95, desc: '定义产品方向，协调团队把事做成。' },
    { name: '创业者', match: 90, desc: '从零到一搭建事业，承担风险创造价值。' },
    { name: '运营负责人', match: 84, desc: '统筹资源与增长，让业务持续向前。' },
  ],
  D: [
    { name: '心理咨询师', match: 95, desc: '倾听与陪伴，帮助他人走出困境。' },
    { name: '教师 / 教育工作者', match: 90, desc: '传递知识与方法，影响他人成长。' },
    { name: 'HR / 组织发展', match: 84, desc: '关注人，让组织与个人共同发展。' },
  ],
  E: [
    { name: '研究员 / 学者', match: 95, desc: '深入探究某一领域，拓展人类认知边界。' },
    { name: '数据分析师', match: 88, desc: '从数据中发现规律，支撑科学决策。' },
    { name: '战略顾问', match: 82, desc: '研究行业趋势，为组织提供方向建议。' },
  ],
  F: [
    { name: '项目经理', match: 92, desc: '把控进度与细节，确保项目按时交付。' },
    { name: '运营专员', match: 86, desc: '执行流程与规则，保障业务平稳运行。' },
    { name: '质量管理 / 测试', match: 80, desc: '用严谨的态度守护产品品质。' },
  ],
}
