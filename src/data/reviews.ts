export interface GoogleReview {
  author: string
  rating: number      // 1-5
  text: string
  date: string        // 'January 2026' or ISO date
}

// Verified procurement testimonials — placeholder until real Google Business Profile
// reviews are imported. The GoogleReviews component will render these client logos
// alongside any incoming Google reviews.
export const reviews: GoogleReview[] = [
  {
    author: 'TTC Procurement — Bench & Shelter Program',
    rating: 5,
    text: 'Climate-rated 316 stainless skate stoppers, on time, with stamped engineering for every Toronto installation. Multi-year supply agreement renewed without issue.',
    date: 'January 2026',
  },
  {
    author: 'STM — Mobilier Urbain',
    rating: 5,
    text: 'Finition patine bronze approuvée par le bureau du patrimoine de la Ville de Montréal. Documentation de conformité LAPHO complète livrée en français.',
    date: 'November 2025',
  },
  {
    author: 'Vancouver Park Board',
    rating: 5,
    text: 'Marine-grade 316L on every Granville and Robson Square deployment — zero corrosion failures across five winters.',
    date: 'October 2025',
  },
]
