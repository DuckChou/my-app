import { Link } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { Card } from '../components/common/Card'
import { getGoalTemplates } from '../data/goalTemplates'
import { useLanguage } from '../i18n/LanguageContext'

export function HomePage() {
  const { language, t } = useLanguage()
  const goalTemplates = getGoalTemplates(language)

  return (
    <div className="space-y-16">
      <section className="py-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{t.home.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            {t.home.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600">
            {t.home.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/profile">
              <Button>{t.home.start}</Button>
            </Link>
            <Link to="/analysis">
              <Button variant="secondary">{t.home.viewAnalysis}</Button>
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-950">{t.home.who}</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.home.audiences.map((audience) => (
            <Card key={audience}>
              <p className="font-medium text-slate-950">{audience}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-950">{t.home.goals}</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {goalTemplates.slice(0, 3).map((goal) => (
            <Card key={goal.id}>
              <h3 className="font-semibold text-slate-950">{goal.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{goal.description}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
