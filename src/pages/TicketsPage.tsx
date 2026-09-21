import { Shell } from '@/components/layout/Shell'
import { CardSection } from '@/components/card/CardSection'
import { TicketCard } from '@/components/tickets/TicketCard'
import { useMyRegistrations } from '@/hooks/useRegistrations'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Ticket } from 'lucide-react'

export function TicketsPage() {
  const { data: registrations, isLoading } = useMyRegistrations()

  return (
    <Shell>
      <CardSection title="My Tickets" align="middle" slim subtitle="Your sign-ups and QR tickets.">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
          </div>
        ) : registrations && registrations.length > 0 ? (
          <div className="space-y-4">
            {registrations.map((registration) => (
              <TicketCard key={registration.id} registration={registration} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/30 bg-black/50 py-20 text-center">
            <Ticket className="mb-4 h-12 w-12 text-white/50" />
            <h2 className="text-xl font-semibold text-white">No tickets yet</h2>
            <p className="mb-6 text-white/70">Sign up for an event and it shows up here.</p>
            <Button asChild>
              <Link to="/events">Browse Events</Link>
            </Button>
          </div>
        )}
      </CardSection>
    </Shell>
  )
}
