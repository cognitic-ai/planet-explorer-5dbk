export interface Planet {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  facts: string[];
  color: string;
  size: number; // relative size for display
  distanceFromSun: string;
  diameter: string;
  dayLength: string;
  yearLength: string;
  moons: number;
  temperature: string;
  emoji: string;
}

export const planets: Planet[] = [
  {
    id: "mercury",
    name: "Mercury",
    subtitle: "The Swift Planet",
    description:
      "Mercury is the smallest planet in our solar system and the closest to the Sun. Despite being so close to the Sun, it's not the hottest planet because it has no atmosphere to trap heat.",
    facts: [
      "Mercury has no moons or rings",
      "A year on Mercury is just 88 Earth days",
      "Mercury has a very thin atmosphere called an exosphere",
      "It's the fastest planet, orbiting the Sun every 88 days",
      "Temperatures range from -180°C to 430°C",
    ],
    color: "#A0A0A0",
    size: 0.38,
    distanceFromSun: "57.9 million km",
    diameter: "4,879 km",
    dayLength: "59 Earth days",
    yearLength: "88 Earth days",
    moons: 0,
    temperature: "-180°C to 430°C",
    emoji: "☿️",
  },
  {
    id: "venus",
    name: "Venus",
    subtitle: "Earth's Twin",
    description:
      "Venus is often called Earth's twin because of their similar size. It's the hottest planet in our solar system due to its thick atmosphere that traps heat in a runaway greenhouse effect.",
    facts: [
      "Venus rotates backwards compared to most planets",
      "A day on Venus is longer than its year",
      "It's the brightest natural object in Earth's night sky after the Moon",
      "Venus has over 1,600 major volcanoes",
      "Surface pressure is 90 times that of Earth",
    ],
    color: "#E6B800",
    size: 0.95,
    distanceFromSun: "108.2 million km",
    diameter: "12,104 km",
    dayLength: "243 Earth days",
    yearLength: "225 Earth days",
    moons: 0,
    temperature: "465°C average",
    emoji: "♀️",
  },
  {
    id: "earth",
    name: "Earth",
    subtitle: "Our Home",
    description:
      "Earth is the third planet from the Sun and the only known planet to harbor life. It has liquid water on its surface and an atmosphere rich in oxygen.",
    facts: [
      "Earth is the only planet not named after a god",
      "70% of Earth's surface is covered in water",
      "Earth's atmosphere protects us from meteors and radiation",
      "The Earth's core is as hot as the Sun's surface",
      "Earth has a powerful magnetic field",
    ],
    color: "#4A90D9",
    size: 1,
    distanceFromSun: "149.6 million km",
    diameter: "12,742 km",
    dayLength: "24 hours",
    yearLength: "365.25 days",
    moons: 1,
    temperature: "-88°C to 58°C",
    emoji: "🌍",
  },
  {
    id: "mars",
    name: "Mars",
    subtitle: "The Red Planet",
    description:
      "Mars is known as the Red Planet because iron minerals in its soil oxidize, causing the surface to look red. It's a primary target for human exploration.",
    facts: [
      "Mars has the largest volcano in the solar system - Olympus Mons",
      "Mars has two small moons: Phobos and Deimos",
      "A day on Mars is about 24 hours and 37 minutes",
      "Mars has seasons like Earth due to its tilted axis",
      "Several rovers have explored Mars' surface",
    ],
    color: "#D35400",
    size: 0.53,
    distanceFromSun: "227.9 million km",
    diameter: "6,779 km",
    dayLength: "24.6 hours",
    yearLength: "687 Earth days",
    moons: 2,
    temperature: "-153°C to 20°C",
    emoji: "♂️",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    subtitle: "The Giant",
    description:
      "Jupiter is the largest planet in our solar system. It's a gas giant with a Great Red Spot, a storm that has been raging for hundreds of years.",
    facts: [
      "Jupiter has at least 95 known moons",
      "The Great Red Spot is a storm larger than Earth",
      "Jupiter has the shortest day of all planets - about 10 hours",
      "It's so large that all other planets could fit inside it",
      "Jupiter has faint rings made of dust particles",
    ],
    color: "#C48A4E",
    size: 2.5,
    distanceFromSun: "778.5 million km",
    diameter: "139,820 km",
    dayLength: "10 hours",
    yearLength: "12 Earth years",
    moons: 95,
    temperature: "-145°C average",
    emoji: "♃",
  },
  {
    id: "saturn",
    name: "Saturn",
    subtitle: "The Ringed Beauty",
    description:
      "Saturn is famous for its stunning ring system, made up of ice and rock. It's the second-largest planet and a gas giant like Jupiter.",
    facts: [
      "Saturn's rings span up to 282,000 km but are only 10 m thick",
      "Saturn has 146 known moons, including Titan",
      "Saturn is the least dense planet - it could float on water",
      "Winds on Saturn can reach 1,800 km/h",
      "Titan has a thick atmosphere and liquid methane lakes",
    ],
    color: "#E8C87A",
    size: 2.2,
    distanceFromSun: "1.4 billion km",
    diameter: "116,460 km",
    dayLength: "10.7 hours",
    yearLength: "29 Earth years",
    moons: 146,
    temperature: "-178°C average",
    emoji: "♄",
  },
  {
    id: "uranus",
    name: "Uranus",
    subtitle: "The Tilted Planet",
    description:
      "Uranus is unique because it rotates on its side, with its axis tilted at 98 degrees. It's an ice giant with a blue-green color from methane in its atmosphere.",
    facts: [
      "Uranus rotates on its side like a rolling ball",
      "It was the first planet discovered using a telescope",
      "Uranus has 28 known moons named after literary characters",
      "Its blue-green color comes from methane in the atmosphere",
      "Uranus has 13 known rings",
    ],
    color: "#73C2C2",
    size: 1.6,
    distanceFromSun: "2.9 billion km",
    diameter: "50,724 km",
    dayLength: "17 hours",
    yearLength: "84 Earth years",
    moons: 28,
    temperature: "-224°C average",
    emoji: "⛢",
  },
  {
    id: "neptune",
    name: "Neptune",
    subtitle: "The Windiest Planet",
    description:
      "Neptune is the farthest planet from the Sun and has the strongest winds in the solar system. It's a deep blue ice giant discovered through mathematical predictions.",
    facts: [
      "Neptune has the strongest winds - up to 2,100 km/h",
      "It was discovered through mathematical calculations",
      "Neptune has 16 known moons, including Triton",
      "Triton orbits Neptune backwards",
      "Neptune has 5 main rings",
    ],
    color: "#4169E1",
    size: 1.5,
    distanceFromSun: "4.5 billion km",
    diameter: "49,244 km",
    dayLength: "16 hours",
    yearLength: "165 Earth years",
    moons: 16,
    temperature: "-214°C average",
    emoji: "♆",
  },
];

export function getPlanetById(id: string): Planet | undefined {
  return planets.find((p) => p.id === id);
}
