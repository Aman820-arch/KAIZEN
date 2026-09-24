export default function PagePlaceholder({ eyebrow, title, children }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
      {eyebrow ? (
        <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-stone">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-4 max-w-2xl text-5xl text-ink md:text-6xl">{title}</h1>
      {children ? (
        <div className="mt-8 max-w-xl text-base text-stone">{children}</div>
      ) : null}
    </section>
  )
}
