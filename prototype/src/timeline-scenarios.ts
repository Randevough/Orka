import type { ProgramDetail } from './timeline-types'

const base: ProgramDetail = {
  id: 'pengabdian',
  name: 'Pengabdian untuk sekitar',
  orgIds: ['hima', 'bem'],
  work: '12 Juni – 12 Desember 2026',
  precision: 'Tanggal pasti',
  column: 1,
  width: 4,
  status: 'Aktif · jadwal direvisi',
  tone: 'info',
  openEnd: false,
  before: true,
  after: false,
  occurrences: [{ when: '12 Desember 2026 · 08.00–15.00', status: 'Terjadwal', tone: 'neutral' }],
  rooms: [
    {
      name: 'Aula Contoh',
      when: '12 Desember 2026 · 07.00–16.00',
      status: 'Disetujui',
      tone: 'success',
      attention: false,
    },
  ],
  history: [
    'Pelaksanaan direvisi dari 12 Oktober ke 12 Desember 2026.',
    'Awal pengerjaan 12 Juni tetap dipertahankan.',
    'Proposal belum disetujui; PIC memilih melanjutkan revisi.',
  ],
}
export const reviewPrograms: Record<string, ProgramDetail> = {
  revised: base,
  postponed: {
    ...base,
    id: 'postponed',
    status: 'Aktif · pelaksanaan ditunda',
    tone: 'warning',
    work: '12 Juni 2026 – akhir belum pasti',
    precision: 'Akhir belum pasti',
    openEnd: true,
    width: 2,
    occurrences: [
      { when: 'Tanggal pengganti belum ditentukan', status: 'Ditunda', tone: 'warning' },
    ],
    rooms: [
      {
        name: 'Aula Contoh',
        when: '12 Oktober 2026 · 07.00–16.00',
        status: 'Dibatalkan',
        tone: 'neutral',
      },
    ],
    history: [
      'Pelaksanaan 12 Oktober ditunda, tanggal lama tidak lagi aktif.',
      'Pemakaian lama dibatalkan dan slot dilepas.',
      'Awal pengerjaan dipertahankan; akhir belum pasti.',
    ],
  },
  partial: {
    ...base,
    id: 'partial',
    name: 'Kelas berbagi empat sesi',
    orgIds: ['hima'],
    work: 'September – Desember 2026',
    precision: 'Perkiraan bulan',
    before: false,
    status: 'Selesai sebagian—sisa dibatalkan',
    tone: 'warning',
    occurrences: [
      { when: '12 September 2026 · 09.00–11.00', status: 'Terlaksana', tone: 'success' },
      { when: '26 September 2026 · 09.00–11.00', status: 'Terlaksana', tone: 'success' },
      { when: '10 Oktober 2026 · 09.00–11.00', status: 'Dibatalkan', tone: 'neutral' },
      { when: '24 Oktober 2026 · 09.00–11.00', status: 'Dibatalkan', tone: 'neutral' },
    ],
    rooms: [
      {
        name: 'Ruang A Contoh · sesi 1 dan 2',
        when: '12 dan 26 September 2026',
        status: 'Disetujui · riwayat',
        tone: 'success',
      },
      {
        name: 'Ruang A Contoh · sesi 3 dan 4',
        when: '10 dan 24 Oktober 2026',
        status: 'Dibatalkan',
        tone: 'neutral',
      },
    ],
    history: [
      'Dua sesi tercatat terlaksana oleh PIC.',
      'Sisa kegiatan dan pemakaian terkait dibatalkan.',
      'Hasil dan riwayat dua sesi awal tetap tersimpan.',
    ],
  },
  closure: {
    ...base,
    id: 'closure',
    draft: {
      start: 'September 2026',
      end: 'November 2026',
      execution: '21 November 2026 · 09.00–11.00',
    },
    name: 'Lokakarya tiga sesi',
    orgIds: ['hima'],
    work: 'September – November 2026',
    precision: 'Perkiraan bulan',
    column: 1,
    width: 3,
    before: false,
    status: 'Aktif · perlu penyesuaian',
    tone: 'warning',
    occurrences: [
      { when: '14 November 2026 · 09.00–11.00', status: 'Terjadwal', tone: 'neutral' },
      {
        when: '21 November 2026 · 09.00–11.00',
        status: 'Ruang perlu penyesuaian',
        tone: 'warning',
      },
      { when: '28 November 2026 · 09.00–11.00', status: 'Terjadwal', tone: 'neutral' },
    ],
    rooms: [
      {
        name: 'Aula Contoh · sesi 2',
        when: '21 November 2026 · 08.00–12.00',
        status: 'Disetujui',
        tone: 'success',
        attention: true,
      },
    ],
    history: [
      'BEM mencatat aula tidak tersedia 20–22 November 2026.',
      'Sesi kedua wajib ditindaklanjuti; sesi lain belum diubah.',
    ],
  },
  cross: {
    ...base,
    id: 'cross',
    name: 'Ruang kolaborasi berkelanjutan',
    orgIds: ['bem', 'hima'],
    work: 'Juni 2026 – Oktober 2027',
    precision: 'Perkiraan bulan',
    column: 1,
    width: 12,
    before: true,
    after: true,
    status: 'Aktif',
    tone: 'neutral',
    rooms: [],
    occurrences: [
      { when: 'April 2027 · tanggal belum ditentukan', status: 'Tentatif', tone: 'info' },
    ],
    history: [
      'Satu proker dengan rentang utuh lintas periode; tampilan dipotong sesuai periode terpilih.',
    ],
  },
}

export const reviewOptions = [
  { value: 'revised', label: 'Proposal belum disetujui · jadwal direvisi' },
  { value: 'postponed', label: 'Ditunda · pengganti belum pasti' },
  { value: 'closure', label: 'Ruangan tidak tersedia · tiga sesi' },
  { value: 'partial', label: 'Dua sesi terlaksana · sisa dibatalkan' },
  { value: 'cross', label: 'Kolaborasi lintas periode' },
]
