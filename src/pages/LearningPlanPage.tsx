import { Link, Navigate } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { LearningPlanCard } from '../components/career/LearningPlanCard'
import { useLanguage } from '../i18n/LanguageContext'
import { generateLearningPlan } from '../utils/generateLearningPlan'
import { getStoredProfile } from '../utils/storage'

export function LearningPlanPage() {
  const { language, t } = useLanguage()
  const profile = getStoredProfile()

  if (!profile) return <Navigate to="/profile" replace />

  const plan = generateLearningPlan(profile, language)

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{t.plan.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">{t.plan.title}</h1>
          <p className="mt-3 text-slate-600">
            {t.plan.plannedAround} {profile.studyMinutesPerDay} {t.plan.minutes}
          </p>
        </div>
        <Link to="/resources">
          <Button>{t.plan.resources}</Button>
        </Link>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <LearningPlanCard title={t.plan.daily} items={plan.daily} />
        <LearningPlanCard title={t.plan.weekly} items={plan.weekly} />
        <LearningPlanCard title={t.plan.monthly} items={plan.monthly} />
      </div>
    </div>
  )
}
