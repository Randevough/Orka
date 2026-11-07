import { useEffect, useRef, useState } from 'react'
import { Badge, Button, Dialog, Icon } from '../components/ui'
import { OrgStack, organizations } from '../components/Organizations'
import { Select } from '../components/Select'
import type { ProgramDetail } from '../timeline-types'

type Mode = 'work' | 'move' | 'postpone' | 'cancel' | 'room'
const options: { value: Mode; label: string; description: string }[] = [
  {
    value: 'work',
    label: 'Ubah pengerjaan saja',
    description: 'Sesuaikan rentang persiapan sampai akhir pengerjaan.',
  },
  {
    value: 'move',
    label: 'Revisi pelaksanaan',
    description: 'Pindahkan sesi dan tinjau pemakaian ruangannya.',
  },
  {
    value: 'postpone',
    label: 'Tunda, tanggal belum pasti',
    description: 'Pertahankan proker aktif sambil menunggu jadwal pengganti.',
  },
  {
    value: 'cancel',
    label: 'Batalkan sesi tersisa',
    description: 'Hasil yang sudah terlaksana tetap menjadi riwayat.',
  },
  {
    value: 'room',
    label: 'Ganti ruangan, waktu tetap',
    description: 'Buat catatan pengganti dengan izin tersendiri.',
  },
]

