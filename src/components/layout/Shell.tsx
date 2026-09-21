import { useLocation } from 'react-router-dom'
import { CardBackground } from '@/components/card/CardBackground'
import { SiteHeader } from '@/components/card/SiteHeader'
import { CardNav } from '@/components/card/CardNav'
import { CardFooter } from '@/components/card/CardFooter'
import { CardLoader } from '@/components/card/CardLoader'

interface ShellProps {
  children: React.ReactNode
}

export function Shell({ children }: ShellProps) {
  const location = useLocation()

  return (
    <div className="relative flex min-h-screen flex-col">
      <CardLoader />
      <CardBackground />

      <div className="relative z-10">
        <div className="tm-top-container">
          <SiteHeader />
          <CardNav />
        </div>

        <main
          key={`${location.pathname}${location.search}`}
          className="animate-card-fade relative flex-1 pb-32"
        >
          {children}
        </main>

        <CardFooter />
      </div>
    </div>
  )
}