import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Badge, Button, Icon } from '../components/ui'
import { OrgLogo, OrgStack, organizations } from '../components/Organizations'
import type { OrgId } from '../components/Organizations'
import type { EventPreview } from '../fixtures'

export type CalendarEvent = EventPreview & {
  orgIds: OrgId[]
  id: string
  fromPrevious: boolean
  toNext: boolean
}
export type CalendarFixture = {
  cells: { day: number; outside: boolean; label: string; events: number[] }[]
  weeks: number
  events: CalendarEvent[]
  tentative: (EventPreview & { orgIds: OrgId[] })[]
  segments: {
    event: number
    week: number
    lane: number
    start: number
    end: number
    continuesBefore: boolean
    continuesAfter: boolean
  }[]
  overflow: { week: number; column: number; count: number; dayIndex: number }[]
}

function AgendaEvent({
  event,
  onOpen,
}: {
  event: EventPreview & { orgIds: OrgId[] }
  onOpen: (event: EventPreview) => void
}) {
  return (
    <button
      className={`agenda-event org-${organizations[event.orgIds[0]].color}`}
      onClick={() => onOpen(event)}
    >
      <span className="agenda-date">
        <Icon name={event.tentative ? 'clock' : 'calendar'} />
        <span>{event.when}</span>
      </span>
      <span className="agenda-event-copy">
        <strong>{event.name}</strong>
        <span>{event.org}</span>
      </span>
      <OrgStack ids={event.orgIds} />
      <Icon name="chevron" />
    </button>
  )
}

