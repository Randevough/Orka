import type { OrgId } from './components/Organizations'
import type { RoomUsage } from './room-fixtures'
import { usageExamples } from './room-fixtures.ts'

export type PlatformOrg = {
  id: OrgId
  name: string
  email: string
  status: 'pending' | 'active' | 'revoked'
  updated: string
  consent: boolean
}
export const platformOrganizations: PlatformOrg[] = [
  {
    id: 'himab',
    name: 'Hima B Contoh',
    email: 'hima-b@akun.invalid',
    status: 'pending',
    updated: '19 November 2026 · 09.00',
    consent: false,
  },
  {
    id: 'art',
    name: 'UKM Seni Contoh',
    email: 'seni@akun.invalid',
    status: 'pending',
    updated: '18 November 2026 · 15.30',
    consent: false,
  },
  {
    id: 'hima',
    name: 'Hima A Contoh',
    email: 'hima-a@akun.invalid',
    status: 'active',
    updated: '15 November 2026 · 10.00',
    consent: true,
  },
  {
    id: 'bem',
    name: 'BEM Contoh',
    email: 'bem@akun.invalid',
    status: 'active',
    updated: '12 November 2026 · 09.00',
    consent: true,
  },
  {
    id: 'sport',
    name: 'UKM Olahraga Contoh',
    email: 'olahraga@akun.invalid',
    status: 'revoked',
    updated: '17 November 2026 · 11.00',
    consent: false,
  },
]
export const accountStatus = {
  pending: { label: 'Menunggu verifikasi', tone: 'warning' },
  active: { label: 'Akun terverifikasi', tone: 'success' },
  revoked: { label: 'Akses dicabut', tone: 'danger' },
}
// Indeks filter disiapkan untuk review, bukan query ke direktori akun.
export const organizationViews: Record<string, number[]> = {
  all: [0, 1, 2, 3, 4],
  pending: [0, 1],
  active: [2, 3],
  revoked: [4],
}
export type PlatformRoom = {
  id: string
  name: string
  location: string
  active: boolean
  closure?: string
}
export const platformRooms: PlatformRoom[] = [
  {
    id: 'aula',
    name: 'Aula Contoh',
    location: 'Gedung utama contoh',
    active: true,
    closure: '20–22 November 2026 · perawatan',
  },
  { id: 'rapat', name: 'Ruang Rapat Contoh', location: 'Gedung organisasi contoh', active: true },
  { id: 'studio', name: 'Studio Contoh', location: 'Gedung kegiatan contoh', active: false },
]
export type PlatformPeriod = {
  id: string
  name: string
  start: string
  end: string
  status: 'active' | 'draft' | 'archived'
}
export const platformPeriods: PlatformPeriod[] = [
  { id: '2026', name: '2026 / 2027', start: '2026-09', end: '2027-08', status: 'active' },
  { id: '2027', name: '2027 / 2028', start: '2027-09', end: '2028-08', status: 'draft' },
  { id: '2025', name: '2025 / 2026', start: '2025-09', end: '2026-08', status: 'archived' },
]
export const disputeUsages: RoomUsage[] = [
  usageExamples[1],
  {
    id: 'bem-dispute-example',
    title: 'Koordinasi forum bersama',
    room: 'rapat',
    org: 'bem',
    day: 'Rabu, 18 November',
    date: '18 November 2026',
    time: '13.00–15.00',
    status: 'approved',
    updated: '16 November 2026 · 08.30',
  },
]
export const archivedPrograms = [
  { name: 'Forum awal kepengurusan', owner: 'BEM Contoh', when: '12 Oktober 2025 · 09.00–12.00' },
  {
    name: 'Kelas berbagi mahasiswa',
    owner: 'Hima A Contoh',
    when: '14 Februari 2026 · 13.00–16.00',
  },
]
export const archivedUsages = [
  {
    name: 'Aula Contoh · Forum awal kepengurusan',
    owner: 'BEM Contoh',
    when: '12 Oktober 2025 · 08.00–13.00',
    status: 'Disetujui · laporan PIC pada periode tersebut',
  },
]
export const platformHistory = [
  {
    date: '19 November 2026 · 14.00',
    actor: 'Akun pengelola BEM Contoh',
    title: 'Informasi penutupan aula dicatat',
    detail:
      'Dua pemakaian pada 20–22 November perlu ditindaklanjuti PIC. Status izin tidak otomatis diubah.',
  },
  {
    date: '19 November 2026 · 09.00',
    actor: 'Akun resmi Hima B Contoh',
    title: 'Akun resmi menunggu verifikasi',
    detail: 'Belum memperoleh hak pengelolaan ormawa.',
  },
  {
    date: '17 November 2026 · 11.00',
    actor: 'Akun pengelola BEM Contoh',
    title: 'Akses akun ormawa dicabut',
    detail: 'Catatan UKM Olahraga Contoh tetap dipertahankan.',
  },
  {
    date: '16 November 2026 · 09.30',
    actor: 'Akun resmi Hima A Contoh',
    title: 'Laporan izin bertentangan diterima',
    detail: 'Status sebelumnya dipertahankan sambil menunggu klarifikasi kampus.',
  },
]
