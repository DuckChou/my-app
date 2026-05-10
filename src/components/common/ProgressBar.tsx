type ProgressBarProps = {
  value: number
}

export function ProgressBar({ value }: ProgressBarProps) {
  const safeValue = Math.min(Math.max(value, 0), 100)

  return (
    <div className="h-3 rounded-full bg-slate-200" aria-label={`Progress ${safeValue}%`}>
      <div className="h-3 rounded-full bg-emerald-600" style={{ width: `${safeValue}%` }} />
    </div>
  )
}
