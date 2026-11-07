import { useRef, useState } from 'react'
import { Badge, Button, Dialog, Icon } from './components/ui'
import { himaScenario, months, roomStatus } from './fixtures'
import type { EventPreview, MonthPreview } from './fixtures'
import { Select } from './components/Select'
import {
  OrgLogo,
  OrgStack,
  organizations,
  monthOrganizations,
  filteredMonthOrganizations,
  eventOrganizations,
} from './components/Organizations'
import type { OrgId } from './components/Organizations'
import { MonthCalendar } from './features/MonthCalendar'
import { calendarFixtures } from './calendar-fixtures'
import { Timeline } from './features/Timeline'
import { ProgramDialog } from './features/ProgramDialog'
import { RoomCoordination } from './features/RoomCoordination'
import { timelinePrograms, timelineSummary, missingTimelines } from './timeline-fixtures'
import { reviewPrograms, reviewOptions } from './timeline-scenarios'
import type { ProgramDetail } from './timeline-types'

const periodOptions = [
  { value: '2026/2027', label: '2026 / 2027', description: 'Periode aktif' },
  { value: '2025/2026', label: '2025 / 2026', description: 'Arsip' },
]
const orgOptions = [
  { value: 'all', label: 'Semua ormawa', icon: <Icon name="filter" /> },
  { value: 'hima', label: 'Hima A Contoh', icon: <OrgLogo id="hima" /> },
]
const scenarioOptions = [
  { value: 'normal', label: 'Normal' },
  { value: 'empty', label: 'Kosong' },
  { value: 'loading', label: 'Memuat' },
  { value: 'error', label: 'Gagal memuat' },
]

type Scenario = 'normal' | 'empty' | 'loading' | 'error'
type Modal = 'guide' | 'login' | 'rooms' | 'components' | 'event' | null

function MonthCard({
  month,
  onOpen,
  orgIds,
  fallback,
  working,
}: {
  month: MonthPreview
  onOpen: () => void
  orgIds: OrgId[]
  fallback: boolean
  working: number
}) {
  return (
    <button
      className={`month-card ${month.count === 0 && working === 0 ? 'month-card--empty' : ''}`}
      onClick={onOpen}
      data-month-name={month.name}
      aria-label={`${month.name} ${month.year}, ${working} proker dalam pengerjaan, ${month.count} ada pelaksanaan, ${month.tentative} tentatif. Buka kalender bulan.${orgIds.length ? ` Penyelenggara: ${orgIds.map((id) => organizations[id].name).join(', ')}` : ''}`}
    >
      <span className="month-card-heading">
        <span className="month-name">{month.name}</span>
        <span className="month-year">{month.year}</span>
      </span>
      <span className="month-card-events">
        {month.count === 0 ? (
          <span className="quiet-month">
            <span className="quiet-line" />
            <span>Belum ada pelaksanaan tercatat</span>
          </span>
        ) : (
          month.events.slice(0, 2).map((event) => (
            <span className="event-teaser" key={event.name}>
              <span className={`event-dot ${event.tentative ? 'event-dot--outline' : ''}`} />
              <span>
                <span className="event-name">{event.name}</span>
                <span className="event-org">{event.org}</span>
              </span>
            </span>
          ))
        )}
      </span>
      {orgIds.length > 0 && (
        <span className="month-organizations">
          <OrgStack ids={orgIds} fallback={fallback} />
          <span className="org-stack-caption">Penyelenggara</span>
        </span>
      )}
      <span className="month-indicators">
        <span>
          <strong>{working}</strong> Dalam pengerjaan
        </span>
        <span>
          <strong>{month.count}</strong> Ada pelaksanaan
        </span>
      </span>
      <span className="month-card-footer">
        <span className="month-count">
          {month.count} <span>proker</span>
        </span>
        <span className="card-footer-right">
          {month.tentative > 0 && <Badge>{month.tentative} tentatif</Badge>}
          <Icon name="arrow" />
        </span>
      </span>
    </button>
  )
}

