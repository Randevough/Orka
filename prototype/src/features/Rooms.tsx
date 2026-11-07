import { useState } from 'react'
import { Badge, Button, Dialog, Icon } from '../components/ui'
import { Select } from '../components/Select'
import { OrgLogo, organizations } from '../components/Organizations'
import { roomStatus } from '../fixtures'
import { roomNames, roomViews, usageExamples } from '../room-fixtures'
import type { RoomUsage } from '../room-fixtures'

const rooms = [
  { value: 'all', label: 'Semua ruangan' },
  { value: 'aula', label: roomNames.aula },
  { value: 'rapat', label: roomNames.rapat },
]
const weeks = [
  { value: 'week1', label: '16–22 November 2026' },
  { value: 'week2', label: '23–29 November 2026' },
]
const states = [
  { value: 'normal', label: 'Normal' },
  { value: 'empty', label: 'Kosong' },
  { value: 'loading', label: 'Memuat' },
  { value: 'error', label: 'Gagal memuat' },
  { value: 'archive', label: 'Arsip · hanya baca' },
]
const outcomes = [
  { value: 'normal', label: 'Rencana dapat ditinjau' },
  { value: 'overlap', label: 'Beririsan dengan rencana lain' },
  { value: 'conflict', label: 'Beririsan dengan izin disetujui' },
  { value: 'closed', label: 'Ruangan ditutup' },
  { value: 'failed', label: 'Gagal menyimpan' },
  { value: 'revoked', label: 'Akses dicabut' },
]

function UsageStatus({ usage }: { usage: RoomUsage }) {
  return (
    <div className="status-pair">
      <Badge tone={roomStatus[usage.status].tone}>{roomStatus[usage.status].label}</Badge>
      {usage.adjustment && <Badge tone="warning">Perlu penyesuaian</Badge>}
      {usage.dispute && <Badge tone="danger">Dalam peninjauan</Badge>}
    </div>
  )
}

export function UsageDetail({
  usage,
  archive,
  onClose,
}: {
  usage: RoomUsage
  archive: boolean
  onClose: () => void
}) {
  return (
    <Dialog title={usage.title} wide onClose={onClose}>
      <div className="room-detail">
        {archive && <Badge>Arsip · hanya baca</Badge>}
        <UsageStatus usage={usage} />
        <p className="muted-copy">{roomStatus[usage.status].detail}</p>
        <dl className="room-facts">
          <div>
            <dt>Ruangan</dt>
            <dd>{roomNames[usage.room]}</dd>
          </div>
          <div>
            <dt>Tanggal pemakaian</dt>
            <dd>{usage.date}</dd>
          </div>
          <div>
            <dt>Waktu pemakaian</dt>
            <dd>
              {usage.time}
              <small>Termasuk persiapan dan beres-beres</small>
            </dd>
          </div>
          <div>
            <dt>Ormawa pemakai</dt>
            <dd className="room-org">
              <OrgLogo id={usage.org} />
              {organizations[usage.org].name}
            </dd>
          </div>
          <div>
            <dt>Proker terkait</dt>
            <dd>
              {usage.program ?? 'Pemakaian mandiri'}
              {usage.session && <small>{usage.session}</small>}
            </dd>
          </div>
          <div>
            <dt>Pembaruan terakhir</dt>
            <dd>
              {usage.updated}
              <small>Oleh akun resmi {organizations[usage.org].name}</small>
            </dd>
          </div>
        </dl>
        {usage.note && (
          <div
            className={`feedback-panel ${usage.adjustment || usage.dispute ? 'feedback-panel--warning' : ''}`}
          >
            <Icon name="info" />
            <span>{usage.note}</span>
          </div>
        )}
        <div className="room-contact">
          <h3>Koordinasi dengan PIC</h3>
          <p>
            Kontak tersedia bagi akun ormawa atau BEM terverifikasi, sesuai persetujuan pemilik
            kontak.
          </p>
        </div>
        <p className="field-help">
          Status izin adalah laporan PIC. Keputusan izin tetap melalui jalur resmi kampus.
        </p>
      </div>
    </Dialog>
  )
}

