const COMMON = {
  fontFamily: "Kode Mono",
};

const TITLE = {
  OFFSET_Y: 20,
  TEXT_SIZE: 14,
  LABEL: "miny_černý",
};

const LEVEL = {
  NAMES: ["Praha 2000", "Praha 2025", "Praha 2050"],
  BUTTON_WIDTH: 94,
  BUTTON_HEIGHT: 40,
  OFFSET_Y: TITLE.TEXT_SIZE + TITLE.OFFSET_Y + 8,
  TEXT_SIZE: 12,
};

const TOOLBAR = {
  OFFSET_Y: LEVEL.BUTTON_HEIGHT + LEVEL.OFFSET_Y + 18,
  OFFSET: 7,
  TEXT_SIZE: 40,
  HEIGHT: 80,
};

const DISPLAY = {
  WIDTH: 98,
  HEIGHT: 50,
  TEXT_SIZE: 52,
};

const GRID = {
  MIN_CELL_SIZE: 20,
  MAX_CELL_SIZE: 30,
  ROWS: MAP.length,
  COLS: MAP[0].length,
  OFFSET_X: 14,
  OFFSET_Y: TOOLBAR.HEIGHT + TOOLBAR.OFFSET_Y + 18,
};

const STATUS = {
  HEIGHT: 100,
  TEXT_SIZE: 10,
  OFFSET_Y: 20,
  MINE_INFO_OFFSET_Y: 60,
};

const pink = [217, 77, 153];

const COLORS = {
  BACKGROUND: [220, 220, 220],
  PRIMARY: pink,
  BLACK: [10, 10, 10],

  TEXT_PRIMARY: [100],
  // TEXT_TITLE: [34, 34, 34],
  // TEXT_WIN: [76, 175, 80],
  // TEXT_LOSE: [244, 67, 54],

  CELL_MINE: pink,
  CELL_MINE_LIGHT: [235, 157, 199],
  CELL_RIVER: [180, 180, 180],

  EFFECT_HIGHLIGHT: [255, 255, 255],
  EFFECT_SHADOW: [200, 200, 200],
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
