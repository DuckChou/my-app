import { Card } from '../common/Card'

type LearningPlanCardProps = {
  title: string
  items: string[]
}

export function LearningPlanCard({ title, items }: LearningPlanCardProps) {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-slate-700">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
