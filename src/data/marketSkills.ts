import type { Language } from '../i18n/LanguageContext'
import type { CareerGoal, MarketSkill } from '../types/career'
import { inferTemplateGoalId } from './goalTemplates'

export const seniorSoftwareEngineerSkills: MarketSkill[] = [
  {
    name: 'Frontend Architecture',
    category: 'technical',
    importance: 'high',
    description:
      'Design reusable components, scalable folder structures, maintainable state management, and clear UI patterns.',
  },
  {
    name: 'Testing',
    category: 'technical',
    importance: 'high',
    description:
      'Write reliable unit and integration tests using tools such as Vitest and React Testing Library.',
  },
  {
    name: 'System Thinking',
    category: 'technical',
    importance: 'medium',
    description:
      'Understand how frontend, backend, APIs, data flow, and deployment work together.',
  },
  {
    name: 'Technical Communication',
    category: 'communication',
    importance: 'high',
    description: 'Explain trade-offs, blockers, risks, and design decisions clearly.',
  },
  {
    name: 'Ownership',
    category: 'leadership',
    importance: 'high',
    description:
      'Own features end-to-end, raise risks early, and help the team deliver predictable outcomes.',
  },
]

export const aiEngineerSkills: MarketSkill[] = [
  {
    name: 'Python',
    category: 'technical',
    importance: 'high',
    description:
      'Use Python to build AI workflows, APIs, data processing scripts, and model integrations.',
  },
  {
    name: 'LLM Fundamentals',
    category: 'ai',
    importance: 'high',
    description:
      'Understand prompts, tokens, context windows, embeddings, retrieval, evaluation, and limitations.',
  },
  {
    name: 'RAG',
    category: 'ai',
    importance: 'high',
    description:
      'Build retrieval augmented generation systems using documents, embeddings, vector databases, and LLM APIs.',
  },
  {
    name: 'API Integration',
    category: 'technical',
    importance: 'high',
    description:
      'Connect AI models with frontend and backend applications through reliable APIs.',
  },
  {
    name: 'Evaluation',
    category: 'ai',
    importance: 'medium',
    description:
      'Test and evaluate AI output quality, hallucination risk, relevance, and usefulness.',
  },
]

export const workplaceEnglishSkills: MarketSkill[] = [
  {
    name: 'Standup Updates',
    category: 'communication',
    importance: 'high',
    description:
      'Clearly explain what you did, what you are doing next, and what is blocking you.',
  },
  {
    name: 'Asking for Clarification',
    category: 'communication',
    importance: 'high',
    description:
      'Ask clear and polite questions when requirements, tasks, or expectations are unclear.',
  },
  {
    name: 'Code Review Communication',
    category: 'communication',
    importance: 'medium',
    description: 'Write clear, respectful, and useful code review comments.',
  },
  {
    name: 'Meeting Summary',
    category: 'communication',
    importance: 'medium',
    description: 'Summarise decisions, action items, risks, and next steps after meetings.',
  },
]

export const dataEngineerSkills: MarketSkill[] = [
  {
    name: 'SQL and Data Modelling',
    category: 'technical',
    importance: 'high',
    description: 'Design reliable tables, queries, models, and analytical data structures.',
  },
  {
    name: 'Data Pipelines',
    category: 'technical',
    importance: 'high',
    description: 'Build scheduled, observable, and recoverable batch or streaming pipelines.',
  },
  {
    name: 'Cloud Data Tools',
    category: 'technical',
    importance: 'medium',
    description: 'Use warehouses, object storage, compute, permissions, and deployment workflows.',
  },
  {
    name: 'Data Quality',
    category: 'technical',
    importance: 'high',
    description: 'Validate data freshness, completeness, schema changes, and business rules.',
  },
]

export const devopsEngineerSkills: MarketSkill[] = [
  {
    name: 'CI/CD',
    category: 'technical',
    importance: 'high',
    description: 'Automate build, test, release, rollback, and deployment workflows.',
  },
  {
    name: 'Cloud Infrastructure',
    category: 'technical',
    importance: 'high',
    description: 'Manage compute, networking, storage, identity, and infrastructure as code.',
  },
  {
    name: 'Observability',
    category: 'technical',
    importance: 'medium',
    description: 'Use logs, metrics, traces, alerts, and incident reviews to improve reliability.',
  },
  {
    name: 'Automation',
    category: 'technical',
    importance: 'high',
    description: 'Write scripts and workflows that reduce repeated manual operational work.',
  },
]

