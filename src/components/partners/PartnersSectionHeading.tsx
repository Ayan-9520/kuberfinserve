export function PartnersSectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  variant = 'dark',
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  center?: boolean
  variant?: 'dark' | 'light'
}) {
  const isLight = variant === 'light'

  return (
    <div className={center ? 'mx-auto max-w-xl text-center' : 'max-w-xl'}>
      {eyebrow && (
        <p
          className={
            isLight
              ? 'text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0D9488]'
              : 'text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--pf-primary)]'
          }
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={
          isLight
            ? 'mt-1.5 font-heading text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl'
            : 'mt-1.5 font-heading text-2xl font-bold tracking-tight text-[var(--pf-text)] md:text-3xl'
        }
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={
            isLight
              ? 'mt-2 text-sm leading-relaxed text-[#64748B]'
              : 'mt-2 text-sm leading-relaxed text-[var(--pf-text-secondary)]'
          }
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
