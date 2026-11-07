import { useState } from 'react'
import { Badge, Button, Dialog, Icon } from '../components/ui'
import { Select } from '../components/Select'
import { OrgLogo, OrgStack, organizations } from '../components/Organizations'
import { roomStatus } from '../fixtures'
import { roomNames } from '../room-fixtures'
import { managedPrograms, managedUsages, managedHistory } from '../manage-fixtures'
import type { AccountPreview } from '../manage-fixtures'
import type { RoomUsage } from '../room-fixtures'
import type { ProgramDetail } from '../timeline-types'
import { ProgramDialog } from './ProgramDialog'
import { ProgramForm } from './ProgramForm'
import { UsageDetail, UsageForm } from './Rooms'
import { RoomCoordination } from './RoomCoordination'

type UsageOperation = 'confirm' | 'status' | 'cancel'
const accessOptions = [
  { value: 'active', label: 'PIC aktif' },
  { value: 'unverified', label: 'Belum diverifikasi' },
  { value: 'revoked', label: 'Akses dicabut' },
]
const pageOptions = [
  { value: 'normal', label: 'Normal' },
  { value: 'empty', label: 'Kosong' },
  { value: 'loading', label: 'Memuat' },
  { value: 'error', label: 'Gagal memuat' },
]
const outcomeOptions = [
  { value: 'normal', label: 'Tinjauan normal' },
  { value: 'failed', label: 'Gagal menyimpan' },
  { value: 'stale', label: 'Versi berubah' },
  { value: 'revoked', label: 'Akses dicabut saat menyimpan' },
  { value: 'conflict', label: 'Laporan izin bertentangan · ruangan' },
]

