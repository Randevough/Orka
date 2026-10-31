import * as SelectPrimitive from '@radix-ui/react-select'
import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Icon } from './ui'

export type SelectOption = { value: string; label: string; icon?: ReactNode; description?: string }

export function Select({
  id,
  label,
  value,
  onChange,
  options,
  className = '',
}: {
  id?: string
  label: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  className?: string
}) {
  const trigger = useRef<HTMLButtonElement>(null)
  const [container, setContainer] = useState<HTMLElement | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const tabTarget = useRef<HTMLElement | null>(null)
  return (
    <SelectPrimitive.Root
      value={value}
      open={open}
      onValueChange={onChange}
      onOpenChange={(open) => {
        setOpen(open)
        if (open) setContainer(trigger.current?.closest('dialog') ?? undefined)
      }}
    >
      <SelectPrimitive.Trigger
        ref={trigger}
        id={id}
        aria-label={label}
        className={`custom-select ${className}`}
      >
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon>
          <Icon name="down" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal container={container}>
        <SelectPrimitive.Content
          className="select-panel"
          position="popper"
          sideOffset={6}
          collisionPadding={12}
          onEscapeKeyDown={(event) => event.stopPropagation()}
          onKeyDown={(event) => {
            if (event.key !== 'Tab') return
            event.preventDefault()
            event.stopPropagation()
            const scope = trigger.current?.closest('dialog') ?? document.body
            const controls = Array.from(
              scope.querySelectorAll<HTMLElement>(
                'button:not(:disabled), a[href], input:not(:disabled), textarea:not(:disabled), [tabindex="0"]',
              ),
            ).filter(
              (item) => item.getClientRects().length > 0 && !item.closest('[role="listbox"]'),
            )
            const current = controls.indexOf(trigger.current!)
            const next = current + (event.shiftKey ? -1 : 1)
            tabTarget.current =
              controls[(next + controls.length) % controls.length] ?? trigger.current
            setOpen(false)
          }}
          onCloseAutoFocus={(event) => {
            if (!tabTarget.current) return
            event.preventDefault()
            tabTarget.current.focus()
            tabTarget.current = null
          }}
        >
          <SelectPrimitive.ScrollUpButton className="select-scroll">
            <Icon name="down" className="rotated" />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="select-viewport">
            {options.map((option) => (
              <SelectPrimitive.Item
                className="select-option"
                key={option.value}
                value={option.value}
                textValue={option.label}
              >
                {option.icon && (
                  <span className="select-option-icon" aria-hidden="true">
                    {option.icon}
                  </span>
                )}
                <span className="select-option-copy">
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  {option.description && (
                    <span className="select-option-description">{option.description}</span>
                  )}
                </span>
                <SelectPrimitive.ItemIndicator className="select-check">
                  <Icon name="check" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="select-scroll">
            <Icon name="down" />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}
