const mines = [
  {
    id: 1,
    name: 'Proudy',
    description:
      'To ses teda nechal*a jednoduše přečůrat.',
    position: [3, 5],
    year: 2004,
  },
  {
    id: 2,
    name: 'Quo Vadis',
    description:
      'V roce 1990 aktuální a dodnes nadčasová socha. Kráčející trabant jsi asi přehlédl*a, protože je schovaný na zahradě německého velvyslanectví.',
    position: [3, 3],
    year: 1990,
  },
  {
    id: 3,
    name: 'Miminka',
    description: 'Zatím jedno z posledních instalovaných kritických děl Davida Černého. Metafora marketingového cejchu, který se nám vráží do tváře už při narození.',
    position: [4, 4],
    year: 2008,
  },
  {
    id: 4,
    name: 'Věra',
    description: 'Ač to vypadá jako památník Spidermana, tak je to Černého hold Věře Čáslavské. Tenhle kolotoč už z hlavy nedostaneš.',
    position: [5, 4],
    year: 2024,
  },
  {
    id: 5,
    name: 'Pomník kapely Visací zámek',
    description: 'Punk\'s not dead, jen trochu zrůžověl. Pomník nesmrtelné kapely od nesmrtelného umělce.',
    position: [5, 2],
    year: 2022,
  },
  {
    id: 6,
    name: 'Brownnosing',
    description: 'Socha z dob, kdy si Černý neodolatelně střílel z „těch nahoře“. Co by tehdejší David Černý řekl na dnešního Davida Černého?',
    position: [6, 3],
    year: 2003,
  },
  {
    id: 7,
    name: 'Torzo tanku',
    description:
      'Mělo tu být jen chvíli. Jak už to ale s díly Davida Černého občas bývá, nakonec tu zůstalo natrvalo.',
    position: [6, 4],
    year: 2018,
  },

  {
    id: 8,
    name: 'Maso',
    description: 'Černého protest proti „auto-civilizaci“ způsobil Knížákův protest proti Černému. Ty neprotestuj a zkus si zahrát znovu.',
    position: [9, 4],
    year: 2007,
  },
  {
    id: 10,
    name: 'Speederman',
    description: 'Speederman v jinonické Waltrovce znázorňuje nadlidskou rychlost vývoje člověka. A možná taky zvyšující se intenzitu spolupráce Davida Černého s developery.',
    position: [9, 2],
    year: 2014,
  },
  {
    id: 11,
    name: 'Pegasové',
    description: 'Napůl koně, napůl motory. Napůl byznys, napůl umění. Ty jsi se ale měl*a vyhnout Černému úplně. Takže to zkus znovu.',
    position: [8, 2],
    year: 2017,
  },
  {
    id: 12,
    name: 'Viselec',
    description: 'A to už si chtěl*a volat hasiče, aby toho chlapa zachránili.',
    position: [4, 6],
    year: 1997,
  },
  {
    id: 13,
    name: 'Butterfly Effect',
    description:
      'Kupodivu i takhle může vypadat „dočasná“ instalace na kulturní památce. Jo a –⁠⁠⁠⁠⁠⁠⁠⁠⁠⁠⁠⁠⁠⁠⁠⁠⁠⁠ nejsou to svítící motýli, ale památník letcům RAF!',
    position: [5, 7],
    year: 2024,
  },
  {
    id: 14,
    name: 'Franz Kafka „K“',
    description:
      'Spletl*a sis snad tuhle otáčející se hlavu s poutačem na Quadrio?',
    position: [5, 8],
    year: 2014,
  },
  {
    id: 15,
    name: 'Svatý Václav',
    description: 'Prý alegorie stavu České republiky. Funguje to i po letech.',
    position: [6, 7],
    year: 1999,
  },
  {
    id: 16,
    name: 'Miminka',
    description:
      'Těchto deset batolat mělo být na Žižkovském vysílači jen dočasně. Díky kladným ohlasům tu ale jsou natrvalo. Kdyby to tak fungovalo i obráceně...',
    position: [6, 9],
    year: 2000,
  },
  {
    id: 16,
    name: 'Miminka',
    description: null,
    position: [5, 9],
    year: 2000,
  },
  {
    id: 16,
    name: 'Miminka',
    description: null,
    position: [6, 10],
    year: 2000,
  },
  {
    id: 16,
    name: 'Miminka',
    description: null,
    position: [6, 8],
    year: 2000,
  },
  {
    id: 16,
    name: 'Miminka',
    description: null,
    position: [7, 9],
    year: 2000,
  },
  {
    id: 17,
    name: 'Mimino',
    description: null,
    position: [6, 9],
    year: 2000,
  },
  {
    id: 18,
    name: 'Lilith',
    description: 'Podle Černého tato karlínská gigantka symbolizuje rovnoprávnost a nezávislost žen. Zajisté, říkáš si, a mimoděk si bůhvíproč vzpomeneš na Dolly Buster.',
    position: [3, 9],
    year: 2022,
  },
  {
    id: 19,
    name: 'Musoleum',
    description: 'Muzeum, nebo showroom? A není to jedno? Tohle sis prostě mohl*a odpustit.',
    position: [10, 4],
    year: 2023,
  },
  {
    id: 21,
    name: 'Pamětní deska Václava Havla',
    description: 'Na tuhle desku se stejně jako na Národní divadlo složil český lid. Ty jsi ale evidentně nepřispěl*a, když jsi na ni šlápl*a.',
    position: [5, 7],
    year: 2012,
  },
  {
    id: 22,
    name: 'H-A-V-E-L',
    description: 'Pro příště, tuto sochu ženy inspirovanou písmenkovou polívkou najdeš nad vstupem do Knihovny Václava Havla.',
    position: [6, 6],
    year: 2021,
  },
  {
    id: 23,
    name: 'Bar v kavárně Mlýnská',
    description:
      'Pozor na dvojchyby! V reálném životě by hrozilo, že tu narazíš i na samotného Černého.',
    position: [4, 3],
    year: 2015,
  },
  {
    id: 24,
    name: 'Tři ženy na domě',
    description: 'Černého raný „take“ na umístění uměleckého díla na kulturní památku. Je to malý a neblýská se to – není divu, že jsi ho přehlédl*a.',
    position: [5, 6],
    year: 2007,
  },
    {
    id: 25,
    name: "The Italians Wine Food",
    description: "Vyčerpaný*á sis skočil*a pro bagetu, kafčo a trochu klidu. Když tu náhle...prostě ses jen nevinně podíval*a na strop a tam na trámu shluk Černého sošek. Kapituluješ.",
    position: [7, 4],
    year: 2020, // unknown
   },
  {
    id: 26,
    name: 'Embryo',
    description: 'Snad se z toho nevyklubou další mimina!',
    position: [4, 5],
    year: 2008,
  },
  {
    id: 27,
    name: 'Trifot',
    description:
      'Aby toho v těch Butovicích nebylo málo, tak tě tu navíc ještě sledují.',
    position: [10, 1],
    year: 2016,
  },
  {
    id: 28,
    name: 'Cyberdog',
    description:
      'Jasně, že jsi na tuhle „vinárnu“ zapomněl*a, když je pořád zavřená. A to do toho Trigema dala víc jak 23 milionů korun.',
    position: [10, 0],
    year: 2018,
  },
  {
    id: 29,
    name: 'Brouk',
    description: 'Šlápnul jsi na auto, které upozorňuje na přemíru aut. Dupni na plyn a dej si ještě jedno kolo!',
    position: [10, 9],
    year: 2020,
  },
  {
    id: 30,
    name: 'Top Tower',
    description: 'Vrak lodi na kopci podepírající mrakodrap. Jak by to měl David Černý ještě vyšperkovat, abys ho nepřehlédl*a?',
    position: [9, 0],
    year: 2030,
  },
  {
    id: 31,
    name: 'Fakáč',
    description:
      'Jak si mohl*a zapomenout na tenhle „normální fakáč těm zm***m komunistickejm zasr**ejm na Hradě“? Plul na Vltavě na pozdim 2013',
    position: [5, 5],
    year: 2013,
  },

  // Mimo mapu nebo se nevejdou nebo nevim
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
    .filter(
      (mine) =>
        mine.year && mine.year <= maxYear && !excludedIds.includes(mine.id)
    )
    .map((mine) => mine.position);
}

const MINES_0 = filterMinesByYear(2013);

const MINES_1 = filterMinesByYear(2025, [6, 31]);

const MINES_2 = filterMinesByYear(2035, [31]);
