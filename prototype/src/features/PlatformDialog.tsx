import { useState } from 'react'
import { Badge, Button, Dialog, Icon } from '../components/ui'
import { Select } from '../components/Select'
import { accountStatus } from '../platform-fixtures'
import type { PlatformOrg, PlatformRoom, PlatformPeriod } from '../platform-fixtures'

export type PlatformAction = {
  kind:
    | 'org-create'
    | 'org-edit'
    | 'verify'
    | 'revoke'
    | 'room-create'
    | 'room-edit'
    | 'reopen'
    | 'period-create'
    | 'period-edit'
    | 'activate'
    | 'archive'
    | 'dispute'
  org?: PlatformOrg
  room?: PlatformRoom
  period?: PlatformPeriod
}
const titles: Record<PlatformAction['kind'], string> = {
  'org-create': 'Tambah ormawa',
  'org-edit': 'Edit ormawa dan kontak',
  verify: 'Verifikasi akun resmi',
  revoke: 'Cabut akses akun',
  'room-create': 'Tambah ruangan',
  'room-edit': 'Edit ruangan',
  reopen: 'Catat ruangan dibuka kembali',
  'period-create': 'Siapkan periode baru',
  'period-edit': 'Edit periode mendatang',
  activate: 'Tetapkan periode utama',
  archive: 'Arsipkan periode',
  dispute: 'Catat hasil peninjauan',
}
const explanations: Record<PlatformAction['kind'], string> = {
  'org-create':
    'Pencatatan ormawa tidak otomatis memverifikasi akun atau memberi hak pengelola platform.',
  'org-edit':
    'Kontak hanya boleh dibaca PIC/BEM terverifikasi dengan persetujuan pemilik kontak. Pembaruan profil tidak memperpanjang tenggat pemakaian ruangan.',
  verify:
    'Satu akun resmi hanya mewakili satu ormawa. Verifikasi memberi akses PIC atas ormawa tersebut, tanpa hak administrator platform.',
  revoke:
    'Akses pengelolaan harus ditolak pada operasi berikutnya, termasuk lewat sesi lama. Proker, pemakaian dan riwayat dipertahankan.',
  'room-create':
    'Tambahkan informasi ruangan untuk pencatatan bersama. Ruangan aktif bukan jaminan tersedia atau keputusan izin kampus.',
  'room-edit':
    'Informasi ruangan diperbarui tanpa menghapus riwayat. Penutupan pada rentang tertentu dicatat melalui alur Ruangan tidak tersedia.',
  reopen:
    'Pembukaan kembali tidak memulihkan pemakaian yang dibatalkan atau diganti. PIC memastikan ulang izin dan tindak lanjut; tidak ada pemulihan otomatis.',
  'period-create':
    'Siapkan periode tanpa memindahkan atau menggandakan proker. Zona waktu dan konfigurasi kampus final masih perlu ditetapkan sebelum integrasi.',
  'period-edit':
    'Perubahan ini hanya menyiapkan periode mendatang. Jadwal proker pada periode lain tetap dipertahankan.',
  activate:
    'Periode utama menjadi pilihan awal kalender. Penetapan ini tidak memindahkan proker atau otomatis mengarsipkan periode sebelumnya.',
  archive:
    'Arsip dipertahankan untuk dibaca. Edit normal pada periode arsip tidak tersedia; catatan tidak dihapus atau dipindahkan.',
  dispute:
    'BEM mencatat hasil klarifikasi melalui kampus. Status izin kedua pihak tidak diubah dari dialog ini; PIC memperbarui laporannya sesuai hasil klarifikasi.',
}

