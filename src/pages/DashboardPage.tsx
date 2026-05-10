import { FormEvent, useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { Card } from '../components/common/Card'
import { Input } from '../components/common/Input'
import { ProgressTracker } from '../components/career/ProgressTracker'
import { useLanguage } from '../i18n/LanguageContext'
import { generateLearningPlan } from '../utils/generateLearningPlan'
import { getStoredProfile, getStoredProgress, saveProgress } from '../utils/storage'

export function DashboardPage() {
  const { language, t } = useLanguage()
  const profile = getStoredProfile()
  const [progress, setProgress] = useState(getStoredProgress)
  const [evidenceText, setEvidenceText] = useState('')

  const tasks = useMemo(() => {
    if (!profile) return []
    const plan = generateLearningPlan(profile, language)
    return [...plan.daily, ...plan.weekly]
  }, [language, profile])

  if (!profile) return <Navigate to="/profile" replace />

  function updateProgress(nextProgress: typeof progress) {
    setProgress(nextProgress)
    saveProgress(nextProgress)
  }

  function toggleTask(task: string) {
    updateProgress({
      ...progress,
      completedTasks: {
        ...progress.completedTasks,
        [task]: !progress.completedTasks[task],
      },
    })
  }

  function addEvidence(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const cleanEvidence = evidenceText.trim()
    if (!cleanEvidence) return

    updateProgress({
      ...progress,
      evidence: [cleanEvidence, ...progress.evidence],
    })
    setEvidenceText('')
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{t.dashboard.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">{profile.targetGoalCustom || profile.targetGoal}</h1>
          <p className="mt-3 text-slate-600">{t.dashboard.intro}</p>
        </div>
        <ProgressTracker tasks={tasks} completedTasks={progress.completedTasks} onToggle={toggleTask} />
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-slate-950">{t.dashboard.evidence}</h2>
        <p className="mt-2 text-sm text-slate-600">{t.dashboard.evidenceIntro}</p>
        <form onSubmit={addEvidence} className="mt-5 space-y-3">
          <Input
            label={t.dashboard.evidenceLabel}
            value={evidenceText}
            onChange={(event) => setEvidenceText(event.target.value)}
            placeholder={t.dashboard.evidencePlaceholder}
          />
          <Button type="submit">{t.dashboard.addEvidence}</Button>
        </form>
        <ul className="mt-6 space-y-3">
          {progress.evidence.length > 0 ? (
            progress.evidence.map((item) => (
              <li key={item} className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                {item}
              </li>
            ))
          ) : (
            <li className="rounded-md border border-dashed border-slate-300 p-3 text-sm text-slate-500">
              {t.dashboard.emptyEvidence}
            </li>
          )}
        </ul>
      </Card>
    </div>
  )
}
