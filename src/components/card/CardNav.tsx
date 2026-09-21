import * as React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { cn } from '@/lib/utils'

const PUBLIC_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Events', to: '/events' },
  { label: 'Sports', to: '/sports' },
  { label: 'Calendar', to: '/calendar' },
  { label: 'Announcements', to: '/announcements' },
]

export function CardNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAdmin, signOut } = useAuthStore()
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  React.useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  const links = [...PUBLIC_LINKS]

  const handleSignOut = async () => {
    setOpen(false)
    await signOut()
    navigate('/')
  }

  return (
    <nav ref={ref} className="tm-nav">
      <button
        type="button"
        className="tm-navbar-menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        Menu
      </button>
      <ul className={cn('tm-nav-links', open && 'tm-nav-links--open')}>
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className={cn(isActive(link.to) && 'active')}>
              {link.label}
            </Link>
          </li>
        ))}
        {user && (
          <>
            <li>
              <Link to="/tickets" className={cn(isActive('/tickets') && 'active')}>
                My Tickets
              </Link>
            </li>
            <li>
              <Link to="/passport" className={cn(isActive('/passport') && 'active')}>
                Passport
              </Link>
            </li>
          </>
        )}
        {user && isAdmin && (
          <li>
            <Link to="/admin" className={cn(isActive('/admin') && 'active')}>
              Admin
            </Link>
          </li>
        )}
        {user ? (
          <li>
            <button type="button" className="tm-nav-action" onClick={handleSignOut}>
              Sign Out
            </button>
          </li>
        ) : (
          <li>
            <Link to="/auth/login" className={cn(isActive('/auth/login') && 'active')}>
              Sign In
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}