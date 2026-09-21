import * as React from 'react'
import { cn } from '@/lib/utils'

export function CardLoader() {
  const [done, setDone] = React.useState(false)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageKey = 'rccswebcomp-card-loaded'
      if (sessionStorage.getItem(storageKey)) {
        setDone(true)
        return
      }
      const finish = () => {
        sessionStorage.setItem(storageKey, '1')
        setDone(true)
      }
      const timeout = window.setTimeout(finish, 1500)
      window.addEventListener('load', finish)
      return () => {
        window.clearTimeout(timeout)
        window.removeEventListener('load', finish)
      }
    }
  }, [])

  if (done) return null

  return (
    <div className={cn('card-loader', done && 'card-loader--done')} aria-hidden>
      <div className="card-loader-ring" />
    </div>
  )
}