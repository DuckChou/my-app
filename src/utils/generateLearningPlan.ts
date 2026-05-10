import type { Language } from '../i18n/LanguageContext'
import type { LearningPlan, UserProfile } from '../types/career'
import { inferTemplateGoalId } from '../data/goalTemplates'

function noteTask(language: Language) {
  return language === 'zh' ? '花 10 分钟记录今天学到的内容。' : 'Spend 10 minutes writing notes about what you learned.'
}

function adjustForStudyTime(plan: LearningPlan, minutes: number, language: Language): LearningPlan {
  if (minutes < 30) {
    return {
      daily: plan.daily.slice(0, 1),
      weekly: plan.weekly.slice(0, 2),
      monthly: plan.monthly.slice(0, 2),
    }
  }

  if (minutes >= 60) {
    return {
      ...plan,
      daily: [...plan.daily, noteTask(language)],
    }
  }

  return plan
}

export function generateLearningPlan(profile: UserProfile, language: Language = 'en'): LearningPlan {
  let plan: LearningPlan
  const templateGoal = inferTemplateGoalId(profile.targetGoal, profile.currentTitle)

  if (templateGoal === 'senior-software-engineer') {
    plan =
      language === 'zh'
        ? {
            daily: ['学习高级 React 或 TypeScript 30 分钟。', '写一个职场沟通表达练习 15 分钟。', '阅读一段代码并写下改进建议。'],
            weekly: ['重构一个现有组件。', '至少编写三个测试。', '阅读一篇系统设计或工程责任相关文章。', '准备一段简短的每周进展总结。'],
            monthly: ['构建一个生产风格的 React 功能。', '记录架构决策。', '向高级工程师寻求反馈。', '更新你的晋升证据文档。'],
          }
        : {
            daily: [
              'Spend 30 minutes learning advanced React or TypeScript.',
              'Spend 15 minutes writing one workplace communication example.',
              'Review one piece of code and write improvement notes.',
            ],
            weekly: [
              'Refactor one existing component.',
              'Write at least three tests.',
              'Read one article about system design or engineering ownership.',
              'Prepare one short weekly progress summary.',
            ],
            monthly: [
              'Build one production-style React feature.',
              'Document architecture decisions.',
              'Ask for feedback from a senior engineer.',
              'Update your promotion evidence document.',
            ],
          }
  } else if (templateGoal === 'ai-engineer') {
    plan =
      language === 'zh'
        ? {
            daily: ['学习 Python 或 AI 基础 30 分钟。', '练习一个 LLM 提示词、API 调用或小型 AI 工作流。', '阅读一个 AI 工程示例或文档页面。'],
            weekly: ['构建一个小型 AI 功能。', '学习嵌入、RAG、向量搜索或评估等一个概念。', '把代码推送到 GitHub，并写清楚 README。'],
            monthly: ['完成一个 AI 作品集项目。', '部署项目。', '写一篇案例说明问题、方案、工具和限制。'],
          }
        : {
            daily: [
              'Study Python or AI fundamentals for 30 minutes.',
              'Practise one LLM prompt, API call, or small AI workflow.',
              'Read one AI engineering example or documentation page.',
            ],
            weekly: [
              'Build one small AI feature.',
              'Learn one concept such as embeddings, RAG, vector search, or evaluation.',
              'Push code to GitHub with a clear README.',
            ],
            monthly: [
              'Complete one portfolio AI project.',
              'Deploy the project.',
              'Write a case study explaining the problem, solution, tools, and limitations.',
            ],
          }
  } else if (templateGoal === 'workplace-english') {
    plan =
      language === 'zh'
        ? {
            daily: ['练习一句站会更新表达。', '把一条工作消息改写得更清楚。', '听五分钟职场英语。'],
            weekly: ['准备一次会议更新。', '练习如何请求澄清。', '用英语写一段技术说明。'],
            monthly: ['录制一次三分钟项目更新。', '复盘常见语法和发音问题。', '准备十个可复用的职场句型。'],
          }
        : {
            daily: [
              'Practise one standup update sentence.',
              'Rewrite one workplace message in clearer English.',
              'Listen to five minutes of workplace English.',
            ],
            weekly: [
              'Prepare one meeting update.',
              'Practise asking for clarification.',
              'Write one technical explanation in English.',
            ],
            monthly: [
              'Record one three-minute project update.',
              'Review common grammar and pronunciation issues.',
              'Prepare ten reusable workplace sentence templates.',
            ],
          }
  } else {
    plan =
      language === 'zh'
        ? {
            daily: ['花 30 分钟练习最高优先级的技能差距。'],
            weekly: ['完成一个和目标岗位相关的小型实践任务。'],
            monthly: ['构建一个作品集级项目或职业证据条目。'],
          }
        : {
            daily: ['Spend 30 minutes working on your highest priority skill gap.'],
            weekly: ['Complete one small practical task related to your target role.'],
            monthly: ['Build one portfolio-quality project or evidence item.'],
          }
  }

  return adjustForStudyTime(plan, profile.studyMinutesPerDay, language)
}
