const base = import.meta.env.BASE_URL

export const SPORT_IMAGES: Record<string, string> = {
  athletics: `${base}card/sports/athletics.jpg`,
  rugby: `${base}card/sports/rugby.jpg`,
  swimming: `${base}card/sports/swimming.jpg`,
  cricket: `${base}card/sports/cricket.jpg`,
  'cross-country': `${base}card/sports/cross-country.jpg`,
  football: `${base}card/sports/football.jpg`,
  netball: `${base}card/sports/netball.jpg`,
  'table-tennis': `${base}card/sports/table-tennis.jpg`,
  karate: `${base}card/sports/karate.jpg`,
  badminton: `${base}card/sports/badminton.jpg`,
  basketball: `${base}card/sports/basketball.jpg`,
  tennis: `${base}card/sports/tennis.jpg`,
  chess: `${base}card/sports/chess.jpg`,
}

export const EVENT_SPORT_IMAGE: Record<string, string> = {
  'inter-house-swimming-gala': 'swimming',
  'inter-house-football': 'football',
  'chess-championship': 'chess',
  'inter-house-netball': 'netball',
  'annual-sports-day': 'athletics',
  'inter-house-cricket': 'cricket',
}
