import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { months, himaScenario } from '../src/fixtures.ts'
import { calendarFixtures } from '../src/calendar-fixtures.ts'
import { timelinePrograms, timelineSummary, missingTimelines } from '../src/timeline-fixtures.ts'
import { reviewPrograms } from '../src/timeline-scenarios.ts'

// Konsistensi antarfixture: indikator tidak boleh bertentangan dengan sesi/identitas proker.
for (const [filter, programs] of Object.entries(timelinePrograms)) {
  assert.equal(new Set(programs.map((p) => p.name)).size, programs.length)
  assert.equal(missingTimelines[filter], programs.filter((p) => p.column === null).length)
  assert.equal(timelineSummary[filter].length, 12)
  if (filter === 'hima') assert.ok(programs.every((p) => p.orgIds.includes('hima')))
  for (const p of programs) {
    assert.ok(p.occurrences.length > 0)
    for (const marker of p.markers ?? []) {
      assert.ok(marker.column >= 1 && marker.column <= 12)
      if (p.column !== null)
        assert.ok(
          marker.column >= p.column && marker.column < p.column + p.width,
          `${p.name}: pelaksanaan harus tercakup pengerjaan`,
        )
    }
  }
  for (let i = 0; i < 12; i++) {
    const working = programs.filter(
      (p) => p.column !== null && i + 1 >= p.column && i + 1 < p.column + p.width,
    )
    assert.equal(timelineSummary[filter][i].work, working.length)
    for (const p of working)
      assert.ok(p.orgIds.every((id) => timelineSummary[filter][i].orgIds.includes(id)))
  }
}
assert.equal(reviewPrograms.postponed.openEnd, true)
assert.ok(reviewPrograms.postponed.rooms.every((r) => r.status === 'Dibatalkan'))
assert.equal(reviewPrograms.partial.occurrences.filter((s) => s.status === 'Terlaksana').length, 2)
assert.equal(reviewPrograms.partial.occurrences.filter((s) => s.status === 'Dibatalkan').length, 2)
assert.ok(reviewPrograms.partial.rooms.some((r) => r.status === 'Disetujui · riwayat'))

const october = calendarFixtures['2026/2027/Oktober/all']
assert.equal(october.cells.find((day) => day.day === 18 && !day.outside).events.length, 5)
assert.equal(october.overflow.find((item) => october.cells[item.dayIndex].day === 18).count, 2)
const night = october.events.findIndex((event) => event.name === 'Malam apresiasi')
assert.ok(
  !october.cells.find((day) => day.day === 19 && !day.outside).events.includes(night),
  'Akhir tengah malam tidak mewarnai tanggal berikutnya',
)
assert.equal(
  october.events.filter((event) => event.name === 'Lokakarya ide kreatif').length,
  2,
  'Jadwal terpisah tetap terpisah',
)
assert.ok(october.segments.some((segment) => segment.continuesAfter))
assert.ok(calendarFixtures['2026/2027/November/all'].events.some((event) => event.fromPrevious))
for (const fixture of Object.values(calendarFixtures)) {
  assert.equal(fixture.cells.length, fixture.weeks * 7)
  assert.ok(fixture.events.every((event) => !event.tentative))
  assert.ok(fixture.tentative.every((event) => event.tentative))
  assert.ok(fixture.cells.every((day) => !day.outside || day.events.length === 0))
  for (const segment of fixture.segments) {
    assert.ok(segment.start >= 0 && segment.end < 7 && segment.start <= segment.end)
    assert.ok(fixture.events[segment.event])
  }
}

assert.equal(months.length, 12, 'Skenario harus mencakup 12 bulan')
assert.equal(new Set(months.map((month) => month.name)).size, 12)
for (const month of months) {
  for (const sample of [month, himaScenario[month.name]]) {
    assert.ok(sample, `Skenario filter ${month.name} tersedia`)
    assert.equal(sample.count, sample.events.length, 'Jumlah contoh harus konsisten')
    assert.equal(sample.tentative, sample.events.filter((event) => event.tentative).length)
  }
}