function ComponentPreview() {
  const [tab, setTab] = useState<'buttons' | 'form' | 'feedback'>('buttons')
  const [simulated, setSimulated] = useState(false)
  const [sampleOrg, setSampleOrg] = useState('hima')
  return (
    <>
      <div className="preview-tabs" aria-label="Bagian komponen">
        {(
          [
            ['buttons', 'Tombol & badge'],
            ['form', 'Formulir'],
            ['feedback', 'Umpan balik'],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            aria-pressed={tab === value}
            onClick={() => {
              setTab(value)
              setSimulated(false)
            }}
          >
            {label}
          </button>
        ))}
      </div>
      {tab === 'buttons' && (
        <div className="component-content">
          <h3>Tombol untuk setiap keadaan</h3>
          <p>Coba arahkan kursor, tekan, atau pindahkan fokus dengan Tab.</p>
          <div className="button-examples">
            <Button variant="primary" onClick={() => setSimulated(true)}>
              Tombol utama
              <Icon name="arrow" />
            </Button>
            <Button onClick={() => setSimulated(true)}>Sekunder</Button>
            <Button variant="ghost" onClick={() => setSimulated(true)}>
              Tombol teks
            </Button>
            <Button variant="danger" onClick={() => setSimulated(true)}>
              Aksi berisiko
            </Button>
            <Button disabled>Nonaktif</Button>
            <Button loading>Menyimpan…</Button>
          </div>
          {simulated && (
            <p className="inline-feedback" role="status">
              <Icon name="check" />
              Klik diterima · ini hanya feedback visual.
            </p>
          )}
          <h3>Status pemakaian ruangan</h3>
          <div className="badge-examples">
            {Object.values(roomStatus).map((status) => (
              <Badge key={status.label} tone={status.tone}>
                {status.label}
              </Badge>
            ))}
          </div>
          <p className="field-help">
            Disetujui berarti dilaporkan oleh PIC. Ini bukan keputusan izin dari aplikasi.
          </p>
        </div>
      )}
      {tab === 'form' && (
        <form
          className="component-content"
          noValidate
          onSubmit={(event) => {
            event.preventDefault()
            setSimulated(true)
          }}
        >
          <div className="field">
            <label htmlFor="sample-name">Nama proker</label>
            <input id="sample-name" placeholder="Contoh: Lokakarya ide kreatif" />
            <span className="field-help">
              Isian hanya sementara; tidak masuk ke daftar kalender.
            </span>
          </div>
          <div className="field">
            <label htmlFor="sample-org">Ormawa pengelola</label>
            <Select
              id="sample-org"
              label="Ormawa pengelola"
              value={sampleOrg}
              onChange={setSampleOrg}
              options={Object.entries(organizations).map(([value, org]) => ({
                value,
                label: org.name,
                icon: <OrgLogo id={value as OrgId} />,
              }))}
            />
          </div>
          <fieldset>
            <legend>Ketelitian jadwal</legend>
            <label className="choice">
              <input type="radio" name="precision" defaultChecked />
              Bulan saja
            </label>
            <label className="choice">
              <input type="radio" name="precision" />
              Tanggal dan jam pasti
            </label>
          </fieldset>
          <label className="choice">
            <input type="checkbox" />
            Tampilkan contoh kolaborasi
          </label>
          <div className="field">
            <label htmlFor="sample-error">Contoh keadaan error</label>
            <input
              id="sample-error"
              aria-invalid="true"
              aria-describedby="sample-error-help"
              defaultValue=""
            />
            <span className="field-error" id="sample-error-help">
              Contoh pesan: isi nama proker. Bukan hasil validasi data.
            </span>
          </div>
          <Button variant="primary" type="submit">
            Lihat simulasi simpan
          </Button>
          {simulated && (
            <div className="feedback-panel" role="status">
              <Icon name="info" />
              <span>
                <strong>Simulasi selesai</strong>Isian tidak disimpan. Daftar proker tidak berubah.
              </span>
            </div>
          )}
        </form>
      )}
      {tab === 'feedback' && (
        <div className="component-content">
          <div className="feedback-panel">
            <Icon name="info" />
            <span>
              <strong>Informasi</strong>Semua nama, jadwal, dan jumlah merupakan contoh fiktif.
            </span>
          </div>
          <div className="feedback-panel feedback-panel--warning">
            <Icon name="warning" />
            <span>
              <strong>Contoh peringatan bentrokan</strong>Slot bertabrakan dengan pemakaian yang
              disetujui. Peringatan ini statis, tanpa pemeriksaan jadwal.
            </span>
          </div>
          <div className="feedback-panel feedback-panel--danger">
            <Icon name="warning" />
            <span>
              <strong>Contoh gagal menyimpan</strong>Isian tetap tersedia untuk dicoba ulang.
            </span>
          </div>
          <Button onClick={() => setSimulated(true)}>Tampilkan toast simulasi</Button>
          {simulated && (
            <div role="status" className="sample-toast">
              <Icon name="check" />
              Simulasi berhasil · tidak ada data tersimpan
              <Button
                variant="ghost"
                className="icon-button"
                aria-label="Tutup toast"
                onClick={() => setSimulated(false)}
              >
                <Icon name="close" />
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export function App() {
  const [view, setView] = useState<'summary' | 'timeline' | 'calendar'>('summary')
  const [rememberedMonth, setRememberedMonth] = useState(1)
  const [program, setProgram] = useState<ProgramDetail | null>(null)
  const [programEdit, setProgramEdit] = useState(false)
  const [reviewProgram, setReviewProgram] = useState('revised')
  const [coordination, setCoordination] = useState<'bem' | 'pic' | null>(null)
  const [modal, setModal] = useState<Modal>(null)
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number | null>(null)
  const [fallbackLogos, setFallbackLogos] = useState(false)
  const returnTarget = useRef<HTMLElement | null>(null)
  const returnScroll = useRef(0)
  const openMonth = (index: number) => {
    setView('calendar')
    setRememberedMonth(index)
    returnTarget.current = document.activeElement as HTMLElement
    returnScroll.current = window.scrollY
    setSelectedMonthIndex(index)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
  const backToYear = () => {
    setView('summary')
    setSelectedMonthIndex(null)
    requestAnimationFrame(() => {
      returnTarget.current?.isConnected
        ? returnTarget.current.focus({ preventScroll: true })
        : document
            .querySelector<HTMLButtonElement>(
              `[data-month-name="${months[selectedMonthIndex ?? 0].name}"]`,
            )
            ?.focus({ preventScroll: true })
      window.scrollTo({ top: returnScroll.current, behavior: 'instant' })
    })
  }
  const showEvent = (event: EventPreview) => {
    const detail = timelinePrograms.all.find((p) => p.name === event.name)
    if (detail) {
      setProgram(detail)
      setProgramEdit(false)
      return
    }
    setEventDetail(event)
    setModal('event')
  }
  const [filter, setFilter] = useState('all')
  const [scenario, setScenario] = useState<Scenario>('normal')
  const [toolsOpen, setToolsOpen] = useState(false)
  const [eventDetail, setEventDetail] = useState<EventPreview | null>(null)
  const [loginSimulated, setLoginSimulated] = useState(false)
  const [period, setPeriod] = useState('2026/2027')
  const open = (value: Modal) => {
    setEventDetail(null)
    setLoginSimulated(false)
    setModal(value)
  }
  const close = () => setModal(null)
  const archive = period === '2025/2026'
  return (
    <>
      <a className="skip-link" href="#main">
        Langsung ke kalender
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a
            className="wordmark"
            href="#main"
            aria-label="Orka, kalender proker"
            onClick={(event) => {
              if (selectedMonthIndex !== null) {
                event.preventDefault()
                backToYear()
              }
            }}
          >
            orka<span className="wordmark-period">.</span>
          </a>
          <nav className="main-nav" aria-label="Navigasi utama">
            <a
              href="#main"
              className="nav-link nav-link--active"
              aria-current="page"
              onClick={(event) => {
                if (selectedMonthIndex !== null) {
                  event.preventDefault()
                  backToYear()
                }
              }}
            >
              <Icon name="calendar" />
              Kalender proker
            </a>
            <button className="nav-link" onClick={() => open('rooms')}>
              <Icon name="room" />
              Pemakaian ruangan
            </button>
          </nav>
          <Button variant="primary" className="login-button" onClick={() => open('login')}>
            Masuk
            <Icon name="arrow" />
          </Button>
        </div>
      </header>
      <main id="main" tabIndex={-1} className="page-shell">
        <div className="calendar-view-switch" role="group" aria-label="Tampilan kalender proker">
          {(
            [
              ['summary', 'Ringkasan', 'grid'],
              ['timeline', 'Timeline', 'clock'],
              ['calendar', 'Kalender', 'calendar'],
            ] as const
          ).map(([value, label, icon]) => (
            <button
              key={value}
              aria-pressed={view === value}
              onClick={() => {
                setView(value)
                if (value === 'calendar') setSelectedMonthIndex(rememberedMonth)
                else setSelectedMonthIndex(null)
              }}
            >
              <Icon name={icon} />
              {label}
            </button>
          ))}
        </div>
        {selectedMonthIndex === null ? (
          <>
            <div className="page-eyebrow">
              <span className="eyebrow-symbol">
                <Icon name="calendar" />
              </span>
              <span>RUANG KOORDINASI ORMAWA</span>
            </div>
            <section className="page-heading" aria-labelledby="page-title">
              <div>
                <h1 id="page-title">
                  Satu kalender.
                  <br className="mobile-break" /> Banyak rencana.
                </h1>
                <p>Lihat rencana proker bersama, temukan waktu yang pas untuk ormawamu.</p>
              </div>
              <Button className="guide-button" onClick={() => open('guide')}>
                <Icon name="info" />
                Cara membaca kalender
              </Button>
            </section>
            <section className="calendar-panel" aria-label="Kalender proker tahunan">
              <div className="calendar-toolbar">
                <div className="period-control">
                  <span className="control-icon">
                    <Icon name="calendar" />
                  </span>
                  <label htmlFor="period">
                    <span>Tahun akademik</span>
                    <Select
                      id="period"
                      label="Tahun akademik"
                      value={period}
                      onChange={setPeriod}
                      options={periodOptions}
                      className="period-select"
                    />
                  </label>
                </div>
                <div className="filter-controls">
                  <Select
                    id="org"
                    label="Filter ormawa"
                    value={filter}
                    onChange={setFilter}
                    options={orgOptions}
                    className="org-select"
                  />
                  {filter !== 'all' && (
                    <Button
                      variant="ghost"
                      className="reset-filter"
                      onClick={() => setFilter('all')}
                    >
                      Reset
                    </Button>
                  )}
                </div>
              </div>
              <div className="calendar-meta">
                <span>
                  <span className="tiny-dot" />
                  {archive ? 'September 2025 — Agustus 2026' : 'September 2026 — Agustus 2027'}
                  {archive && <Badge>Arsip</Badge>}
                </span>
                <span className="meta-description">
                  <Icon name="grid" />
                  {view === 'timeline' ? 'Rentang pengerjaan' : 'Ringkasan 12 bulan'}
                </span>
              </div>
              <div
                className="calendar-content"
                aria-live="polite"
                aria-busy={scenario === 'loading'}
              >
                {scenario === 'error' ? (
                  <div className="page-state">
                    <span className="state-icon">
                      <Icon name="warning" />
                    </span>
                    <h2>Kalender belum bisa dimuat</h2>
                    <p>Pilihan periode dan filter tetap tersedia. Coba muat ulang kalender.</p>
                    <Button onClick={() => setScenario('normal')}>
                      Coba lagi
                      <Icon name="arrow" />
                    </Button>
                  </div>
                ) : (
                  <>
                    {scenario === 'loading' && (
                      <span className="sr-only" role="status">
                        Memuat kalender…
                      </span>
                    )}
                    {scenario === 'empty' && (
                      <div className="empty-notice">
                        <Icon name="info" />
                        <span>Belum ada proker tercatat pada periode dan filter ini.</span>
                      </div>
                    )}
                    {view === 'timeline' ? (
                      scenario === 'loading' ? (
                        <div className="timeline-loading" role="status">
                          Memuat timeline…
                          <div className="skeleton-card" aria-hidden="true">
                            <span />
                            <span />
                            <span />
                          </div>
                        </div>
                      ) : (
                        <Timeline
                          filter={filter}
                          empty={archive || scenario === 'empty'}
                          onOpen={(p) => {
                            setProgram(p)
                            setProgramEdit(false)
                          }}
                        />
                      )
                    ) : (
                      <>
                        {!archive && scenario === 'normal' && (
                          <div className="timeline-summary-note">
                            <Icon name="info" />
                            <span>
                              <strong>
                                {missingTimelines[filter]} proker belum mengisi timeline.
                              </strong>{' '}
                              Pengerjaan dan pelaksanaan dihitung terpisah.
                            </span>
                          </div>
                        )}
                        <div className="month-grid">
                          {months.map((source, index) => {
                            const fixture =
                              filter === 'hima'
                                ? { ...source, ...himaScenario[source.name] }
                                : source
                            const month = {
                              ...fixture,
                              year: archive ? (index < 4 ? '2025' : '2026') : fixture.year,
                            }
                            const shown =
                              scenario === 'empty' || archive
                                ? { ...month, count: 0, tentative: 0, events: [] }
                                : month
                            return scenario === 'loading' ? (
                              <div className="skeleton-card" key={source.name} aria-hidden="true">
                                <span />
                                <span />
                                <span />
                                <span />
                              </div>
                            ) : (
                              <MonthCard
                                key={source.name}
                                month={shown}
                                onOpen={() => openMonth(index)}
                                working={
                                  archive || scenario === 'empty'
                                    ? 0
                                    : timelineSummary[filter][index].work
                                }
                                orgIds={
                                  archive || scenario === 'empty'
                                    ? []
                                    : timelineSummary[filter][index].orgIds
                                }
                                fallback={fallbackLogos}
                              />
                            )
                          })}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
              <div className="calendar-note">
                <Icon name="info" />
                <p>
                  <strong>Rencana boleh berjalan beriringan.</strong> Kalender membantu melihat
                  kepadatan proker, bukan membatasi kegiatan di waktu yang sama.
                </p>
              </div>
            </section>
            <section className="support-strip" aria-label="Informasi kalender">
              <div className="legend">
                <span>
                  <span className="event-dot" />
                  Jadwal pasti
                </span>
                <span>
                  <span className="event-dot event-dot--outline" />
                  Tentatif · bulan saja
                </span>
              </div>
            </section>
          </>
        ) : (
          <MonthCalendar
            name={months[selectedMonthIndex].name}
            year={
              archive ? (selectedMonthIndex < 4 ? '2025' : '2026') : months[selectedMonthIndex].year
            }
            fixture={
              calendarFixtures[
                `${period}/${months[selectedMonthIndex].name}/${scenario === 'empty' ? 'empty' : filter}`
              ]
            }
            orgIds={
              scenario === 'empty' || archive
                ? []
                : filter === 'hima'
                  ? filteredMonthOrganizations[selectedMonthIndex]
                  : monthOrganizations[selectedMonthIndex]
            }
            onBack={backToYear}
            onPrevious={
              selectedMonthIndex > 0
                ? () => {
                    setSelectedMonthIndex(selectedMonthIndex - 1)
                    setRememberedMonth(selectedMonthIndex - 1)
                    window.scrollTo({ top: 0, behavior: 'instant' })
                  }
                : undefined
            }
            onNext={
              selectedMonthIndex < 11
                ? () => {
                    setSelectedMonthIndex(selectedMonthIndex + 1)
                    setRememberedMonth(selectedMonthIndex + 1)
                    window.scrollTo({ top: 0, behavior: 'instant' })
                  }
                : undefined
            }
            onOpen={showEvent}
            controls={
              <div className="detail-filters">
                <Select
                  label="Tahun akademik"
                  value={period}
                  onChange={setPeriod}
                  options={periodOptions}
                />
                <Select
                  label="Filter ormawa"
                  value={filter}
                  onChange={setFilter}
                  options={orgOptions}
                />
              </div>
            }
          />
        )}
        <section className="prototype-tools" aria-label="Alat review prototipe">
          <button
            className="tools-toggle"
            aria-expanded={toolsOpen}
            aria-controls="review-tools"
            onClick={() => setToolsOpen(!toolsOpen)}
          >
            <span>
              <Icon name="settings" />
              Ruang uji UI
            </span>
            <Icon name="down" className={toolsOpen ? 'rotated' : ''} />
          </button>
          {toolsOpen && (
            <div className="tools-content" id="review-tools">
              <div>
                <label htmlFor="scenario">Skenario tampilan</label>
                <Select
                  id="scenario"
                  label="Skenario tampilan"
                  value={scenario}
                  onChange={(value) => {
                    setScenario(value as Scenario)
                    setSelectedMonthIndex(null)
                    if (view === 'calendar') setView('summary')
                  }}
                  options={scenarioOptions}
                />
              </div>
              <Button onClick={() => open('components')}>
                Lihat komponen
                <Icon name="arrow" />
              </Button>
              <label className="choice">
                <input
                  type="checkbox"
                  checked={fallbackLogos}
                  onChange={(event) => setFallbackLogos(event.target.checked)}
                />
                Uji logo fallback (kartu tahunan)
              </label>
              <div className="timeline-review-tools">
                <div className="field">
                  <label htmlFor="timeline-case">Kasus timeline · tampilan PIC</label>
                  <Select
                    id="timeline-case"
                    label="Kasus timeline"
                    value={reviewProgram}
                    onChange={setReviewProgram}
                    options={reviewOptions}
                  />
                </div>
                <Button
                  onClick={() => {
                    setProgram(reviewPrograms[reviewProgram])
                    setProgramEdit(true)
                  }}
                >
                  Buka alur PIC <Icon name="arrow" />
                </Button>
                <Button onClick={() => setCoordination('bem')}>Penutupan ruangan · BEM</Button>
                <Button onClick={() => setCoordination('pic')}>Tindak lanjut ruangan · PIC</Button>
                <p>Pemilih peran ini khusus review UI; bukan akses pengelolaan sungguhan.</p>
              </div>
              <p>
                Filter dan periode membuka skenario statis. Tidak ada query, perhitungan jadwal,
                atau penyimpanan.
              </p>
            </div>
          )}
        </section>
      </main>
      <footer className="site-footer">
        <div>
          <span className="footer-brand">orka.</span>
          <span>Rencana lebih terlihat. Koordinasi lebih dekat.</span>
        </div>
      </footer>
      {program && (
        <ProgramDialog
          key={program.id}
          program={program}
          canEdit={programEdit}
          archive={archive && !programEdit}
          onClose={() => setProgram(null)}
        />
      )}
      {coordination && (
        <RoomCoordination
          role={coordination}
          onClose={() => setCoordination(null)}
          onProgram={(p) => {
            setCoordination(null)
            setProgram(p)
            setProgramEdit(true)
          }}
        />
      )}
      {modal && (
        <Dialog
          title={
            modal === 'event'
              ? (eventDetail?.name ?? 'Detail proker')
              : {
                  guide: 'Membaca rencana bersama',
                  login: 'Kelola rencana ormawamu',
                  rooms: 'Pemakaian ruangan',
                  components: 'Komponen & interaksi',
                }[modal]
          }
          description={
            modal === 'components'
              ? 'Coba keadaan komponen tanpa menjalankan logika data.'
              : undefined
          }
          wide={modal === 'event' || modal === 'components'}
          onClose={close}
        >
          {modal === 'event' && eventDetail && (
            <div className="event-detail">
              <dl>
                <div>
                  <dt>Penyelenggara</dt>
                  <dd>
                    <OrgStack ids={eventOrganizations[eventDetail.org]} limit={5} />
                    {eventDetail.org}
                  </dd>
                </div>
                <div>
                  <dt>Jadwal</dt>
                  <dd>{eventDetail.when}</dd>
                </div>
                <div>
                  <dt>Ketelitian waktu</dt>
                  <dd>
                    <Badge tone={eventDetail.tentative ? 'info' : 'neutral'}>
                      {eventDetail.tentative ? 'Tentatif · bulan saja' : 'Tanggal dan jam pasti'}
                    </Badge>
                  </dd>
                </div>
              </dl>
              <p className="field-help">Pemakaian ruangan dicatat terpisah dari jadwal proker.</p>
            </div>
          )}
          {modal === 'guide' && (
            <div className="guide-content">
              <div>
                <span className="step-number">01</span>
                <div>
                  <h3>Mulai dari gambaran setahun</h3>
                  <p>Pilih periode dan ormawa. Buka kartu bulan untuk melihat rencana proker.</p>
                </div>
              </div>
              <div>
                <span className="step-number">02</span>
                <div>
                  <h3>Tanggal belum pasti? Tetap tercatat.</h3>
                  <p>
                    Label tentatif berarti baru bulannya yang diketahui. Tanggal tidak dibuat-buat.
                  </p>
                </div>
              </div>
              <div>
                <span className="step-number">03</span>
                <div>
                  <h3>Proker dan pemakaian ruangan berbeda</h3>
                  <p>
                    Proker boleh bersamaan. Izin ruangan tetap diurus melalui jalur resmi kampus.
                  </p>
                </div>
              </div>
            </div>
          )}
          {modal === 'login' && (
            <div className="login-preview">
              <span className="login-art">
                <Icon name="calendar" />
              </span>
              <p>
                Gunakan akun Google resmi ormawa.
                <br />
                Akses pengelolaan diverifikasi oleh BEM.
              </p>
              <Button variant="primary" onClick={() => setLoginSimulated(true)}>
                Masuk dengan Google
                <Icon name="arrow" />
              </Button>
              {loginSimulated && (
                <div className="feedback-panel" role="status">
                  <Icon name="info" />
                  <span>
                    <strong>Verifikasi BEM diperlukan</strong>Akses pengelolaan menggunakan akun
                    resmi ormawa yang diverifikasi BEM.
                  </span>
                </div>
              )}
              <p className="field-help">Melihat kalender tetap bisa tanpa masuk.</p>
            </div>
          )}
          {modal === 'rooms' && (
            <div className="room-preview">
              <p>
                <strong>Aula Contoh · 21 November 2026</strong>
              </p>
              <div className="room-sample">
                <div>
                  <Icon name="clock" />
                  <strong>08.00–12.00</strong>
                </div>
                <h3>Lokakarya tiga sesi · sesi 2</h3>
                <p>Hima A Contoh</p>
                <div className="status-pair">
                  <Badge tone="success">Disetujui · dilaporkan oleh PIC</Badge>
                  <Badge tone="warning">Perlu penyesuaian</Badge>
                </div>
                <p className="field-help">
                  Aula tidak tersedia 20–22 November berdasarkan informasi kampus yang dicatat BEM.
                  PIC menentukan penyesuaian; jadwal proker belum diubah.
                </p>
              </div>
              <div className="feedback-panel">
                <Icon name="info" />
                <span>
                  Belum ada pemakaian tercatat pada slot lain. Tetap cek dan urus izin melalui jalur
                  kampus.
                </span>
              </div>
            </div>
          )}
          {modal === 'components' && <ComponentPreview />}
        </Dialog>
      )}
    </>
  )
}
