import { useState } from 'react'
import { Badge, Button, Dialog, Icon } from '../components/ui'
import { Select } from '../components/Select'
import { reviewPrograms } from '../timeline-scenarios'
import type { ProgramDetail } from '../timeline-types'

export function RoomCoordination({
  role,
  onClose,
  onProgram,
}: {
  role: 'bem' | 'pic'
  onClose: () => void
  onProgram: (p: ProgramDetail) => void
}) {
  const [screen, setScreen] = useState<'form' | 'impact' | 'done'>('form')
  const [room, setRoom] = useState('aula')
  const [reopened, setReopened] = useState(false)
  const [report, setReport] = useState(false)
  return (
    <Dialog
      title={
        role === 'bem'
          ? screen === 'impact'
            ? 'Pemakaian terdampak'
            : screen === 'done'
              ? 'Tinjauan penutupan selesai'
              : 'Catat ruangan tidak tersedia'
          : 'Tindak lanjut pemakaian'
      }
      wide
      onClose={onClose}
    >
      <div className="room-coordination">
        <span className="section-kicker">{role === 'bem' ? 'Pengelola BEM' : 'Hima A Contoh'}</span>
        {role === 'bem' && screen === 'form' && (
          <>
            <p className="muted-copy">
              Catat informasi dari kampus agar pemakaian terdampak bisa ditindaklanjuti.
            </p>
            <div className="field">
              <label htmlFor="closure-room">Ruangan</label>
              <Select
                id="closure-room"
                label="Ruangan tidak tersedia"
                value={room}
                onChange={setRoom}
                options={[{ value: 'aula', label: 'Aula Contoh' }]}
              />
            </div>
            <div className="field-pair">
              <div className="field">
                <label htmlFor="closure-start">Mulai</label>
                <input id="closure-start" defaultValue="20 November 2026 · 00.00" readOnly />
              </div>
              <div className="field">
                <label htmlFor="closure-end">Selesai</label>
                <input id="closure-end" defaultValue="23 November 2026 · 00.00" readOnly />
              </div>
            </div>
            <div className="field">
              <label htmlFor="closure-reason">Informasi dari kampus</label>
              <textarea
                id="closure-reason"
                defaultValue="Aula tidak dapat digunakan pada 20–22 November karena perawatan."
              />
            </div>
            <p className="context-note">
              <Icon name="info" />
              BEM mencatat informasi. Keputusan izin tetap melalui kampus.
            </p>
            <Button variant="primary" onClick={() => setScreen('impact')}>
              Tinjau pemakaian terdampak <Icon name="arrow" />
            </Button>
          </>
        )}
        {role === 'bem' && screen === 'impact' && (
          <>
            <h3>Dua pemakaian perlu penyesuaian</h3>
            <p>Ruang dan waktu yang ditutup tidak menerima pengajuan atau persetujuan baru.</p>
            {[
              ['Lokakarya tiga sesi · sesi 2', 'Hima A Contoh', '21 November · 08.00–12.00'],
              ['Koordinasi kegiatan bersama', 'BEM Contoh', '22 November · 09.00–11.00'],
            ].map(([name, org, when]) => (
              <div className="program-room" key={name}>
                <Icon name="room" />
                <div>
                  <strong>{name}</strong>
                  <p>
                    {org} · {when}
                  </p>
                  <div className="status-pair">
                    <Badge tone="success">Disetujui</Badge>
                    <Badge tone="warning">Perlu penyesuaian</Badge>
                  </div>
                </div>
              </div>
            ))}
            <div className="feedback-panel">
              <Icon name="info" />
              <span>
                Status izin tidak otomatis dibatalkan. PIC menentukan ganti ruang, geser, tunda,
                atau batal. Semua pemakaian yang beririsan wajib ditandai.
              </span>
            </div>
            <div className="wizard-actions">
              <Button onClick={() => setScreen('form')}>Kembali</Button>
              <Button variant="primary" onClick={() => setScreen('done')}>
                Konfirmasi tinjauan
              </Button>
            </div>
          </>
        )}
        {role === 'bem' && screen === 'done' && (
          <div className="review-complete">
            <Icon name="check" />
            <h3>Tinjauan penutupan selesai</h3>
            <p>Alur UI selesai. Catatan belum tersimpan.</p>
            <Button onClick={() => setScreen('form')}>Kembali ke formulir</Button>
          </div>
        )}
        {role === 'pic' && (
          <>
            <div className="program-room">
              <Icon name="room" />
              <div>
                <strong>Aula Contoh · Lokakarya sesi 2</strong>
                <p>21 November 2026 · 08.00–12.00</p>
                <div className="status-pair">
                  <Badge tone="success">Disetujui</Badge>
                  <Badge tone="warning">
                    {reopened ? 'Pastikan ulang izin' : 'Perlu penyesuaian'}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="feedback-panel">
              <Icon name="warning" />
              <span>
                {reopened
                  ? 'Aula dibuka kembali lebih awal. Pastikan ulang izin melalui kampus; pemakaian yang dibatalkan atau diganti tetap menjadi riwayat.'
                  : 'BEM mencatat aula tidak tersedia 20–22 November. Jadwal proker belum diubah. Pilih tindak lanjut sesuai kebutuhan kegiatan.'}
              </span>
            </div>
            <Button variant="primary" onClick={() => onProgram(reviewPrograms.closure)}>
              Tentukan penyesuaian <Icon name="arrow" />
            </Button>
            <section className="report-section">
              <h3>Menemukan kendala lain?</h3>
              <p>
                Laporan ini terkait pemakaian milik ormawamu. Penutupan untuk seluruh pengguna
                dicatat oleh BEM.
              </p>
              <label className="field" htmlFor="pic-report">
                <span>Kendala pemakaian</span>
                <textarea id="pic-report" placeholder="Tuliskan kendala operasional ruangan" />
              </label>
              <Button onClick={() => setReport(true)}>Tinjau laporan</Button>
              {report && (
                <p role="status" className="context-note">
                  Laporan ditinjau pada alur UI; belum dikirim atau tersimpan.
                </p>
              )}
            </section>
            <details className="internal-scenario">
              <summary>Ruang uji UI</summary>
              <label className="choice">
                <input
                  type="checkbox"
                  checked={reopened}
                  onChange={(e) => setReopened(e.target.checked)}
                />
                Ruangan dibuka kembali lebih awal
              </label>
            </details>
          </>
        )}
      </div>
    </Dialog>
  )
}
