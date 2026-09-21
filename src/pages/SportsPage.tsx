import { Shell } from '@/components/layout/Shell'
import { CardSection } from '@/components/card/CardSection'
import { SportsGallery } from '@/components/card/SportsGallery'

export function SportsPage() {
  return (
    <Shell>
      <CardSection title="Sports &amp; Activities" align="middle" plain subtitle="Term-time fixtures, open days and club meets.">
        <SportsGallery />
      </CardSection>
    </Shell>
  )
}