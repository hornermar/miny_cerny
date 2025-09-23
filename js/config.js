const COMMON = {
  fontFamily: "Kode Mono",
};

const TITLE = {
  OFFSET_Y: 34,
  TEXT_SIZE: 16,
  LABEL: "miny_černý",
};

const INTRODUCTION = [
  "Tady díla spojený s developerama ještě nehledej. Zato tu ještě najdeš ostrou kritiku český společnosti. ",
  "Díla Davida Černýho nezastavitelně obsazujou Prahu. Motýli jsou pořád na Máji. 26 “min” na takový prostor není zrovna málo. Šance na výhru ale pořád je.",
  "Už stojí Top Tower? A jsou Motýli pořád na Máji? Kromě děl vzniklých do roku 2025 v tomhle levelu najdeš také budoucí, náhodně se objevující sochy. Je vůbec možný ještě vyhrát?",
];

const WIN = [
  "Odminováno. V tomto případě je to ale možná ještě škoda.",
  "Odminováno!",
  ""
]

const LOSS = [
  "",
  "",
  ""
]

const dropdownHeight = 40;

const LEVEL = {
  NAMES: ["Praha 2013", "Praha 2025", "Praha 2032"],
  TEXT_SIZE: 14,
  DROPDOWN_WIDTH: 130,
  DROPDOWN_HEIGHT: dropdownHeight,
  INNER_OFFSET_X: 14,
  OFFSET_Y: TITLE.OFFSET_Y - dropdownHeight / 2,
};

const TOOLBAR = {
  OFFSET_Y: LEVEL.DROPDOWN_HEIGHT + LEVEL.OFFSET_Y + 18,
  OFFSET: 7,
  TEXT_SIZE: 40,
  HEIGHT: 80,
};

const DISPLAY = {
  WIDTH: 98,
  HEIGHT: 50,
  TEXT_SIZE: 52,
  FRAME: 3,
};

const GRID = {
  MIN_CELL_SIZE: 20,
  MAX_CELL_SIZE: 28,
  ROWS: MAP.length,
  COLS: MAP[0].length,
  OFFSET_X: 14,
  OFFSET_Y: TOOLBAR.HEIGHT + TOOLBAR.OFFSET_Y + 18,
};

const STATUS = {
  HEIGHT: 100,
  TEXT_SIZE: 12,
  OFFSET_Y: 30,
  LINE_HEIGHT: 55,
  LINE_HEIGHT_SMALL: 30
};

const pink = [217, 77, 153];

const COLORS = {
  BACKGROUND: [220, 220, 220],
  PRIMARY: pink,
  BLACK: [10],
  WHITE: [255, 255, 255],
  GRAY_LIGHT: [200],

  TEXT_PRIMARY: [100],

  CELL_MINE: pink,
  CELL_MINE_LIGHT: [235, 157, 199],
  CELL_RIVER: [180, 180, 180],

  EFFECT_HIGHLIGHT: [255],
  EFFECT_SHADOW: [170],
};

COLORS.NUMBERS = {
  1: COLORS.EFFECT_HIGHLIGHT,
  2: COLORS.PRIMARY,
  3: [80, 80, 80],
  4: COLORS.PRIMARY.map((item) => item + 33),
  5: [50, 50, 50],
  6: COLORS.PRIMARY.map((item) => item - 70),
  7: COLORS.TEXT_PRIMARY,
  8: COLORS.BLACK,
};

const CELL_TYPES = {
  CITY: 0,
  MINE: 1,
  RIVER: 2,
};
