import type { Language } from '../i18n/LanguageContext'
import type { GoalTemplate, TemplateCareerGoal } from '../types/career'

const goalsByLanguage: Record<Language, GoalTemplate[]> = {
  en: [
    {
      id: 'senior-software-engineer',
      title: 'Become a Senior Software Engineer',
      description:
        'Improve technical depth, ownership, system thinking, code quality, and communication.',
      commonUsers: ['Junior Developer', 'Mid-level Developer', 'Frontend Engineer'],
    },
    {
      id: 'ai-engineer',
      title: 'Become an AI Engineer',
      description:
        'Build practical AI systems using Python, LLM APIs, retrieval, evaluation, and production workflows.',
      commonUsers: ['Software Engineer', 'Data Analyst', 'ML Beginner'],
    },
    {
      id: 'workplace-english',
      title: 'Improve Workplace English',
      description:
        'Communicate clearly in standups, meetings, code reviews, written updates, and technical discussions.',
      commonUsers: ['Non-native English Speaker', 'Developer', 'Team Contributor'],
    },
    {
      id: 'data-engineer',
      title: 'Become a Data Engineer',
      description:
        'Strengthen SQL, pipelines, data modelling, cloud tools, orchestration, and production data quality.',
      commonUsers: ['Data Analyst', 'Backend Developer', 'BI Developer'],
    },
    {
      id: 'devops-engineer',
      title: 'Become a DevOps Engineer',
      description:
        'Learn deployment, CI/CD, observability, cloud infrastructure, reliability, and automation practices.',
      commonUsers: ['Developer', 'Sysadmin', 'Platform Beginner'],
    },
  ],
  zh: [
    {
      id: 'senior-software-engineer',
      title: '成为高级软件工程师',
      description: '提升技术深度、责任意识、系统思维、代码质量和沟通能力。',
      commonUsers: ['初级开发者', '中级开发者', '前端工程师'],
    },
    {
      id: 'ai-engineer',
      title: '成为 AI 工程师',
      description: '学习 Python、LLM API、检索增强、评估和生产级 AI 工作流。',
      commonUsers: ['软件工程师', '数据分析师', '机器学习初学者'],
    },
    {
      id: 'workplace-english',
      title: '提升职场英语',
      description: '在站会、会议、代码评审、书面更新和技术讨论中表达更清楚。',
      commonUsers: ['非英语母语者', '开发者', '团队成员'],
    },
    {
      id: 'data-engineer',
      title: '成为数据工程师',
      description: '强化 SQL、数据管道、数据建模、云工具、编排和数据质量能力。',
      commonUsers: ['数据分析师', '后端开发者', 'BI 开发者'],
    },
    {
      id: 'devops-engineer',
      title: '成为 DevOps 工程师',
      description: '学习部署、CI/CD、可观测性、云基础设施、可靠性和自动化实践。',
      commonUsers: ['开发者', '系统管理员', '平台工程初学者'],
    },
  ],
}

export const goalTemplates = goalsByLanguage.en

export function getGoalTemplates(language: Language) {
  return goalsByLanguage[language]
}

export function getGoalTemplate(goalId: string, language: Language = 'en') {
  return getGoalTemplates(language).find((goal) => goal.id === goalId)
}

export function getGoalTitle(goalId: string, language: Language = 'en') {
  return getGoalTemplate(goalId, language)?.title ?? goalId
}

export function inferTemplateGoalId(goal: string, currentTitle = ''): TemplateCareerGoal {
  const value = `${goal} ${currentTitle}`.toLowerCase()

  if (['ai', 'llm', 'machine learning', 'ml', 'python'].some((keyword) => value.includes(keyword))) {
    return 'ai-engineer'
  }

  if (['data', 'analytics', 'analyst', 'sql', 'pipeline'].some((keyword) => value.includes(keyword))) {
    return 'data-engineer'
  }

  if (['devops', 'cloud', 'platform', 'sre', 'infrastructure'].some((keyword) => value.includes(keyword))) {
    return 'devops-engineer'
  }

  if (['english', 'communication', 'speaking', 'writing', 'workplace'].some((keyword) => value.includes(keyword))) {
    return 'workplace-english'
  }

  return 'senior-software-engineer'
}

const suggestionRules: { id: TemplateCareerGoal; keywords: string[] }[] = [
  { id: 'senior-software-engineer', keywords: ['software', 'frontend', 'front-end', 'react', 'developer', 'engineer'] },
  { id: 'ai-engineer', keywords: ['ai', 'ml', 'machine learning', 'python', 'data scientist'] },
  { id: 'data-engineer', keywords: ['data', 'analytics', 'analyst', 'bi', 'sql'] },
  { id: 'devops-engineer', keywords: ['devops', 'cloud', 'platform', 'infrastructure', 'sre'] },
  { id: 'workplace-english', keywords: ['english', 'support', 'manager', 'communication'] },
]

export function getSuggestedGoalTemplates(currentTitle: string, language: Language) {
  const normalizedTitle = currentTitle.toLowerCase()
  const goals = getGoalTemplates(language)
  const scoredIds = suggestionRules
    .map((rule) => ({
      id: rule.id,
      score: rule.keywords.filter((keyword) => normalizedTitle.includes(keyword)).length,
    }))
    .sort((a, b) => b.score - a.score)

  const orderedIds = [
    ...scoredIds.filter((item) => item.score > 0).map((item) => item.id),
    ...scoredIds.filter((item) => item.score === 0).map((item) => item.id),
  ]

  return orderedIds
    .map((id) => goals.find((goal) => goal.id === id))
    .filter((goal): goal is GoalTemplate => Boolean(goal))
    .slice(0, 3)
}
