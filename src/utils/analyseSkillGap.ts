import { getMarketSkills } from '../data/marketSkills'
import type { Language } from '../i18n/LanguageContext'
import type { GapAnalysis, MarketSkill, UserProfile } from '../types/career'

function includesSkill(profile: UserProfile, skill: MarketSkill) {
  const userSkills = profile.currentSkills.map((item) => item.toLowerCase())
  const weakAreas = profile.weakAreas.map((item) => item.toLowerCase())
  const skillName = skill.name.toLowerCase()

  return {
    hasSkill: userSkills.some((item) => skillName.includes(item) || item.includes(skillName)),
    markedWeak: weakAreas.some((item) => skillName.includes(item) || item.includes(skillName)),
  }
}

export function analyseSkillGap(profile: UserProfile, language: Language = 'en'): GapAnalysis {
  const marketSkills = getMarketSkills(profile.targetGoal, language, profile.currentTitle)
  const rows = marketSkills.map((skill) => {
    const { hasSkill, markedWeak } = includesSkill(profile, skill)
    const currentLevel =
      hasSkill && !markedWeak
        ? language === 'zh'
          ? '具备工作基础'
          : 'Working knowledge'
        : language === 'zh'
          ? '需要练习'
          : 'Needs practice'

    return {
      skillArea: skill.name,
      currentLevel,
      targetLevel: skill.importance === 'high' ? (language === 'zh' ? '强' : 'Strong') : language === 'zh' ? '中级' : 'Intermediate',
      priority: hasSkill && !markedWeak ? 'medium' : skill.importance,
    }
  })

  const strengths = [
    profile.currentSkills.length > 0
      ? language === 'zh'
        ? `已经具备这些实践经验：${profile.currentSkills.slice(0, 3).join('、')}。`
        : `Already has practical experience with ${profile.currentSkills.slice(0, 3).join(', ')}.`
      : language === 'zh'
        ? '已经具备开始制定学习计划的基础。'
        : 'Has enough context to start a focused learning plan.',
    profile.responsibilities.length > 0
      ? language === 'zh'
        ? `当前岗位包含实际工作，例如：${profile.responsibilities[0]}。`
        : `Current role includes real work such as ${profile.responsibilities[0].toLowerCase()}.`
      : language === 'zh'
        ? '当前职责可以转化为职业成长证据。'
        : 'Current responsibilities can be turned into growth evidence.',
    language === 'zh'
      ? `${profile.studyMinutesPerDay} 分钟/天，只要聚焦就足够稳定进步。`
      : `${profile.studyMinutesPerDay} minutes per day is enough for steady progress when focused.`,
  ]

  const missingSkills = rows.filter((row) => row.currentLevel === (language === 'zh' ? '需要练习' : 'Needs practice'))
  const gaps = missingSkills
    .slice(0, 4)
    .map((row) => (language === 'zh' ? `${row.skillArea} 尚未达到目标水平。` : `${row.skillArea} is below the target level.`))
  const priorityAreas = missingSkills
    .filter((row) => row.priority === 'high')
    .slice(0, 3)
    .map((row) => row.skillArea)

  return {
    currentLevel:
      profile.yearsOfExperience < 2
        ? language === 'zh'
          ? '初级到初中级'
          : 'Junior to early mid-level'
        : language === 'zh'
          ? '中级，但仍有成长空间'
          : 'Mid-level with growth areas',
    strengths,
    gaps:
      gaps.length > 0
        ? gaps
        : [
            language === 'zh'
              ? '你的核心技能方向相关。下一步应提升深度并积累证据。'
              : 'Your core skills are relevant. Focus on depth and evidence.',
          ],
    priorityAreas:
      priorityAreas.length > 0 ? priorityAreas : rows.slice(0, 3).map((row) => row.skillArea),
    nextThreeMonths: [
      language === 'zh'
        ? '通过每周小项目补齐最高优先级技能差距。'
        : 'Close the highest-priority skill gaps with small weekly projects.',
      language === 'zh'
        ? '把工作职责转化为可衡量的职业证据。'
        : 'Turn work responsibilities into measurable career evidence.',
      language === 'zh'
        ? '练习清晰的书面更新，让进步被他人看见。'
        : 'Practise clear written updates so progress is visible to others.',
    ],
    rows,
  }
}
