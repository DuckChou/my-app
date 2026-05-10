import { Card } from '../common/Card'
import { Tag } from '../common/Tag'
import { useLanguage } from '../../i18n/LanguageContext'
import type { GoalTemplate } from '../../types/career'

type GoalCardProps = {
  goal: GoalTemplate
  selected?: boolean
  onSelect?: () => void
}

export function GoalCard({ goal, selected = false, onSelect }: GoalCardProps) {
  const { t } = useLanguage()

  return (
    <button
      type="button"
      onClick={onSelect}
      className="h-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
    >
      <Card className={`h-full ${selected ? 'border-slate-900 ring-2 ring-slate-900' : ''}`}>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-950">{goal.title}</h3>
          {selected ? <Tag tone="green">{t.common.selected}</Tag> : null}
        </div>
        <p className="mt-3 text-sm text-slate-600">{goal.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {goal.commonUsers.map((user) => (
            <Tag key={user}>{user}</Tag>
          ))}
        </div>
      </Card>
    </button>
  )
}
