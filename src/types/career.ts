export type TemplateCareerGoal =
  | 'senior-software-engineer'
  | 'ai-engineer'
  | 'workplace-english'
  | 'data-engineer'
  | 'devops-engineer'

export type CareerGoal = TemplateCareerGoal | (string & {})

export type SkillImportance = 'high' | 'medium' | 'low'

export type MarketSkill = {
  name: string
  category: string
  importance: SkillImportance
  description: string
}

export type GoalTemplate = {
  id: TemplateCareerGoal
  title: string
  description: string
  commonUsers: string[]
}

export type UserProfile = {
  currentTitle: string
  yearsOfExperience: number
  responsibilities: string[]
  currentSkills: string[]
  weakAreas: string[]
  workLanguage: string
  targetGoal: CareerGoal
  targetGoalCustom: string
  studyMinutesPerDay: number
}

export type SkillGapRow = {
  skillArea: string
  currentLevel: string
  targetLevel: string
  priority: SkillImportance
}

export type GapAnalysis = {
  currentLevel: string
  strengths: string[]
  gaps: string[]
  priorityAreas: string[]
  nextThreeMonths: string[]
  rows: SkillGapRow[]
}

export type LearningPlan = {
  daily: string[]
  weekly: string[]
  monthly: string[]
}

export type LearningResource = {
  title: string
  provider: string
  type: string
  reason: string
}

export type ProgressState = {
  completedTasks: Record<string, boolean>
  evidence: string[]
}
