const mines = [
  {
    id: 1,
    name: "Proudy",
    description: "Popis",
    position: [3, 4],
  },
  {
    id: 2,
    name: "Quo Vadis - Trabant",
    description: "Popis",
    position: [3, 3],
  },
  {
    id: 3,
    name: "Babies",
    description: "Popis",
    position: [4, 4],
  },
  {
    id: 4,
    name: "Věra",
    description: "Popis",
    position: [5, 4],
  },
  {
    id: 5,
    name: "Pomník kapely Visací zámek",
    description: "Popis",
    position: [5, 2],
  },
  {
    id: 6,
    name: "Brownnosing",
    description: "Popis",
    position: [6, 2],
  },
  {
    id: 7,
    name: "Torzo tanku",
    description: "Popis",
    position: [6, 3],
  },

  {
    id: 8,
    name: "Maso",
    description: "Popis",
    position: [10, 3],
  },
  {
    id: 9,
    name: "Mimino",
    description: "Popis",
    position: [11, 4],
  },

  {
    id: 10,
    name: "Speederman",
    description: "Popis",
    position: [9, 0],
  },
  {
    id: 11,
    name: "Pegasové",
    description: "Popis",
    position: [10, 0],
  },
  {
    id: 12,
    name: "Viselec",
    description: "Popis",
    position: [4, 6],
  },
  {
    id: 13,
    name: "Máj",
    description: "Popis",
    position: [5, 7],
  },
  {
    id: 14,
    name: 'Franz Kafka "K"',
    description: "Popis",
    position: [5, 8],
  },
  {
    id: 15,
    name: "Svatý Václav",
    description: "Popis",
    position: [6, 8],
  },
  {
    id: 16,
    name: "Miminka",
    description: "Popis",
    position: [5, 9],
  },
  {
    id: 17,
    name: "Mimino",
    description: "Popis",
    position: [6, 9],
  },
  {
    id: 18,
    name: "Lilith",
    description: "Popis",
    position: [3, 9],
  },
  {
    id: 19,
    name: "Musoleum",
    description: "Popis",
    position: [10, 4],
  },
  
     {
    id: 21,
    name: "Pamětní deska Václava Havla",
    description: "Popis",
    position: [5, 7],
  },
   {
    id: 22,
    name: "H-A-V-E-L",
    description: "Popis",
    position: [6, 6],
  },
     {
    id: 23,
    name: "Kavárna Mlýnská",
    description: "Popis",
    position: [4, 3],
  },
     {
    id: 24,
    name: "Tři ženy na domě",
    description: "Popis",
    position: [5, 6],
  },
   {
    id: 25,
    name: "The Italians Wine Food",
    description: "Popis",
    position: [7, 4],
  },
   {
    id: 26,
    name: "Embryo",
    description: "Popis",
    position: [6, 7], // Není ideální umítění. Posunout - ale není už kam! :)
  },
  // Mimo mapu
  // {
  //   id: 12,
  //   name: "Trifot",
  //   description: "Popis",
  //   position: { x: 19, y: 29 },
  // },
  // {
  //   id: 13,
  //   name: "Cyberdog",
  //   description: "Popis",
  //   position: { x: 18, y: 31 },
  // },
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

const MINES_1 = mines.map(artwork => artwork.position);
const MINES_0 = []
const MINES_2 = []