import { useState } from 'react'
import { Badge, Button, Dialog, Icon } from '../components/ui'
import { Select } from '../components/Select'
import { OrgLogo } from '../components/Organizations'
import type { ProgramDetail } from '../timeline-types'

type DraftSession = { precision: string; start: string; end: string; month: string }
const blankSession = (): DraftSession => ({
  precision: 'exact',
  start: '2026-12-05T09:00',
  end: '2026-12-05T12:00',
  month: '2026-12',
})
export function ProgramForm({
  program,
  outcome,
  onClose,
}: {
  program: ProgramDetail | null
  outcome: string
  onClose: () => void
}) {
  const [step, setStep] = useState<'form' | 'review' | 'done'>('form')
  const [name, setName] = useState(program?.name ?? '')
  const [art, setArt] = useState(false)
  const [bem, setBem] = useState(program?.orgIds.includes('bem') ?? false)
  const [work, setWork] = useState(false)
  const [precision, setPrecision] = useState('month')
  const [workStart, setWorkStart] = useState('September 2026')
  const [workEnd, setWorkEnd] = useState('Desember 2026')
  const [openEnd, setOpenEnd] = useState(false)
  const [sessions, setSessions] = useState<DraftSession[]>(program ? [] : [blankSession()])
  const [failed, setFailed] = useState(false)
  const patchSession = (index: number, patch: Partial<DraftSession>) =>
    setSessions(sessions.map((session, i) => (i === index ? { ...session, ...patch } : session)))
  const ownerNames = [
    'Hima A Contoh',
    ...(bem ? ['BEM Contoh'] : []),
    ...(art ? ['UKM Seni Contoh'] : []),
  ]
  const title =
    step === 'done'
      ? 'Simulasi proker selesai'
      : step === 'review'
        ? 'Tinjau proker'
        : program
          ? 'Edit informasi proker'
          : 'Tambah proker'
  return (
    <Dialog title={title} wide onClose={onClose}>
      <div className="room-form program-form">
        {step !== 'done' && (
          <ol className="room-steps" aria-label="Tahapan proker">
            <li aria-current={step === 'form' ? 'step' : undefined}>
              <span>1</span>Isi proker
            </li>
            <li aria-current={step === 'review' ? 'step' : undefined}>
              <span>2</span>Tinjau
            </li>
          </ol>
        )}
        {step === 'form' && (
          <>
            <div className="room-owner">
              <OrgLogo id="hima" />
              <div>
                <strong>Hima A Contoh</strong>
                <p>Ormawa pengelola utama</p>
              </div>
            </div>
            <div className="field">
              <label htmlFor="program-name">Nama proker</label>
              <input
                id="program-name"
                value={name}
                placeholder="Contoh: Forum berbagi mahasiswa"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="program-period">Tahun akademik</label>
              <Select
                id="program-period"
                label="Tahun akademik proker"
                value="2026"
                onChange={() => {}}
                options={[{ value: '2026', label: '2026 / 2027 · periode aktif' }]}
              />
            </div>
            <fieldset className="room-link-choice">
              <legend>Penyelenggara kolaborasi · opsional</legend>
              <p className="field-help">
                Hima A tetap pengelola utama. Kolaborator tidak otomatis mendapat hak edit.
              </p>
              <label className="choice">
                <input type="checkbox" checked={bem} onChange={(e) => setBem(e.target.checked)} />
                BEM Contoh
              </label>
              <label className="choice">
                <input type="checkbox" checked={art} onChange={(e) => setArt(e.target.checked)} />
                UKM Seni Contoh
              </label>
            </fieldset>
            {program ? (
              <div className="manage-existing">
                <h3>Pengerjaan dan sesi yang sudah tercatat</h3>
                <p>{program.work}</p>
                <ul>
                  {program.occurrences.map((session, i) => (
                    <li key={i}>
                      {session.when} · {session.status}
                    </li>
                  ))}
                </ul>
                <p className="field-help">
                  Untuk mengubah pengerjaan, memindahkan, menunda, atau membatalkan sesi, gunakan
                  Revisi jadwal pada detail proker agar dampak ruangan ikut ditinjau.
                </p>
              </div>
            ) : (
              <>
                <label className="choice">
                  <input
                    type="checkbox"
                    checked={work}
                    onChange={(e) => setWork(e.target.checked)}
                  />
                  Isi rentang pengerjaan · opsional
                </label>
                {work && (
                  <>
                    <div className="field">
                      <label htmlFor="work-precision">Ketelitian pengerjaan</label>
                      <Select
                        id="work-precision"
                        label="Ketelitian pengerjaan"
                        value={precision}
                        onChange={setPrecision}
                        options={[
                          { value: 'month', label: 'Perkiraan bulan' },
                          { value: 'exact', label: 'Tanggal pasti' },
                        ]}
                      />
                    </div>
                    <div className="field-pair">
                      <div className="field">
                        <label htmlFor="work-start">Awal pengerjaan</label>
                        <input
                          id="work-start"
                          value={workStart}
                          onChange={(e) => setWorkStart(e.target.value)}
                          placeholder={
                            precision === 'month' ? 'September 2026' : '12 September 2026'
                          }
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="work-end">Akhir pengerjaan</label>
                        <input
                          id="work-end"
                          disabled={openEnd}
                          value={workEnd}
                          onChange={(e) => setWorkEnd(e.target.value)}
                          placeholder={precision === 'month' ? 'Desember 2026' : '12 Desember 2026'}
                        />
                      </div>
                    </div>
                    <label className="choice">
                      <input
                        type="checkbox"
                        checked={openEnd}
                        onChange={(e) => setOpenEnd(e.target.checked)}
                      />
                      Akhir pengerjaan belum pasti
                    </label>
                  </>
                )}
              </>
            )}
            <section className="manage-session-fields" aria-label="Sesi pelaksanaan baru">
              <h3>{program ? 'Tambahkan sesi pelaksanaan' : 'Sesi pelaksanaan'}</h3>
              <p className="field-help">
                Pelaksanaan terpisah dari masa pengerjaan. Pilih bulan saja jika tanggal belum
                pasti.
              </p>
              {sessions.map((session, index) => (
                <fieldset className="manage-session" key={index}>
                  <legend>Sesi baru {index + 1}</legend>
                  <div className="field">
                    <label htmlFor={`session-${index}-precision`}>Ketelitian jadwal</label>
                    <Select
                      id={`session-${index}-precision`}
                      label={`Ketelitian sesi ${index + 1}`}
                      value={session.precision}
                      onChange={(value) => patchSession(index, { precision: value })}
                      options={[
                        { value: 'exact', label: 'Tanggal dan jam pasti' },
                        { value: 'month', label: 'Bulan saja · tentatif' },
                      ]}
                    />
                  </div>
                  {session.precision === 'month' ? (
                    <div className="field">
                      <label htmlFor={`session-${index}-month`}>Bulan pelaksanaan</label>
                      <input
                        id={`session-${index}-month`}
                        type="month"
                        value={session.month}
                        onChange={(e) => patchSession(index, { month: e.target.value })}
                      />
                    </div>
                  ) : (
                    <div className="field-pair">
                      <div className="field">
                        <label htmlFor={`session-${index}-start`}>Mulai sesi {index + 1}</label>
                        <input
                          id={`session-${index}-start`}
                          type="datetime-local"
                          value={session.start}
                          onChange={(e) => patchSession(index, { start: e.target.value })}
                        />
                      </div>
                      <div className="field">
                        <label htmlFor={`session-${index}-end`}>Selesai sesi {index + 1}</label>
                        <input
                          id={`session-${index}-end`}
                          type="datetime-local"
                          value={session.end}
                          onChange={(e) => patchSession(index, { end: e.target.value })}
                        />
                      </div>
                    </div>
                  )}
                  {(program || sessions.length > 1) && (
                    <Button
                      variant="ghost"
                      aria-label={`Hapus isian sesi baru ${index + 1}`}
                      onClick={() => setSessions(sessions.filter((_, i) => i !== index))}
                    >
                      Hapus isian sesi
                    </Button>
                  )}
                </fieldset>
              ))}
              <Button onClick={() => setSessions([...sessions, blankSession()])}>
                <Icon name="plus" />
                Tambah sesi
              </Button>
            </section>
            <div className="feedback-panel">
              <Icon name="info" />
              <span>
                Mencatat proker tidak otomatis memesan ruangan. Pemakaian ruangan dicatat terpisah
                dan dikaitkan ke satu sesi.
              </span>
            </div>
            <Button variant="primary" onClick={() => setStep('review')}>
              Tinjau proker <Icon name="arrow" />
            </Button>
          </>
        )}
        {step === 'review' && (
          <>
            <Badge tone="info">
              {program ? 'Perubahan informasi dan tambahan sesi' : 'Proker baru'}
            </Badge>
            <dl className="room-facts">
              <div>
                <dt>Nama proker</dt>
                <dd>{name || 'Belum diisi'}</dd>
              </div>
              <div>
                <dt>Tahun akademik</dt>
                <dd>2026 / 2027</dd>
              </div>
              <div>
                <dt>Penyelenggara</dt>
                <dd>
                  {ownerNames.join(' + ')}
                  <small>Pengelola utama: Hima A Contoh</small>
                </dd>
              </div>
              <div>
                <dt>Pengerjaan</dt>
                <dd>
                  {program
                    ? program.work
                    : work
                      ? `${workStart} – ${openEnd ? 'akhir belum pasti' : workEnd}`
                      : 'Belum diisi'}
                  {!program && work && (
                    <small>{precision === 'month' ? 'Perkiraan bulan' : 'Tanggal pasti'}</small>
                  )}
                </dd>
              </div>
            </dl>
            {program && (
              <div className="manage-existing">
                <h3>Sesi tercatat tetap dipertahankan</h3>
                <ul>
                  {program.occurrences.map((session, i) => (
                    <li key={i}>{session.when}</li>
                  ))}
                </ul>
              </div>
            )}
            {sessions.length > 0 && (
              <section>
                <h3>Sesi baru</h3>
                <ol className="manage-session-review">
                  {sessions.map((session, i) => (
                    <li key={i}>
                      {session.precision === 'month'
                        ? `${session.month} · tanggal belum ditentukan`
                        : `${session.start.replace('T', ' · ')} sampai ${session.end.replace('T', ' · ')}`}
                    </li>
                  ))}
                </ol>
              </section>
            )}
            <div className="feedback-panel">
              <Icon name="info" />
              <span>
                {program
                  ? 'Perubahan nama, kolaborator, dan tambahan sesi tidak membatalkan pemakaian ruangan pada sesi lama.'
                  : 'Proker boleh berjalan bersamaan dengan proker lain. Tidak ada pemakaian ruangan yang dibuat dari formulir ini.'}
              </span>
            </div>
            {outcome === 'stale' && (
              <div className="feedback-panel feedback-panel--warning" role="alert">
                <Icon name="warning" />
                <span>
                  <strong>Contoh: versi proker sudah berubah</strong>Muat ulang sebelum melanjutkan.
                  Perubahan lain tidak ditimpa.
                </span>
              </div>
            )}
            {outcome === 'revoked' && (
              <div className="feedback-panel room-feedback--danger" role="alert">
                <Icon name="warning" />
                <span>
                  <strong>Contoh: akses pengelolaan dicabut</strong>Perubahan tidak dapat disimpan.
                  Hubungi BEM.
                </span>
              </div>
            )}
            {failed && (
              <div className="feedback-panel room-feedback--danger" role="alert">
                <Icon name="warning" />
                <span>Simulasi gagal menyimpan. Isian tetap ada dan belum tersimpan.</span>
              </div>
            )}
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
                disabled={outcome === 'stale' || outcome === 'revoked'}
                onClick={() => (outcome === 'failed' ? setFailed(true) : setStep('done'))}
              >
                {failed ? 'Coba lagi' : 'Simpan proker'}
              </Button>
            </div>
          </>
        )}
        {step === 'done' && (
          <>
            <span className="room-done-icon">
              <Icon name="check" />
            </span>
            <h3>Alur proker sudah ditinjau</h3>
            <p>
              Ini hasil simulasi UI. Proker dan sesi tidak disimpan; daftar tetap seperti semula.
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
