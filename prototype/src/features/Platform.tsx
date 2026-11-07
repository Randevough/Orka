import { useRef, useState } from 'react'
import { Badge, Button, Dialog, Icon } from '../components/ui'
import { Select } from '../components/Select'
import { OrgLogo, organizations } from '../components/Organizations'
import { roomStatus } from '../fixtures'
import {
  platformOrganizations,
  organizationViews,
  accountStatus,
  platformRooms,
  platformPeriods,
  disputeUsages,
  archivedPrograms,
  archivedUsages,
  platformHistory,
} from '../platform-fixtures'
import { PlatformDialog } from './PlatformDialog'
import type { PlatformAction } from './PlatformDialog'
import { RoomCoordination } from './RoomCoordination'
import type { AccountPreview } from '../manage-fixtures'

const tabs = [
  { value: 'overview', label: 'Tindak lanjut' },
  { value: 'organizations', label: 'Ormawa & akses' },
  { value: 'rooms', label: 'Ruangan' },
  { value: 'periods', label: 'Periode & arsip' },
  { value: 'disputes', label: 'Peninjauan' },
  { value: 'history', label: 'Riwayat' },
]
const headings: Record<string, { title: string; description: string }> = {
  overview: {
    title: 'Perlu ditindaklanjuti',
    description: 'Mulai dari verifikasi akun, informasi ruangan dan klarifikasi izin.',
  },
  organizations: {
    title: 'Ormawa dan akun resmi',
    description: 'Satu akun resmi mewakili satu ormawa; hak platform diberikan terpisah.',
  },
  rooms: {
    title: 'Ruangan kampus',
    description: 'Pelihara informasi ruangan dan catat informasi ketidaktersediaan dari kampus.',
  },
  periods: {
    title: 'Periode akademik dan arsip',
    description: 'Siapkan periode berikutnya tanpa menghilangkan catatan periode lama.',
  },
  disputes: {
    title: 'Peninjauan izin',
    description: 'Bantu klarifikasi bersama PIC melalui jalur resmi kampus.',
  },
  history: {
    title: 'Riwayat pengelolaan',
    description: 'Jejak akun organisasi dan tindakan pengelolaan; tidak dapat diedit.',
  },
}

