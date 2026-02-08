export type Genre = "Finance" | "Fiction" | "Business" | "Memoir" | "History";

export interface Book {
  title: string;
  author: string;
  authorBioKey?: string;
  coverImage?: string;
  yearRead: number;
  yearPublished?: number;
  genreKey?: Genre;
  rating?: 1 | 2 | 3 | 4 | 5;
  notesKey?: string;
  link?: string;
  favorite?: boolean;
}

// Genre keys for translation
export const genreKeys: Genre[] = [
  "Finance",
  "Fiction",
  "Business",
  "Memoir",
  "History",
];

export function getStats(booksList: Book[]) {
  const rated = booksList.filter((b) => b.rating != null);
  if (rated.length === 0)
    return { count: booksList.length, average: 0, best: null, worst: null };

  const avg = rated.reduce((sum, b) => sum + (b.rating ?? 0), 0) / rated.length;

  const sorted = [...rated].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

  return {
    count: booksList.length,
    average: Math.round(avg * 10) / 10,
    best: sorted[0],
    worst: sorted[sorted.length - 1],
  };
}

// Add books here (in order read - newest additions at the bottom)
export const books: Book[] = [
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    authorBioKey: "richDadPoorDadAuthorBio",
    coverImage: "/images/books/rich-dad-poor-dad.jpg",
    yearRead: 2020,
    yearPublished: 1997,
    genreKey: "Finance",
    rating: 4,
    notesKey: "richDadPoorDadNotes",
    link: "https://www.amazon.com/Rich-Dad-Poor-Teach-Middle/dp/1612680011",
    favorite: false,
  },
  {
    title: "1984",
    author: "George Orwell",
    authorBioKey: "1984AuthorBio",
    coverImage: "/images/books/1984.jpg",
    yearRead: 2021,
    yearPublished: 1949,
    genreKey: "Fiction",
    rating: 5,
    notesKey: "1984Notes",
    link: "https://www.amazon.com/1984-Signet-Classics-George-Orwell/dp/0451524934",
    favorite: true,
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    authorBioKey: "zeroToOneAuthorBio",
    coverImage: "/images/books/zero-to-one.jpg",
    yearRead: 2022,
    yearPublished: 2014,
    genreKey: "Business",
    rating: 5,
    notesKey: "zeroToOneNotes",
    link: "https://www.amazon.com/Zero-One-Notes-Startups-Future/dp/0804139296",
    favorite: true,
  },
  {
    title: "The Hard Thing About Hard Things",
    author: "Ben Horowitz",
    authorBioKey: "hardThingAuthorBio",
    coverImage: "/images/books/hard-thing-about-hard-things.jpg",
    yearRead: 2023,
    yearPublished: 2014,
    genreKey: "Business",
    rating: 4,
    notesKey: "hardThingNotes",
    link: "https://www.amazon.com/Hard-Thing-About-Things-Building/dp/0062273205",
    favorite: false,
  },
  {
    title: "What You Do Is Who You Are",
    author: "Ben Horowitz",
    authorBioKey: "whatYouDoAuthorBio",
    coverImage: "/images/books/what-you-do-is-who-you-are.jpg",
    yearRead: 2023,
    yearPublished: 2019,
    genreKey: "Business",
    rating: 5,
    notesKey: "whatYouDoNotes",
    link: "https://www.amazon.com/What-You-Do-Who-Are/dp/0062871331",
    favorite: true,
  },
  {
    title: "Spare",
    author: "Prince Harry",
    authorBioKey: "spareAuthorBio",
    coverImage: "/images/books/spare.jpeg",
    yearRead: 2025,
    yearPublished: 2023,
    genreKey: "Memoir",
    rating: 4,
    notesKey: "spareNotes",
    link: "https://www.amazon.com/Spare-Prince-Harry-Duke-Sussex/dp/0593593804",
    favorite: false,
  },
  {
    title: "The Rise and Fall of the House of York",
    author: "Andrew Lownie",
    authorBioKey: "riseAndFallAuthorBio",
    coverImage: "/images/books/rise-and-fall-house-of-york.jpeg",
    yearRead: 2025,
    yearPublished: 2025,
    genreKey: "History",
    rating: 4,
    notesKey: "riseAndFallNotes",
    link: "https://www.amazon.com/dp/B0FL2T96TH",
    favorite: false,
  },
];
