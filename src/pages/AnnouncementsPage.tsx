import { Shell } from '@/components/layout/Shell'
import { Megaphone } from 'lucide-react'
import { CardSection } from '@/components/card/CardSection'
import { AnnouncementCard } from '@/components/announcements/AnnouncementCard'
import { useAnnouncements } from '@/hooks/useAnnouncements'
import { Skeleton } from '@/components/ui/skeleton'

export function AnnouncementsPage() {
  const { data: announcements, isLoading } = useAnnouncements()

  return (
    <Shell>
      <CardSection title="Announcements" align="middle" plain subtitle="Stay informed with the latest school news.">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        ) : announcements && announcements.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {announcements.map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/30 bg-black/50 py-16 text-center">
            <Megaphone className="mb-4 h-12 w-12 text-white/50" />
            <h2 className="text-xl font-semibold text-white">No announcements right now</h2>
            <p className="text-white/70">Check back later for updates from staff.</p>
          </div>
        )}
      </CardSection>
    </Shell>
  )
}
