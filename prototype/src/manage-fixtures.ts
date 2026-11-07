import { reviewPrograms } from './timeline-scenarios.ts'
import { usageExamples } from './room-fixtures.ts'
import type { RoomUsage } from './room-fixtures.ts'

export type AccountPreview = 'public' | 'active' | 'unverified' | 'revoked' | 'bem'
export const managedPrograms = [
  { program: reviewPrograms.closure, editable: true },
  { program: reviewPrograms.revised, editable: true },
  { program: reviewPrograms.partial, editable: false },
  { program: reviewPrograms.cross, editable: false },
]
export const managedUsages: {
  usage: RoomUsage
  confirmable: boolean
  reportable: boolean
  cancellable: boolean
  deadline: string
}[] = [
  {
    usage: { ...usageExamples[1], draft: { start: '2026-11-18T13:00', end: '2026-11-18T15:00' } },
    confirmable: true,
    reportable: true,
    cancellable: true,
    deadline: 'Konfirmasi sebelum 23 November 2026 · 09.30',
  },
  {
    usage: { ...usageExamples[3], draft: { start: '2026-11-21T08:00', end: '2026-11-21T12:00' } },
    confirmable: false,
    reportable: false,
    cancellable: true,
    deadline: 'Izin disetujui tidak mengikuti kedaluwarsa 7 hari',
  },
  {
    usage: { ...usageExamples[5], draft: { start: '2026-11-24T13:00', end: '2026-11-24T15:00' } },
    confirmable: true,
    reportable: true,
    cancellable: true,
    deadline: 'Konfirmasi sebelum 27 November 2026 · 10.00',
  },
  {
    usage: {
      id: 'hima-expired',
      title: 'Koordinasi persiapan semester',
      room: 'rapat',
      org: 'hima',
      day: 'Jumat, 27 November',
      date: '27 November 2026',
      time: '09.00–11.00',
      status: 'cancelled',
      updated: '18 November 2026 · 10.00',
      note: 'Dibatalkan karena tidak diperbarui selama 7 hari. Buat rencana baru jika masih diperlukan.',
    },
    confirmable: false,
    reportable: false,
    cancellable: false,
    deadline: 'Batas konfirmasi terlewati · catatan tidak dipulihkan',
  },
]
export const managedHistory = [
  {
    date: '19 November 2026 · 14.00',
    actor: 'BEM Contoh',
    title: 'Informasi aula tidak tersedia',
    detail:
      'Pemakaian sesi 2 Lokakarya tiga sesi perlu penyesuaian. Status izin lama tetap tercatat.',
  },
  {
    date: '18 November 2026 · 10.00',
    actor: 'Sistem · skenario contoh',
    title: 'Rencana dibatalkan karena kedaluwarsa',
    detail: 'Koordinasi persiapan semester tidak diperbarui selama 7 hari.',
  },
  {
    date: '16 November 2026 · 09.30',
    actor: 'Akun resmi Hima A Contoh',
    title: 'Laporan izin masuk peninjauan',
    detail: 'Koordinasi panitia tetap berstatus menunggu keputusan selama klarifikasi berlangsung.',
  },
  {
    date: '12 November 2026 · 11.00',
    actor: 'Akun resmi Hima A Contoh',
    title: 'Jadwal pengabdian direvisi',
    detail: 'Pelaksanaan berpindah ke 12 Desember. Awal pengerjaan tetap dipertahankan.',
  },
]
