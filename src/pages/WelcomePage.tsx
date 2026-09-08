import { useEffect, useState } from 'react'

interface WelcomePageProps {
  onEnter: () => void
}

export function WelcomePage({ onEnter }: WelcomePageProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="flex min-h-svh flex-col items-center justify-between bg-ink px-8 py-16 text-paper">
      <div />

      <div className="flex flex-col items-center gap-10 text-center">
        <h1
          className={`font-display text-7xl leading-none transition-all duration-700 ease-out motion-reduce:transition-none ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
        >
          Wardrobe
        </h1>

        <div
          className={`relative h-28 w-40 transition-all delay-150 duration-700 ease-out motion-reduce:transition-none ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
          aria-hidden="true"
        >
          <div className="absolute top-0 left-0 h-24 w-16 -rotate-4 border border-paper/25" />
          <div className="absolute top-2 left-12 h-28 w-20 rotate-3 border border-paper/50" />
          <div className="absolute bottom-0 left-6 h-16 w-14 -rotate-2 border border-paper/35" />
        </div>

        <p
          className={`max-w-[24ch] text-sm text-paper/70 transition-all delay-300 duration-700 ease-out motion-reduce:transition-none ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
        >
          Your wardrobe, kept — every piece, every look, in one quiet place.
        </p>
      </div>

      <button
        type="button"
        onClick={onEnter}
        className={`group flex items-center gap-2 border-b border-paper/40 pb-1 text-sm font-medium tracking-[0.2em] text-paper uppercase transition-all delay-500 duration-700 ease-out hover:border-paper motion-reduce:transition-none ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}
      >
        Enter
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
          →
        </span>
      </button>
    </div>
  )
}