export function ProgramDialog({
  program: p,
  onClose,
  canEdit = false,
  archive = false,
}: {
  program: ProgramDetail
  onClose: () => void
  canEdit?: boolean
  archive?: boolean
}) {
  const [screen, setScreen] = useState<'detail' | 'revise' | 'done'>('detail')
  const [step, setStep] = useState(0)
  const [mode, setMode] = useState<Mode>('work')
  const [precision, setPrecision] = useState(p.precision === 'Tanggal pasti' ? 'exact' : 'month')
  const [start, setStart] = useState(p.draft?.start ?? '12 Juni 2026')
  const [end, setEnd] = useState(p.draft?.end ?? '12 Desember 2026')
  const [execution, setExecution] = useState(p.draft?.execution ?? p.occurrences[0]?.when ?? '')
  const [unknown, setUnknown] = useState(p.openEnd)
  const [room, setRoom] = useState('b')
  const [extra, setExtra] = useState(false)
  const [stale, setStale] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [rangeIssue, setRangeIssue] = useState(false)
  const [session, setSession] = useState(p.id === 'closure' ? '1' : '0')
  const stepLabels = ['Pilih perubahan', 'Isi rencana', 'Tinjau dampak']
  const stepHeading = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    if (screen === 'revise') stepHeading.current?.focus()
  }, [screen, step])
  const title =
    screen === 'detail' ? p.name : screen === 'done' ? 'Tinjauan selesai' : 'Revisi rencana proker'
  return (
    <Dialog title={title} wide onClose={onClose}>
      {screen === 'detail' && (
        <div className="program-detail">
          <div className="program-org">
            <OrgStack ids={p.orgIds} />
            <span>{p.orgIds.map((id) => organizations[id].name).join(' + ')}</span>
          </div>
          <Badge tone={p.tone}>{p.status}</Badge>
          <section className="program-work">
            <span className="section-kicker">
              <Icon name="clock" /> Pengerjaan
            </span>
            <h3>{p.work}</h3>
            <p>{p.precision} · termasuk persiapan</p>
            {p.column !== null && (
              <div
                className="detail-mini-timeline"
                aria-label={`Pengerjaan dalam periode: ${p.work}`}
              >
                <span
                  style={{ gridColumn: `${p.column} / span ${p.width}` }}
                  className={p.openEnd ? 'is-open' : ''}
                >
                  {p.before && '←'}
                  {p.openEnd ? 'Akhir belum pasti' : 'Pengerjaan'}
                  {p.after && ' →'}
                </span>
              </div>
            )}
            {(p.before || p.after) && (
              <span className="continuation-label">
                {p.before ? '← Dimulai sebelum periode ini' : ''}
                {p.before && p.after ? ' · ' : ''}
                {p.after ? 'Berlanjut ke periode berikutnya →' : ''}
              </span>
            )}
            {p.openEnd && <div className="open-range" aria-label="Akhir pengerjaan belum pasti" />}
          </section>
          <section>
            <h3 className="section-title">
              Pelaksanaan <span>{p.occurrences.length} sesi</span>
            </h3>
            <div className="session-list">
              {p.occurrences.map((s, i) => (
                <div className="session-row" key={`${s.when}-${i}`}>
                  <span className="session-number">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{s.when}</strong>
                    <Badge tone={s.tone}>{s.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h3 className="section-title">Pemakaian ruangan</h3>
            {!p.rooms.length ? (
              <p className="muted-copy">Belum ada pemakaian ruangan tercatat untuk proker ini.</p>
            ) : (
              p.rooms.map((r) => (
                <div className="program-room" key={r.name}>
                  <Icon name="room" />
                  <div>
                    <strong>{r.name}</strong>
                    <p>{r.when}</p>
                    <div className="status-pair">
                      <Badge tone={r.tone}>{r.status}</Badge>
                      {r.attention && <Badge tone="warning">Perlu penyesuaian</Badge>}
                    </div>
                    {r.attention && (
                      <p className="attention-copy">
                        Ruangan tidak tersedia. PIC perlu menentukan penyesuaian.
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </section>
          <section>
            <h3 className="section-title">Perubahan jadwal</h3>
            <ol className="program-history">
              {p.history.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ol>
          </section>
          {canEdit && !archive && p.id !== 'partial' && (
            <div className="program-actions">
              <p>Pengelolaan oleh {organizations[p.orgIds[0]].name}.</p>
              <Button variant="primary" onClick={() => setScreen('revise')}>
                Revisi jadwal <Icon name="arrow" />
              </Button>
            </div>
          )}
          {archive && <Badge>Arsip · hanya baca</Badge>}
        </div>
      )}
      {screen === 'revise' && (
        <div className="revision-wizard">
          <h3 ref={stepHeading} tabIndex={-1} className="sr-only">
            {stepLabels[step]}
          </h3>
          <p className="revision-context">{p.name}</p>
          <ol className="wizard-steps" aria-label="Langkah revisi">
            {stepLabels.map((label, i) => (
              <li
                key={label}
                aria-current={step === i ? 'step' : undefined}
                className={step >= i ? 'is-current' : ''}
              >
                <span>{step > i ? <Icon name="check" /> : i + 1}</span>
                <small>{label}</small>
              </li>
            ))}
          </ol>
          {step === 0 && (
            <fieldset className="revision-options">
              <legend>Apa yang ingin disesuaikan?</legend>
              {options.map((o) => (
                <label
                  className={`revision-option ${mode === o.value ? 'is-selected' : ''}`}
                  key={o.value}
                >
                  <input
                    type="radio"
                    name="revision-mode"
                    value={o.value}
                    checked={mode === o.value}
                    onChange={() => setMode(o.value)}
                  />
                  <span>
                    <strong>{o.label}</strong>
                    <small>{o.description}</small>
                  </span>
                </label>
              ))}
            </fieldset>
          )}
          {step === 1 && (
            <div className="revision-fields">
              <h3>{options.find((o) => o.value === mode)?.label}</h3>
              <div className="before-value">
                <small>Saat ini · pengerjaan</small>
                <strong>{p.work}</strong>
                <small>Pelaksanaan</small>
                <span>{p.occurrences[Number(session)]?.when}</span>
              </div>
              {p.occurrences.length > 1 &&
                p.id !== 'closure' &&
                mode !== 'work' &&
                mode !== 'cancel' && (
                  <div className="field">
                    <label htmlFor="revision-session">Sesi yang disesuaikan</label>
                    <Select
                      id="revision-session"
                      label="Sesi yang disesuaikan"
                      value={session}
                      onChange={setSession}
                      options={p.occurrences.map((s, index) => ({
                        value: String(index),
                        label: `Sesi ${index + 1} · ${s.when}`,
                      }))}
                    />
                  </div>
                )}
              {(mode === 'work' || mode === 'move') && (
                <>
                  <div className="field">
                    <label htmlFor="work-precision">Ketelitian pengerjaan</label>
                    <Select
                      id="work-precision"
                      label="Ketelitian pengerjaan"
                      value={precision}
                      onChange={setPrecision}
                      options={[
                        { value: 'month', label: 'Bulan saja' },
                        { value: 'exact', label: 'Tanggal pasti' },
                      ]}
                    />
                  </div>
                  <div className="field-pair">
                    <div className="field">
                      <label htmlFor="work-start">Awal pengerjaan</label>
                      <input
                        id="work-start"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="work-end">Akhir pengerjaan</label>
                      <input
                        id="work-end"
                        value={end}
                        disabled={unknown}
                        onChange={(e) => setEnd(e.target.value)}
                      />
                    </div>
                  </div>
                  <label className="choice">
                    <input
                      type="checkbox"
                      checked={unknown}
                      onChange={(e) => setUnknown(e.target.checked)}
                    />
                    Akhir pengerjaan belum pasti
                  </label>
                </>
              )}
              {mode === 'move' && (
                <>
                  <div className="field">
                    <label htmlFor="new-execution">Pelaksanaan pengganti</label>
                    <input
                      id="new-execution"
                      value={execution}
                      onChange={(e) => setExecution(e.target.value)}
                    />
                  </div>
                  <p className="context-note">
                    <Icon name="info" />
                    Pastikan pelaksanaan tercakup dalam rentang pengerjaan yang kamu isi. Rentang
                    tidak diperpanjang otomatis.
                  </p>
                </>
              )}
              {(mode === 'postpone' || mode === 'cancel') && (
                <div className="feedback-panel">
                  <Icon name="info" />
                  <span>
                    {mode === 'postpone'
                      ? 'Proker tetap aktif. Tanggal lama masuk riwayat, awal pengerjaan dipertahankan, dan akhir bisa belum pasti.'
                      : 'Sesi yang sudah terlaksana tetap tercatat. Hanya sisa kegiatan yang dipilih beserta pemakaian terkait yang dibatalkan.'}
                  </span>
                </div>
              )}
              {p.id === 'closure' && mode !== 'work' && (
                <fieldset className="scope-options">
                  <legend>Cakupan penyesuaian</legend>
                  <label className="choice">
                    <input type="checkbox" checked disabled />
                    Sesi 2 · terdampak penutupan, wajib ditinjau
                  </label>
                  <label className="choice">
                    <input
                      type="checkbox"
                      checked={extra}
                      onChange={(e) => setExtra(e.target.checked)}
                    />
                    Ikut sesuaikan sesi 3 · pilihan PIC
                  </label>
                  <p>Sesi 1 tetap. Pemakaian terdampak langsung tidak dapat dikecualikan.</p>
                </fieldset>
              )}
              {mode === 'room' && (
                <>
                  <div className="field">
                    <label htmlFor="replacement-room">Ruangan pengganti</label>
                    <Select
                      id="replacement-room"
                      label="Ruangan pengganti"
                      value={room}
                      onChange={setRoom}
                      options={[
                        { value: 'b', label: 'Ruang B Contoh' },
                        { value: 'c', label: 'Ruang C Contoh' },
                      ]}
                    />
                  </div>
                  <p className="context-note">
                    <Icon name="info" />
                    Jadwal pelaksanaan tetap. Izin ruangan baru perlu diurus terpisah.
                  </p>
                </>
              )}
            </div>
          )}
          {step === 2 && (
            <div className="revision-impact">
              <h3>Periksa sebelum melanjutkan</h3>
              <div className="impact-block">
                <span className="section-kicker">Tetap</span>
                <p>
                  {mode === 'work'
                    ? 'Seluruh sesi pelaksanaan dan pemakaian ruangan.'
                    : mode === 'room'
                      ? 'Seluruh tanggal pelaksanaan dan awal pengerjaan.'
                      : 'Awal pengerjaan, sesi yang tidak dipilih, dan hasil sesi yang sudah terlaksana.'}
                </p>
              </div>
              <div className="impact-block">
                <span className="section-kicker">
                  {mode === 'cancel' ? 'Dibatalkan' : 'Berubah'}
                </span>
                {p.occurrences.length > 1 &&
                  p.id !== 'closure' &&
                  mode !== 'work' &&
                  mode !== 'cancel' && (
                    <p>
                      Sesi {Number(session) + 1} · {p.occurrences[Number(session)]?.when}
                    </p>
                  )}
                <strong>
                  {mode === 'work'
                    ? `${start} – ${unknown ? 'akhir belum pasti' : end}`
                    : mode === 'move'
                      ? execution
                      : mode === 'postpone'
                        ? 'Pelaksanaan ditunda · tanggal pengganti belum ditentukan'
                        : mode === 'room'
                          ? `Pengganti: Ruang ${room === 'b' ? 'B' : 'C'} Contoh`
                          : 'Sisa sesi terpilih'}
                </strong>
                {mode === 'move' && (
                  <p>
                    Pengerjaan: {start} – {unknown ? 'akhir belum pasti' : end}
                  </p>
                )}
                {p.id === 'closure' && (
                  <p>
                    {extra ? 'Sesi 2 dan sesi 3 dipilih.' : 'Hanya sesi 2; sesi 1 dan 3 tetap.'}
                  </p>
                )}
              </div>
              <div className="impact-block">
                <span className="section-kicker">Pemakaian ruangan</span>
                {p.id === 'closure' && extra && (
                  <p>
                    Sesi 3 ikut disesuaikan; belum ada pemakaian ruangan tercatat untuk sesi
                    tersebut.
                  </p>
                )}
                {mode === 'work' ? (
                  <p>Tidak ada pemakaian dibatalkan oleh perubahan pengerjaan saja.</p>
                ) : !p.rooms.length ? (
                  <p>Belum ada pemakaian terkait yang tercatat pada skenario ini.</p>
                ) : (
                  p.rooms.map((r) => (
                    <div className="impact-room" key={r.name}>
                      <strong>{r.name}</strong>
                      <span>{r.when}</span>
                      <span>
                        {organizations[p.orgIds[0]].name} · {r.status}
                      </span>
                      <Badge
                        tone={
                          r.status === 'Dibatalkan'
                            ? 'neutral'
                            : mode === 'room'
                              ? 'info'
                              : 'danger'
                        }
                      >
                        {r.status === 'Dibatalkan'
                          ? 'Riwayat dipertahankan'
                          : mode === 'room'
                            ? 'Catatan pengganti · izin baru'
                            : 'Dibatalkan pada jadwal lama'}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
              {mode !== 'work' && (
                <p className="context-note">
                  <Icon name="info" />
                  {mode === 'room'
                    ? 'Izin lama tidak berpindah ke ruangan baru. Riwayat dipertahankan; pembatalan catatan lama dikonfirmasi terpisah setelah perpindahan pasti.'
                    : 'Slot pemakaian yang dibatalkan dilepas. Koordinasi pembatalan izin dengan kampus tetap diperlukan.'}
                </p>
              )}
              {stale && (
                <div className="feedback-panel" role="alert">
                  <Icon name="warning" />
                  <span>
                    <strong>Dampak perlu ditinjau ulang</strong>Pemakaian berubah sejak tinjauan
                    dibuka. Periksa kembali rincian terbaru sebelum mengonfirmasi.
                  </span>
                  <Button
                    onClick={() => {
                      setStale(false)
                      setRefresh(true)
                    }}
                  >
                    Tinjau ulang
                  </Button>
                </div>
              )}
              {rangeIssue && (
                <div className="feedback-panel" role="alert">
                  <Icon name="warning" />
                  <span>
                    <strong>Pelaksanaan di luar rentang pengerjaan</strong>Koreksi rentang secara
                    eksplisit sebelum melanjutkan. Tanggal pengerjaan tidak diperpanjang otomatis.
                  </span>
                  <Button
                    onClick={() => {
                      setRangeIssue(false)
                      setStep(1)
                    }}
                  >
                    Koreksi pengerjaan
                  </Button>
                </div>
              )}
              {refresh && (
                <div role="status" className="impact-block">
                  <span className="section-kicker">Pembaruan tinjauan</span>
                  <strong>Catatan koordinasi ditambahkan oleh BEM.</strong>
                  <p>
                    PIC diminta memastikan ulang izin melalui kampus sebelum memakai ruangan
                    pengganti. Tinjau kembali tindak lanjut sebelum konfirmasi.
                  </p>
                </div>
              )}
            </div>
          )}
          <div className="wizard-actions">
            <Button onClick={() => (step === 0 ? setScreen('detail') : setStep(step - 1))}>
              <Icon name="back" />
              Kembali
            </Button>
            <Button
              variant={step === 2 && mode === 'cancel' ? 'danger' : 'primary'}
              disabled={step === 2 && (stale || rangeIssue)}
              onClick={() => (step < 2 ? setStep(step + 1) : setScreen('done'))}
            >
              {step < 2
                ? 'Lanjutkan'
                : mode === 'cancel'
                  ? 'Konfirmasi pembatalan'
                  : 'Konfirmasi tinjauan'}
              <Icon name="arrow" />
            </Button>
          </div>
          {step === 2 && (
            <details className="internal-scenario">
              <summary>Ruang uji UI</summary>
              <Button
                onClick={() => {
                  setStale(true)
                  setRefresh(false)
                }}
              >
                Tampilkan konflik versi
              </Button>
              {mode === 'move' && (
                <Button onClick={() => setRangeIssue(true)}>
                  Tampilkan pelaksanaan di luar timeline
                </Button>
              )}
            </details>
          )}
        </div>
      )}
      {screen === 'done' && (
        <div className="review-complete">
          <span className="complete-icon">
            <Icon name="check" />
          </span>
          <h3>Rincian perubahan sudah ditinjau.</h3>
          <p>Alur UI selesai. Perubahan belum tersimpan.</p>
          <Button
            onClick={() => {
              setScreen('detail')
              setStep(0)
            }}
          >
            Kembali ke detail proker
          </Button>
        </div>
      )}
    </Dialog>
  )
}