export function UsageForm({
  outcome,
  onClose,
  usage,
  replacement = false,
}: {
  outcome: string
  onClose: () => void
  usage?: RoomUsage
  replacement?: boolean
}) {
  const [step, setStep] = useState<'form' | 'review' | 'done'>('form')
  const [room, setRoom] = useState<string>(usage && !replacement ? usage.room : 'rapat')
  const [title, setTitle] = useState(usage?.title ?? 'Persiapan forum ormawa')
  const [start, setStart] = useState(usage?.draft?.start ?? '2026-11-24T13:00')
  const [end, setEnd] = useState(usage?.draft?.end ?? '2026-11-24T15:00')
  const [link, setLink] = useState(usage?.program ? 'program' : 'standalone')
  const [session, setSession] = useState('2')
  const [failed, setFailed] = useState(false)
  const blocked =
    outcome === 'conflict' || outcome === 'closed' || outcome === 'revoked' || outcome === 'stale'
  const titleText =
    step === 'done'
      ? 'Simulasi pencatatan selesai'
      : step === 'review'
        ? 'Tinjau rencana pemakaian'
        : replacement
          ? 'Rencana pengganti ruangan'
          : usage
            ? 'Edit rencana pemakaian'
            : 'Rencana pemakaian ruangan'
  return (
    <Dialog title={titleText} wide onClose={onClose}>
      <div className="room-form">
        {step !== 'done' && (
          <ol className="room-steps" aria-label="Tahapan rencana">
            <li aria-current={step === 'form' ? 'step' : undefined}>
              <span>1</span>Isi rencana
            </li>
            <li aria-current={step === 'review' ? 'step' : undefined}>
              <span>2</span>Tinjau
            </li>
          </ol>
        )}
        {usage && step !== 'done' && (
          <div className="feedback-panel">
            <Icon name="info" />
            <span>
              <strong>
                Catatan awal: {roomNames[usage.room]} · {usage.date} · {usage.time}
              </strong>
              {replacement
                ? 'Buat rencana pengganti dengan izin tersendiri. Izin lama tidak disalin; catatan lama tetap ada sampai pembatalan ditinjau. Ruangan yang ditutup tetap tidak dapat dipakai.'
                : 'Perubahan waktu atau ruangan perlu ditinjau ulang. Status izin tidak dapat diubah lewat formulir ini.'}
            </span>
          </div>
        )}
        {step === 'form' && (
          <>
            <div className="room-owner">
              <OrgLogo id="hima" />
              <div>
                <strong>Hima A Contoh</strong>
                <p>Ormawa pencatat</p>
              </div>
            </div>
            <div className="field">
              <label htmlFor="usage-title">Keperluan pemakaian</label>
              <input id="usage-title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="usage-room">Ruangan</label>
              <Select
                id="usage-room"
                label="Ruangan pemakaian"
                value={room}
                onChange={setRoom}
                options={rooms.slice(1)}
              />
            </div>
            <div className="field-pair">
              <div className="field">
                <label htmlFor="usage-start">Mulai pemakaian</label>
                <input
                  id="usage-start"
                  type="datetime-local"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  aria-describedby="usage-time-help"
                />
              </div>
              <div className="field">
                <label htmlFor="usage-end">Selesai pemakaian</label>
                <input
                  id="usage-end"
                  type="datetime-local"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  aria-describedby="usage-time-help"
                />
              </div>
            </div>
            <p className="field-help" id="usage-time-help">
              Masukkan waktu lengkap, termasuk persiapan dan beres-beres.
            </p>
            <fieldset className="room-link-choice">
              <legend>Kaitan dengan proker</legend>
              <label className="choice">
                <input
                  type="radio"
                  name="room-link"
                  checked={link === 'standalone'}
                  onChange={() => setLink('standalone')}
                />
                Pemakaian mandiri
              </label>
              <label className="choice">
                <input
                  type="radio"
                  name="room-link"
                  checked={link === 'program'}
                  onChange={() => setLink('program')}
                />
                Terkait jadwal proker
              </label>
            </fieldset>
            {link === 'program' && (
              <>
                <div className="field">
                  <label htmlFor="usage-program">Proker</label>
                  <Select
                    id="usage-program"
                    label="Proker terkait"
                    value="workshop"
                    onChange={() => {}}
                    options={[{ value: 'workshop', label: 'Lokakarya tiga sesi' }]}
                  />
                </div>
                <div className="field">
                  <label htmlFor="usage-session">Sesi pelaksanaan</label>
                  <Select
                    id="usage-session"
                    label="Sesi pelaksanaan"
                    value={session}
                    onChange={setSession}
                    options={[
                      { value: '2', label: 'Sesi 2 · 21 November · 09.00–11.00' },
                      { value: '3', label: 'Sesi 3 · 28 November · 09.00–11.00' },
                    ]}
                  />
                  <p className="field-help">
                    Satu pemakaian terkait satu sesi. Mencatat ruangan tidak mengubah jadwal proker.
                  </p>
                </div>
              </>
            )}
            <div className="room-contact">
              <h3>Kontak koordinasi</h3>
              <p>
                Menggunakan kontak resmi ormawa yang telah disetujui. Tidak perlu mengisi nomor
                pribadi baru.
              </p>
            </div>
            <div className="feedback-panel">
              <Icon name="info" />
              <span>
                <strong>Rencana belum menjadi izin</strong>Urus izin melalui kampus. Rencana dan
                catatan menunggu keputusan perlu diperbarui atau dikonfirmasi dalam 7 hari agar
                tidak dibatalkan otomatis.
              </span>
            </div>
            <Button variant="primary" onClick={() => setStep('review')}>
              Tinjau rencana <Icon name="arrow" />
            </Button>
          </>
        )}
        {step === 'review' && (
          <>
            <Badge tone={usage && !replacement ? roomStatus[usage.status].tone : 'info'}>
              {usage && !replacement
                ? `${roomStatus[usage.status].label} · ${roomStatus[usage.status].detail}`
                : 'Rencana · belum diajukan ke kampus'}
            </Badge>
            <dl className="room-facts">
              <div>
                <dt>Keperluan</dt>
                <dd>{title || 'Belum diisi'}</dd>
              </div>
              <div>
                <dt>Ormawa</dt>
                <dd>Hima A Contoh</dd>
              </div>
              <div>
                <dt>Ruangan</dt>
                <dd>{roomNames[room as keyof typeof roomNames]}</dd>
              </div>
              <div>
                <dt>Mulai</dt>
                <dd>{start.replace('T', ' · ') || 'Belum diisi'}</dd>
              </div>
              <div>
                <dt>Selesai</dt>
                <dd>{end.replace('T', ' · ') || 'Belum diisi'}</dd>
              </div>
              <div>
                <dt>Kaitan proker</dt>
                <dd>
                  {link === 'program'
                    ? `Lokakarya tiga sesi · sesi ${session}`
                    : 'Pemakaian mandiri'}
                </dd>
              </div>
            </dl>
            {outcome === 'normal' && (
              <div className="feedback-panel">
                <Icon name="info" />
                <span>
                  Belum ada pemakaian tercatat pada contoh slot ini. Tetap cek dan urus izin melalui
                  jalur kampus.
                </span>
              </div>
            )}
            {outcome === 'overlap' && (
              <div className="feedback-panel feedback-panel--warning">
                <Icon name="warning" />
                <span>
                  <strong>Contoh: ada rencana lain pada slot yang sama</strong>Rencana/menunggu
                  keputusan boleh dicatat bersamaan. Koordinasikan dengan PIC terkait; urutan
                  pencatatan tidak menentukan prioritas izin.
                </span>
              </div>
            )}
            {outcome === 'conflict' && (
              <div className="feedback-panel room-feedback--danger" role="alert">
                <Icon name="warning" />
                <span>
                  <strong>Contoh: slot sudah memiliki izin disetujui</strong>Rencana tidak dapat
                  dicatat pada slot yang bertabrakan. Kembali untuk memilih ruangan atau waktu lain.
                </span>
              </div>
            )}
            {outcome === 'closed' && (
              <div className="feedback-panel feedback-panel--warning" role="alert">
                <Icon name="warning" />
                <span>
                  <strong>Contoh: ruangan tidak tersedia</strong>Informasi penutupan dari kampus
                  dicatat BEM. Pilih ruangan atau waktu lain.
                </span>
              </div>
            )}
            {outcome === 'stale' && (
              <div className="feedback-panel feedback-panel--warning" role="alert">
                <Icon name="warning" />
                <span>
                  <strong>Contoh: catatan sudah berubah</strong>Muat ulang sebelum meninjau kembali.
                  Pembaruan lain tidak ditimpa.
                </span>
              </div>
            )}
            {outcome === 'revoked' && (
              <div className="feedback-panel room-feedback--danger" role="alert">
                <Icon name="warning" />
                <span>
                  <strong>Contoh: akses pengelolaan dicabut</strong>Rencana tidak dapat disimpan.
                  Hubungi pengelola BEM untuk memeriksa akses akun resmi ormawa.
                </span>
              </div>
            )}
            {failed && (
              <div className="feedback-panel room-feedback--danger" role="alert">
                <Icon name="warning" />
                <span>
                  <strong>Simulasi gagal menyimpan</strong>Isian tetap ada. Coba lagi setelah
                  layanan pulih; belum ada catatan yang tersimpan.
                </span>
              </div>
            )}
            <p className="field-help">
              Rencana dan status menunggu keputusan dibatalkan otomatis jika tidak diperbarui atau
              dikonfirmasi selama 7 hari. Status disetujui tidak mengikuti kedaluwarsa ini.
            </p>
            <div className="wizard-actions">
              <Button
                onClick={() => {
                  setStep('form')
                  setFailed(false)
                }}
              >
                <Icon name="back" />
                Kembali ke isian
              </Button>
              <Button
                variant="primary"
                disabled={blocked}
                onClick={() => (outcome === 'failed' ? setFailed(true) : setStep('done'))}
              >
                {failed ? 'Coba lagi' : 'Simpan rencana'}
              </Button>
            </div>
          </>
        )}
        {step === 'done' && (
          <>
            <span className="room-done-icon">
              <Icon name="check" />
            </span>
            <h3>Alur rencana sudah ditinjau</h3>
            <p>
              Ini hasil simulasi UI. Rencana tidak disimpan dan daftar pemakaian tetap seperti
              semula.
            </p>
            <div className="feedback-panel">
              <Icon name="info" />
              <span>
                Dalam alur operasional, rencana yang tercatat masih perlu diajukan ke kampus. Status
                izin diperbarui oleh PIC.
              </span>
            </div>
            <Button variant="primary" onClick={onClose}>
              Kembali ke daftar <Icon name="arrow" />
            </Button>
          </>
        )}
      </div>
    </Dialog>
  )
}