function ArchiveDialog({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState('programs')
  return (
    <Dialog title="Arsip 2025 / 2026" wide onClose={onClose}>
      <div className="room-form">
        <Badge>Arsip · hanya baca</Badge>
        <p>September 2025 – Agustus 2026. Catatan mempertahankan konteks periode sebelumnya.</p>
        <div className="manage-tabs" role="group" aria-label="Isi arsip">
          <button aria-pressed={tab === 'programs'} onClick={() => setTab('programs')}>
            Proker arsip
          </button>
          <button aria-pressed={tab === 'usages'} onClick={() => setTab('usages')}>
            Pemakaian arsip
          </button>
        </div>
        <div className="platform-archive-list">
          {tab === 'programs'
            ? archivedPrograms.map((item) => (
                <article key={item.name}>
                  <h3>{item.name}</h3>
                  <p>{item.owner}</p>
                  <p>{item.when}</p>
                </article>
              ))
            : archivedUsages.map((item) => (
                <article key={item.name}>
                  <h3>{item.name}</h3>
                  <p>{item.owner}</p>
                  <p>{item.when}</p>
                  <Badge tone="success">{item.status}</Badge>
                </article>
              ))}
        </div>
        <p className="field-help">
          Tidak ada edit atau penghapusan dari arsip. Kebijakan koreksi historis menunggu keputusan
          sebelum integrasi.
        </p>
      </div>
    </Dialog>
  )
}
function DisputeDialog({ onClose, onRecord }: { onClose: () => void; onRecord: () => void }) {
  return (
    <Dialog title="Laporan izin bertentangan" wide onClose={onClose}>
      <div className="room-form">
        <Badge tone="warning">Menunggu klarifikasi kampus</Badge>
        <p>Ruang Rapat Contoh · 18 November 2026 · 13.00–15.00</p>
        {disputeUsages.map((usage) => (
          <article className="platform-dispute-usage" key={usage.id}>
            <span className="room-org">
              <OrgLogo id={usage.org} />
              {organizations[usage.org].name}
            </span>
            <h3>{usage.title}</h3>
            <Badge tone={roomStatus[usage.status].tone}>{roomStatus[usage.status].label}</Badge>
            <p className="field-help">Pembaruan terakhir: {usage.updated}</p>
          </article>
        ))}
        <div className="feedback-panel feedback-panel--warning">
          <Icon name="info" />
          <span>
            Hima A melaporkan izin yang bertentangan dengan catatan BEM. Status sebelumnya
            dipertahankan; persetujuan kedua tidak dicatat. BEM membantu klarifikasi, bukan pemberi
            izin kampus.
          </span>
        </div>
        <Button variant="primary" onClick={onRecord}>
          Catat hasil peninjauan <Icon name="arrow" />
        </Button>
      </div>
    </Dialog>
  )
}

export function Platform({ account, onPublic }: { account: AccountPreview; onPublic: () => void }) {
  const [tab, setTab] = useState('overview')
  const [filter, setFilter] = useState('all')
  const [state, setState] = useState('normal')
  const [access, setAccess] = useState('allowed')
  const [outcome, setOutcome] = useState('normal')
  const [tools, setTools] = useState(false)
  const [action, setAction] = useState<PlatformAction | null>(null)
  const [closure, setClosure] = useState(false)
  const [archive, setArchive] = useState(false)
  const [dispute, setDispute] = useState(false)
  const sectionHeading = useRef<HTMLHeadingElement>(null)
  const allowed = account === 'bem' && access === 'allowed'
  const changeTab = (value: string) => {
    setTab(value)
    requestAnimationFrame(() => sectionHeading.current?.focus())
  }
  return (
    <div className="platform-page">
      <div className="page-eyebrow">
        <span className="eyebrow-symbol">
          <Icon name="settings" />
        </span>
        <span>PENGELOLAAN PLATFORM</span>
      </div>
      <section className="page-heading" aria-labelledby="platform-title">
        <div>
          <h1 id="platform-title">Kelola platform.</h1>
          <p>Jaga akses, ruang, dan periode tetap tertata.</p>
        </div>
        {allowed && (
          <div className="manage-identity">
            <OrgLogo id="bem" />
            <div>
              <strong>BEM Contoh</strong>
              <span>Akun pengelola platform</span>
            </div>
            <Badge tone="info">Hak pengelola</Badge>
          </div>
        )}
      </section>
      {!allowed ? (
        <section className="rooms-panel">
          <div className="page-state">
            <span className="state-icon">
              <Icon name="info" />
            </span>
            <h2>
              {access === 'revoked'
                ? 'Hak pengelola platform dicabut'
                : 'Hak pengelola platform diperlukan'}
            </h2>
            <p>
              {access === 'organization'
                ? 'Akun BEM sebagai ormawa tidak otomatis memiliki hak pengelola platform.'
                : 'Hanya akun dengan hak pengelola platform aktif dapat mengubah akses, ruangan dan periode.'}
            </p>
            <Button onClick={onPublic}>
              Lihat kalender publik <Icon name="arrow" />
            </Button>
          </div>
        </section>
      ) : (
        <section className="rooms-panel platform-panel" aria-label="Pengelolaan BEM">
          <div className="platform-nav">
            <div
              className="manage-tabs platform-desktop-tabs"
              role="group"
              aria-label="Bagian kelola platform"
            >
              {tabs.map((item) => (
                <button
                  key={item.value}
                  aria-pressed={tab === item.value}
                  onClick={() => changeTab(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="field platform-mobile-tabs">
              <label htmlFor="platform-section">Bagian kelola platform</label>
              <Select
                id="platform-section"
                label="Bagian kelola platform"
                value={tab}
                onChange={changeTab}
                options={tabs}
              />
            </div>
          </div>
          <div className="manage-list-heading">
            <div>
              <h2 ref={sectionHeading} tabIndex={-1}>
                {headings[tab].title}
              </h2>
              <p>{headings[tab].description}</p>
            </div>
            {tab === 'organizations' ? (
              <Button variant="primary" onClick={() => setAction({ kind: 'org-create' })}>
                <Icon name="plus" />
                Tambah ormawa
              </Button>
            ) : tab === 'rooms' ? (
              <Button variant="primary" onClick={() => setAction({ kind: 'room-create' })}>
                <Icon name="plus" />
                Tambah ruangan
              </Button>
            ) : tab === 'periods' ? (
              <Button variant="primary" onClick={() => setAction({ kind: 'period-create' })}>
                <Icon name="plus" />
                Siapkan periode
              </Button>
            ) : null}
          </div>
          {tab === 'organizations' && (
            <div className="platform-filter">
              <label htmlFor="platform-org-filter">Status akses</label>
              <Select
                id="platform-org-filter"
                label="Filter status akun"
                value={filter}
                onChange={setFilter}
                options={[
                  { value: 'all', label: 'Semua ormawa' },
                  { value: 'pending', label: 'Menunggu verifikasi' },
                  { value: 'active', label: 'Akun terverifikasi' },
                  { value: 'revoked', label: 'Akses dicabut' },
                ]}
              />
            </div>
          )}
          <div className="platform-content" aria-live="polite" aria-busy={state === 'loading'}>
            {state === 'loading' ? (
              <div className="rooms-loading" role="status">
                Memuat pengelolaan platform…
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
                <h2>Data platform belum bisa dimuat</h2>
                <p>
                  Pilihan bagian dan filter tetap dipertahankan. Data lama tidak dianggap sebagai
                  kondisi terbaru.
                </p>
                <Button onClick={() => setState('normal')}>
                  Coba lagi <Icon name="arrow" />
                </Button>
              </div>
            ) : state === 'empty' ? (
              <div className="page-state">
                <span className="state-icon">
                  <Icon name="grid" />
                </span>
                <h2>Belum ada catatan pada bagian ini</h2>
                <p>Catatan akan tampil setelah pengelola menyiapkannya.</p>
              </div>
            ) : (
              <>
                {tab === 'overview' && (
                  <div className="platform-overview">
                    <article>
                      <span className="platform-task-icon">
                        <Icon name="settings" />
                      </span>
                      <div>
                        <Badge tone="warning">Verifikasi akun</Badge>
                        <h3>Periksa akun resmi ormawa</h3>
                        <p>Hima B dan UKM Seni menunggu pemeriksaan akun resminya.</p>
                        <Button
                          onClick={() => {
                            setFilter('pending')
                            changeTab('organizations')
                          }}
                        >
                          Tinjau akun <Icon name="arrow" />
                        </Button>
                      </div>
                    </article>
                    <article>
                      <span className="platform-task-icon">
                        <Icon name="room" />
                      </span>
                      <div>
                        <Badge tone="warning">Informasi kampus</Badge>
                        <h3>Aula tidak tersedia 20–22 November</h3>
                        <p>Dua pemakaian perlu penyesuaian oleh PIC masing-masing.</p>
                        <Button onClick={() => setClosure(true)}>
                          Tinjau penutupan aula <Icon name="arrow" />
                        </Button>
                      </div>
                    </article>
                    <article>
                      <span className="platform-task-icon">
                        <Icon name="warning" />
                      </span>
                      <div>
                        <Badge tone="danger">Peninjauan izin</Badge>
                        <h3>Ruang Rapat · 18 November</h3>
                        <p>Laporan izin Hima A bertentangan dengan catatan yang telah disetujui.</p>
                        <Button onClick={() => setDispute(true)}>
                          Buka peninjauan <Icon name="arrow" />
                        </Button>
                      </div>
                    </article>
                  </div>
                )}
                {tab === 'organizations' && (
                  <div className="platform-rows">
                    {organizationViews[filter].map((index) => {
                      const org = platformOrganizations[index]
                      return (
                        <article key={org.id} className="platform-org-row">
                          <div className="platform-org-title">
                            <OrgLogo id={org.id} />
                            <div>
                              <h3>{org.name}</h3>
                              <p>{org.email}</p>
                              <Badge tone={accountStatus[org.status].tone}>
                                {accountStatus[org.status].label}
                              </Badge>
                              <p className="field-help">
                                {org.consent
                                  ? 'Kontak disetujui · hanya PIC/BEM terverifikasi'
                                  : 'Belum ada kontak yang disetujui'}
                              </p>
                              <p className="usage-updated">Diperbarui {org.updated}</p>
                            </div>
                          </div>
                          <div className="platform-row-actions">
                            <Button
                              onClick={() =>
                                setAction({
                                  kind: org.status === 'active' ? 'revoke' : 'verify',
                                  org,
                                })
                              }
                              variant={org.status === 'active' ? 'ghost' : 'primary'}
                            >
                              {org.status === 'active'
                                ? 'Cabut akses'
                                : org.status === 'revoked'
                                  ? 'Tinjau akun resmi'
                                  : 'Verifikasi akun'}
                            </Button>
                            <Button onClick={() => setAction({ kind: 'org-edit', org })}>
                              Edit ormawa & kontak
                            </Button>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                )}
                {tab === 'rooms' && (
                  <>
                    <div className="platform-section-note">
                      <Icon name="info" />
                      <p>
                        Aktif berarti ruangan dapat dicatat di platform. Tetap cek izin kampus dan
                        informasi penutupan.
                      </p>
                    </div>
                    <div className="platform-rows">
                      {platformRooms.map((room) => (
                        <article className="platform-resource-row" key={room.id}>
                          <div>
                            <span className="usage-room">
                              <Icon name="room" />
                              {room.location}
                            </span>
                            <h3>{room.name}</h3>
                            <div className="status-pair">
                              <Badge tone={room.active ? 'success' : 'neutral'}>
                                {room.active ? 'Aktif' : 'Nonaktif'}
                              </Badge>
                              {room.closure && (
                                <Badge tone="warning">Ada informasi penutupan</Badge>
                              )}
                            </div>
                            {room.closure && (
                              <p className="platform-closure-label">{room.closure}</p>
                            )}
                          </div>
                          <div className="platform-row-actions">
                            <Button onClick={() => setAction({ kind: 'room-edit', room })}>
                              Edit ruangan
                            </Button>
                            {room.id === 'aula' && (
                              <>
                                <Button onClick={() => setClosure(true)}>
                                  Catat tidak tersedia
                                </Button>
                                <Button
                                  variant="ghost"
                                  onClick={() => setAction({ kind: 'reopen', room })}
                                >
                                  Catat pembukaan kembali
                                </Button>
                              </>
                            )}
                          </div>
                        </article>
                      ))}
                    </div>
                  </>
                )}
                {tab === 'periods' && (
                  <div className="platform-rows">
                    {platformPeriods.map((period) => (
                      <article className="platform-resource-row" key={period.id}>
                        <div>
                          <span className="usage-room">
                            <Icon name="calendar" />
                            Tahun akademik
                          </span>
                          <h3>{period.name}</h3>
                          <p>
                            {period.start} – {period.end}
                          </p>
                          <Badge
                            tone={
                              period.status === 'active'
                                ? 'info'
                                : period.status === 'draft'
                                  ? 'warning'
                                  : 'neutral'
                            }
                          >
                            {period.status === 'active'
                              ? 'Periode utama'
                              : period.status === 'draft'
                                ? 'Disiapkan'
                                : 'Arsip · hanya baca'}
                          </Badge>
                        </div>
                        <div className="platform-row-actions">
                          {period.status === 'archived' ? (
                            <Button onClick={() => setArchive(true)}>
                              Buka arsip <Icon name="arrow" />
                            </Button>
                          ) : period.status === 'draft' ? (
                            <>
                              <Button onClick={() => setAction({ kind: 'period-edit', period })}>
                                Edit periode
                              </Button>
                              <Button onClick={() => setAction({ kind: 'activate', period })}>
                                Tetapkan periode utama
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="ghost"
                              onClick={() => setAction({ kind: 'archive', period })}
                            >
                              Tinjau pengarsipan
                            </Button>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                )}
                {tab === 'disputes' && (
                  <div className="platform-rows">
                    <article className="platform-resource-row">
                      <div>
                        <Badge tone="warning">Menunggu klarifikasi</Badge>
                        <h3>Laporan izin bertentangan</h3>
                        <p>Ruang Rapat Contoh · 18 November 2026 · 13.00–15.00</p>
                        <p className="field-help">
                          Hima A Contoh dan BEM Contoh. Status izin sebelumnya dipertahankan.
                        </p>
                      </div>
                      <Button onClick={() => setDispute(true)}>
                        Buka laporan <Icon name="arrow" />
                      </Button>
                    </article>
                  </div>
                )}
                {tab === 'history' && (
                  <ol className="manage-history">
                    {platformHistory.map((entry) => (
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
              </>
            )}
          </div>
          <div className="calendar-note">
            <Icon name="info" />
            <p>
              BEM mengelola platform dan membantu koordinasi. Izin pemakaian ruangan tetap
              diputuskan melalui jalur resmi kampus.
            </p>
          </div>
        </section>
      )}
      <section className="prototype-tools" aria-label="Alat review kelola platform">
        <button
          className="tools-toggle"
          aria-expanded={tools}
          aria-controls="platform-review-tools"
          onClick={() => setTools(!tools)}
        >
          <span>
            <Icon name="settings" />
            Ruang uji UI
          </span>
          <Icon name="down" />
        </button>
        {tools && (
          <div className="tools-content room-review-tools" id="platform-review-tools">
            <div className="field">
              <label htmlFor="platform-access">Skenario kewenangan</label>
              <Select
                id="platform-access"
                label="Skenario kewenangan BEM"
                value={access}
                onChange={setAccess}
                options={[
                  { value: 'allowed', label: 'Hak pengelola aktif' },
                  { value: 'organization', label: 'Akun BEM tanpa hak platform' },
                  { value: 'revoked', label: 'Hak pengelola dicabut' },
                ]}
              />
            </div>
            <div className="field">
              <label htmlFor="platform-state">Skenario halaman</label>
              <Select
                id="platform-state"
                label="Skenario halaman platform"
                value={state}
                onChange={setState}
                options={[
                  { value: 'normal', label: 'Normal' },
                  { value: 'empty', label: 'Kosong' },
                  { value: 'loading', label: 'Memuat' },
                  { value: 'error', label: 'Gagal memuat' },
                ]}
              />
            </div>
            <div className="field">
              <label htmlFor="platform-outcome">Hasil tinjauan formulir</label>
              <Select
                id="platform-outcome"
                label="Skenario hasil platform"
                value={outcome}
                onChange={setOutcome}
                options={[
                  { value: 'normal', label: 'Tinjauan normal' },
                  { value: 'failed', label: 'Gagal menyimpan' },
                  { value: 'stale', label: 'Versi berubah' },
                  { value: 'revoked', label: 'Hak dicabut saat menyimpan' },
                  { value: 'account-conflict', label: 'Akun terkait ormawa lain' },
                ]}
              />
            </div>
            <p>
              Akun, kontak, rentang waktu dan hasil adalah contoh fiktif. Formulir tidak menyimpan
              atau mengirim data. Penutupan memakai alur review tersendiri; skenario ini bukan
              pemeriksaan input atau otorisasi.
            </p>
          </div>
        )}
      </section>
      {action && (
        <PlatformDialog action={action} outcome={outcome} onClose={() => setAction(null)} />
      )}
      {closure && (
        <RoomCoordination
          role="bem"
          onClose={() => setClosure(false)}
          onProgram={() => setClosure(false)}
        />
      )}
      {archive && <ArchiveDialog onClose={() => setArchive(false)} />}
      {dispute && (
        <DisputeDialog
          onClose={() => setDispute(false)}
          onRecord={() => {
            setDispute(false)
            setAction({ kind: 'dispute' })
          }}
        />
      )}
    </div>
  )
}
