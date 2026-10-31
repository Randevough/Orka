// Authoring only: build static visual fixtures, never imported into the browser.
import { writeFile } from 'node:fs/promises'
import { months, himaScenario } from '../src/fixtures.ts'

const organizations = {
  'BEM Contoh': ['bem'],
  'Hima A Contoh': ['hima'],
  'Hima B Contoh': ['himab'],
  'UKM Seni Contoh': ['art'],
  'UKM Olahraga Contoh': ['sport'],
  'Hima A Contoh + UKM Seni Contoh': ['hima', 'art'],
  'BEM Contoh + Hima A Contoh': ['bem', 'hima'],
}
const ranges = {
  'Forum lintas ormawa': [[10, 13]],
  'Lokakarya ide kreatif': [
    [17, 19],
    [24, 24],
  ],
  'Ruang karya bersama': [[30, 33]],
  'Malam apresiasi': [[18, 18]], // End exactly at midnight: Oct 19 stays unpainted.
}
const output = {}
for (const period of ['2026/2027', '2025/2026']) {
  for (let i = 0; i < months.length; i++) {
    const source = months[i]
    const year = Number(period.slice(0, 4)) + (i < 4 ? 0 : 1)
    const month = (i + 8) % 12
    const offset = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7
    const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
    const weeks = Math.ceil((offset + days) / 7)
    const cells = Array.from({ length: weeks * 7 }, (_, n) => {
      const date = new Date(Date.UTC(year, month, n - offset + 1))
      return {
        day: date.getUTCDate(),
        outside: date.getUTCMonth() !== month,
        label: `${date.getUTCDate()} ${date.toLocaleString('id-ID', { month: 'long', timeZone: 'UTC' })} ${date.getUTCFullYear()}`,
        events: [],
      }
    })
    for (const filter of ['all', 'hima', 'empty']) {
      const events =
        period === '2025/2026' || filter === 'empty'
          ? []
          : filter === 'hima'
            ? himaScenario[source.name].events
            : source.events
      const occurrences = []
      const tentative = []
      const segments = []
      for (const event of events) {
        const orgIds = organizations[event.org]
        if (event.tentative) {
          tentative.push({ ...event, orgIds })
          continue
        }
        const eventRanges =
          source.name === 'November' && event.name === 'Ruang karya bersama'
            ? [[-1, 2]]
            : (ranges[event.name] ?? [
                [Number(event.when.match(/^\d+/)[0]), Number(event.when.match(/^\d+/)[0])],
              ])
        for (let occurrenceIndex = 0; occurrenceIndex < eventRanges.length; occurrenceIndex++) {
          const [from, to] = eventRanges[occurrenceIndex]
          const occurrence = {
            ...event,
            when: occurrenceIndex ? '24 Okt · 13.00–16.00 (jadwal kedua)' : event.when,
            orgIds,
            id: `${event.name}-${occurrenceIndex}`,
            fromPrevious: from < 1,
            toNext: to > days,
          }
          const eventIndex = occurrences.push(occurrence) - 1
          for (let day = Math.max(1, from); day <= Math.min(days, to); day++)
            cells[offset + day - 1].events.push(eventIndex)
          for (let week = 0; week < weeks; week++) {
            const start = Math.max(offset + Math.max(1, from) - 1, week * 7)
            const end = Math.min(offset + Math.min(days, to) - 1, week * 7 + 6)
            if (start > end) continue
            let lane = 0
            while (
              segments.some(
                (s) =>
                  s.week === week && s.lane === lane && !(end % 7 < s.start || start % 7 > s.end),
              )
            )
              lane++
            segments.push({
              event: eventIndex,
              week,
              lane,
              start: start % 7,
              end: end % 7,
              continuesBefore: start > offset + from - 1,
              continuesAfter: end < offset + to - 1,
            })
          }
        }
      }
      const dayCopies = cells.map((c) => ({ ...c, events: [] }))
      // Precompute day lists for this filter; no date calculation is shipped to the UI.
      for (const segment of segments)
        for (let column = segment.start; column <= segment.end; column++) {
          const c = dayCopies[segment.week * 7 + column]
          if (!c.events.includes(segment.event)) c.events.push(segment.event)
        }
      const overflow = []
      for (let week = 0; week < weeks; week++)
        for (let column = 0; column < 7; column++) {
          const hidden = segments.filter(
            (s) => s.week === week && s.start <= column && s.end >= column && s.lane >= 3,
          )
          if (hidden.length)
            overflow.push({ week, column, count: hidden.length, dayIndex: week * 7 + column })
        }
      output[`${period}/${source.name}/${filter}`] = {
        cells: dayCopies,
        weeks,
        events: occurrences,
        tentative,
        segments,
        overflow,
      }
    }
  }
}
await writeFile(
  new URL('../src/calendar-fixtures.ts', import.meta.url),
  `// Static visual scenarios. Generated offline; no runtime date or scheduling logic.\nimport type { CalendarFixture } from './features/MonthCalendar'\nexport const calendarFixtures: Record<string, CalendarFixture> = ${JSON.stringify(output, null, 2)}\n`,
)
