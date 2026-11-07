import { useState } from 'react'
import { Button, Icon } from '../components/ui'
import { Select } from '../components/Select'
import type { AccountPreview } from '../manage-fixtures'

const choices = [
  { value: 'bem', label: 'Pengelola platform BEM' },
  { value: 'active', label: 'Akun ormawa aktif' },
  { value: 'unverified', label: 'Belum diverifikasi' },
  { value: 'revoked', label: 'Akses dicabut' },
  { value: 'failed', label: 'Login gagal' },
  { value: 'cancelled', label: 'Login dibatalkan' },
]
const messages: Record<string, { title: string; text: string }> = {
  bem: {
    title: 'Pengelola BEM Contoh',
    text: 'Contoh akun dengan hak pengelola platform yang terpisah dari akun PIC ormawa.',
  },
  active: {
    title: 'Hima A Contoh',
    text: 'Akun resmi ormawa telah diverifikasi BEM. Buka ruang pengelolaan untuk melihat rencana milik ormawa.',
  },
  unverified: {
    title: 'Verifikasi BEM diperlukan',
    text: 'Akun belum memiliki akses pengelolaan. Hubungi BEM untuk memverifikasi akun Google resmi ormawa.',
  },
  revoked: {
    title: 'Akses pengelolaan dicabut',
    text: 'Hubungi BEM untuk memeriksa status akun resmi. Kalender dan pemakaian publik tetap dapat dilihat.',
  },
  failed: {
    title: 'Belum berhasil masuk',
    text: 'Tidak ada akses yang diberikan. Coba masuk kembali.',
  },
  cancelled: {
    title: 'Proses masuk dibatalkan',
    text: 'Kamu tetap dapat melihat kalender tanpa masuk, atau mencoba masuk kembali.',
  },
}
export function LoginPreview({ onContinue }: { onContinue: (access: AccountPreview) => void }) {
  const [choice, setChoice] = useState('active')
  const [attempted, setAttempted] = useState(false)
  const [tools, setTools] = useState(false)
  return (
    <div className="login-preview">
      <span className="login-art">
        <Icon name="calendar" />
      </span>
      <p>
        Gunakan akun Google resmi ormawa.
        <br />
        Akses pengelolaan diverifikasi oleh BEM.
      </p>
      <Button variant="primary" onClick={() => setAttempted(true)}>
        {attempted && (choice === 'failed' || choice === 'cancelled')
          ? 'Coba masuk lagi'
          : 'Masuk dengan Google'}
        <Icon name="arrow" />
      </Button>
      {attempted && (
        <div className="feedback-panel" role="status">
          <Icon name="info" />
          <span>
            <strong>Simulasi akses · {messages[choice].title}</strong>
            {messages[choice].text}
          </span>
        </div>
      )}
      {attempted && choice !== 'failed' && choice !== 'cancelled' && (
        <Button onClick={() => onContinue(choice as AccountPreview)}>
          {choice === 'bem'
            ? 'Buka kelola platform'
            : choice === 'active'
              ? 'Buka kelola ormawa'
              : 'Lihat status akses'}
          <Icon name="arrow" />
        </Button>
      )}
      <p className="field-help">Melihat kalender tetap bisa tanpa masuk.</p>
      <div className="manage-login-review">
        <button
          className="tools-toggle"
          aria-expanded={tools}
          aria-controls="login-review"
          onClick={() => setTools(!tools)}
        >
          <span>
            <Icon name="settings" />
            Ruang uji akses
          </span>
          <Icon name="down" />
        </button>
        {tools && (
          <div id="login-review" className="field">
            <label htmlFor="access-choice">Skenario masuk</label>
            <Select
              id="access-choice"
              label="Skenario masuk"
              value={choice}
              onChange={(value) => {
                setChoice(value)
                setAttempted(false)
              }}
              options={choices}
            />
            <p className="field-help">Simulasi UI tanpa Google atau pemberian kewenangan nyata.</p>
          </div>
        )}
      </div>
    </div>
  )
}
