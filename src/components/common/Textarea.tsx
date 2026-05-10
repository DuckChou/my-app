import type { TextareaHTMLAttributes } from 'react'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  helper?: string
  error?: string
}

export function Textarea({ label, helper, error, id, className = '', ...props }: TextareaProps) {
  const textareaId = id ?? props.name

  return (
    <label className="block text-sm font-medium text-slate-800" htmlFor={textareaId}>
      {label}
      {helper ? <span className="mt-1 block text-xs font-normal text-slate-500">{helper}</span> : null}
      <textarea
        id={textareaId}
        className={`mt-2 min-h-28 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 shadow-sm focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200 ${className}`}
        {...props}
      />
      {error ? <span className="mt-1 block text-sm text-red-700">{error}</span> : null}
    </label>
  )
}
