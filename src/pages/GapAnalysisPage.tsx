import { Link, Navigate } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { Card } from '../components/common/Card'
import { MarketSkillCard } from '../components/career/MarketSkillCard'
import { SkillGapTable } from '../components/career/SkillGapTable'
import { getMarketSkills } from '../data/marketSkills'
import { useLanguage } from '../i18n/LanguageContext'
import { analyseSkillGap } from '../utils/analyseSkillGap'
import { getStoredProfile } from '../utils/storage'

export function GapAnalysisPage() {
  const { language, t } = useLanguage()
  const profile = getStoredProfile()

  if (!profile) return <Navigate to="/profile" replace />

  const analysis = analyseSkillGap(profile, language)
  const marketSkills = getMarketSkills(profile.targetGoal, language, profile.currentTitle)

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{t.analysis.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">{profile.targetGoalCustom || profile.targetGoal}</h1>
          <p className="mt-3 text-slate-600">
            {t.analysis.currentLevel}: {analysis.currentLevel}
          </p>
        </div>
        <Link to="/plan">
          <Button>{t.analysis.viewPlan}</Button>
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <h2 className="font-semibold text-slate-950">{t.analysis.strengths}</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {analysis.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="font-semibold text-slate-950">{t.analysis.gaps}</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {analysis.gaps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="font-semibold text-slate-950">{t.analysis.nextThreeMonths}</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {analysis.nextThreeMonths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </div>

      <SkillGapTable rows={analysis.rows} />

      <section>
        <h2 className="text-2xl font-semibold text-slate-950">{t.analysis.market}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {marketSkills.map((skill) => (
            <MarketSkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </section>
    </div>
  )
}
