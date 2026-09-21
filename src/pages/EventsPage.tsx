import { useMemo, useState } from 'react'
import { CalendarDays } from 'lucide-react'
import { Shell } from '@/components/layout/Shell'
import { CardSection } from '@/components/card/CardSection'
import { EventGrid } from '@/components/events/EventGrid'
import { EventFilters } from '@/components/events/EventFilters'
import { useEvents, useCategories } from '@/hooks/useEvents'
import { Skeleton } from '@/components/ui/skeleton'

export function EventsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const { data: events, isLoading } = useEvents({ status: 'published' })
  const { data: categories, isLoading: categoriesLoading } = useCategories()

  const filteredEvents = useMemo(() => {
    if (!events) return []
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.short_description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'all' || event.category_id === category
      return matchesSearch && matchesCategory
    })
  }, [events, search, category])

  return (
    <Shell>
      <CardSection title="Events" align="middle" plain subtitle="Everything on the calendar this term.">
        {categoriesLoading ? (
          <Skeleton className="mb-8 h-10 rounded-lg" />
        ) : (
          <div className="mb-8">
            <EventFilters
              search={search}
              onSearchChange={setSearch}
              category={category}
              onCategoryChange={setCategory}
              categories={categories || []}
            />
          </div>
        )}

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-96 rounded-xl" />
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <EventGrid events={filteredEvents} />
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/30 bg-black/50 py-16 text-center">
            <CalendarDays className="mb-4 h-12 w-12 text-white/50" />
            <h2 className="text-xl font-semibold text-white">No events found</h2>
            <p className="text-white/70">Try adjusting your search or filters.</p>
          </div>
        )}
      </CardSection>
    </Shell>
  )
}
