export type EventPreview = { name: string; org: string; when: string; tentative?: boolean }
export type MonthPreview = {
  name: string
  year: string
  count: number
  tentative: number
  events: EventPreview[]
}

// Skenario visual statis, bukan hasil query atau perhitungan kalender.
export const months: MonthPreview[] = [
  {
    name: 'September',
    year: '2026',
    count: 3,
    tentative: 1,
    events: [
      { name: 'Temu awal kepengurusan', org: 'BEM Contoh', when: '12 Sep · 09.00–11.00' },
      { name: 'Ruang berbagi mahasiswa', org: 'Hima A Contoh', when: '19 Sep · 13.00–15.00' },
      {
        name: 'Pekan perkenalan komunitas',
        org: 'UKM Seni Contoh',
        when: 'September · tanggal belum ditentukan',
        tentative: true,
      },
    ],
  },
  {
    name: 'Oktober',
    year: '2026',
    count: 8,
    tentative: 1,
    events: [
      { name: 'Forum lintas ormawa', org: 'BEM Contoh', when: '10–13 Okt · 09.00–12.00' },
      { name: 'Lokakarya ide kreatif', org: 'Hima A Contoh', when: '17–19 Okt · 13.00–16.00' },
      { name: 'Panggung kecil kampus', org: 'UKM Seni Contoh', when: '18 Okt · 15.00–17.00' },
      {
        name: 'Bincang karya dan kolaborasi',
        org: 'Hima A Contoh + UKM Seni Contoh',
        when: 'Oktober · tanggal belum ditentukan',
        tentative: true,
      },
      { name: 'Gerak bersama', org: 'UKM Olahraga Contoh', when: '18 Okt · 07.00–09.00' },
      { name: 'Ruang karya bersama', org: 'Hima B Contoh', when: '30 Okt–2 Nov · 10.00–16.00' },
      { name: 'Temu komunitas', org: 'BEM Contoh', when: '18 Okt · 10.00–12.00' },
      { name: 'Malam apresiasi', org: 'UKM Seni Contoh', when: '18 Okt 18.00–19 Okt 00.00' },
    ],
  },
  {
    name: 'November',
    year: '2026',
    count: 3,
    tentative: 1,
    events: [
      { name: 'Kelas desain bersama', org: 'UKM Seni Contoh', when: '14 Nov · 10.00–12.00' },
      {
        name: 'Dialog mahasiswa',
        org: 'BEM Contoh',
        when: 'November · tanggal belum ditentukan',
        tentative: true,
      },
      { name: 'Ruang karya bersama', org: 'Hima B Contoh', when: '30 Okt–2 Nov · 10.00–16.00' },
    ],
  },
  {
    name: 'Desember',
    year: '2026',
    count: 1,
    tentative: 0,
    events: [{ name: 'Refleksi akhir semester', org: 'BEM Contoh', when: '12 Des · 09.00–11.00' }],
  },
  { name: 'Januari', year: '2027', count: 0, tentative: 0, events: [] },
  {
    name: 'Februari',
    year: '2027',
    count: 2,
    tentative: 1,
    events: [
      { name: 'Temu semester baru', org: 'Hima A Contoh', when: '13 Feb · 09.00–11.00' },
      {
        name: 'Jelajah komunitas',
        org: 'UKM Seni Contoh',
        when: 'Februari · tanggal belum ditentukan',
        tentative: true,
      },
    ],
  },
  {
    name: 'Maret',
    year: '2027',
    count: 3,
    tentative: 1,
    events: [
      { name: 'Ruang aspirasi', org: 'BEM Contoh', when: '06 Mar · 09.00–11.00' },
      { name: 'Studio terbuka', org: 'UKM Seni Contoh', when: '20 Mar · 10.00–13.00' },
      {
        name: 'Kelas pengembangan diri',
        org: 'Hima A Contoh',
        when: 'Maret · tanggal belum ditentukan',
        tentative: true,
      },
    ],
  },
  {
    name: 'April',
    year: '2027',
    count: 2,
    tentative: 0,
    events: [
      {
        name: 'Kolaborasi untuk sekitar',
        org: 'BEM Contoh + Hima A Contoh',
        when: '10 Apr · 08.00–12.00',
      },
      { name: 'Pameran karya mahasiswa', org: 'UKM Seni Contoh', when: '24 Apr · 10.00–16.00' },
    ],
  },
  {
    name: 'Mei',
    year: '2027',
    count: 1,
    tentative: 1,
    events: [
      {
        name: 'Pekan ekspresi',
        org: 'UKM Seni Contoh',
        when: 'Mei · tanggal belum ditentukan',
        tentative: true,
      },
    ],
  },
  {
    name: 'Juni',
    year: '2027',
    count: 2,
    tentative: 0,
    events: [
      { name: 'Diskusi akhir semester', org: 'Hima A Contoh', when: '12 Jun · 09.00–11.00' },
      { name: 'Forum evaluasi bersama', org: 'BEM Contoh', when: '19 Jun · 09.00–12.00' },
    ],
  },
  { name: 'Juli', year: '2027', count: 0, tentative: 0, events: [] },
  {
    name: 'Agustus',
    year: '2027',
    count: 1,
    tentative: 1,
    events: [
      {
        name: 'Persiapan periode berikutnya',
        org: 'BEM Contoh',
        when: 'Agustus · tanggal belum ditentukan',
        tentative: true,
      },
    ],
  },
]

export const himaScenario: Record<
  string,
  { count: number; tentative: number; events: EventPreview[] }
> = {
  September: { count: 1, tentative: 0, events: [months[0].events[1]] },
  Oktober: { count: 2, tentative: 1, events: [months[1].events[1], months[1].events[3]] },
  November: { count: 0, tentative: 0, events: [] },
  Desember: { count: 0, tentative: 0, events: [] },
  Januari: { count: 0, tentative: 0, events: [] },
  Februari: { count: 1, tentative: 0, events: [months[5].events[0]] },
  Maret: { count: 1, tentative: 1, events: [months[6].events[2]] },
  April: { count: 1, tentative: 0, events: [months[7].events[0]] },
  Mei: { count: 0, tentative: 0, events: [] },
  Juni: { count: 1, tentative: 0, events: [months[9].events[0]] },
  Juli: { count: 0, tentative: 0, events: [] },
  Agustus: { count: 0, tentative: 0, events: [] },
}

export const roomStatus = {
  planned: { label: 'Rencana', tone: 'info', detail: 'Belum diajukan ke kampus' },
  pending: { label: 'Menunggu keputusan', tone: 'warning', detail: 'Menurut pembaruan PIC' },
  approved: { label: 'Disetujui', tone: 'success', detail: 'Dilaporkan oleh PIC' },
  rejected: { label: 'Ditolak', tone: 'danger', detail: 'Dilaporkan oleh PIC' },
  cancelled: { label: 'Dibatalkan', tone: 'neutral', detail: 'Dibatalkan pada contoh skenario' },
} as const