function UsageAction({
  usage,
  mode,
  outcome,
  onClose,
}: {
  usage: RoomUsage
  mode: UsageOperation
  outcome: string
  onClose: () => void
}) {
  const [screen, setScreen] = useState<'form' | 'review' | 'dispute' | 'done'>(
    mode === 'status' ? 'form' : 'review',
  )
  const [status, setStatus] = useState('pending')
  const [failed, setFailed] = useState(false)
  const [report, setReport] = useState(false)
  const conflict = outcome === 'conflict' && mode === 'status'
  const blocked = outcome === 'stale' || outcome === 'revoked' || conflict
  const title =
    screen === 'done'
      ? 'Simulasi tindakan selesai'
      : screen === 'dispute'
        ? 'Tinjau laporan izin bertentangan'
        : mode === 'confirm'
          ? 'Konfirmasi masih direncanakan'
          : mode === 'cancel'
            ? 'Tinjau pembatalan pemakaian'
            : screen === 'review'
              ? 'Tinjau pembaruan izin'
              : 'Perbarui laporan izin'
  return (
    <Dialog title={title} wide onClose={onClose}>
      <div className="room-form">
        {screen !== 'done' && (
          <div className="manage-action-subject">
            <strong>{usage.title}</strong>
            <p>
              {roomNames[usage.room]} · {usage.date} · {usage.time}
            </p>
            <Badge tone={roomStatus[usage.status].tone}>{roomStatus[usage.status].label}</Badge>
          </div>
        )}
        {screen === 'form' && (
          <>
            <div className="field">
              <label htmlFor="reported-status">Hasil pengajuan menurut PIC</label>
              <Select
                id="reported-status"
                label="Hasil izin menurut PIC"
                value={status}
                onChange={setStatus}
                options={[
                  {
                    value: 'pending',
                    label: 'Menunggu keputusan',
                    description: 'Sudah diajukan melalui jalur kampus.',
                  },
                  {
                    value: 'approved',
                    label: 'Disetujui',
                    description: 'PIC telah menerima izin dari kampus.',
                  },
                  {
                    value: 'rejected',
                    label: 'Ditolak',
                    description: 'PIC menerima penolakan dari kampus.',
                  },
                ]}
              />
            </div>
            <p className="field-help">
              Tidak perlu mengunggah bukti. Aplikasi mencatat laporan PIC; keputusan izin berasal
              dari kampus.
            </p>
            <Button variant="primary" onClick={() => setScreen('review')}>
              Tinjau pembaruan <Icon name="arrow" />
            </Button>
          </>
        )}
        {screen === 'review' && (
          <>
            {mode === 'status' && (
              <dl className="room-facts">
                <div>
                  <dt>Status yang dilaporkan</dt>
                  <dd>
                    <Badge tone={roomStatus[status as keyof typeof roomStatus].tone}>
                      {roomStatus[status as keyof typeof roomStatus].label}
                    </Badge>
                  </dd>
                </div>
                <div>
                  <dt>Akun pencatat</dt>
                  <dd>Akun resmi Hima A Contoh</dd>
                </div>
              </dl>
            )}
            {mode === 'confirm' && (
              <div className="feedback-panel">
                <Icon name="info" />
                <span>
                  <strong>Rencana ini masih akan dilaksanakan?</strong>Konfirmasi menjadi pembaruan
                  rencana untuk aturan 7 hari. Konfirmasi tidak mengubah status izin dan bukan
                  perpanjangan izin kampus.
                </span>
              </div>
            )}
            {mode === 'cancel' && (
              <div className="feedback-panel feedback-panel--warning">
                <Icon name="warning" />
                <span>
                  <strong>Batalkan satu pemakaian ruangan ini</strong>Jadwal proker dan sesi lain
                  tetap tercatat. Pembatalan di platform tidak menggantikan koordinasi pembatalan
                  izin dengan kampus.
                </span>
              </div>
            )}
            {mode === 'status' && !conflict && (
              <div className="feedback-panel">
                <Icon name="info" />
                <span>
                  {status === 'approved'
                    ? 'Status disetujui tidak mengikuti kedaluwarsa 7 hari. Izin ini tidak otomatis berlaku untuk ruangan atau waktu pengganti.'
                    : status === 'rejected'
                      ? 'Catatan penolakan menjadi riwayat. Jika ingin mengajukan lagi, buat rencana baru.'
                      : 'Catatan menunggu keputusan perlu diperbarui atau dikonfirmasi dalam 7 hari.'}
                </span>
              </div>
            )}
            {conflict && (
              <div className="feedback-panel feedback-panel--warning" role="alert">
                <Icon name="warning" />
                <span>
                  <strong>Contoh: laporan izin bertentangan</strong>Persetujuan kedua tidak dapat
                  dicatat. Status sebelumnya dipertahankan; PIC dapat membuka laporan peninjauan
                  untuk klarifikasi bersama BEM melalui kampus.
                </span>
              </div>
            )}
            {outcome === 'stale' && (
              <div className="feedback-panel feedback-panel--warning" role="alert">
                <Icon name="warning" />
                <span>
                  <strong>Contoh: catatan sudah berubah</strong>Muat ulang sebelum meninjau ulang
                  tindakan. Versi lama tidak boleh menimpa pembaruan lain.
                </span>
              </div>
            )}
            {outcome === 'revoked' && (
              <div className="feedback-panel room-feedback--danger" role="alert">
                <Icon name="warning" />
                <span>
                  <strong>Contoh: akses dicabut</strong>Tindakan tidak dapat dilanjutkan. Hubungi
                  pengelola BEM.
                </span>
              </div>
            )}
            {failed && (
              <div className="feedback-panel room-feedback--danger" role="alert">
                <Icon name="warning" />
                <span>
                  Simulasi gagal menyimpan. Pilihan tetap ada; belum ada perubahan tersimpan.
                </span>
              </div>
            )}
            <div className="wizard-actions">
              {mode === 'status' && (
                <Button
                  onClick={() => {
                    setScreen('form')
                    setFailed(false)
                  }}
                >
                  <Icon name="back" />
                  Kembali ke pilihan
                </Button>
              )}
              {conflict ? (
                <Button
                  onClick={() => {
                    setScreen('dispute')
                    setReport(true)
                  }}
                >
                  Buka laporan peninjauan <Icon name="arrow" />
                </Button>
              ) : (
                <Button
                  variant={mode === 'cancel' ? 'danger' : 'primary'}
                  disabled={blocked}
                  onClick={() => (outcome === 'failed' ? setFailed(true) : setScreen('done'))}
                >
                  {failed
                    ? 'Coba lagi'
                    : mode === 'confirm'
                      ? 'Konfirmasi rencana'
                      : mode === 'cancel'
                        ? 'Batalkan pemakaian'
                        : 'Simpan laporan izin'}
                </Button>
              )}
            </div>
          </>
        )}
        {screen === 'dispute' && (
          <>
            <p>
              Status <strong>{roomStatus[usage.status].label}</strong> tetap dipertahankan. BEM
              membantu klarifikasi, bukan memberikan izin.
            </p>
            <div className="field">
              <label htmlFor="dispute-note">Ringkasan laporan</label>
              <textarea
                id="dispute-note"
                defaultValue="PIC melaporkan sudah menerima izin, tetapi terdapat catatan izin lain pada slot yang sama. Mohon peninjauan bersama kampus."
              />
            </div>
            <p className="field-help">
              Koordinasikan izin melalui jalur kampus. Laporan ini tidak membuat persetujuan kedua.
            </p>
            <div className="wizard-actions">
              <Button onClick={() => setScreen('review')}>Kembali ke tinjauan</Button>
              <Button variant="primary" onClick={() => setScreen('done')}>
                Selesaikan simulasi laporan
              </Button>
            </div>
          </>
        )}
        {screen === 'done' && (
          <>
            <span className="room-done-icon">
              <Icon name="check" />
            </span>
            <h3>
              {report ? 'Alur laporan peninjauan sudah ditinjau' : 'Alur tindakan sudah ditinjau'}
            </h3>
            <p>
              Ini hasil simulasi UI. Tidak ada status, tenggat, pembatalan, atau laporan yang
              disimpan maupun dikirim. Daftar dan riwayat tetap seperti semula.
            </p>
            <Button variant="primary" onClick={onClose}>
              Kembali ke kelola ormawa <Icon name="arrow" />
            </Button>
          </>
        )}
      </div>
    </Dialog>
  )
}

