const mines = [
  {
    id: 1,
    name: 'Proudy',
    description:
      'Dvě mužské postavy močící do nádrže ve tvaru České republiky.',
    position: [3, 5],
    year: 2004,
  },
  {
    /*
    Tenhle trabant stojí na dvoře německého velvyslanectví.
    Praha má v roce 1990 ještě v dobré paměti, jak přes ni před pár měsíci utíkaly tisíce východních Němců na Západ, 
    které tu kolem západonněmecké ambaasády, vydávající jim víza, po sobě zanechávali opuštěné duroplastové symboly pomalu zanikající NDR. 
    Použije jeden z nich a přidělá mu nohy. Dnes stojí na dvoře německého velvyslanectví v Lobkovickém paláci.
    */
    id: 2,
    name: 'Quo Vadis (Trabant)',
    description:
      'Tenhle kráčející trabant stojí na dvoře německého velvyslanectví.',
    position: [3, 3],
    year: 1990,
  },
  {
    /*
    Kampa. Metafora marketingového cejchu, který se nám vráží do tváře už při narození. Plazící se batole s čárovým kódem místo obličeje.
    */
    id: 3,
    name: 'Mimina',
    description: '',
    position: [4, 4],
    year: 2008,
  },
  {
    /*
    „I já děkuji společnosti Rockaway. Ve spolupráci s ní jsme udělali ze sochy vlastně takovou chladničku na kolečkách, 
    která se dá převézt rudlíkem. Jen tak jsme mohli obejít stavební povolení, 
    o které bychom museli bojovat s Klubem za zasranou Pra.., ehm, pardon, s Klubem za starou Prahu“
    */
    id: 4,
    name: 'Věra',
    description: '',
    position: [5, 4],
    year: 2024,
  },
  {
    /*
    Odhalen u příležitosti 40ti letům působení známé české punkové skupiny Visací zámek.
    */
    id: 5,
    name: 'Pomník kapely Visací zámek',
    description: '',
    position: [5, 2],
    year: 2022,
  },
  {
    /*
     */
    id: 6,
    name: 'Brownnosing',
    description: '',
    position: [6, 3],
    year: 2003,
  },
  {
    /*
    Nejdříve měl Černý povolení umístit zde torzo tanku jen na pár dní, 
    nakonec se však společně s vedením městské části i s památkáři domluvili a torzo zde zůstalo natrvalo.
    */
    id: 7,
    name: 'Torzo tanku',
    description:
      'Mělo tu být jen chvíli, ale jak už to s díly Davida Černého bývá, nakonec tu zůstalo natrvalo.',
    position: [6, 4],
    year: 2018,
  },

  {
    /*
    Dílo David vystavoval ve finále ceny Jindřicha Chalupeckého v roce 2000. 
    Tu v tomto roce vyhrál. Dnes jsou auta azvěšená na MeetFactory.
    */
    id: 8,
    name: 'Maso',
    description: '',
    position: [9, 4],
    year: 2007,
  },
  {
    /*
    Korpo-Speederman pro developery z Waltrovky.
    Penta, Wlatrovka. Korporátní umění.
    */
    id: 10,
    name: 'Speederman',
    description: '',
    position: [9, 2],
    year: 2014,
  },
  {
    /*
    Stojí před budovou s luxusními apartmány Waltrovka společnosti Penta Investments.
    */
    id: 11,
    name: 'Pegasové',
    description: '',
    position: [8, 2],
    year: 2017,
  },
  {
    id: 12,
    name: 'Viselec',
    description: 'A to už si chtěl*a volat hasiče, aby toho Freuda zachránili.',
    position: [4, 6],
    year: 1997,
  },
  {
    id: 13,
    name: 'Butterfly Effect',
    description:
      'Kupodivu i takhle může vypadat „dočasná“ instalace na kulturní památce.',
    position: [5, 7],
    year: 2024,
  },
  {
    id: 14,
    name: 'Franz Kafka "K"',
    description:
      'Spletl*a sis snad tuhle otáčející se hlavu s poutačem na Qadrio?',
    position: [5, 8],
    year: 2014,
  },
  {
    /*
    V Lucerně je tu už od roku 2000. Měla znázornit aktuální stav České republiky očima Davida Černého 
    – nefunguje, ale všichni děláme „jakoby nic“
    */
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
      'Těhle deset batolat mělo být na Žižkovském vysílači jen dočasně. Díky kladným ohlasům tu jsou ale natrvalo. Kdyby to tak fungovalo i obráceně...',
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
    /*
    Rovnoprávnost žen s logem Trigemy.
    Trigema. Podle umělce má Lilith symbolizovat rovnoprávnost a nezávislost žen. Přitom ...
    */
    id: 18,
    name: 'Lilith',
    description: '',
    position: [3, 9],
    year: 2022,
  },
  {
    id: 19,
    name: 'Musoleum',
    description: 'Místo posledního odpočinku, nebo showroom Černého děl?',
    position: [10, 4],
    year: 2023,
  },
  {
    /*
     */
    id: 21,
    name: 'Pamětní deska Václava Havla',
    description: '',
    position: [5, 7],
    year: 2012,
  },
  {
    /*
     */
    id: 22,
    name: 'H-A-V-E-L',
    description: '',
    position: [6, 6],
    year: 2021,
  },
  {
    id: 23,
    name: 'Bar v kavárně Mlýnská',
    description:
      'A pozor, v reálným životě by hrozilo, že tu narazíš na samotného Černého.',
    position: [4, 3],
    year: 2015,
  },
  {
    /*
     */
    id: 24,
    name: 'Tři ženy na domě',
    description: '',
    position: [5, 6],
    year: 2007,
  },
  // {
  //   id: 25,
  //   name: "The Italians Wine Food",
  //   description: "",
  //   position: [7, 4],
  // },
  {
    /*
    Darováno Divadlu na Zábradlí k padesátým narozeninám.
    */
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
      'Jako by toho v těch Butovicích bylo málo, tak tě tu navíc ještě sledují.',
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
    /*
    Investorem je společnost Passerinvest Group. Socha podle svého autora upozorňuje na přílišnou společenskou náklonost automobilismu
    */
    id: 29,
    name: 'Brouk',
    description: '',
    position: [10, 9],
    year: 2020,
  },
  {
    /*
     */
    id: 30,
    name: 'Top Tower',
    description: 'Tak je to teda greenwashing nebo ne?',
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
    .filter(
      (mine) =>
        mine.year && mine.year <= maxYear && !excludedIds.includes(mine.id)
    )
    .map((mine) => mine.position);
}

const MINES_0 = filterMinesByYear(2013);

const MINES_1 = filterMinesByYear(2025, [6, 31]);

const MINES_2 = filterMinesByYear(2035, [31]);
