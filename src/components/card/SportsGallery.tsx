import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

const base = import.meta.env.BASE_URL

interface SportTile {
  image: string
  kicker: string
  title: string
  blurb: string
}

const SPORTS: SportTile[] = [
  { image: '01', kicker: 'Athletics', title: 'Inter-House Meet', blurb: 'Sprints, hurdles and the field events — four houses, one trophy.' },
  { image: '02', kicker: 'Rugby', title: '7s Cup Draw', blurb: 'Fast games, shorter halves, big hits on the main pitch all morning.' },
  { image: '03', kicker: 'Swimming', title: 'Annual Swim Gala', blurb: 'Lane finals dive off at 9am. Expect records, relays and loud stands.' },
  { image: '04', kicker: 'Cricket', title: 'Finals Weekend', blurb: 'The summer trail ends here — bat first, defend the total.' },
  { image: '05', kicker: 'Cross Country', title: 'Hill Course League', blurb: 'A hilly 3k loop around the reserve. Mud included, spectators welcome.' },
  { image: '06', kicker: 'Football', title: 'Under-15 Shield', blurb: 'Knockout rounds after school — bring boots, predictions and snacks.' },
  { image: '07', kicker: 'Netball', title: 'Centre Court', blurb: 'Bi-annual netball open — sharp passes and faster turnovers.' },
  { image: '08', kicker: 'Table Tennis', title: 'Doubles Open', blurb: 'Best of five at the sports hall, entry from the upper years.' },
  { image: '09', kicker: 'Karate', title: 'Grading Day', blurb: 'Belt examinations run by visiting sensei — observers may attend.' },
  { image: '10', kicker: 'Badminton', title: 'Mixed Pairs', blurb: 'Shuttlecock battles — seeds announced the morning of the draw.' },
  { image: '11', kicker: 'Basketball', title: 'House Thunder', blurb: 'Full court, full volume. The house cup stays where it lands.' },
  { image: '12', kicker: 'Tennis', title: 'Club Day', blurb: 'Serves, volleys and a friendly round robin for club members.' },
]

export function SportsGallery() {
  return (
    <div className="card-gallery">
      {SPORTS.map((sport) => (
        <Dialog key={sport.image}>
          <DialogTrigger asChild>
            <button type="button" className="card-gallery-item text-left">
              <img src={`${base}card/gallery/${sport.image}.jpg`} alt={sport.title} loading="lazy" />
              <span className="card-gallery-caption">
                <span className="card-gallery-kicker">{sport.kicker}</span>
                <span className="card-gallery-title">{sport.title}</span>
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl border-none bg-black/90">
            <DialogTitle className="uppercase text-white">{sport.title}</DialogTitle>
            <img
              src={`${base}card/gallery/${sport.image}.jpg`}
              alt={sport.title}
              className="w-full"
            />
            <p className="text-sm text-white/80">{sport.blurb}</p>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}