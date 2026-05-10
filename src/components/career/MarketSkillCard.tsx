import { Card } from '../common/Card'
import { Tag } from '../common/Tag'
import { useLanguage } from '../../i18n/LanguageContext'
import type { MarketSkill } from '../../types/career'

type MarketSkillCardProps = {
  skill: MarketSkill
}

export function MarketSkillCard({ skill }: MarketSkillCardProps) {
  const { t } = useLanguage()

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-950">{skill.name}</h3>
          <p className="mt-2 text-sm text-slate-600">{skill.description}</p>
        </div>
        <Tag tone={skill.importance === 'high' ? 'amber' : 'slate'}>{t.common[skill.importance]}</Tag>
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {t.common[skill.category as keyof typeof t.common] ?? skill.category}
      </p>
    </Card>
  )
}
