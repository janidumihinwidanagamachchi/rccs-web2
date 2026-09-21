import * as React from 'react'
import { ThemeApplier } from '@/components/theme/ThemeApplier'

export function Providers({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light')
    root.classList.add('dark')
  }, [])

  return (
    <>
      <ThemeApplier />
      {children}
    </>
  )
}