export function MonthCalendar({
  name,
  year,
  fixture,
  orgIds,
  controls,
  onBack,
  onPrevious,
  onNext,
  onOpen,
}: {
  name: string
  year: string
  fixture: CalendarFixture
  orgIds: OrgId[]
  controls: ReactNode
  onBack: () => void
  onPrevious?: () => void
  onNext?: () => void
  onOpen: (event: EventPreview) => void
}) {
  const [view, setView] = useState<'calendar' | 'agenda'>(() =>
    matchMedia('(max-width: 639px)').matches ? 'agenda' : 'calendar',
  )
  const [dayIndex, setDayIndex] = useState<number | null>(null)
  const [focusDay, setFocusDay] = useState(() => fixture.cells.findIndex((day) => !day.outside))
  const dayRefs = useRef<(HTMLButtonElement | null)[]>([])
  const heading = useRef<HTMLHeadingElement>(null)
  const selectedHeading = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    setDayIndex(null)
    setFocusDay(fixture.cells.findIndex((day) => !day.outside))
    heading.current?.focus()
  }, [fixture])
  useEffect(() => {
    if (dayIndex === null) return
    selectedHeading.current?.focus({ preventScroll: true })
    selectedHeading.current?.scrollIntoView({
      block: 'center',
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
  }, [dayIndex])
  const selected = dayIndex === null ? null : fixture.cells[dayIndex]
  return (
    <div className="month-detail-page">
      <Button variant="ghost" className="back-to-year" onClick={onBack}>
        <Icon name="back" />
        Kalender tahunan
      </Button>
      <div className="detail-page-heading">
        <div>
          <p className="page-eyebrow">KALENDER PROKER</p>
          <h1 ref={heading} tabIndex={-1}>
            {name} <span>{year}</span>
          </h1>
          <p>Rencana yang beriringan, dalam satu pandangan.</p>
        </div>
        <div className="month-navigation">
          <Button
            className="icon-button"
            aria-label="Bulan sebelumnya"
            disabled={!onPrevious}
            onClick={onPrevious}
          >
            <Icon name="back" />
          </Button>
          <Button
            className="icon-button"
            aria-label="Bulan berikutnya"
            disabled={!onNext}
            onClick={onNext}
          >
            <Icon name="arrow" />
          </Button>
        </div>
      </div>
      <section
        className="calendar-panel detail-calendar-panel"
        aria-label={`Detail kalender ${name} ${year}`}
      >
        <div className="calendar-toolbar">
          {controls}
          <div className="view-switch" role="group" aria-label="Tampilan detail bulan">
            <button aria-pressed={view === 'calendar'} onClick={() => setView('calendar')}>
              <Icon name="grid" />
              Kalender
            </button>
            <button aria-pressed={view === 'agenda'} onClick={() => setView('agenda')}>
              <Icon name="calendar" />
              Agenda
            </button>
          </div>
        </div>
        <div className="org-legend" aria-label="Legenda penyelenggara">
          {orgIds.length ? (
            orgIds.map((id) => (
              <span key={id}>
                <OrgLogo id={id} />
                <span>{organizations[id].name}</span>
              </span>
            ))
          ) : (
            <span>Belum ada penyelenggara tercatat pada bulan ini.</span>
          )}
          <span className="legend-note">Warna menunjukkan ormawa, bukan status izin.</span>
        </div>
        {view === 'calendar' ? (
          <>
            <div
              className="date-calendar"
              role="grid"
              aria-label={`${name} ${year}, pilih tanggal dengan tombol panah`}
            >
              <div role="row" className="weekday-row">
                {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day) => (
                  <span role="columnheader" key={day}>
                    {day}
                  </span>
                ))}
              </div>
              {Array.from({ length: fixture.weeks }, (_, week) => (
                <div className="calendar-week" role="row" key={week}>
                  <div className="week-dates">
                    {fixture.cells.slice(week * 7, week * 7 + 7).map((day, column) => {
                      const index = week * 7 + column
                      return (
                        <div
                          role="gridcell"
                          className={`date-cell ${day.outside ? 'date-cell--outside' : ''} ${dayIndex === index ? 'date-cell--selected' : ''}`}
                          key={index}
                          aria-selected={dayIndex === index}
                        >
                          <button
                            ref={(node) => {
                              dayRefs.current[index] = node
                            }}
                            disabled={day.outside}
                            tabIndex={focusDay === index && !day.outside ? 0 : -1}
                            aria-label={`${day.label}, ${day.events.length} jadwal`}
                            onFocus={() => setFocusDay(index)}
                            onClick={() => setDayIndex(index)}
                            onKeyDown={(event) => {
                              const delta = {
                                ArrowLeft: -1,
                                ArrowRight: 1,
                                ArrowUp: -7,
                                ArrowDown: 7,
                              }[event.key]
                              let next = index
                              if (delta !== undefined)
                                next = Math.max(
                                  0,
                                  Math.min(fixture.cells.length - 1, index + delta),
                                )
                              else if (event.key === 'Home') next = week * 7
                              else if (event.key === 'End') next = week * 7 + 6
                              else return
                              event.preventDefault()
                              while (fixture.cells[next]?.outside && next !== index)
                                next += next > index ? -1 : 1
                              dayRefs.current[next]?.focus()
                            }}
                          >
                            <span>{day.day}</span>
                          </button>
                        </div>
                      )
                    })}
                  </div>
                  <div className="week-events">
                    {fixture.segments
                      .filter((segment) => segment.week === week && segment.lane < 3)
                      .map((segment, index) => {
                        const event = fixture.events[segment.event]
                        return (
                          <button
                            key={index}
                            className={`calendar-event org-${organizations[event.orgIds[0]].color} ${segment.continuesBefore ? 'continues-before' : ''} ${segment.continuesAfter ? 'continues-after' : ''}`}
                            style={{
                              gridColumn: `${segment.start + 1} / ${segment.end + 2}`,
                              gridRow: segment.lane + 1,
                            }}
                            onClick={() => onOpen(event)}
                            aria-label={`${event.name}, ${event.org}, ${event.when}${segment.continuesBefore ? ', lanjutan dari sebelumnya' : ''}${segment.continuesAfter ? ', berlanjut ke berikutnya' : ''}`}
                          >
                            <span className="continuation-mark" aria-hidden="true">
                              {segment.continuesBefore ? '‹' : ''}
                            </span>
                            <OrgStack ids={event.orgIds} limit={2} />
                            <span className="calendar-event-title">{event.name}</span>
                            <span className="continuation-mark" aria-hidden="true">
                              {segment.continuesAfter ? '›' : ''}
                            </span>
                          </button>
                        )
                      })}
                    {fixture.overflow
                      .filter((item) => item.week === week)
                      .map((item) => (
                        <button
                          key={item.column}
                          className="calendar-overflow"
                          style={{ gridColumn: item.column + 1, gridRow: 4 }}
                          onClick={() => setDayIndex(item.dayIndex)}
                          aria-label={`${item.count} jadwal lainnya pada ${fixture.cells[item.dayIndex].label}`}
                        >
                          +{item.count}
                          <span> lainnya</span>
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
            {selected && (
              <section className="selected-day" aria-label={`Jadwal ${selected.label}`}>
                <div className="selected-day-heading">
                  <h2 ref={selectedHeading} tabIndex={-1}>
                    {selected.label}
                  </h2>
                  <Button
                    variant="ghost"
                    className="icon-button"
                    aria-label="Tutup daftar tanggal"
                    onClick={() => setDayIndex(null)}
                  >
                    <Icon name="close" />
                  </Button>
                </div>
                {selected.events.length ? (
                  selected.events.map((index) => (
                    <AgendaEvent event={fixture.events[index]} key={index} onOpen={onOpen} />
                  ))
                ) : (
                  <p>Belum ada proker tercatat untuk tanggal ini.</p>
                )}
              </section>
            )}
            <div className="calendar-note">
              <Icon name="info" />
              <p>
                Klik blok untuk detail proker, atau pilih tanggal untuk melihat seluruh jadwal.
                Proker boleh berjalan bersamaan.
              </p>
            </div>
          </>
        ) : (
          <div className="month-agenda">
            {fixture.events.length ? (
              fixture.events.map((event) => (
                <AgendaEvent key={event.id} event={event} onOpen={onOpen} />
              ))
            ) : (
              <div className="page-state page-state--compact">
                <Icon name="calendar" />
                <h3>Belum ada jadwal pasti tercatat</h3>
                <p>
                  Belum ada proker pada bulan dan filter ini. Rencana tentatif tetap ditampilkan
                  terpisah.
                </p>
              </div>
            )}
          </div>
        )}
      </section>
      <section className="tentative-section">
        <div className="tentative-heading">
          <div>
            <span className="section-kicker">
              <Icon name="clock" />
              MASIH BERUPA RENCANA
            </span>
            <h2>Tanggal belum ditentukan</h2>
            <p>Sudah tahu bulannya. Tanggalnya bisa menyusul.</p>
          </div>
          <Badge>{fixture.tentative.length} tentatif</Badge>
        </div>
        {fixture.tentative.length ? (
          <div className="tentative-list">
            {fixture.tentative.map((event) => (
              <AgendaEvent key={event.name} event={event} onOpen={onOpen} />
            ))}
          </div>
        ) : (
          <p className="tentative-empty">Tidak ada rencana hanya-bulan pada bulan ini.</p>
        )}
      </section>
    </div>
  )
}
