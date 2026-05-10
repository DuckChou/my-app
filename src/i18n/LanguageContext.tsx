/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

export type Language = 'en' | 'zh'

const languageKey = 'career-growth-language'

type Translation = (typeof translations)[Language]

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  t: Translation
}

const translations = {
  en: {
    appName: 'Career Growth Planner',
    nav: {
      home: 'Home',
      profile: 'Profile',
      analysis: 'Analysis',
      plan: 'Plan',
      resources: 'Resources',
      dashboard: 'Dashboard',
      primary: 'Primary navigation',
      language: 'Language',
      english: 'EN',
      chinese: '中文',
    },
    common: {
      selected: 'Selected',
      high: 'high',
      medium: 'medium',
      low: 'low',
      technical: 'technical',
      communication: 'communication',
      leadership: 'leadership',
      ai: 'ai',
      complete: 'complete',
    },
    home: {
      eyebrow: 'Career Growth Planner',
      headline: 'Build a personalised career growth plan based on your current role and target goal.',
      intro:
        'Analyse your skills, compare them with market expectations, and turn your next career step into a practical daily, weekly, and monthly roadmap.',
      start: 'Start My Career Plan',
      viewAnalysis: 'View analysis',
      who: 'Who this is for',
      goals: 'Example career goals',
      audiences: ['Software engineers', 'AI career switchers', 'Data professionals', 'Workplace English learners'],
    },
    profile: {
      eyebrow: 'Profile setup',
      title: 'Tell the planner where you are now',
      helper: 'Use one item per line for responsibilities, skills, and weak areas.',
      currentTitle: 'Current title',
      years: 'Years of experience',
      language: 'Work language',
      studyTime: 'Study minutes per day',
      responsibilities: 'Responsibilities',
      currentSkills: 'Current skills',
      weakAreas: 'Weak areas',
      targetGoal: 'Target goal',
      customGoal: 'Your target goal',
      customGoalHelper: 'Write your own goal, or choose one of the suggestions below.',
      onePerLine: 'One per line',
      chooseGoal: 'Suggested goals based on your current title',
      submit: 'Generate Gap Analysis',
      validation: {
        title: 'Enter your current title.',
        responsibilities: 'Add at least one responsibility.',
        skills: 'Add at least one skill.',
        weakAreas: 'Add at least one weak area.',
        language: 'Enter your main work language.',
        goal: 'Enter your target goal.',
      },
    },
    analysis: {
      eyebrow: 'Gap analysis',
      currentLevel: 'Current level',
      viewPlan: 'View Learning Plan',
      strengths: 'Strengths',
      gaps: 'Main gaps',
      nextThreeMonths: 'Next 3 months',
      market: 'Market skills comparison',
      table: {
        skill: 'Skill area',
        current: 'Current level',
        target: 'Target level',
        priority: 'Priority',
      },
      levels: {
        junior: 'Junior to early mid-level',
        mid: 'Mid-level with growth areas',
        working: 'Working knowledge',
        practice: 'Needs practice',
        strong: 'Strong',
        intermediate: 'Intermediate',
      },
      messages: {
        skillsPrefix: 'Already has practical experience with',
        responsibilitiesPrefix: 'Current role includes real work such as',
        responsibilityFallback: 'Current responsibilities can be turned into growth evidence.',
        timeSuffix: 'minutes per day is enough for steady progress when focused.',
        noSkills: 'Has enough context to start a focused learning plan.',
        gapSuffix: 'is below the target level.',
        noGaps: 'Your core skills are relevant. Focus on depth and evidence.',
        month1: 'Close the highest-priority skill gaps with small weekly projects.',
        month2: 'Turn work responsibilities into measurable career evidence.',
        month3: 'Practise clear written updates so progress is visible to others.',
      },
    },
    plan: {
      eyebrow: 'Learning plan',
      title: 'Your practical roadmap',
      plannedAround: 'Planned around',
      minutes: 'minutes per day.',
      resources: 'Find Resources',
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly',
    },
    resources: {
      eyebrow: 'Resources',
      title: 'Recommended learning resources',
      intro: 'A focused starter set for your selected goal.',
      track: 'Track Progress',
    },
    dashboard: {
      eyebrow: 'Dashboard',
      intro: 'Track tasks and collect evidence you can use in reviews, interviews, or promotion conversations.',
      tracker: 'Progress tracker',
      evidence: 'Career evidence',
      evidenceIntro: 'Capture proof of growth while it is fresh.',
      evidenceLabel: 'Evidence item',
      evidencePlaceholder: 'I documented API integration trade-offs.',
      addEvidence: 'Add Evidence',
      emptyEvidence: 'No evidence saved yet.',
    },
  },
  zh: {
    appName: '职业成长规划器',
    nav: {
      home: '首页',
      profile: '资料',
      analysis: '分析',
      plan: '计划',
      resources: '资源',
      dashboard: '进度',
      primary: '主导航',
      language: '语言',
      english: 'EN',
      chinese: '中文',
    },
    common: {
      selected: '已选择',
      high: '高',
      medium: '中',
      low: '低',
      technical: '技术',
      communication: '沟通',
      leadership: '领导力',
      ai: 'AI',
      complete: '完成',
    },
    home: {
      eyebrow: '职业成长规划器',
      headline: '根据你当前的岗位和目标，生成个性化职业成长计划。',
      intro: '分析你的技能，对比市场期望，把下一步职业目标拆成可执行的每日、每周、每月路线图。',
      start: '开始我的职业计划',
      viewAnalysis: '查看分析',
      who: '适合人群',
      goals: '职业目标示例',
      audiences: ['软件工程师', 'AI 转型学习者', '数据从业者', '职场英语学习者'],
    },
    profile: {
      eyebrow: '资料设置',
      title: '告诉规划器你现在的情况',
      helper: '职责、技能和薄弱项请每行填写一项。',
      currentTitle: '当前职位',
      years: '工作年限',
      language: '工作语言',
      studyTime: '每天学习分钟数',
      responsibilities: '工作职责',
      currentSkills: '当前技能',
      weakAreas: '薄弱项',
      targetGoal: '目标',
      customGoal: '你的目标',
      customGoalHelper: '你可以自己填写目标，也可以选择下方建议。',
      onePerLine: '每行一项',
      chooseGoal: '根据当前职位推荐的目标',
      submit: '生成差距分析',
      validation: {
        title: '请输入当前职位。',
        responsibilities: '请至少填写一项职责。',
        skills: '请至少填写一项技能。',
        weakAreas: '请至少填写一项薄弱项。',
        language: '请输入主要工作语言。',
        goal: '请输入你的目标。',
      },
    },
    analysis: {
      eyebrow: '差距分析',
      currentLevel: '当前水平',
      viewPlan: '查看学习计划',
      strengths: '优势',
      gaps: '主要差距',
      nextThreeMonths: '未来 3 个月',
      market: '市场技能对比',
      table: {
        skill: '技能领域',
        current: '当前水平',
        target: '目标水平',
        priority: '优先级',
      },
      levels: {
        junior: '初级到初中级',
        mid: '中级，但仍有成长空间',
        working: '具备工作基础',
        practice: '需要练习',
        strong: '强',
        intermediate: '中级',
      },
      messages: {
        skillsPrefix: '已经具备这些实践经验：',
        responsibilitiesPrefix: '当前岗位包含实际工作，例如：',
        responsibilityFallback: '当前职责可以转化为职业成长证据。',
        timeSuffix: '分钟/天，只要聚焦就足够稳定进步。',
        noSkills: '已经具备开始制定学习计划的基础。',
        gapSuffix: '尚未达到目标水平。',
        noGaps: '你的核心技能方向相关。下一步应提升深度并积累证据。',
        month1: '通过每周小项目补齐最高优先级技能差距。',
        month2: '把工作职责转化为可衡量的职业证据。',
        month3: '练习清晰的书面更新，让进步被他人看见。',
      },
    },
    plan: {
      eyebrow: '学习计划',
      title: '你的实用路线图',
      plannedAround: '按每天约',
      minutes: '分钟安排。',
      resources: '查看资源',
      daily: '每日',
      weekly: '每周',
      monthly: '每月',
    },
    resources: {
      eyebrow: '资源',
      title: '推荐学习资源',
      intro: '根据你选择的目标提供一组聚焦的起步资源。',
      track: '跟踪进度',
    },
    dashboard: {
      eyebrow: '进度面板',
      intro: '跟踪任务并收集可用于绩效评审、面试或晋升沟通的成长证据。',
      tracker: '进度跟踪',
      evidence: '职业证据',
      evidenceIntro: '在记忆还新鲜时记录成长证明。',
      evidenceLabel: '证据条目',
      evidencePlaceholder: '我记录了 API 集成方案的取舍。',
      addEvidence: '添加证据',
      emptyEvidence: '还没有保存证据。',
    },
  },
} as const

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  if (typeof window.localStorage?.getItem !== 'function') return 'en'
  return window.localStorage.getItem(languageKey) === 'zh' ? 'zh' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  function setLanguage(nextLanguage: Language) {
    setLanguageState(nextLanguage)
    if (typeof window.localStorage?.setItem === 'function') {
      window.localStorage.setItem(languageKey, nextLanguage)
    }
    document.documentElement.lang = nextLanguage === 'zh' ? 'zh-CN' : 'en'
  }

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language],
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}
