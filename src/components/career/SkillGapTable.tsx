import { Tag } from '../common/Tag'
import { useLanguage } from '../../i18n/LanguageContext'
import type { SkillGapRow } from '../../types/career'

type SkillGapTableProps = {
  rows: SkillGapRow[]
}

export function SkillGapTable({ rows }: SkillGapTableProps) {
  const { t } = useLanguage()

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">{t.analysis.table.skill}</th>
            <th className="px-4 py-3">{t.analysis.table.current}</th>
            <th className="px-4 py-3">{t.analysis.table.target}</th>
            <th className="px-4 py-3">{t.analysis.table.priority}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {rows.map((row) => (
            <tr key={row.skillArea}>
              <td className="px-4 py-3 font-medium text-slate-950">{row.skillArea}</td>
              <td className="px-4 py-3 text-slate-600">{row.currentLevel}</td>
              <td className="px-4 py-3 text-slate-600">{row.targetLevel}</td>
              <td className="px-4 py-3">
                <Tag tone={row.priority === 'high' ? 'amber' : 'slate'}>{t.common[row.priority]}</Tag>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
