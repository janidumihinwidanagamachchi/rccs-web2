import * as React from 'react'
import { cn } from '@/lib/utils'

const PHOTOS = [
  'card/photo-02.jpg',
  'card/photo-03.jpg',
  'card/photo-04.jpg',
  'card/photo-05.jpg',
]
const HOLD_MS = 8000

const base = import.meta.env.BASE_URL

export function CardBackground() {
  const [active, setActive] = React.useState(0)
  const reduced = React.useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  React.useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % PHOTOS.length)
    }, HOLD_MS)
    return () => window.clearInterval(id)
  }, [reduced])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {PHOTOS.map((photo, i) => (
        <div
          key={photo}
          className={cn(
            'absolute inset-0 bg-cover bg-center transition-opacity ease-in-out duration-[2000ms]',
            i === active ? 'opacity-100' : 'opacity-0'
          )}
          style={{ backgroundImage: `url(${base}${photo})` }}
        />
      ))}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  )
}