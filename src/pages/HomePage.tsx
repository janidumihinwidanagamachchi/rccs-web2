import { Link } from 'react-router-dom'
import { CalendarDays, Ticket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Shell } from '@/components/layout/Shell'
import { CardSection } from '@/components/card/CardSection'
import { CardLink } from '@/components/card/CardLink'
import { EventGrid } from '@/components/events/EventGrid'
import { Countdown } from '@/components/events/Countdown'
import { AnnouncementCard } from '@/components/announcements/AnnouncementCard'
import { useEvents } from '@/hooks/useEvents'
import { useAnnouncements } from '@/hooks/useAnnouncements'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import { useAuthStore } from '@/stores/authStore'
import { toDate } from '@/lib/utils'

export function HomePage() {
  const { user, profile } = useAuthStore()
  const { data: events, isLoading: eventsLoading } = useEvents({ status: 'published' })
  const { data: announcements, isLoading: announcementsLoading } = useAnnouncements()
  const { data: settings } = useSiteSettings()
  const hero = settings?.hero

  const featuredEvents = events?.filter((e) => e.featured).slice(0, 3) || []
  const upcomingEvents = events?.slice(0, 6) || []
  const latestAnnouncements = announcements?.slice(0, 3) || []

  const now = new Date()
  const nextEvent = events?.find((e) => toDate(e.end_date) >= now) || null

  return (
    <Shell>
      <CardSection title="What's On" align="right" slim>
        {user ? (
          <p>
            Welcome back, <span className="font-semibold text-white">{profile?.full_name || user.email}</span>.
            {' '}Your sign-ups, QR tickets and stamps are waiting under{' '}
            <Link to="/tickets" className="font-semibold text-white underline underline-offset-4">
              My Tickets
            </Link>
            .{' '}
            <Link to="/passport" className="font-semibold text-white underline underline-offset-4">
              Passport
            </Link>{' '}
            tracks every event you attend.
          </p>
        ) : (
          <p>
            {hero?.subtitle ||
              'See what\u2019s coming up, register in a minute, and keep your QR ticket in your pocket.'}
          </p>
        )}
        <p>
          Sports season is warming up too — the inter-house athletics meet, the rugby 7s cup
          draw and the annual swim gala all carry QR tickets and passport stamps this term.
        </p>
        <div className="card-links">
          <CardLink to={hero?.primaryCta?.href || '/events'}>
            {hero?.primaryCta?.label || 'Browse Events'}
          </CardLink>
          <CardLink to={hero?.secondaryCta?.href || '/calendar'}>
            {hero?.secondaryCta?.label || 'View Calendar'}
          </CardLink>
        </div>
      </CardSection>

      {hero?.showCountdown !== false && nextEvent && (
        <CardSection align="right" slim={false} plain>
          <Card className="border-white/20 bg-black/60 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-between gap-4 p-6 sm:flex-row">
              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-[#00ccfc]">Up next</p>
                <h2 className="text-xl font-semibold text-white">{nextEvent.title}</h2>
                <p className="text-sm text-white/70">{nextEvent.short_description}</p>
              </div>
              <Countdown
                targetDate={nextEvent.start_date}
                eventEndDate={nextEvent.end_date}
                registrationOpensAt={nextEvent.registration_opens_at}
                registrationClosesAt={nextEvent.registration_closes_at}
                capacity={nextEvent.capacity}
                registeredCount={nextEvent.registration_count || 0}
                className="text-right text-white"
              />
            </CardContent>
          </Card>
        </CardSection>
      )}

      <CardSection
        title="Featured Events"
        align="right"
        plain
        subtitle="Worth planning your week around."
      >
        {eventsLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-80 rounded-xl" />
            ))}
          </div>
        ) : (
          <EventGrid events={featuredEvents.length ? featuredEvents : upcomingEvents.slice(0, 3)} />
        )}
        <div className="mt-6">
          <Button asChild variant="ghost" className="text-white hover:text-[#00ccfc]">
            <Link to="/events">View all events</Link>
          </Button>
        </div>
      </CardSection>

      <CardSection
        title="Latest Announcements"
        align="right"
        plain
        subtitle="Notices and changes from staff."
      >
        {announcementsLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {latestAnnouncements.map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} compact />
            ))}
            {latestAnnouncements.length === 0 && (
              <Card className="border-white/20 bg-black/60">
                <CardContent className="flex items-center gap-4 p-5">
                  <Ticket className="h-6 w-6 shrink-0 text-white/60" />
                  <p className="text-sm text-white/70">No announcements right now — check back soon.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </CardSection>

      <CardSection align="right" plain>
        <div className="mt-2 flex flex-wrap gap-3">
          <CardLink to="/sports">Explore Sports</CardLink>
          <CardLink to="/calendar">
            <CalendarDays className="mr-2 inline h-4 w-4 align-[-2px]" />
            View Calendar
          </CardLink>
        </div>
      </CardSection>
    </Shell>
  )
}