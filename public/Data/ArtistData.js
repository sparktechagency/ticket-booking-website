import { ArtistsImages } from "../Images/AllImages";

export const ArtistData = [
  {
    id: "art_004",
    name: "Shakira",
    image: ArtistsImages.Shakira,
    genre: ["Pop", "Latin Pop", "Reggaeton"],
    country: "Colombia",
    bio: "Shakira is a global pop icon known for blending Latin, pop, and Middle Eastern influences.",
    debutYear: 1991,
    albums: [
      { title: "Laundry Service", year: 2001 },
      { title: "Oral Fixation, Vol. 2", year: 2005 },
      { title: "El Dorado", year: 2017 },
    ],
    socials: {
      instagram: "https://instagram.com/shakira",
      spotify: "https://spotify.com/artist/shakira",
      youtube: "https://youtube.com/shakira",
    },
    stats: {
      monthlyListeners: 65000000,
      followers: 90000000,
    },
    active: true,
  },
  {
    id: "art_005",
    name: "Ed Sheeran",
    image: ArtistsImages.TravisScott,
    genre: ["Pop", "Folk Pop"],
    country: "United Kingdom",
    bio: "Ed Sheeran is a singer-songwriter known for acoustic-driven pop and emotional storytelling.",
    debutYear: 2011,
    albums: [
      { title: "+", year: 2011 },
      { title: "x", year: 2014 },
      { title: "÷", year: 2017 },
      { title: "=", year: 2021 },
    ],
    socials: {
      instagram: "https://instagram.com/teddysphotos",
      spotify: "https://spotify.com/artist/edsheeran",
    },
    stats: {
      monthlyListeners: 85000000,
      followers: 110000000,
    },
    active: true,
  },
  {
    id: "art_006",
    name: "Taylor Swift",
    image: ArtistsImages.TaylorSwift,
    genre: ["Pop", "Country", "Alternative"],
    country: "USA",
    bio: "Taylor Swift is a singer-songwriter celebrated for narrative songwriting and musical reinvention.",
    debutYear: 2006,
    albums: [
      { title: "Fearless", year: 2008 },
      { title: "1989", year: 2014 },
      { title: "Folklore", year: 2020 },
      { title: "Midnights", year: 2022 },
    ],
    socials: {
      instagram: "https://instagram.com/taylorswift",
      spotify: "https://spotify.com/artist/taylorswift",
    },
    stats: {
      monthlyListeners: 100000000,
      followers: 120000000,
    },
    active: true,
  },
  {
    id: "art_007",
    name: "Drake",
    image: ArtistsImages.JustinBieber,
    genre: ["Hip Hop", "Rap", "R&B"],
    country: "Canada",
    bio: "Drake is a rapper and singer known for blending rap with melodic R&B.",
    debutYear: 2009,
    albums: [
      { title: "Take Care", year: 2011 },
      { title: "Scorpion", year: 2018 },
      { title: "Certified Lover Boy", year: 2021 },
    ],
    socials: {
      instagram: "https://instagram.com/champagnepapi",
      spotify: "https://spotify.com/artist/drake",
    },
    stats: {
      monthlyListeners: 75000000,
      followers: 95000000,
    },
    active: true,
  },
  {
    id: "art_008",
    name: "Beyoncé",
    image: ArtistsImages.ColdPlay,
    genre: ["Pop", "R&B", "Soul"],
    country: "USA",
    bio: "Beyoncé is an award-winning artist known for powerful vocals and cultural impact.",
    debutYear: 2003,
    albums: [
      { title: "Dangerously in Love", year: 2003 },
      { title: "Lemonade", year: 2016 },
      { title: "Renaissance", year: 2022 },
    ],
    socials: {
      instagram: "https://instagram.com/beyonce",
      spotify: "https://spotify.com/artist/beyonce",
    },
    stats: {
      monthlyListeners: 60000000,
      followers: 80000000,
    },
    active: true,
  },
];