export function Manage({
  access,
  onAccess,
  onPublic,
}: {
  access: AccountPreview
  onAccess: (access: AccountPreview) => void
  onPublic: () => void
}) {
  const [tab, setTab] = useState('programs')
  const [state, setState] = useState('normal')
  const [period, setPeriod] = useState('active')
  const [outcome, setOutcome] = useState('normal')
  const [tools, setTools] = useState(false)
  const [program, setProgram] = useState<{ program: ProgramDetail; editable: boolean } | null>(null)
  const [programForm, setProgramForm] = useState<{ program: ProgramDetail | null } | null>(null)
  const [usage, setUsage] = useState<RoomUsage | null>(null)
  const [usageForm, setUsageForm] = useState<{ usage?: RoomUsage; replacement?: boolean } | null>(
    null,
  )
  const [action, setAction] = useState<{ usage: RoomUsage; mode: UsageOperation } | null>(null)
  const [coordination, setCoordination] = useState(false)
  const archive = period === 'archive'
  const normal = state === 'normal' && !archive
  return (
    <div className="manage-page">
      <div className="page-eyebrow">
        <span className="eyebrow-symbol">
          <Icon name="settings" />
        </span>
        <span>RUANG KELOLA ORMAWA</span>
      </div>
      <section className="page-heading" aria-labelledby="manage-title">
        <div>
          <h1 id="manage-title">Kelola ormawa.</h1>
          <p>Jaga rencana tetap terbaca, dari persiapan sampai pelaksanaan.</p>
        </div>
        {access === 'active' && (
          <div className="manage-identity">
            <OrgLogo id="hima" />
            <div>
              <strong>Hima A Contoh</strong>
              <span>Akun resmi ormawa</span>
            </div>
            <Badge tone="success">Terverifikasi</Badge>
          </div>
        )}
      </section>
      {access !== 'active' ? (
        <section className="rooms-panel">
          <div className="page-state">
            <span className="state-icon">
              <Icon name="info" />
            </span>
            <h2>
              {access === 'revoked' ? 'Akses pengelolaan dicabut' : 'Akun belum diverifikasi'}
            </h2>
            <p>
              {access === 'revoked'
                ? 'Hubungi pengelola BEM untuk memeriksa akses akun resmi ormawa. Perubahan tidak dapat dilakukan.'
                : 'Akses pengelolaan diberikan setelah BEM memverifikasi akun Google resmi ormawa.'}
            </p>
            <Button onClick={onPublic}>
              Lihat kalender publik <Icon name="arrow" />
            </Button>
          </div>
        </section>
      ) : (
        <>
          {normal && (
            <section className="manage-followups" aria-labelledby="followups-title">
              <div className="manage-section-heading">
                <div>
                  <span className="section-kicker">JANGAN TERLEWAT</span>
                  <h2 id="followups-title">Perlu ditindaklanjuti</h2>
                </div>
                <Icon name="clock" />
              </div>
              <div className="manage-task-grid">
                <article>
                  <Badge tone="warning">Ruangan perlu penyesuaian</Badge>
                  <h3>Lokakarya tiga sesi</h3>
                  <p>
                    Aula tidak tersedia pada sesi 2. Tentukan penyesuaian tanpa mengubah sesi lain.
                  </p>
                  <Button onClick={() => setCoordination(true)}>
                    Tinjau penyesuaian <Icon name="arrow" />
                  </Button>
                </article>
                <article>
                  <Badge tone="info">Konfirmasi rencana</Badge>
                  <h3>Persiapan forum ormawa</h3>
                  <p>Masih direncanakan? Konfirmasi sebelum 27 November 2026 · 10.00.</p>
                  <Button
                    onClick={() => setAction({ usage: managedUsages[2].usage, mode: 'confirm' })}
                  >
                    Tinjau konfirmasi <Icon name="arrow" />
                  </Button>
                </article>
              </div>
            </section>
          )}
          <section className="rooms-panel manage-panel" aria-label="Rencana milik ormawa">
            <div className="manage-toolbar">
              <div className="manage-tabs" role="group" aria-label="Bagian kelola ormawa">
                {[
                  ['programs', 'Proker'],
                  ['usages', 'Pemakaian ruangan'],
                  ['history', 'Riwayat'],
                ].map(([value, label]) => (
                  <button key={value} aria-pressed={tab === value} onClick={() => setTab(value)}>
                    {label}
                  </button>
                ))}
              </div>
              <div className="field">
                <label htmlFor="manage-period" className="sr-only">
                  Periode kelola
                </label>
                <Select
                  id="manage-period"
                  label="Periode kelola"
                  value={period}
                  onChange={setPeriod}
                  options={[
                    { value: 'active', label: '2026 / 2027 · aktif' },
                    { value: 'archive', label: '2025 / 2026 · arsip' },
                  ]}
                />
              </div>
            </div>
            <div className="manage-list-heading">
              <div>
                <h2>
                  {tab === 'programs'
                    ? 'Proker ormawamu'
                    : tab === 'usages'
                      ? 'Pemakaian ormawamu'
                      : 'Riwayat perubahan'}
                </h2>
                <p>
                  {tab === 'programs'
                    ? 'Proker yang dikelola dan kolaborasi yang diikuti.'
                    : tab === 'usages'
                      ? 'Status izin, pembaruan, dan tindak lanjut pemakaian.'
                      : 'Catatan akun organisasi, tanpa mengklaim pengurus individual.'}
                </p>
              </div>
              {archive ? (
                <Badge>Arsip · hanya baca</Badge>
              ) : (
                tab !== 'history' && (
                  <Button
                    variant="primary"
                    onClick={() =>
                      tab === 'programs' ? setProgramForm({ program: null }) : setUsageForm({})
                    }
                  >
                    <Icon name="plus" />
                    {tab === 'programs' ? 'Tambah proker' : 'Catat pemakaian'}
                  </Button>
                )
              )}
            </div>
            <div aria-live="polite" aria-busy={state === 'loading'}>
              {state === 'loading' ? (
                <div className="rooms-loading" role="status">
                  Memuat rencana ormawa…
                  <div className="skeleton-card" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              ) : state === 'error' ? (
                <div className="page-state">
                  <span className="state-icon">
                    <Icon name="warning" />
                  </span>
                  <h2>Rencana belum bisa dimuat</h2>
                  <p>Data terbaru belum tersedia. Pilihan tab dan periode tetap dipertahankan.</p>
                  <Button onClick={() => setState('normal')}>
                    Coba lagi <Icon name="arrow" />
                  </Button>
                </div>
              ) : !normal ? (
                <div className="page-state">
                  <span className="state-icon">
                    <Icon name="calendar" />
                  </span>
                  <h2>
                    {archive
                      ? 'Belum ada catatan pada arsip contoh'
                      : 'Belum ada catatan pada bagian ini'}
                  </h2>
                  <p>
                    {archive
                      ? 'Arsip hanya dapat dibaca. Pencatatan baru tersedia di periode aktif.'
                      : 'Mulai dari rencana proker atau pemakaian ruangan ormawamu.'}
                  </p>
                  {archive && (
                    <Button onClick={() => setPeriod('active')}>Kembali ke periode aktif</Button>
                  )}
                </div>
              ) : tab === 'programs' ? (
                <div className="manage-programs">
                  {managedPrograms.map((item) => (
                    <article key={item.program.id} className="manage-program-card">
                      <div className="manage-card-top">
                        <OrgStack ids={item.program.orgIds} />
                        <Badge tone={item.program.tone}>{item.program.status}</Badge>
                      </div>
                      <h3>{item.program.name}</h3>
                      <p className="manage-program-owner">
                        Pengelola utama: {organizations[item.program.orgIds[0]].name}
                      </p>
                      <div className="manage-program-meta">
                        <span>
                          <Icon name="clock" />
                          {item.program.work}
                        </span>
                        <span>
                          <Icon name="calendar" />
                          {item.program.occurrences.length} sesi pelaksanaan
                        </span>
                      </div>
                      {!item.editable && (
                        <p className="field-help">
                          {item.program.orgIds[0] !== 'hima'
                            ? 'Kolaborasi · perubahan dilakukan oleh pengelola utama.'
                            : 'Selesai sebagian · sesi terlaksana dan riwayat tetap dipertahankan.'}
                        </p>
                      )}
                      <div className="manage-card-actions">
                        <Button onClick={() => setProgram(item)}>
                          Lihat detail <Icon name="arrow" />
                        </Button>
                        {item.editable && (
                          <Button
                            variant="ghost"
                            onClick={() => setProgramForm({ program: item.program })}
                          >
                            Edit informasi
                          </Button>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              ) : tab === 'usages' ? (
                <div>
                  {managedUsages.map((item) => (
                    <article className="manage-usage-row" key={item.usage.id}>
                      <div>
                        <span className="usage-room">
                          <Icon name="room" />
                          {roomNames[item.usage.room]}
                        </span>
                        <h3>{item.usage.title}</h3>
                        <p>
                          {item.usage.date} · {item.usage.time}
                        </p>
                        <div className="status-pair">
                          <Badge tone={roomStatus[item.usage.status].tone}>
                            {roomStatus[item.usage.status].label}
                          </Badge>
                          {item.usage.adjustment && <Badge tone="warning">Perlu penyesuaian</Badge>}
                          {item.usage.dispute && <Badge tone="danger">Dalam peninjauan</Badge>}
                        </div>
                        <p className="manage-deadline">{item.deadline}</p>
                        <p className="usage-updated">Diperbarui {item.usage.updated}</p>
                      </div>
                      <div className="manage-usage-actions">
                        <Button onClick={() => setUsage(item.usage)}>Detail</Button>
                        {item.confirmable && (
                          <Button onClick={() => setAction({ usage: item.usage, mode: 'confirm' })}>
                            Masih direncanakan
                          </Button>
                        )}
                        {item.confirmable && (
                          <Button onClick={() => setUsageForm({ usage: item.usage })}>
                            Edit rencana
                          </Button>
                        )}
                        {item.usage.status === 'approved' && (
                          <Button
                            onClick={() => setUsageForm({ usage: item.usage, replacement: true })}
                          >
                            Buat pengganti
                          </Button>
                        )}
                        {item.reportable && (
                          <Button onClick={() => setAction({ usage: item.usage, mode: 'status' })}>
                            Perbarui izin
                          </Button>
                        )}
                        {item.usage.adjustment && (
                          <Button onClick={() => setCoordination(true)}>Tindak lanjut</Button>
                        )}
                        {item.cancellable ? (
                          <Button
                            variant="ghost"
                            onClick={() => setAction({ usage: item.usage, mode: 'cancel' })}
                          >
                            Batalkan pemakaian
                          </Button>
                        ) : (
                          <Button onClick={() => setUsageForm({})}>
                            Buat rencana baru <Icon name="plus" />
                          </Button>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <ol className="manage-history">
                  {managedHistory.map((entry) => (
                    <li key={entry.title}>
                      <span className="manage-history-dot" />
                      <div>
                        <span className="usage-updated">{entry.date}</span>
                        <h3>{entry.title}</h3>
                        <p>{entry.detail}</p>
                        <small>{entry.actor}</small>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </div>
            <div className="calendar-note">
              <Icon name="info" />
              <p>
                Pengelolaan memakai akun resmi bersama. Riwayat mengidentifikasi akun organisasi,
                bukan pengurus individual yang memakainya.
              </p>
            </div>
          </section>
        </>
      )}
      <section className="prototype-tools" aria-label="Alat review kelola ormawa">
        <button
          className="tools-toggle"
          aria-expanded={tools}
          aria-controls="manage-review-tools"
          onClick={() => setTools(!tools)}
        >
          <span>
            <Icon name="settings" />
            Ruang uji UI
          </span>
          <Icon name="down" />
        </button>
        {tools && (
          <div className="tools-content room-review-tools" id="manage-review-tools">
            <div className="field">
              <label htmlFor="manage-access">Skenario akses</label>
              <Select
                id="manage-access"
                label="Skenario akses kelola"
                value={access === 'public' ? 'unverified' : access}
                onChange={(value) => onAccess(value as AccountPreview)}
                options={accessOptions}
              />
            </div>
            <div className="field">
              <label htmlFor="manage-state">Skenario halaman</label>
              <Select
                id="manage-state"
                label="Skenario halaman kelola"
                value={state}
                onChange={setState}
                options={pageOptions}
              />
            </div>
            <div className="field">
              <label htmlFor="manage-outcome">Hasil tinjauan</label>
              <Select
                id="manage-outcome"
                label="Skenario hasil kelola"
                value={outcome}
                onChange={setOutcome}
                options={outcomeOptions}
              />
            </div>
            <p>
              Seluruh akun, catatan, waktu dan dampak adalah contoh fiktif. Pemilih skenario bukan
              otorisasi atau pemeriksaan input. Simpan tidak mengubah daftar/riwayat dan tidak
              mengirim laporan.
            </p>
          </div>
        )}
      </section>
      {program && (
        <ProgramDialog
          program={program.program}
          canEdit={program.editable}
          onClose={() => setProgram(null)}
        />
      )}
      {programForm && (
        <ProgramForm
          program={programForm.program}
          outcome={outcome}
          onClose={() => setProgramForm(null)}
        />
      )}
      {usage && <UsageDetail usage={usage} archive={false} onClose={() => setUsage(null)} />}
      {usageForm && (
        <UsageForm
          outcome={outcome}
          usage={usageForm.usage}
          replacement={usageForm.replacement}
          onClose={() => setUsageForm(null)}
        />
      )}
      {action && (
        <UsageAction
          usage={action.usage}
          mode={action.mode}
          outcome={outcome}
          onClose={() => setAction(null)}
        />
      )}
      {coordination && (
        <RoomCoordination
          role="pic"
          onClose={() => setCoordination(false)}
          onProgram={(p) => {
            setCoordination(false)
            setProgram({ program: p, editable: true })
          }}
        />
      )}
    </div>
  )
}
