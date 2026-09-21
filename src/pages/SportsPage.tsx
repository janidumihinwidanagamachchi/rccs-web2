import { Link } from 'react-router-dom'
import { CalendarDays, MapPin, Megaphone, Trophy, Users } from 'lucide-react'
import { Shell } from '@/components/layout/Shell'
import { CardSection } from '@/components/card/CardSection'
import { SportsGallery } from '@/components/card/SportsGallery'
import { AnnouncementCard } from '@/components/announcements/AnnouncementCard'
import { useSportsEvents, useCategories } from '@/hooks/useEvents'
import { useAnnouncements } from '@/hooks/useAnnouncements'
import { EVENT_SPORT_IMAGE, SPORT_IMAGES } from '@/data/sportsImages'
import { formatDate } from '@/lib/utils'

export function SportsPage() {
  const { data: events, isLoading } = useSportsEvents()
  const { data: categories } = useCategories()
  const { data: announcements } = useAnnouncements()

  const sportsCategory = categories?.find((c) => c.slug === 'sports')
  const all = events || []

  const fixtures = all.filter((e) => e.status !== 'completed')
  const results = all.filter((e) => e.status === 'completed')
  const notices = (announcements || []).filter((a) => a.category_id === sportsCategory?.id)

  const nextFixture =
    [...fixtures].sort((a, b) => a.start_date.localeCompare(b.start_date))[0] || null
  const totalRegistrations = all.reduce((sum, e) => sum + (e.registration_count || 0), 0)
  const venues = new Set(all.map((e) => e.location).filter(Boolean)).size

  return (
    <Shell>
      <CardSection
        title="Sports &amp; Activities"
        align="middle"
        plain
        subtitle="Term-time fixtures, results and club meets."
      >
        <SportsGallery />
        <p className="card-photo-credit">Photos: Wikimedia Commons (CC0 / public domain)</p>
      </CardSection>

      {all.length > 0 && (
        <CardSection align="middle" plain className="mt-2">
          <div className="card-stat-grid">
            <div className="card-stat">
              <span className="card-stat-label">
                <Trophy className="mr-1 inline h-3 w-3 align-[-1px]" />
                Events this term
              </span>
              <span className="card-stat-value">{all.length}</span>
              <span className="card-stat-hint">{fixtures.length} still to play</span>
            </div>
            <div className="card-stat">
              <span className="card-stat-label">
                <Users className="mr-1 inline h-3 w-3 align-[-1px]" />
                Registrations
              </span>
              <span className="card-stat-value">{totalRegistrations}</span>
              <span className="card-stat-hint">across all sports events</span>
            </div>
            <div className="card-stat">
              <span className="card-stat-label">
                <MapPin className="mr-1 inline h-3 w-3 align-[-1px]" />
                Venues in use
              </span>
              <span className="card-stat-value">{venues}</span>
              <span className="card-stat-hint">pool, grounds, courts</span>
            </div>
            <div className="card-stat">
              <span className="card-stat-label">
                <CalendarDays className="mr-1 inline h-3 w-3 align-[-1px]" />
                Next fixture
              </span>
              <span className="card-stat-value">
                {nextFixture ? formatDate(nextFixture.start_date) : 'Season done'}
              </span>
              <span className="card-stat-hint">{nextFixture?.title || 'Check back soon'}</span>
            </div>
          </div>
        </CardSection>
      )}

      <CardSection title="Fixtures" align="middle" subtitle="Upcoming inter-house and club sports.">
        {isLoading ? (
          <p className="text-sm text-white/60">Loading fixtures...</p>
        ) : fixtures.length === 0 ? (
          <p className="text-sm text-white/60">No upcoming fixtures right now.</p>
        ) : (
          <div className="card-fixture-list">
            {fixtures.map((e) => {
              const sportKey = EVENT_SPORT_IMAGE[e.slug]
              return (
                <div key={e.id} className="card-fixture">
                  {sportKey && (
                    <img
                      src={SPORT_IMAGES[sportKey]}
                      alt=""
                      className="card-fixture-thumb"
                      loading="lazy"
                    />
                  )}
                  <div className="card-fixture-main">
                    <span className="card-fixture-date">{formatDate(e.start_date)}</span>
                    <Link to={`/events/${e.slug}`} className="card-fixture-title">
                      {e.title}
                    </Link>
                    <span className="card-fixture-meta">
                      <MapPin className="mr-1 inline h-3 w-3 align-[-1px]" />
                      {e.location}
                      {e.category?.name ? (
                        <>
                          <span className="card-fixture-meta-dot">·</span>
                          {e.category.name}
                        </>
                      ) : null}
                    </span>
                  </div>
                  <div className="card-fixture-side">
                    {e.capacity ? (
                      <span className="card-fixture-spots">
                        {e.registration_count || 0}/{e.capacity} registered
                      </span>
                    ) : null}
                    <Link to={`/events/${e.slug}`} className="card-fixture-link">
                      View
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardSection>

      {results.length > 0 && (
        <CardSection title="Results" align="middle" plain subtitle="Completed inter-house events.">
          <div className="card-fixture-list">
            {results.map((e) => {
              const sportKey = EVENT_SPORT_IMAGE[e.slug]
              return (
                <div key={e.id} className="card-fixture">
                  {sportKey && (
                    <img
                      src={SPORT_IMAGES[sportKey]}
                      alt=""
                      className="card-fixture-thumb"
                      loading="lazy"
                    />
                  )}
                  <div className="card-fixture-main">
                    <span className="card-fixture-date">
                      {formatDate(e.start_date)}
                      <span className="card-fixture-status">Completed</span>
                    </span>
                    <Link to={`/events/${e.slug}`} className="card-fixture-title">
                      {e.title}
                    </Link>
                    <span className="card-fixture-meta">
                      <MapPin className="mr-1 inline h-3 w-3 align-[-1px]" />
                      {e.location}
                    </span>
                  </div>
                  <div className="card-fixture-side">
                    <span className="card-fixture-spots">
                      {e.registration_count || 0} took part
                    </span>
                    <Link to={`/events/${e.slug}`} className="card-fixture-link">
                      View
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </CardSection>
      )}

      {notices.length > 0 && (
        <CardSection
          title="Sports Notices"
          align="middle"
          plain
          subtitle="Latest updates from the sports office."
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {notices.map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} compact />
            ))}
          </div>
        </CardSection>
      )}

      {all.length === 0 && !isLoading && (
        <CardSection align="middle" plain>
          <p className="flex items-center gap-2 text-sm text-white/60">
            <Megaphone className="h-4 w-4" />
            No sports events are scheduled right now.
          </p>
        </CardSection>
      )}
    </Shell>
  )
}
