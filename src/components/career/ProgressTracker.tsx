import { ProgressBar } from '../common/ProgressBar'
import { useLanguage } from '../../i18n/LanguageContext'

type ProgressTrackerProps = {
  tasks: string[]
  completedTasks: Record<string, boolean>
  onToggle: (task: string) => void
}

export function ProgressTracker({ tasks, completedTasks, onToggle }: ProgressTrackerProps) {
  const { t } = useLanguage()
  const completedCount = tasks.filter((task) => completedTasks[task]).length
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-slate-950">{t.dashboard.tracker}</h2>
        <p className="text-sm font-medium text-slate-600">{progress}% {t.common.complete}</p>
      </div>
      <div className="mt-4">
        <ProgressBar value={progress} />
      </div>
      <div className="mt-5 space-y-3">
        {tasks.map((task) => (
          <label key={task} className="flex cursor-pointer items-start gap-3 rounded-md border border-slate-200 p-3">
            <input
              type="checkbox"
              checked={Boolean(completedTasks[task])}
              onChange={() => onToggle(task)}
              className="mt-1 h-4 w-4 rounded border-slate-300"
            />
            <span className="text-sm text-slate-700">{task}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
