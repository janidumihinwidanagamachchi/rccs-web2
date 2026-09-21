import * as React from 'react'
import { useSiteSettings, useApplyTheme } from '@/hooks/useSiteSettings'

export function ThemeApplier({ pageTitle }: { pageTitle?: string }) {
  const { data: settings } = useSiteSettings()

  useApplyTheme(settings, 'dark', pageTitle)

  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light')
    root.classList.add('dark')
  }, [])

  return null
}