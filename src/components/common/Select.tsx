import type { SelectHTMLAttributes } from 'react'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  error?: string
}

export function Select({ label, error, id, children, className = '', ...props }: SelectProps) {
  const selectId = id ?? props.name

  return (
    <label className="block text-sm font-medium text-slate-800" htmlFor={selectId}>
      {label}
      <select
        id={selectId}
        className={`mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 shadow-sm focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200 ${className}`}
        {...props}
      >
        {children}
      </select>
      {error ? <span className="mt-1 block text-sm text-red-700">{error}</span> : null}
    </label>
  )
}
