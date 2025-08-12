const LEVEL = {
  NAMES: ["Začátečník", "Pokročilý", "Praha 2050"],
  BUTTON_WIDTH: 90,
  BUTTON_HEIGHT: 32,
  SPACING: 18,
  OFFSET_Y: 16,
  TEXT_SIZE: 13,
};

const TOOLBAR = {
  OFFSET_Y: LEVEL.BUTTON_HEIGHT + LEVEL.OFFSET_Y * 2,
  OFFSET: 7,
  TEXT_SIZE: 40,
  HEIGHT: 80,
};

const DISPLAY = {
  WIDTH: 76,
  HEIGHT: 44,
  TEXT_SIZE: 42,
};

const GRID = {
  MIN_CELL_SIZE: 10,
  ROWS: MAP.length,
  COLS: MAP[0].length,
  OFFSET_X: 14,
  OFFSET_Y: TOOLBAR.HEIGHT + TOOLBAR.OFFSET_Y + LEVEL.OFFSET_Y,
};

const COLORS = {
  BACKGROUND: [186, 184, 186],
  PRIMARY: [0, 129, 221],

  TEXT_PRIMARY: [51, 51, 51],
  TEXT_TITLE: [34, 34, 34],
  TEXT_WIN: [76, 175, 80],
  TEXT_LOSE: [244, 67, 54],

  CELL_MINE: [178, 45, 192],
  CELL_RIVER: [0, 129, 221],

  FLAG: [244, 67, 54],
  MINE: [178, 45, 192],

  EFFECT_HIGHLIGHT: [227, 225, 227],
  EFFECT_SHADOW: [135, 134, 135],

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
