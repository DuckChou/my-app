import { Link, Navigate } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { ResourceCard } from '../components/career/ResourceCard'
import { getLearningResources } from '../data/learningResources'
import { useLanguage } from '../i18n/LanguageContext'
import { getStoredProfile } from '../utils/storage'

export function ResourcesPage() {
  const { language, t } = useLanguage()
  const profile = getStoredProfile()

  if (!profile) return <Navigate to="/profile" replace />

  const resources = getLearningResources(profile.targetGoal, language)

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{t.resources.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">{t.resources.title}</h1>
          <p className="mt-3 text-slate-600">{t.resources.intro}</p>
        </div>
        <Link to="/dashboard">
          <Button>{t.resources.track}</Button>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {resources.map((resource) => (
          <ResourceCard key={`${resource.provider}-${resource.title}`} resource={resource} />
        ))}
      </div>
    </div>
  )
}
