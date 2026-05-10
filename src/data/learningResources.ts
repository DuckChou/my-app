import type { Language } from '../i18n/LanguageContext'
import type { CareerGoal, LearningResource } from '../types/career'
import { inferTemplateGoalId } from './goalTemplates'

export const learningResources = {
  react: [
    {
      title: 'React Official Docs',
      provider: 'React',
      type: 'docs',
      reason: 'Best source for modern React concepts and patterns.',
    },
    {
      title: 'TypeScript Handbook',
      provider: 'Microsoft',
      type: 'docs',
      reason: 'Useful for building stronger typed React applications.',
    },
    {
      title: 'Frontend Mentor',
      provider: 'Frontend Mentor',
      type: 'project',
      reason: 'Good for practising real frontend UI implementation.',
    },
    {
      title: 'Testing Library Docs',
      provider: 'Testing Library',
      type: 'docs',
      reason: 'Useful for learning user-focused component testing.',
    },
  ],
  aiEngineer: [
    {
      title: 'DeepLearning.AI Short Courses',
      provider: 'DeepLearning.AI',
      type: 'course',
      reason: 'Good practical AI and LLM learning resources.',
    },
    {
      title: 'Hugging Face Course',
      provider: 'Hugging Face',
      type: 'course',
      reason: 'Good for learning transformers, models, datasets, and AI tooling.',
    },
    {
      title: 'OpenAI API Docs',
      provider: 'OpenAI',
      type: 'docs',
      reason: 'Useful for learning how to build AI-powered applications.',
    },
    {
      title: 'Full Stack Deep Learning',
      provider: 'Full Stack Deep Learning',
      type: 'course',
      reason: 'Good for understanding production AI systems.',
    },
  ],
  workplaceEnglish: [
    {
      title: 'BBC Learning English',
      provider: 'BBC',
      type: 'video',
      reason: 'Good for improving listening, pronunciation, and practical English.',
    },
    {
      title: 'Grammarly Blog',
      provider: 'Grammarly',
      type: 'article',
      reason: 'Useful for professional writing and workplace messages.',
    },
    {
      title: 'ChatGPT Role Play Practice',
      provider: 'ChatGPT',
      type: 'practice',
      reason: 'Useful for practising standups, meetings, and workplace conversations.',
    },
  ],
  dataEngineer: [
    {
      title: 'Designing Data-Intensive Applications',
      provider: 'O Reilly',
      type: 'book',
      reason: 'Useful for understanding production data system trade-offs.',
    },
    {
      title: 'dbt Learn',
      provider: 'dbt',
      type: 'course',
      reason: 'Good for analytics engineering, modelling, and testing data transformations.',
    },
    {
      title: 'Google Cloud Data Engineering',
      provider: 'Google Cloud',
      type: 'course',
      reason: 'Practical path for cloud data pipelines and warehouse workflows.',
    },
  ],
  devops: [
    {
      title: 'Docker Docs',
      provider: 'Docker',
      type: 'docs',
      reason: 'Useful for learning containers and reproducible runtime environments.',
    },
    {
      title: 'GitHub Actions Docs',
      provider: 'GitHub',
      type: 'docs',
      reason: 'Good for building reliable CI/CD workflows.',
    },
    {
      title: 'Terraform Tutorials',
      provider: 'HashiCorp',
      type: 'tutorial',
      reason: 'Practical introduction to infrastructure as code.',
    },
  ],
} satisfies Record<string, LearningResource[]>

const chineseLearningResources = {
  react: [
    {
      title: 'React 官方文档',
      provider: 'React',
      type: '文档',
      reason: '学习现代 React 概念和模式的最佳来源。',
    },
    {
      title: 'TypeScript 手册',
      provider: 'Microsoft',
      type: '文档',
      reason: '有助于构建类型更扎实的 React 应用。',
    },
    {
      title: 'Frontend Mentor',
      provider: 'Frontend Mentor',
      type: '项目',
      reason: '适合练习真实前端 UI 实现。',
    },
    {
      title: 'Testing Library 文档',
      provider: 'Testing Library',
      type: '文档',
      reason: '适合学习以用户为中心的组件测试。',
    },
  ],
  aiEngineer: [
    {
      title: 'DeepLearning.AI 短课程',
      provider: 'DeepLearning.AI',
      type: '课程',
      reason: '适合学习实用 AI 和 LLM 开发。',
    },
    {
      title: 'Hugging Face 课程',
      provider: 'Hugging Face',
      type: '课程',
      reason: '适合学习 Transformer、模型、数据集和 AI 工具链。',
    },
    {
      title: 'OpenAI API 文档',
      provider: 'OpenAI',
      type: '文档',
      reason: '适合学习如何构建 AI 驱动的应用。',
    },
    {
      title: 'Full Stack Deep Learning',
      provider: 'Full Stack Deep Learning',
      type: '课程',
      reason: '适合理解生产级 AI 系统。',
    },
  ],
  workplaceEnglish: [
    {
      title: 'BBC Learning English',
      provider: 'BBC',
      type: '视频',
      reason: '适合提升听力、发音和实用英语。',
    },
    {
      title: 'Grammarly Blog',
      provider: 'Grammarly',
      type: '文章',
      reason: '适合提升职场写作和工作消息表达。',
    },
    {
      title: 'ChatGPT 角色扮演练习',
      provider: 'ChatGPT',
      type: '练习',
      reason: '适合练习站会、会议和职场对话。',
    },
  ],
  dataEngineer: [
    {
      title: 'Designing Data-Intensive Applications',
      provider: 'O Reilly',
      type: '书籍',
      reason: '适合理解生产数据系统中的关键取舍。',
    },
    {
      title: 'dbt Learn',
      provider: 'dbt',
      type: '课程',
      reason: '适合学习分析工程、建模和数据转换测试。',
    },
    {
      title: 'Google Cloud Data Engineering',
      provider: 'Google Cloud',
      type: '课程',
      reason: '适合学习云数据管道和数据仓库工作流。',
    },
  ],
  devops: [
    {
      title: 'Docker 文档',
      provider: 'Docker',
      type: '文档',
      reason: '适合学习容器和可复现运行环境。',
    },
    {
      title: 'GitHub Actions 文档',
      provider: 'GitHub',
      type: '文档',
      reason: '适合构建可靠的 CI/CD 工作流。',
    },
    {
      title: 'Terraform 教程',
      provider: 'HashiCorp',
      type: '教程',
      reason: '适合入门基础设施即代码。',
    },
  ],
} satisfies Record<string, LearningResource[]>

function getResourceSet(goal: CareerGoal, resources: typeof learningResources) {
  if (goal === 'ai-engineer') return resources.aiEngineer
  if (goal === 'workplace-english') return resources.workplaceEnglish
  if (goal === 'data-engineer') return resources.dataEngineer
  if (goal === 'devops-engineer') return resources.devops
  return resources.react
}

export function getLearningResources(goal: CareerGoal, language: Language = 'en') {
  return getResourceSet(inferTemplateGoalId(goal), language === 'zh' ? chineseLearningResources : learningResources)
}
