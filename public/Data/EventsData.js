// eventsData.js

import { EventsImages } from "../Images/AllImages";

const eventsData = [
  {
    id: "evt-nba-finals-2025",
    title: "NBA Finals Game",
    category: "Sports",
    sport: "Basketball",
    matchup: "Los Angeles Lakers vs Boston Celtics",
    league: "NBA",
    date: "2025-06-21",
    time: "01:00",
    timezone: "PST",
    venue: {
      name: "Crypto.com Arena",
      city: "Los Angeles",
      country: "USA",
    },
    pricing: {
      currency: "USD",
      from: 80,
    },
    tags: ["NBA", "Finals", "Basketball", "Playoffs"],
    availability: "Limited",
    image: {
      src: EventsImages.NBA,
    },
  },

  {
    id: "evt-ucl-final-2025",
    title: "UEFA Champions League",
    category: "Sports",
    sport: "Football",
    matchup: "FC Barcelona vs Real Madrid",
    league: "UEFA Champions League",
    date: "2025-06-22",
    time: "01:00",
    timezone: "CET",
    venue: {
      name: "Allianz Arena",
      city: "Munich",
      country: "Germany",
    },
    pricing: {
      currency: "USD",
      from: 100,
    },
    tags: ["Football", "Soccer", "Champions League", "El Clásico"],
    availability: "Available",
    image: {
      src: EventsImages.UCL,
    },
  },

  {
    id: "evt-ed-sheeran-la-2025",
    title: "Ed Sheeran Live in Concert",
    category: "Concert",
    genre: "Pop",
    artist: "Ed Sheeran",
    date: "2025-06-21",
    time: "01:00",
    timezone: "PST",
    venue: {
      name: "Crypto.com Arena",
      city: "Los Angeles",
      country: "USA",
    },
    pricing: {
      currency: "USD",
      from: 70,
    },
    tags: ["Concert", "Live Music", "Pop", "Ed Sheeran"],
    availability: "Selling Fast",
    image: {
      src: EventsImages.Concert,
    },
  },

  {
    id: "evt-nba-regular-knicks",
    title: "NBA Regular Season Game",
    category: "Sports",
    sport: "Basketball",
    matchup: "New York Knicks vs Miami Heat",
    league: "NBA",
    date: "2025-07-05",
    time: "19:30",
    timezone: "EST",
    venue: {
      name: "Madison Square Garden",
      city: "New York",
      country: "USA",
    },
    pricing: {
      currency: "USD",
      from: 65,
    },
    tags: ["NBA", "Basketball", "Regular Season"],
    availability: "Available",
    image: {
      src: EventsImages.NBA,
    },
  },

  {
    id: "evt-coldplay-world-tour",
    title: "Coldplay World Tour",
    category: "Concert",
    genre: "Alternative Rock",
    artist: "Coldplay",
    date: "2025-08-10",
    time: "20:00",
    timezone: "BST",
    venue: {
      name: "Wembley Stadium",
      city: "London",
      country: "UK",
    },
    pricing: {
      currency: "USD",
      from: 90,
    },
    tags: ["Concert", "Rock", "World Tour", "Coldplay"],
    availability: "Available",
    image: {
      src: EventsImages.Concert,
    },
  },
];

export default eventsData;
