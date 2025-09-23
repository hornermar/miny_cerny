const mines = [
  {
    id: 1,
    name: "Proudy",
    description: "",
    position: [3, 5],
    year: 2004,
  },
  {
    id: 2,
    name: "Quo Vadis - Trabant",
    description: "",
    position: [3, 3],
    year: 1990,
  },
  {
    id: 3,
    name: "Mimina",
    description: "",
    position: [4, 4],
    year: 2008,
  },
  {
    id: 4,
    name: "Věra",
    description: "",
    position: [5, 4],
    year: 2024,
  },
  {
    id: 5,
    name: "Pomník kapely Visací zámek",
    description: "",
    position: [5, 2],
    year: 2022,
  },
  {
    id: 6,
    name: "Brownnosing",
    description: "",
    position: [6, 3],
    year: 2003,
  },
  {
    id: 7,
    name: "Torzo tanku",
    description: "",
    position: [6, 4],
    year: 2018,
  },

  {
    id: 8,
    name: "Maso",
    description: "",
    position: [9, 4],
    year: 2007,
  },
  {
    id: 10,
    name: "Speederman",
    description: "",
    position: [9, 2],
    year: 2014,
  },
  {
    id: 11,
    name: "Pegasové",
    description: "",
    position: [8, 2],
    year: 2017,
  },
  {
    id: 12,
    name: "Viselec",
    description: "",
    position: [4, 6],
    year: 1997,
  },
  {
    id: 13,
    name: "Máj",
    description: "",
    position: [5, 7],
    year: 2024,
  },
  {
    id: 14,
    name: 'Franz Kafka "K"',
    description: "",
    position: [5, 8],
    year: 2014,
  },
  {
    id: 15,
    name: "Svatý Václav",
    description: "",
    position: [6, 7],
    year: 1999,
  },
  {
    id: 16,
    name: "Miminka",
    description: "",
    position: [6, 9],
    year: 2000,
  },
  {
    id: 16,
    name: "Miminka",
    description: "",
    position: [5, 9],
    year: 2000,
  },
  {
    id: 16,
    name: "Miminka",
    description: "",
    position: [6, 10],
    year: 2000,
  },
  {
    id: 16,
    name: "Miminka",
    description: "",
    position: [6, 8],
    year: 2000,
  },
  {
    id: 16,
    name: "Miminka",
    description: "",
    position: [7, 9],
    year: 2000,
  },
  {
    id: 17,
    name: "Mimino",
    description: "",
    position: [6, 9],
    year: 2000,
  },
  {
    id: 18,
    name: "Lilith",
    description: "",
    position: [3, 9],
    year: 2022,
  },
  {
    id: 19,
    name: "Musoleum",
    description: "",
    position: [10, 4],
    year: 2023,
  },

  {
    id: 21,
    name: "Pamětní deska Václava Havla",
    description: "",
    position: [5, 7],
    year: 2012,
  },
  {
    id: 22,
    name: "H-A-V-E-L",
    description: "",
    position: [6, 6],
    year: 2021,
  },
  {
    id: 23,
    name: "Bar v kavárně Mlýnská",
    description: "",
    position: [4, 3],
  },
  {
    id: 24,
    name: "Tři ženy na domě",
    description: "",
    position: [5, 6],
  },
  {
    id: 25,
    name: "The Italians Wine Food",
    description: "",
    position: [7, 4],
  },
  {
    id: 26,
    name: "Embryo",
    description: "",
    position: [4, 5],
    year: 2008,
  },
  {
    id: 27,
    name: "Trifot",
    description: "",
    position: [10, 1],
    year: 2016,
  },
  {
    id: 28,
    name: "Cyberdog",
    description: "",
    position: [10, 0],
    year: 2018,
  },
  {
    id: 29,
    name: "Brouk",
    description: "",
    position: [10, 9],
    year: 2020,
  },
  {
    id: 30,
    name: "Top Tower",
    description: "",
    position: [9, 0],
    year: 2030,
  },
  {
    id: 31,
    name: "Prostředníček",
    description: "",
    position: [5, 5],
    year: 2013,
  },

  // Mimo mapu nebo se nevejdou
  // {
  //   id: 21,
  //   name: "The London Booster",
  //   description: "Popis",
  //   position: { x: 42, y: 32 },
  // },
  // {
  //   id: 22,
  //   name: "Dáma na židli",
  //   description: "Popis",
  //   position: { x: 46, y: 29 },
  // },
  //  {
  //   id: 20,
  //   name: "In Utero",
  //   description: "Popis",
  //   position: [11, 11],
  // },
  // {
  //   id: 9,
  //   name: "Mimino",
  //   description: "Popis",
  //   position: [11, 4],
  // },
];

function filterMinesByYear(maxYear, excludedIds = []) {
  return mines
    .filter((mine) => mine.year && mine.year <= maxYear && !excludedIds.includes(mine.id))
    .map((mine) => mine.position);
}

const MINES_0 = filterMinesByYear(2013);

const MINES_1 = filterMinesByYear(2025, [31]);

const MINES_2 = filterMinesByYear(2032, [31]);
