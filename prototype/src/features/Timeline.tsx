import { Badge, Icon } from '../components/ui'
import { OrgStack, organizations } from '../components/Organizations'
import { months } from '../fixtures'
import { timelinePrograms, missingTimelines } from '../timeline-fixtures'
import type { ProgramDetail } from '../timeline-types'

export function Timeline({
  filter,
  empty,
  onOpen,
}: {
  filter: string
  empty: boolean
  onOpen: (program: ProgramDetail) => void
}) {
  const programs = empty ? [] : timelinePrograms[filter]
  return (
    <div className="timeline-view">
      <div className="timeline-intro">
        <div>
          <h2>Dari persiapan sampai selesai.</h2>
          <p>Rentang pengerjaan berbeda dari jadwal pelaksanaan.</p>
        </div>
        <span className="timeline-key">
          <span /> Pengerjaan <Icon name="calendar" /> Pelaksanaan
        </span>
      </div>
      {!programs.length ? (
        <div className="page-state">
          <Icon name="calendar" />
          <h2>Belum ada timeline tercatat</h2>
          <p>Pilih periode atau ormawa lain untuk melihat rencana pengerjaan.</p>
        </div>
      ) : (
        <>
          <div
            className="timeline-scroll"
            tabIndex={0}
            role="region"
            aria-label="Timeline pengerjaan, geser horizontal untuk melihat seluruh bulan"
          >
            <div className="timeline-table" role="table" aria-label="Pengerjaan proker per bulan">
              <div className="timeline-header" role="row">
                <span role="columnheader">Proker & penyelenggara</span>
                <div className="timeline-months">
                  {months.map((m) => (
                    <span role="columnheader" key={m.name}>
                      {m.name.slice(0, 3)}
                      <small>{m.year}</small>
                    </span>
                  ))}
                </div>
              </div>
              {programs.map((p) => (
                <div
                  className={`timeline-row org-${organizations[p.orgIds[0]].color}`}
                  role="row"
                  key={p.id}
                >
                  <div className="timeline-identity" role="cell">
                    <button onClick={() => onOpen(p)}>
                      <strong>{p.name}</strong>
                      <span>
                        <OrgStack ids={p.orgIds} />
                        {organizations[p.orgIds[0]].name}
                      </span>
                    </button>
                  </div>
                  <div className="timeline-track" role="cell">
                    {p.column !== null ? (
                      <button
                        className="timeline-bar"
                        style={{ gridColumn: `${p.column} / span ${p.width}` }}
                        onClick={() => onOpen(p)}
                        aria-label={`${p.name}. Pengerjaan ${p.work}. ${p.precision}. Buka detail.`}
                      >
                        <span>{p.work}</span>
                      </button>
                    ) : (
                      <button className="timeline-unknown" onClick={() => onOpen(p)}>
                        Timeline belum diisi <Icon name="arrow" />
                      </button>
                    )}
                    {p.markers?.map((marker) => (
                      <button
                        key={marker.column}
                        className={`execution-marker ${marker.tentative ? 'is-tentative' : ''}`}
                        style={{ gridColumn: marker.column }}
                        onClick={() => onOpen(p)}
                        aria-label={`${p.name}, pelaksanaan ${marker.label}${marker.tentative ? ', tanggal belum ditentukan' : ''}. Buka detail.`}
                      >
                        <Icon name={marker.tentative ? 'clock' : 'calendar'} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="timeline-mobile">
            {programs.map((p) => (
              <button className="timeline-mobile-card" key={p.id} onClick={() => onOpen(p)}>
                <span className="timeline-mobile-top">
                  <OrgStack ids={p.orgIds} />
                  <Icon name="chevron" />
                </span>
                <strong>{p.name}</strong>
                <span>{p.work}</span>
                <Badge tone={p.column === null ? 'warning' : 'neutral'}>{p.precision}</Badge>
                <small>Pelaksanaan: {p.occurrences[0]?.when}</small>
              </button>
            ))}
          </div>
          <div className="timeline-footnote">
            <Icon name="info" />
            <p>
              <strong>{missingTimelines[filter]} proker belum mengisi timeline.</strong> Rentang
              pengerjaan tidak disimpulkan dari tanggal pelaksanaan. Buka proker untuk melihat
              seluruh sesi.
            </p>
          </div>
        </>
      )}
    </div>
  )
}
