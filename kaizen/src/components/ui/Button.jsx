import { cn } from '../../lib/cn'

const variants = {
  primary:
    'bg-ink text-ivory hover:bg-sage',
  outline:
    'border border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-ivory',
  ghost:
    'bg-transparent text-ink hover:text-sage',
}

const sizes = {
  sm: 'px-5 py-2.5 text-[11px]',
  md: 'px-7 py-3.5 text-[12px]',
}

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className,
  children,
  type,
  ...props
}) {
  return (
    <Component
      type={Component === 'button' ? type ?? 'button' : type}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-sans font-medium tracking-[0.18em] uppercase transition-colors duration-300 ease-editorial disabled:pointer-events-none disabled:opacity-40',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
