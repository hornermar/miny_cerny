const TOOLBAR = {
  OFFSET_Y: 20,
  OFFSET: 7,
  TEXT_SIZE: 40,
  HEIGHT: 80,
};

const DISPLAY = {
  WIDTH: 80,
  HEIGHT: 52,
};

const GRID = {
  MIN_CELL_SIZE: 10,
  ROWS: MAP.length,
  COLS: MAP[0].length,
  OFFSET_X: 14,
  OFFSET_Y: TOOLBAR.HEIGHT + TOOLBAR.OFFSET_Y * 2,
};

const COLORS = {
  BACKGROUND: [150, 150, 150],
  PRIMARY: [9, 181, 230],

  TEXT_PRIMARY: [51, 51, 51],
  TEXT_TITLE: [34, 34, 34],
  TEXT_WIN: [76, 175, 80],
  TEXT_LOSE: [244, 67, 54],

  CELL_MINE: [178, 45, 192],
  CELL_RIVER: [9, 181, 230],

  FLAG: [244, 67, 54],
  MINE: [178, 45, 192],

  EFFECT_HIGHLIGHT: [200, 200, 200],
  EFFECT_SHADOW: [100, 100, 100],

  //TODO: Change colors
  NUMBERS: {
    1: [33, 150, 243], // Blue
    2: [76, 175, 80], // Green
    3: [255, 87, 34], // Deep orange
    4: [156, 39, 176], // Purple
    5: [233, 30, 99], // Pink
    6: [0, 188, 212], // Cyan
    7: [96, 125, 139], // Blue gray
    8: [121, 85, 72], // Brown
  },
};