const englishMarketSkillsByGoal: Record<CareerGoal, MarketSkill[]> = {
  'senior-software-engineer': seniorSoftwareEngineerSkills,
  'ai-engineer': aiEngineerSkills,
  'workplace-english': workplaceEnglishSkills,
  'data-engineer': dataEngineerSkills,
  'devops-engineer': devopsEngineerSkills,
}

const chineseMarketSkillsByGoal: Record<CareerGoal, MarketSkill[]> = {
  'senior-software-engineer': [
    {
      name: '前端架构',
      category: 'technical',
      importance: 'high',
      description: '设计可复用组件、可扩展目录结构、可维护状态管理和清晰的 UI 模式。',
    },
    {
      name: '测试',
      category: 'technical',
      importance: 'high',
      description: '使用 Vitest 和 React Testing Library 编写可靠的单元测试和集成测试。',
    },
    {
      name: '系统思维',
      category: 'technical',
      importance: 'medium',
      description: '理解前端、后端、API、数据流和部署如何协同工作。',
    },
    {
      name: '技术沟通',
      category: 'communication',
      importance: 'high',
      description: '清楚解释取舍、阻塞、风险和设计决策。',
    },
    {
      name: '责任意识',
      category: 'leadership',
      importance: 'high',
      description: '端到端负责功能，提前暴露风险，帮助团队稳定交付。',
    },
  ],
  'ai-engineer': [
    {
      name: 'Python',
      category: 'technical',
      importance: 'high',
      description: '使用 Python 构建 AI 工作流、API、数据处理脚本和模型集成。',
    },
    {
      name: 'LLM 基础',
      category: 'ai',
      importance: 'high',
      description: '理解提示词、token、上下文窗口、嵌入、检索、评估和限制。',
    },
    {
      name: 'RAG',
      category: 'ai',
      importance: 'high',
      description: '使用文档、嵌入、向量数据库和 LLM API 构建检索增强生成系统。',
    },
    {
      name: 'API 集成',
      category: 'technical',
      importance: 'high',
      description: '通过可靠 API 把 AI 模型连接到前端和后端应用。',
    },
    {
      name: '评估',
      category: 'ai',
      importance: 'medium',
      description: '测试和评估 AI 输出质量、幻觉风险、相关性和有用性。',
    },
  ],
  'workplace-english': [
    {
      name: '站会更新',
      category: 'communication',
      importance: 'high',
      description: '清楚说明已完成的事、下一步计划和当前阻塞。',
    },
    {
      name: '澄清问题',
      category: 'communication',
      importance: 'high',
      description: '在需求、任务或期望不清楚时，提出清楚且礼貌的问题。',
    },
    {
      name: '代码评审沟通',
      category: 'communication',
      importance: 'medium',
      description: '写出清楚、尊重且有帮助的代码评审评论。',
    },
    {
      name: '会议总结',
      category: 'communication',
      importance: 'medium',
      description: '总结会议决策、行动项、风险和下一步。',
    },
  ],
  'data-engineer': [
    {
      name: 'SQL 和数据建模',
      category: 'technical',
      importance: 'high',
      description: '设计可靠的数据表、查询、模型和分析数据结构。',
    },
    {
      name: '数据管道',
      category: 'technical',
      importance: 'high',
      description: '构建可调度、可观测、可恢复的批处理或流式管道。',
    },
    {
      name: '云数据工具',
      category: 'technical',
      importance: 'medium',
      description: '使用数据仓库、对象存储、计算、权限和部署工作流。',
    },
    {
      name: '数据质量',
      category: 'technical',
      importance: 'high',
      description: '验证数据新鲜度、完整性、模式变化和业务规则。',
    },
  ],
  'devops-engineer': [
    {
      name: 'CI/CD',
      category: 'technical',
      importance: 'high',
      description: '自动化构建、测试、发布、回滚和部署流程。',
    },
    {
      name: '云基础设施',
      category: 'technical',
      importance: 'high',
      description: '管理计算、网络、存储、身份权限和基础设施即代码。',
    },
    {
      name: '可观测性',
      category: 'technical',
      importance: 'medium',
      description: '使用日志、指标、链路追踪、告警和事故复盘提升可靠性。',
    },
    {
      name: '自动化',
      category: 'technical',
      importance: 'high',
      description: '编写脚本和工作流，减少重复的手动运维工作。',
    },
  ],
}

const marketSkillsByLanguage: Record<Language, Record<CareerGoal, MarketSkill[]>> = {
  en: englishMarketSkillsByGoal,
  zh: chineseMarketSkillsByGoal,
}

export function getMarketSkills(goal: CareerGoal, language: Language = 'en', currentTitle = '') {
  return marketSkillsByLanguage[language][inferTemplateGoalId(goal, currentTitle)]
}
