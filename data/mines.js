const mines = [
  {
    id: 1,
    name: "Proudy",
    description: "Popis",
    position: [3, 5],
  },
  {
    id: 2,
    name: "Quo Vadis - Trabant",
    description: "Popis",
    position: [3, 4],
  },
  {
    id: 3,
    name: "Mimina",
    description: "Popis",
    position: [4, 5],
  },
  {
    id: 4,
    name: "Věra",
    description: "Popis",
    position: [5, 5],
  },
  {
    id: 5,
    name: "Pomník kapely Visací zámek",
    description: "Popis",
    position: [5, 3],
  },
  {
    id: 6,
    name: "Brownnosing",
    description: "Popis",
    position: [6, 3],
  },
  {
    id: 7,
    name: "Torzo tanku",
    description: "Popis",
    position: [6, 4],
  },

  {
    id: 8,
    name: "Maso",
    description: "Auta na MeetFactory jsou už od roku 2007.",
    position: [10, 4],
  },
  {
    id: 9,
    name: "Mimino",
    description: "Popis",
    position: [11, 5],
  },

  {
    id: 10,
    name: "Speederman",
    description: "Popis",
    position: [8, 2],
  },
  {
    id: 11,
    name: "Pegasové",
    description: "Napůl koně a napůl motory?",
    position: [9, 2],
  },
  {
    id: 12,
    name: "Viselec",
    description: "Hasiče nevolej. Ale přehlédl si sochu Sigmunda Freuda.",
    position: [4, 7],
  },
  {
    id: 13,
    name: "Máj",
    description:
      "Myslel*a sis, že jde o dočasnou instalaci, co? Tak tu pořád je!",
    position: [5, 8],
  },
  {
    id: 14,
    name: 'Franz Kafka "K"',
    description: "To si přes ty davy turistů netušil*a, že se tady něco děje?",
    position: [5, 9],
  },
  {
    id: 15,
    name: "Svatý Václav",
    description: "Popis",
    position: [6, 9],
  },
  {
    id: 16,
    name: "Miminka",
    description:
      "Věděl*a si, že původně šlo o dočasnou instalaci, ale díky kladnému ohlasu zůstala natrvalo? Škoda, že to tak nefunguje i obráceně.",
    position: [6, 9],
  },
  {
    id: 16,
    name: "Miminka",
    description: "",
    position: [6, 10],
  },
  {
    id: 16,
    name: "Miminka",
    description: "",
    position: [7, 10],
  },
  {
    id: 16,
    name: "Miminka",
    description: "",
    position: [7, 9],
  },
  {
    id: 18,
    name: "Lilith",
    description: 'Narazil*a jsi na "symbol rovnoprávnosti a nezávisloti žen".',
    position: [3, 9],
  },
  {
    id: 19,
    name: "Musoleum",
    description: "Popis",
    position: [10, 5],
  },

  {
    id: 21,
    name: "Pamětní deska Václava Havla",
    description: "Popis",
    position: [5, 8],
  },
  {
    id: 22,
    name: "H-A-V-E-L",
    description: "Popis",
    position: [6, 7],
  },
  {
    id: 23,
    name: "Bar v kavárně Mlýnská",
    description: "Popis",
    position: [4, 4],
  },
  {
    id: 24,
    name: "Tři ženy na domě",
    description: "Popis",
    position: [5, 7],
  },
  {
    id: 25,
    name: "The Italians Wine Food",
    description: "Popis",
    position: [8, 5],
  },
  {
    id: 26,
    name: "Embryo",
    description:
      "Není zas tak vidět. Bylo vytvořeno k 50. výročí divadla Na zábradlí.",
    position: [6, 8], // Není ideální umítění. Posunout - ale není už kam! :)
  },
  {
    id: 12,
    name: "Trifot",
    description: "Popis",
    position: [11, 0],
  },
  {
    id: 13,
    name: "Cyberdog",
    description: "Popis",
    position: [11, 1],
  },
  //   {
  //   id: 20,
  //   name: "Brouk",
  //   description: "Popis",
  //   position: { x: 35, y: 30 },
  // },
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
];

const mines0Ids = [2, 12, 15, 16];
const MINES_0 = mines
  .filter((mine) => mines0Ids.includes(mine.id))
  .map((mine) => mine.position);

const MINES_1 = mines.map((mine) => mine.position);

const MINES_2 = mines.map((mine) => mine.position);
