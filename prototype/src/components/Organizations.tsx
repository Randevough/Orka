import { useState } from 'react'

export const organizations = {
  bem: { name: 'BEM Contoh', initials: 'BM', color: 'blue', logo: '/logos/bem.svg' },
  hima: { name: 'Hima A Contoh', initials: 'HA', color: 'violet', logo: '/logos/hima.svg' },
  himab: { name: 'Hima B Contoh', initials: 'HB', color: 'rose', logo: '/logos/himab.svg' },
  sport: { name: 'UKM Olahraga Contoh', initials: 'OR', color: 'ochre', logo: '/logos/sport.svg' },
  art: { name: 'UKM Seni Contoh', initials: 'SN', color: 'teal', logo: '/logos/art.svg' },
} as const
export type OrgId = keyof typeof organizations

export const eventOrganizations: Record<string, OrgId[]> = {
  'BEM Contoh': ['bem'],
  'Hima A Contoh': ['hima'],
  'Hima B Contoh': ['himab'],
  'UKM Seni Contoh': ['art'],
  'UKM Olahraga Contoh': ['sport'],
  'Hima A Contoh + UKM Seni Contoh': ['hima', 'art'],
  'BEM Contoh + Hima A Contoh': ['bem', 'hima'],
}

export const monthOrganizations: OrgId[][] = [
  ['bem', 'hima', 'art'],
  ['bem', 'hima', 'himab', 'sport', 'art'],
  ['bem', 'himab', 'art'],
  ['bem'],
  [],
  ['hima', 'art'],
  ['bem', 'hima', 'art'],
  ['bem', 'hima', 'art'],
  ['art'],
  ['bem', 'hima'],
  [],
  ['bem'],
]
export const filteredMonthOrganizations: OrgId[][] = [
  ['hima'],
  ['hima', 'art'],
  [],
  [],
  [],
  ['hima'],
  ['hima'],
  ['bem', 'hima'],
  [],
  ['hima'],
  [],
  [],
]

export function OrgLogo({
  id,
  label = false,
  forceFallback = false,
}: {
  id: OrgId
  label?: boolean
  forceFallback?: boolean
}) {
  const org = organizations[id]
  const [failed, setFailed] = useState(false)
  return (
    <span
      className={`org-logo org-${org.color}`}
      role={label ? 'img' : undefined}
      aria-label={label ? `${org.name}, logo contoh` : undefined}
      aria-hidden={label ? undefined : true}
    >
      {forceFallback || failed ? (
        <span>{org.initials}</span>
      ) : (
        <img src={org.logo} alt="" onError={() => setFailed(true)} />
      )}
    </span>
  )
}

export function OrgStack({
  ids,
  limit = 4,
  fallback = false,
}: {
  ids: OrgId[]
  limit?: number
  fallback?: boolean
}) {
  if (!ids.length) return null
  return (
    <span
      className="org-stack"
      role="img"
      aria-label={`Penyelenggara contoh: ${ids.map((id) => organizations[id].name).join(', ')}`}
    >
      {ids.slice(0, limit).map((id) => (
        <OrgLogo key={id} id={id} forceFallback={fallback} />
      ))}
      {ids.length > limit && (
        <span className="org-overflow" aria-hidden="true">
          +{ids.length - limit}
        </span>
      )}
    </span>
  )
}
