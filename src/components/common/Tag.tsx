import type { ReactNode } from 'react'

type TagProps = {
  children: ReactNode
  tone?: 'slate' | 'green' | 'amber'
}

export function Tag({ children, tone = 'slate' }: TagProps) {
  const styles = {
    slate: 'bg-slate-100 text-slate-700',
    green: 'bg-emerald-100 text-emerald-800',
    amber: 'bg-amber-100 text-amber-800',
  }

  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[tone]}`}>{children}</span>
}
