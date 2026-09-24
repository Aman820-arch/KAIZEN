const LABELS = {
  movement: 'Movement',
  case: 'Case',
  diameter: 'Diameter',
  thickness: 'Thickness',
  waterResistance: 'Water resistance',
  crystal: 'Crystal',
  strap: 'Strap',
}

export default function SpecList({ specs, caliber }) {
  const rows = Object.entries(specs)

  return (
    <dl className="divide-y divide-line border-y border-line">
      {caliber ? (
        <div className="flex items-baseline justify-between gap-6 py-3.5">
          <dt className="text-[13px] text-stone">Caliber</dt>
          <dd className="text-right text-[13px] text-ink">{caliber}</dd>
        </div>
      ) : null}
      {rows.map(([key, value]) => (
        <div key={key} className="flex items-baseline justify-between gap-6 py-3.5">
          <dt className="text-[13px] text-stone">{LABELS[key] ?? key}</dt>
          <dd className="text-right text-[13px] text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
