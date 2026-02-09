export interface CountryContent {
  name: string;
  images: string[];
  review: string;
}

// Map from country name → content
export const COUNTRY_CONTENT: Record<string, CountryContent> = {
  "United Kingdom": {
    name: "United Kingdom",
    images: [
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=400&q=80",
      "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=400&q=80",
      "https://images.unsplash.com/photo-1543799382-9a0208331ef7?w=400&q=80",
      "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=400&q=80",
    ],
    review:
      "Home. From the rolling hills of Hertfordshire to the buzz of London, the UK shaped everything about who I am. There's a quiet beauty to the English countryside that I always come back to, no matter how far I roam.",
  },
  "United States": {
    name: "United States",
    images: [
      "https://images.unsplash.com/photo-1485738422979-f5c462d49f04?w=800&q=80",
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&q=80",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&q=80",
      "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?w=400&q=80",
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=400&q=80",
    ],
    review:
      "The land of opportunity and my second home. From the tech scene in San Francisco to the warmth of Austin, Texas — every trip here has shaped my entrepreneurial journey. The energy is unmatched.",
  },
  France: {
    name: "France",
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80",
      "https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?w=400&q=80",
      "https://images.unsplash.com/photo-1551865256-76da0d765089?w=400&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    ],
    review:
      "Paris stole my heart on the very first visit. The architecture, the food, the effortless style — France has a way of making everything feel like art. The Riviera is next on the list.",
  },
  Spain: {
    name: "Spain",
    images: [
      "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80",
      "https://images.unsplash.com/photo-1509840841025-9088ba78a826?w=400&q=80",
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&q=80",
      "https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?w=400&q=80",
      "https://images.unsplash.com/photo-1559386484-97dfc0e15539?w=400&q=80",
    ],
    review:
      "Sun, tapas, and late nights. Spain has an energy that pulls you into its rhythm. Barcelona's architecture blew my mind, and the people radiate warmth everywhere you go.",
  },
  Italy: {
    name: "Italy",
    images: [
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80",
      "https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=400&q=80",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&q=80",
      "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=400&q=80",
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=400&q=80",
    ],
    review:
      "Italy is a feast for every sense. The history hits different when you're standing in the Colosseum. And nothing — absolutely nothing — beats authentic Italian pasta eaten at a tiny street-side trattoria.",
  },
  Germany: {
    name: "Germany",
    images: [
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
      "https://images.unsplash.com/photo-1554072675-66db59dba46f?w=400&q=80",
      "https://images.unsplash.com/photo-1449452198679-05c7fd30f416?w=400&q=80",
      "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400&q=80",
      "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?w=400&q=80",
    ],
    review:
      "Precision meets soul. Berlin's creative energy is infectious — street art, underground clubs, and a startup scene that rivals anywhere. Munich brought the traditional side with incredible beer gardens.",
  },
  Netherlands: {
    name: "Netherlands",
    images: [
      "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80",
      "https://images.unsplash.com/photo-1512470876337-d8b18a0c8e18?w=400&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80",
      "https://images.unsplash.com/photo-1576924542622-772281b13aa8?w=400&q=80",
      "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=400&q=80",
    ],
    review:
      "Amsterdam is one of those cities that just works. Canals, bikes, incredible design — the Dutch have figured something out. The tech and crypto community here is thriving too.",
  },
  Portugal: {
    name: "Portugal",
    images: [
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80",
      "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=400&q=80",
      "https://images.unsplash.com/photo-1573455494060-c5595004fb6c?w=400&q=80",
      "https://images.unsplash.com/photo-1548707309-dcebeab426c8?w=400&q=80",
      "https://images.unsplash.com/photo-1536663815808-535e2280d2c2?w=400&q=80",
    ],
    review:
      "Lisbon is the hidden gem of Europe. Affordable, beautiful, and packed with incredible food. The digital nomad scene is massive and the sunset from any miradouro is pure magic.",
  },
  Thailand: {
    name: "Thailand",
    images: [
      "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
      "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=400&q=80",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&q=80",
      "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=400&q=80",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80",
    ],
    review:
      "Thailand was sensory overload in the best way. The temples, the street food, the islands — it's a place that rewires how you think about life. Bangkok's chaos is addictive.",
  },
  Japan: {
    name: "Japan",
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&q=80",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80",
      "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=400&q=80",
      "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&q=80",
    ],
    review:
      "Japan is another planet. The blend of ancient tradition and bleeding-edge technology is unlike anywhere else. Kyoto's temples at dawn and Tokyo's Shibuya at night — two sides of a masterpiece.",
  },
  Australia: {
    name: "Australia",
    images: [
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80",
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&q=80",
      "https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?w=400&q=80",
      "https://images.unsplash.com/photo-1530276371031-2fbe4b4ea579?w=400&q=80",
      "https://images.unsplash.com/photo-1494947665470-20322015e3a8?w=400&q=80",
    ],
    review:
      "The sheer scale of Australia is humbling. Sydney's harbour is iconic for a reason, and the laid-back Aussie culture makes you feel instantly welcome. The wildlife is mental though.",
  },
  Canada: {
    name: "Canada",
    images: [
      "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80",
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=400&q=80",
      "https://images.unsplash.com/photo-1519832979-6fa011b87667?w=400&q=80",
      "https://images.unsplash.com/photo-1559511260-66a68e7e1914?w=400&q=80",
      "https://images.unsplash.com/photo-1551009175-15bdf9dcb580?w=400&q=80",
    ],
    review:
      "Canada combines the best of nature and city life. Toronto's tech scene is booming, and the Rocky Mountains are breathtaking. The people are genuinely as nice as the stereotype suggests.",
  },
  Mexico: {
    name: "Mexico",
    images: [
      "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=800&q=80",
      "https://images.unsplash.com/photo-1547995886-6dc09384c6e6?w=400&q=80",
      "https://images.unsplash.com/photo-1570737209810-87a8e7245f88?w=400&q=80",
      "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=400&q=80",
      "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=400&q=80",
    ],
    review:
      "Mexico surprised me at every turn. Mexico City is a world-class capital with incredible food and culture. The Mayan ruins gave me chills. Definitely underrated as a destination.",
  },
  Brazil: {
    name: "Brazil",
    images: [
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80",
      "https://images.unsplash.com/photo-1544989164-31dc3291c578?w=400&q=80",
      "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?w=400&q=80",
      "https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?w=400&q=80",
      "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?w=400&q=80",
    ],
    review:
      "Rio is pure electricity. The energy of Copacabana, Christ the Redeemer towering above — Brazil has a rhythm that gets into your bones. The people celebrate life like nowhere else.",
  },
  "South Korea": {
    name: "South Korea",
    images: [
      "https://images.unsplash.com/photo-1553167454-cc0416bc0c51?w=800&q=80",
      "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&q=80",
      "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=400&q=80",
      "https://images.unsplash.com/photo-1546874177-9e664107314e?w=400&q=80",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80",
    ],
    review:
      "Seoul is the future. The tech infrastructure is insane, the food scene is elite, and K-culture is even more vibrant when you're immersed in it. The work ethic here is inspiring.",
  },
  Greece: {
    name: "Greece",
    images: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80",
      "https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&q=80",
      "https://images.unsplash.com/photo-1580502304784-8985b7eb7260?w=400&q=80",
      "https://images.unsplash.com/photo-1503152394-c571994fd383?w=400&q=80",
    ],
    review:
      "Santorini sunsets are not overhyped — they're even better in person. Greece combines ancient history with island paradise effortlessly. The food is simple but absolutely incredible.",
  },
  Turkey: {
    name: "Turkey",
    images: [
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80",
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&q=80",
      "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=400&q=80",
      "https://images.unsplash.com/photo-1589561454226-796a8c0e1e40?w=400&q=80",
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80",
    ],
    review:
      "Istanbul is where East meets West and it's extraordinary. The Grand Bazaar, the Blue Mosque, the Bosphorus — layers upon layers of history. Turkish hospitality is legendary for a reason.",
  },
  Switzerland: {
    name: "Switzerland",
    images: [
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80",
      "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=400&q=80",
      "https://images.unsplash.com/photo-1504218727796-db522606b16f?w=400&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
      "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=400&q=80",
    ],
    review:
      "Switzerland looks AI-generated but it's real. Every view is a postcard. Zurich's fintech scene is massive, and the trains run with terrifying precision. Expensive but worth every franc.",
  },
  Austria: {
    name: "Austria",
    images: [
      "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80",
      "https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?w=400&q=80",
      "https://images.unsplash.com/photo-1519923041206-1acf7e6e87fa?w=400&q=80",
      "https://images.unsplash.com/photo-1609856878074-cf31e21ccb6b?w=400&q=80",
      "https://images.unsplash.com/photo-1544413660-299165566b1d?w=400&q=80",
    ],
    review:
      "Vienna oozes elegance. The coffee houses, the classical music heritage, the imperial architecture — it's like stepping into a Wes Anderson film. The Christmas markets are magical.",
  },
  Belgium: {
    name: "Belgium",
    images: [
      "https://images.unsplash.com/photo-1491557345352-5929e343eb89?w=800&q=80",
      "https://images.unsplash.com/photo-1559113202-c916b8e44373?w=400&q=80",
      "https://images.unsplash.com/photo-1565791380713-1756b9a05343?w=400&q=80",
      "https://images.unsplash.com/photo-1569449047970-4e7e4a4ab9fd?w=400&q=80",
      "https://images.unsplash.com/photo-1612544409025-e1f6a56c1152?w=400&q=80",
    ],
    review:
      "Belgium punches well above its weight. Brussels has the EU energy, Bruges looks like a fairy tale, and the chocolate and waffles alone justify the trip. Great beer too.",
  },
};

// Default content for countries without specific entries
export const DEFAULT_COUNTRY_CONTENT: CountryContent = {
  name: "",
  images: [
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&q=80",
    "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=400&q=80",
  ],
  review:
    "A beautiful country on the travel list. Every destination has its own story, and this one left a lasting impression. More adventures here are definitely on the cards.",
};

export function getCountryContent(countryName: string): CountryContent {
  const content = COUNTRY_CONTENT[countryName];
  if (content) return content;
  return {
    ...DEFAULT_COUNTRY_CONTENT,
    name: countryName,
  };
}