export function Rooms({
  onLogin,
  signedIn = false,
  manageLabel = 'Buka kelola ormawa',
}: {
  onLogin: () => void
  signedIn?: boolean
  manageLabel?: string
}) {
  const [week, setWeek] = useState('week1')
  const [room, setRoom] = useState('all')
  const [org, setOrg] = useState('all')
  const [state, setState] = useState('normal')
  const [detail, setDetail] = useState<RoomUsage | null>(null)
  const [form, setForm] = useState(false)
  const [outcome, setOutcome] = useState('normal')
  const [tools, setTools] = useState(false)
  const archive = state === 'archive'
  const indices = state === 'empty' || archive ? [] : roomViews[`${week}:${room}:${org}`]
  return (
    <div className="rooms-page">
      <div className="page-eyebrow">
        <span className="eyebrow-symbol">
          <Icon name="room" />
        </span>
        <span>RUANG KOORDINASI ORMAWA</span>
      </div>
      <section className="page-heading" aria-labelledby="rooms-title">
        <div>
          <h1 id="rooms-title">
            Berbagi ruang.
            <br />
            Saling tahu rencana.
          </h1>
          <p>Lihat pemakaian yang tercatat sebelum menyusun rencana ormawamu.</p>
        </div>
        <Button variant="primary" onClick={onLogin}>
          {signedIn ? manageLabel : 'Masuk untuk mencatat'} <Icon name="arrow" />
        </Button>
      </section>
      <section className="rooms-panel" aria-label="Agenda pemakaian ruangan">
        <div className="rooms-toolbar">
          <div className="field">
            <label htmlFor="rooms-week">Rentang tanggal</label>
            <Select
              id="rooms-week"
              label="Rentang tanggal"
              value={week}
              onChange={setWeek}
              options={weeks}
            />
          </div>
          <div className="field">
            <label htmlFor="rooms-room">Ruangan</label>
            <Select
              id="rooms-room"
              label="Filter ruangan"
              value={room}
              onChange={setRoom}
              options={rooms}
            />
          </div>
          <div className="field">
            <label htmlFor="rooms-org">Ormawa</label>
            <Select
              id="rooms-org"
              label="Filter ormawa pemakai"
              value={org}
              onChange={setOrg}
              options={[
                { value: 'all', label: 'Semua ormawa' },
                { value: 'hima', label: 'Hima A Contoh', icon: <OrgLogo id="hima" /> },
              ]}
            />
          </div>
          {(room !== 'all' || org !== 'all' || week !== 'week1') && (
            <Button
              variant="ghost"
              onClick={() => {
                setWeek('week1')
                setRoom('all')
                setOrg('all')
              }}
            >
              Reset filter
            </Button>
          )}
        </div>
        <div className="rooms-list-heading">
          <div>
            <Icon name="calendar" />
            <h2>{archive ? 'Arsip pemakaian' : 'Agenda pemakaian'}</h2>
          </div>
          <span>
            {archive ? <Badge>Arsip · hanya baca</Badge> : weeks[week === 'week1' ? 0 : 1].label}
          </span>
        </div>
        <div className="rooms-content" aria-busy={state === 'loading'} aria-live="polite">
          {state === 'loading' ? (
            <div className="rooms-loading" role="status">
              <span>Memuat pemakaian ruangan…</span>
              {[1, 2, 3].map((i) => (
                <div className="skeleton-card" key={i} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              ))}
            </div>
          ) : state === 'error' ? (
            <div className="page-state">
              <span className="state-icon">
                <Icon name="warning" />
              </span>
              <h2>Pemakaian belum bisa dimuat</h2>
              <p>Data terbaru belum tersedia. Filter tetap dipertahankan.</p>
              <Button onClick={() => setState('normal')}>
                Coba lagi <Icon name="arrow" />
              </Button>
            </div>
          ) : indices.length === 0 ? (
            <div className="page-state">
              <span className="state-icon">
                <Icon name="room" />
              </span>
              <h2>
                {archive ? 'Belum ada catatan pada arsip contoh' : 'Belum ada pemakaian tercatat'}
              </h2>
              <p>
                {archive
                  ? 'Arsip hanya dapat dibaca; pencatatan baru dilakukan pada periode aktif.'
                  : 'Tetap cek dan urus izin melalui jalur kampus.'}
              </p>
              <Button
                onClick={() => {
                  setState('normal')
                  setWeek('week1')
                  setRoom('all')
                  setOrg('all')
                }}
              >
                Lihat agenda periode aktif
              </Button>
            </div>
          ) : (
            <>
              {week === 'week1' && room !== 'rapat' && (
                <aside className="rooms-closure">
                  <Icon name="warning" />
                  <div>
                    <strong>Aula tidak tersedia · 20–22 November</strong>
                    <p>
                      Informasi kampus dicatat BEM. Pemakaian terdampak ditandai perlu penyesuaian.
                    </p>
                  </div>
                </aside>
              )}
              <div className="usage-list">
                {indices.map((i) => {
                  const usage = usageExamples[i]
                  return (
                    <article className="usage-card" key={usage.id}>
                      <div className="usage-date">
                        <span>{usage.day}</span>
                        <strong>
                          <Icon name="clock" />
                          {usage.time}
                        </strong>
                      </div>
                      <div className="usage-body">
                        <span className="usage-room">
                          <Icon name="room" />
                          {roomNames[usage.room]}
                        </span>
                        <h3>{usage.title}</h3>
                        <p className="room-org">
                          <OrgLogo id={usage.org} />
                          {organizations[usage.org].name}
                        </p>
                        <UsageStatus usage={usage} />
                        <p className="usage-updated">Diperbarui {usage.updated}</p>
                      </div>
                      <Button
                        variant="ghost"
                        className="usage-open"
                        aria-label={`Lihat detail ${usage.title}`}
                        onClick={() => setDetail(usage)}
                      >
                        Lihat detail <Icon name="arrow" />
                      </Button>
                    </article>
                  )
                })}
              </div>
            </>
          )}
        </div>
        <div className="calendar-note">
          <Icon name="info" />
          <p>
            <strong>Catatan pemakaian bukan keputusan izin.</strong> Status disetujui dilaporkan
            oleh PIC. Slot tanpa catatan belum tentu tersedia.
          </p>
        </div>
      </section>
      <section className="rooms-how" aria-label="Cara mencatat pemakaian">
        <div>
          <span>01</span>
          <h3>Lihat catatan bersama</h3>
          <p>Periksa ruangan, waktu, dan pembaruan terakhir.</p>
        </div>
        <div>
          <span>02</span>
          <h3>Koordinasikan izin</h3>
          <p>Ajukan pemakaian melalui jalur resmi kampus.</p>
        </div>
        <div>
          <span>03</span>
          <h3>Perbarui rencana</h3>
          <p>PIC mencatat hasil izin agar ormawa lain ikut tahu.</p>
        </div>
      </section>
      <section className="prototype-tools" aria-label="Alat review pemakaian ruangan">
        <button
          className="tools-toggle"
          aria-expanded={tools}
          aria-controls="room-review-tools"
          onClick={() => setTools(!tools)}
        >
          <span>
            <Icon name="settings" />
            Ruang uji UI
          </span>
          <Icon name="down" />
        </button>
        {tools && (
          <div className="tools-content room-review-tools" id="room-review-tools">
            <div className="field">
              <label htmlFor="rooms-state">Skenario halaman</label>
              <Select
                id="rooms-state"
                label="Skenario halaman ruangan"
                value={state}
                onChange={setState}
                options={states}
              />
            </div>
            <div className="field">
              <label htmlFor="rooms-outcome">Skenario tinjauan PIC</label>
              <Select
                id="rooms-outcome"
                label="Skenario tinjauan PIC"
                value={outcome}
                onChange={setOutcome}
                options={outcomes}
              />
            </div>
            <Button disabled={archive} onClick={() => setForm(true)}>
              Buka formulir pemakaian · PIC <Icon name="arrow" />
            </Button>
            <p>
              Contoh fiktif terpisah dari hitungan kalender proker. Pemilih skenario bukan
              pemeriksaan input atau kewenangan sungguhan. Tidak ada penyimpanan; hasil tinjauan
              sudah disiapkan.
            </p>
          </div>
        )}
      </section>
      {detail && <UsageDetail usage={detail} archive={archive} onClose={() => setDetail(null)} />}
      {form && <UsageForm outcome={outcome} onClose={() => setForm(false)} />}
    </div>
  )
}