export function PlatformDialog({
  action,
  outcome,
  onClose,
}: {
  action: PlatformAction
  outcome: string
  onClose: () => void
}) {
  const { kind, org, room, period } = action
  const [step, setStep] = useState<'form' | 'review' | 'done'>('form')
  const [name, setName] = useState(
    org?.name ?? room?.name ?? period?.name ?? (kind === 'period-create' ? '2028 / 2029' : ''),
  )
  const [email, setEmail] = useState(org?.email ?? '')
  const [contact, setContact] = useState('')
  const [consent, setConsent] = useState(org?.consent ?? false)
  const [location, setLocation] = useState(room?.location ?? '')
  const [active, setActive] = useState(room?.active === false ? 'inactive' : 'active')
  const [start, setStart] = useState(period?.start ?? '2028-09')
  const [end, setEnd] = useState(period?.end ?? '2029-08')
  const [note, setNote] = useState(
    kind === 'reopen'
      ? 'Kampus menginformasikan aula kembali dapat digunakan mulai 23 November 2026. PIC perlu memastikan ulang izin.'
      : '',
  )
  const [resolution, setResolution] = useState('clarifying')
  const [confirmed, setConfirmed] = useState(false)
  const [failed, setFailed] = useState(false)
  const orgForm = kind === 'org-create' || kind === 'org-edit'
  const roomForm = kind === 'room-create' || kind === 'room-edit'
  const periodForm = kind === 'period-create' || kind === 'period-edit'
  const needsConfirmation =
    kind === 'verify' || kind === 'revoke' || kind === 'activate' || kind === 'archive'
  const accountConflict = outcome === 'account-conflict' && (kind === 'verify' || orgForm)
  const blocked = outcome === 'stale' || outcome === 'revoked' || accountConflict
  const title =
    step === 'done'
      ? 'Simulasi pengelolaan selesai'
      : step === 'review'
        ? `Tinjau: ${titles[kind].toLowerCase()}`
        : titles[kind]
  const subject = org?.name ?? room?.name ?? period?.name
  return (
    <Dialog title={title} wide onClose={onClose}>
      <div className="room-form platform-action">
        {step !== 'done' && (
          <>
            <ol className="room-steps" aria-label="Tahapan pengelolaan platform">
              <li aria-current={step === 'form' ? 'step' : undefined}>
                <span>1</span>Isi dan periksa
              </li>
              <li aria-current={step === 'review' ? 'step' : undefined}>
                <span>2</span>Tinjau dampak
              </li>
            </ol>
            {subject && (
              <div className="manage-action-subject">
                <strong>{subject}</strong>
                {org && (
                  <>
                    <p>{org.email}</p>
                    <Badge tone={accountStatus[org.status].tone}>
                      {accountStatus[org.status].label}
                    </Badge>
                  </>
                )}
                {room && <p>{room.location}</p>}
                {period && (
                  <p>
                    {period.start} – {period.end}
                  </p>
                )}
              </div>
            )}
          </>
        )}
        {step === 'form' && (
          <>
            {(orgForm || roomForm || periodForm) && (
              <div className="field">
                <label htmlFor="platform-name">
                  {orgForm ? 'Nama ormawa' : roomForm ? 'Nama ruangan' : 'Nama periode'}
                </label>
                <input id="platform-name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            )}
            {orgForm && (
              <>
                <div className="field">
                  <label htmlFor="platform-email">Akun Google resmi ormawa</label>
                  <input
                    id="platform-email"
                    type="email"
                    value={email}
                    placeholder="akun-ormawa@akun.invalid"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="field-help">
                    Perubahan data akun perlu verifikasi tersendiri. Jangan isi password atau kode
                    pemulihan.
                  </p>
                </div>
                <div className="field">
                  <label htmlFor="platform-contact">Kontak koordinasi · opsional</label>
                  <input
                    id="platform-contact"
                    type="tel"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Kontak contoh; tidak menghubungi layanan"
                  />
                  <p className="field-help">
                    Isian kosong pada prototipe berarti mempertahankan contoh kontak sebelumnya.
                  </p>
                </div>
                <label className="choice">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  Pemilik kontak menyetujui pemakaian untuk koordinasi PIC/BEM terverifikasi.
                </label>
              </>
            )}
            {kind === 'verify' && (
              <>
                <div className="field">
                  <label htmlFor="verify-email">Akun yang diverifikasi</label>
                  <input
                    id="verify-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <p className="field-help">
                  Pastikan kaitan akun resmi dengan ormawa melalui proses verifikasi BEM. Identitas
                  BEM sebagai ormawa tidak otomatis memberikan hak platform.
                </p>
              </>
            )}
            {roomForm && (
              <>
                <div className="field">
                  <label htmlFor="platform-location">Lokasi</label>
                  <input
                    id="platform-location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="platform-room-state">Status pencatatan</label>
                  <Select
                    id="platform-room-state"
                    label="Status ruangan"
                    value={active}
                    onChange={setActive}
                    options={[
                      { value: 'active', label: 'Aktif' },
                      { value: 'inactive', label: 'Nonaktif' },
                    ]}
                  />
                </div>
                <p className="field-help">
                  Penonaktifan mempertahankan catatan lama. Tinjau pemakaian yang sudah tercatat
                  melalui alur tindak lanjut.
                </p>
              </>
            )}
            {periodForm && (
              <div className="field-pair">
                <div className="field">
                  <label htmlFor="platform-period-start">Bulan awal periode</label>
                  <input
                    id="platform-period-start"
                    type="month"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="platform-period-end">Bulan akhir periode</label>
                  <input
                    id="platform-period-end"
                    type="month"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                  />
                </div>
              </div>
            )}
            {kind === 'dispute' && (
              <>
                <div className="field">
                  <label htmlFor="platform-resolution">Tindak lanjut peninjauan</label>
                  <Select
                    id="platform-resolution"
                    label="Tindak lanjut peninjauan"
                    value={resolution}
                    onChange={setResolution}
                    options={[
                      { value: 'clarifying', label: 'Masih menunggu klarifikasi kampus' },
                      { value: 'recorded', label: 'Hasil klarifikasi sudah dicatat' },
                      { value: 'pic-update', label: 'PIC perlu memperbarui laporannya' },
                    ]}
                  />
                </div>
                <p className="field-help">
                  Tidak ada tombol menyetujui izin, mengubah status pemakaian pihak lain, atau
                  mengunggah bukti.
                </p>
              </>
            )}
            <div className="field">
              <label htmlFor="platform-note">
                {kind === 'reopen'
                  ? 'Informasi pembukaan dari kampus'
                  : kind === 'dispute'
                    ? 'Catatan hasil klarifikasi'
                    : 'Catatan pengelolaan · opsional'}
              </label>
              <textarea id="platform-note" value={note} onChange={(e) => setNote(e.target.value)} />
            </div>
            <div className="feedback-panel">
              <Icon name="info" />
              <span>{explanations[kind]}</span>
            </div>
            <Button variant="primary" onClick={() => setStep('review')}>
              Tinjau dampak <Icon name="arrow" />
            </Button>
          </>
        )}
        {step === 'review' && (
          <>
            <dl className="room-facts">
              <div>
                <dt>Tindakan</dt>
                <dd>{titles[kind]}</dd>
              </div>
              <div>
                <dt>
                  {orgForm ? 'Ormawa' : roomForm ? 'Ruangan' : periodForm ? 'Periode' : 'Sasaran'}
                </dt>
                <dd>
                  {orgForm || roomForm || periodForm
                    ? name || 'Belum diisi'
                    : (subject ?? 'Laporan izin · Ruang Rapat Contoh')}
                </dd>
              </div>
              {(orgForm || kind === 'verify') && (
                <div>
                  <dt>Akun resmi</dt>
                  <dd>{email || 'Belum diisi'}</dd>
                </div>
              )}
              {orgForm && (
                <>
                  <div>
                    <dt>Kontak koordinasi</dt>
                    <dd>{contact || 'Contoh kontak sebelumnya dipertahankan'}</dd>
                  </div>
                  <div>
                    <dt>Persetujuan kontak</dt>
                    <dd>
                      {consent ? 'Disetujui untuk PIC/BEM terverifikasi' : 'Kontak tidak dibagikan'}
                    </dd>
                  </div>
                </>
              )}
              {roomForm && (
                <>
                  <div>
                    <dt>Lokasi</dt>
                    <dd>{location || 'Belum diisi'}</dd>
                  </div>
                  <div>
                    <dt>Status ruangan</dt>
                    <dd>{active === 'active' ? 'Aktif' : 'Nonaktif · riwayat dipertahankan'}</dd>
                  </div>
                </>
              )}
              {periodForm && (
                <div>
                  <dt>Rentang periode</dt>
                  <dd>
                    {start} – {end}
                  </dd>
                </div>
              )}
              {kind === 'dispute' && (
                <div>
                  <dt>Tindak lanjut</dt>
                  <dd>
                    {resolution === 'clarifying'
                      ? 'Masih menunggu klarifikasi kampus'
                      : resolution === 'recorded'
                        ? 'Hasil klarifikasi sudah dicatat'
                        : 'PIC perlu memperbarui laporannya'}
                  </dd>
                </div>
              )}
              <div>
                <dt>Catatan</dt>
                <dd>{note || 'Tidak ada catatan tambahan'}</dd>
              </div>
              <div>
                <dt>Pencatat</dt>
                <dd>Akun pengelola BEM Contoh</dd>
              </div>
            </dl>
            <div
              className={`feedback-panel ${kind === 'revoke' || kind === 'archive' ? 'feedback-panel--warning' : ''}`}
            >
              <Icon name="info" />
              <span>
                <strong>Dampak yang ditinjau</strong>
                {explanations[kind]}
              </span>
            </div>
            {needsConfirmation && (
              <label className="choice">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                />
                Saya sudah memeriksa sasaran dan dampak tindakan ini.
              </label>
            )}
            {outcome === 'stale' && (
              <div className="feedback-panel feedback-panel--warning" role="alert">
                <Icon name="warning" />
                <span>
                  <strong>Contoh: catatan sudah berubah</strong>Tinjau versi terbaru sebelum
                  melanjutkan; pembaruan lain tidak ditimpa.
                </span>
              </div>
            )}
            {outcome === 'revoked' && (
              <div className="feedback-panel room-feedback--danger" role="alert">
                <Icon name="warning" />
                <span>
                  <strong>Contoh: hak pengelola dicabut</strong>Tindakan tidak dapat disimpan
                  melalui sesi ini.
                </span>
              </div>
            )}
            {accountConflict && (
              <div className="feedback-panel room-feedback--danger" role="alert">
                <Icon name="warning" />
                <span>
                  <strong>Contoh: akun sudah terkait ormawa lain</strong>Verifikasi tidak dapat
                  dilanjutkan. Periksa akun resmi; satu akun tidak mewakili dua ormawa.
                </span>
              </div>
            )}
            {failed && (
              <div className="feedback-panel room-feedback--danger" role="alert">
                <Icon name="warning" />
                <span>
                  Simulasi gagal menyimpan. Isian tetap dipertahankan dan belum ada perubahan
                  tersimpan.
                </span>
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
                variant={kind === 'revoke' || kind === 'archive' ? 'danger' : 'primary'}
                disabled={blocked || (needsConfirmation && !confirmed)}
                onClick={() => (outcome === 'failed' ? setFailed(true) : setStep('done'))}
              >
                {failed
                  ? 'Coba lagi'
                  : kind === 'verify'
                    ? 'Konfirmasi verifikasi'
                    : kind === 'revoke'
                      ? 'Konfirmasi pencabutan'
                      : kind === 'archive'
                        ? 'Konfirmasi arsip'
                        : 'Simpan hasil tinjauan'}
              </Button>
            </div>
          </>
        )}
        {step === 'done' && (
          <>
            <span className="room-done-icon">
              <Icon name="check" />
            </span>
            <h3>Alur pengelolaan sudah ditinjau</h3>
            <p>
              Ini hasil simulasi UI. Akun, akses, kontak, ruangan, periode, laporan dan riwayat
              tidak diubah atau disimpan. Tidak ada pemberitahuan yang dikirim.
            </p>
            <Button variant="primary" onClick={onClose}>
              Kembali ke kelola platform <Icon name="arrow" />
            </Button>
          </>
        )}
      </div>
    </Dialog>
  )
}
