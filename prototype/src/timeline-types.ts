import type { OrgId } from './components/Organizations'

export type Session = { when: string; status: string; tone: string }
export type ProgramDetail = {
  id: string
  name: string
  orgIds: OrgId[]
  work: string
  precision: string
  column: number | null
  width: number
  status: string
  tone: string
  openEnd: boolean
  before: boolean
  after: boolean
  markers?: { column: number; label: string; tentative: boolean }[]
  draft?: { start: string; end: string; execution: string }
  occurrences: Session[]
  rooms: { name: string; when: string; status: string; tone: string; attention?: boolean }[]
  history: string[]
}
export type TimelineSummary = { work: number; orgIds: OrgId[] }
