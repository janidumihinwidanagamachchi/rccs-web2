import { useSiteSettings } from '@/hooks/useSiteSettings'

export function SiteHeader() {
  const { data: settings } = useSiteSettings()
  const brand = settings?.brand
  const subtitle = brand?.motto || settings?.hero?.subtitle

  return (
    <header className="tm-site-header-box">
      <h1 className="tm-site-title">{brand?.name || 'RCCSWebComp-NC'}</h1>
      {subtitle ? <p className="tm-site-subtitle">{subtitle}</p> : null}
    </header>
  )
}