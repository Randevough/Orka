import { useEffect, useId, useRef, useState } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

const paths = {
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M16 3v4M8 3v4M3 11h18M8 15h2M14 15h2" />
    </>
  ),
  room: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 21V7l6-2v16M11.5 13h.01" />
    </>
  ),
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  chevron: <path d="m9 5 7 7-7 7" />,
  down: <path d="m6 9 6 6 6-6" />,
  back: <path d="M19 12H5m5-5-5 5 5 5" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5m0-9h.01" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  filter: (
    <>
      <path d="M4 6h16M7 12h10M10 18h4" />
      <circle cx="8" cy="6" r="2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
    </>
  ),
  settings: (
    <>
      <path d="M4 6h16M4 18h16M8 3v6m8 6v6" />
      <circle cx="8" cy="6" r="2" fill="white" />
      <circle cx="16" cy="18" r="2" fill="white" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  warning: (
    <>
      <path d="m10.3 4-8 14a2 2 0 0 0 1.7 3h16a2 2 0 0 0 1.7-3l-8-14a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4m0 4h.01" />
    </>
  ),
} as const

export function Icon({ name, className = '' }: { name: keyof typeof paths; className?: string }) {
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

export function Button({
  variant = 'secondary',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  loading?: boolean
}) {
  return (
    <button
      type="button"
      className={`button button--${variant} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <span className="spinner" aria-hidden="true" />}
      {children}
    </button>
  )
}

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: string }) {
  return <span className={`badge badge--${tone}`}>{children}</span>
}

export function Dialog({
  title,
  description,
  children,
  onClose,
  wide = false,
}: {
  title: string
  description?: string
  children: ReactNode
  onClose: () => void
  wide?: boolean
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const id = useId()
  const [closing, setClosing] = useState(false)
  useEffect(() => {
    const dialog = ref.current!
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
    dialog.showModal()
    heading.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      trigger?.focus()
    }
  }, [])
  useEffect(() => {
    heading.current?.focus()
  }, [title])
  useEffect(() => {
    if (!closing) return
    const timer = window.setTimeout(
      onClose,
      matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 140,
    )
    return () => window.clearTimeout(timer)
  }, [closing, onClose])
  return (
    <dialog
      ref={ref}
      className={`dialog ${wide ? 'dialog--wide' : ''} ${closing ? 'is-closing' : ''}`}
      aria-labelledby={`${id}-title`}
      aria-describedby={description ? `${id}-description` : undefined}
      onCancel={(event) => {
        event.preventDefault()
        setClosing(true)
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return
        const items = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]',
          ),
        ).filter((item) => item.getClientRects().length > 0)
        const first = items[0]
        const last = items[items.length - 1]
        if (
          event.shiftKey &&
          (document.activeElement === first || document.activeElement === heading.current)
        ) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }}
    >
      <div className="dialog-header">
        <div>
          <h2 ref={heading} tabIndex={-1} id={`${id}-title`}>
            {title}
          </h2>
        </div>
        <Button
          variant="ghost"
          className="icon-button"
          aria-label="Tutup dialog"
          onClick={() => setClosing(true)}
        >
          <Icon name="close" />
        </Button>
      </div>
      {description && (
        <p className="dialog-description" id={`${id}-description`}>
          {description}
        </p>
      )}
      <div className="dialog-body">{children}</div>
      <div className="dialog-footer">
        <Button onClick={() => setClosing(true)}>Tutup</Button>
      </div>
    </dialog>
  )
}