async function inspect(directory) {
  for (const file of await readdir(directory, { withFileTypes: true })) {
    const path = `${directory}/${file.name}`
    if (file.isDirectory()) await inspect(path)
    else if (/\.(ts|tsx)$/.test(file.name)) {
      const source = await readFile(path, 'utf8')
      assert.doesNotMatch(
        source,
        /\b(fetch|XMLHttpRequest|WebSocket|localStorage|sessionStorage|indexedDB)\b/,
        `Tidak ada akses data di ${path}`,
      )
      assert.doesNotMatch(
        source,
        /@supabase|service.role|new Date\(/i,
        `Tidak ada integrasi/aturan waktu di ${path}`,
      )
    }
  }
}
await inspect(fileURLToPath(new URL('../src', import.meta.url)))

const css = await readFile(new URL('../src/tokens.css', import.meta.url), 'utf8')
const token = (name) => {
  const match = css.match(new RegExp(`--${name}:\\s*(#[a-f0-9]+)`, 'i'))
  assert.ok(match, `Token ${name} tersedia`)
  return match[1]
}
function luminance(hex) {
  const full = hex.length === 4 ? '#' + [...hex.slice(1)].map((c) => c + c).join('') : hex
  const values = full
    .slice(1)
    .match(/../g)
    .map((v) => {
      const channel = parseInt(v, 16) / 255
      return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
    })
  return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722
}
for (const [a, b, minimum] of [
  ['text', 'surface', 4.5],
  ['muted', 'surface', 4.5],
  ['muted', 'page', 4.5],
  ['on-primary', 'primary', 4.5],
  ['on-primary', 'primary-hover', 4.5],
  ['info-text', 'info-bg', 4.5],
  ['warning-text', 'warning-bg', 4.5],
  ['success-text', 'success-bg', 4.5],
  ['danger-text', 'danger-bg', 4.5],
  ['control-border', 'surface', 3],
  ['focus', 'surface', 3],
  ['focus', 'accent-soft', 3],
  ['danger-text', 'surface', 4.5],
  ['text', 'accent-soft', 4.5],
  ['muted', 'accent-soft', 4.5],
]) {
  const one = luminance(token(a)),
    two = luminance(token(b))
  const ratio = (Math.max(one, two) + 0.05) / (Math.min(one, two) + 0.05)
  assert.ok(ratio >= minimum, `${a}/${b}: ${ratio.toFixed(2)} di bawah ${minimum}`)
  console.log(`${a}/${b}: ${ratio.toFixed(2)}:1`)
}
console.log(
  'Lulus: konsistensi skenario, batas prototipe, dan pasangan kontras token. Ini bukan tes keamanan aplikasi.',
)

const revisionCss = await readFile(new URL('../src/revision.css', import.meta.url), 'utf8')
for (const match of revisionCss.matchAll(/\.org-(blue|violet|rose|ochre|teal)\s*\{([^}]+)\}/g)) {
  const background = match[2].match(/--org-bg:\s*(#[a-f0-9]+)/i)[1]
  const foreground = match[2].match(/--org-ink:\s*(#[a-f0-9]+)/i)[1]
  const ratio =
    (Math.max(luminance(background), luminance(foreground)) + 0.05) /
    (Math.min(luminance(background), luminance(foreground)) + 0.05)
  assert.ok(ratio >= 4.5, `Kontras identitas ${match[1]}: ${ratio.toFixed(2)}`)
  console.log(`Ormawa ${match[1]}: ${ratio.toFixed(2)}:1`)
}

// Dataset ruangan dipilih statis; pastikan filter tidak menampilkan catatan yang salah.
const { usageExamples, roomViews } = await import('../src/room-fixtures.ts')
assert.equal(new Set(usageExamples.map((item) => item.id)).size, usageExamples.length)
assert.deepEqual(
  new Set(usageExamples.map((item) => item.status)),
  new Set(['planned', 'pending', 'approved', 'rejected', 'cancelled']),
)
for (const [key, indices] of Object.entries(roomViews)) {
  const [week, room, org] = key.split(':')
  assert.equal(new Set(indices).size, indices.length)
  for (const index of indices) {
    const item = usageExamples[index]
    assert.ok(item, `Catatan tersedia: ${key}/${index}`)
    if (room !== 'all') assert.equal(item.room, room)
    if (org !== 'all') assert.equal(item.org, org)
    assert.equal(index < 5, week === 'week1', 'Rentang contoh tidak bercampur')
  }
}
assert.ok(usageExamples.some((item) => item.adjustment && item.status === 'approved'))
assert.ok(usageExamples.some((item) => item.dispute && item.status === 'pending'))
console.log('Lulus: cakupan status dan konsistensi dataset/filter ruangan statis.')

// Vérifikasi hubungan fixture tampilan PIC; bukan bukti penegakan hak akses.
const { managedPrograms, managedUsages } = await import('../src/manage-fixtures.ts')
assert.equal(new Set(managedPrograms.map((item) => item.program.id)).size, managedPrograms.length)
for (const item of managedPrograms) {
  assert.ok(
    item.program.orgIds.includes('hima'),
    'Daftar PIC hanya memuat milik sendiri/kolaborasi',
  )
  if (item.editable)
    assert.equal(item.program.orgIds[0], 'hima', 'Kolaborator bukan pengelola utama')
}
assert.ok(managedPrograms.some((item) => item.program.orgIds[0] !== 'hima' && !item.editable))
assert.equal(new Set(managedUsages.map((item) => item.usage.id)).size, managedUsages.length)
for (const item of managedUsages) {
  assert.equal(item.usage.org, 'hima')
  if (item.confirmable || item.reportable)
    assert.ok(['planned', 'pending'].includes(item.usage.status))
  if (['rejected', 'cancelled'].includes(item.usage.status)) {
    assert.equal(item.confirmable, false)
    assert.equal(item.reportable, false)
    assert.equal(item.cancellable, false)
  }
}
console.log('Lulus: konsistensi kepemilikan dan tindakan pada fixture PIC.')

// Konsistensi dataset BEM; bukan tes otorisasi atau deteksi bentrokan nyata.
const {
  platformOrganizations,
  organizationViews,
  platformRooms,
  platformPeriods,
  disputeUsages,
  archivedPrograms,
  archivedUsages,
} = await import('../src/platform-fixtures.ts')
assert.equal(
  new Set(platformOrganizations.map((item) => item.id)).size,
  platformOrganizations.length,
)
assert.equal(
  new Set(platformOrganizations.map((item) => item.email)).size,
  platformOrganizations.length,
)
assert.ok(platformOrganizations.every((item) => item.email.endsWith('@akun.invalid')))
for (const [status, indices] of Object.entries(organizationViews)) {
  assert.equal(new Set(indices).size, indices.length)
  for (const index of indices) {
    assert.ok(platformOrganizations[index])
    if (status !== 'all') assert.equal(platformOrganizations[index].status, status)
  }
}
assert.equal(new Set(platformRooms.map((item) => item.id)).size, platformRooms.length)
assert.ok(platformRooms.some((item) => item.id === 'aula' && item.closure))
assert.equal(platformPeriods.filter((item) => item.status === 'active').length, 1)
assert.equal(new Set(platformPeriods.map((item) => item.id)).size, platformPeriods.length)
assert.equal(disputeUsages.length, 2)
assert.notEqual(disputeUsages[0].org, disputeUsages[1].org)
assert.equal(disputeUsages[0].room, disputeUsages[1].room)
assert.equal(disputeUsages[0].date, disputeUsages[1].date)
assert.equal(disputeUsages[0].time, disputeUsages[1].time)
assert.equal(disputeUsages.filter((item) => item.status === 'approved').length, 1)
assert.ok(archivedPrograms.length && archivedUsages.length)
console.log('Lulus: dataset BEM, filter akun, periode, sengketa dan arsip contoh.')
