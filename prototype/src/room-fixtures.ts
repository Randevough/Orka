import type { OrgId } from './components/Organizations'

export type RoomUsage = {
  id: string
  title: string
  room: 'aula' | 'rapat'
  org: OrgId
  day: string
  date: string
  time: string
  status: 'planned' | 'pending' | 'approved' | 'rejected' | 'cancelled'
  updated: string
  program?: string
  session?: string
  adjustment?: boolean
  dispute?: boolean
  draft?: { start: string; end: string }
  note?: string
}

export const roomNames = { aula: 'Aula Contoh', rapat: 'Ruang Rapat Contoh' }
export const usageExamples: RoomUsage[] = [
  {
    id: 'r1',
    title: 'Persiapan pameran karya',
    room: 'aula',
    org: 'art',
    day: 'Senin, 16 November',
    date: '16 November 2026',
    time: '08.00–12.00',
    status: 'planned',
    updated: '15 November 2026 · 10.00',
    note: 'Belum diajukan ke kampus.',
  },
  {
    id: 'r2',
    title: 'Koordinasi panitia',
    room: 'rapat',
    org: 'hima',
    day: 'Rabu, 18 November',
    date: '18 November 2026',
    time: '13.00–15.00',
    status: 'pending',
    updated: '16 November 2026 · 09.30',
    dispute: true,
    note: 'Laporan izin bertentangan sedang ditinjau. Status izin sebelumnya tetap ditampilkan.',
  },
  {
    id: 'r3',
    title: 'Latihan penampilan',
    room: 'aula',
    org: 'art',
    day: 'Kamis, 19 November',
    date: '19 November 2026',
    time: '15.00–18.00',
    status: 'rejected',
    updated: '17 November 2026 · 11.00',
    note: 'PIC melaporkan izin ditolak. Catatan dipertahankan sebagai riwayat.',
  },
  {
    id: 'r4',
    title: 'Lokakarya tiga sesi · sesi 2',
    room: 'aula',
    org: 'hima',
    day: 'Sabtu, 21 November',
    date: '21 November 2026',
    time: '08.00–12.00',
    status: 'approved',
    updated: '19 November 2026 · 14.00',
    program: 'Lokakarya tiga sesi',
    session: 'Sesi 2 · 21 November 2026 · 09.00–11.00',
    adjustment: true,
    note: 'Aula tidak tersedia 20–22 November berdasarkan informasi kampus yang dicatat BEM. PIC perlu menentukan penyesuaian; status izin lama tetap tercatat.',
  },
  {
    id: 'r5',
    title: 'Koordinasi kegiatan bersama',
    room: 'aula',
    org: 'bem',
    day: 'Minggu, 22 November',
    date: '22 November 2026',
    time: '09.00–11.00',
    status: 'approved',
    updated: '19 November 2026 · 14.00',
    adjustment: true,
    note: 'Pemakaian terdampak penutupan aula 20–22 November. Informasi penutupan tidak otomatis membatalkan proker.',
  },
  {
    id: 'r6',
    title: 'Persiapan forum ormawa',
    room: 'rapat',
    org: 'hima',
    day: 'Selasa, 24 November',
    date: '24 November 2026',
    time: '13.00–15.00',
    status: 'planned',
    updated: '20 November 2026 · 10.00',
    note: 'Belum diajukan ke kampus.',
  },
  {
    id: 'r7',
    title: 'Rapat persiapan pameran',
    room: 'rapat',
    org: 'art',
    day: 'Kamis, 26 November',
    date: '26 November 2026',
    time: '10.00–12.00',
    status: 'cancelled',
    updated: '20 November 2026 · 08.00',
    note: 'Rencana ini dibatalkan karena tidak diperbarui selama 7 hari.',
  },
]

// Pilihan membuka dataset yang disiapkan, bukan query atau perhitungan jadwal browser.
export const roomViews: Record<string, number[]> = {
  'week1:all:all': [0, 1, 2, 3, 4],
  'week1:all:hima': [1, 3],
  'week1:aula:all': [0, 2, 3, 4],
  'week1:aula:hima': [3],
  'week1:rapat:all': [1],
  'week1:rapat:hima': [1],
  'week2:all:all': [5, 6],
  'week2:all:hima': [5],
  'week2:aula:all': [],
  'week2:aula:hima': [],
  'week2:rapat:all': [5, 6],
  'week2:rapat:hima': [5],
}
