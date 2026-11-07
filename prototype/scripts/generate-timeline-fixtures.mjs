// Authoring only: hasil statis diimpor UI; tidak dijalankan di browser.
import { writeFile } from 'node:fs/promises'
import { months } from '../src/fixtures.ts'
import { calendarFixtures } from '../src/calendar-fixtures.ts'

const orgs = {
  'BEM Contoh': ['bem'],
  'Hima A Contoh': ['hima'],
  'Hima B Contoh': ['himab'],
  'UKM Seni Contoh': ['art'],
  'UKM Olahraga Contoh': ['sport'],
  'Hima A Contoh + UKM Seni Contoh': ['hima', 'art'],
  'BEM Contoh + Hima A Contoh': ['bem', 'hima'],
}
// Awal/akhir bulan pengerjaan adalah pilihan skenario visual, bukan perkiraan dari jadwal.
const spans = {
  'Temu awal kepengurusan': [0, 0],
  'Ruang berbagi mahasiswa': [0, 0],
  'Pekan perkenalan komunitas': null,
  'Forum lintas ormawa': [0, 1],
  'Lokakarya ide kreatif': [0, 2],
  'Panggung kecil kampus': [0, 1],
  'Bincang karya dan kolaborasi': [1, 1],
  'Gerak bersama': [1, 1],
  'Ruang karya bersama': [0, 2],
  'Temu komunitas': [1, 1],
  'Malam apresiasi': [1, 1],
  'Kelas desain bersama': [1, 2],
  'Dialog mahasiswa': null,
  'Refleksi akhir semester': [2, 3],
  'Temu semester baru': [4, 5],
  'Jelajah komunitas': [4, 5],
  'Ruang aspirasi': [5, 6],
  'Studio terbuka': [5, 6],
  'Kelas pengembangan diri': null,
  'Kolaborasi untuk sekitar': [4, 7],
  'Pameran karya mahasiswa': [5, 7],
  'Pekan ekspresi': [6, 8],
  'Diskusi akhir semester': [8, 9],
  'Forum evaluasi bersama': [8, 9],
  'Persiapan periode berikutnya': [10, 11],
}
const programs = []
for (const month of months)
  for (const event of month.events) {
    if (programs.some((p) => p.name === event.name)) continue
    const span = spans[event.name]
    const occurrences = []
    for (const m of months) {
      const fixture = calendarFixtures[`2026/2027/${m.name}/all`]
      for (const occurrence of [...fixture.events, ...fixture.tentative]) {
        if (
          occurrence.name === event.name &&
          !occurrences.some((o) => o.when === occurrence.when)
        ) {
          occurrences.push({
            when: occurrence.when,
            status: occurrence.tentative ? 'Tanggal belum ditentukan' : 'Terjadwal',
            tone: occurrence.tentative ? 'info' : 'neutral',
          })
        }
      }
    }
    programs.push({
      id: `program-${programs.length}`,
      name: event.name,
      orgIds: orgs[event.org],
      work: span
        ? `${months[span[0]].name} ${months[span[0]].year} – ${months[span[1]].name} ${months[span[1]].year}`
        : 'Timeline belum diisi',
      precision: span ? 'Perkiraan bulan' : 'Belum diisi',
      column: span ? span[0] + 1 : null,
      width: span ? span[1] - span[0] + 1 : 0,
      status: 'Aktif',
      tone: 'neutral',
      openEnd: false,
      before: false,
      after: false,
      markers: months.flatMap((m, index) =>
        m.events.some((e) => e.name === event.name)
          ? [
              {
                column: index + 1,
                label: `${m.name} ${m.year}`,
                tentative: m.events.some((e) => e.name === event.name && e.tentative),
              },
            ]
          : [],
      ),
      draft: {
        start: span ? `${months[span[0]].name} ${months[span[0]].year}` : '',
        end: span ? `${months[span[1]].name} ${months[span[1]].year}` : '',
        execution: occurrences[0]?.when ?? '',
      },
      occurrences,
      rooms: [],
      history: ['Rencana kegiatan dicatat oleh akun ormawa.'],
    })
  }
const sourceSets = { all: programs, hima: programs.filter((p) => p.orgIds.includes('hima')) }
const summary = {}
for (const [key, entries] of Object.entries(sourceSets)) {
  summary[key] = months.map((m, index) => {
    const work = entries.filter(
      (p) => p.column !== null && index >= p.column - 1 && index < p.column - 1 + p.width,
    )
    const execution = m.events.filter((e) => entries.some((p) => p.name === e.name))
    return {
      work: work.length,
      orgIds: [
        ...new Set([...work.flatMap((p) => p.orgIds), ...execution.flatMap((e) => orgs[e.org])]),
      ],
    }
  })
}
const data = `// Fixture fiktif statis. Dibuat oleh scripts/generate-timeline-fixtures.mjs, bukan mesin kalender browser.\nimport type { ProgramDetail, TimelineSummary } from './timeline-types'\nexport const timelinePrograms: Record<string, ProgramDetail[]> = ${JSON.stringify(sourceSets, null, 2)}\nexport const timelineSummary: Record<string, TimelineSummary[]> = ${JSON.stringify(summary, null, 2)}\nexport const missingTimelines: Record<string, number> = ${JSON.stringify(Object.fromEntries(Object.entries(sourceSets).map(([key, entries]) => [key, entries.filter((p) => p.column === null).length])))}\n`
await writeFile(new URL('../src/timeline-fixtures.ts', import.meta.url), data)
console.log('Fixture timeline tersimpan.')
