import { Card } from '../common/Card'
import { Tag } from '../common/Tag'
import type { LearningResource } from '../../types/career'

type ResourceCardProps = {
  resource: LearningResource
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-950">{resource.title}</h3>
          <p className="mt-1 text-sm text-slate-500">{resource.provider}</p>
        </div>
        <Tag>{resource.type}</Tag>
      </div>
      <p className="mt-4 text-sm text-slate-700">{resource.reason}</p>
    </Card>
  )
}
