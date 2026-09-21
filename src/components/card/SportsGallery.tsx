import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

const base = import.meta.env.BASE_URL

interface SportTile {
  image: string
  kicker: string
  title: string
  blurb: string
}

const SPORTS: SportTile[] = [
  { image: '01', kicker: 'Athletics', title: 'Annual Sports Day', blurb: 'A full day of athletics, team games and house events — eight houses, one trophy.' },
  { image: '02', kicker: 'Rugby', title: '7s Cup Draw', blurb: 'Fast games, shorter halves, big hits on the main pitch all morning.' },
  { image: '03', kicker: 'Swimming', title: 'Inter-House Swimming Gala', blurb: 'Fifty metres, four strokes, eight houses — lane finals dive off at nine.' },
  { image: '04', kicker: 'Cricket', title: 'Inter-House Cricket Match', blurb: 'Eight houses, one trophy — the summer trail ends here.' },
  { image: '05', kicker: 'Cross Country', title: 'Hill Course League', blurb: 'A hilly 3k loop around the reserve. Mud included, spectators welcome.' },
  { image: '06', kicker: 'Football', title: 'Inter-House Football Tournament', blurb: 'Knockout rounds all day, house against house. Bring boots, predictions and snacks.' },
  { image: '07', kicker: 'Netball', title: 'Inter-House Netball Tournament', blurb: 'Round-robin first, then the finals — sharp passes and faster turnovers.' },
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