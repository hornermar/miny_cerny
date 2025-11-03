/** 
  Responsive Ratio Constants
  Used for scaling UI elements proportionally to screen size
*/

const strokeWidthRatio = 0.02;

const titleTextSizeRatio = 0.043;
const titleHeightRatio = 0.18;

const toolbarHeightRatio = 0.21;
const dropdownWidthRatio = 0.35;
const dropdownTextSizeRatio = 0.037;
const arrowSizeRatio = 0.02;
const displayTextSizeRatio = 0.12;
const displayWidthRatio = 0.24;
const displayHeightRatio = 0.12;

const emojiPaddingRatio = 0.01;

const statusTextSizeRatio = 0.032;
const statusLineHeightRatio = 0.045;

const gridWidthRatio = 0.82;

/**  
  Canvas Size Limits
*/
const MAX_CANVAS_WIDTH = 425;

/**  
  Font and Game Text 
*/
const FONT_FAMILY = 'Kode Mono';
const TITLE = 'miny_černý';
const LEVEL_NAMES = ['Praha 2013', 'Praha 2025', 'Praha 2035'];

const INTRODUCTION = [
  'Oceňované Černého sochy ostře kritizujou českou společnost. Jeho instalace z peněz developerů Prahu dosud nezaplavují. Zatím je těžké narazit na Černého „minu” omylem.',
  'David Černý svými díly nezastavitelně plní Prahu. V posledních letech k tomu přispívají hlavně jeho spolupráce s developery. Výsledkem je 28 děl rozesetých po městě – a přibývají další.',
  'Už stojí Top Tower? A jsou „dočasní“ Motýli pořád na Máji? Kromě děl vzniklých do roku 2025 v tomto levelu najdeš také budoucí, náhodně se objevující sochy.',
];

const CALL_TO_ACTION = [
  '(Vy)hraj jednoduše!',
  'Zvládneš Prahu odminovat dřív, než bude pozdě?',
  'Je vůbec možný ještě vyhrát?',
];

const WIN = [
  'Odminováno. Našel*a jsi všechny sochy Davida Černého, kontroverzního umělce, který se nebojí tnout do živého.',
  'To byl ale grandiózní slalom mezi minami, gratulace! Moc se ale neraduj. Z médií tušíš, že Černého pražská invaze zdaleka nekončí.',
  'Vyčistil*a jsi hustě zaminované území! Profesionální výkon. Dostáváš nabídky od ukrajinské armády. A David Černý od dalších a dalších firem.',
];

/**
  Colors and cells constants
*/
const PINK = [217, 77, 153];

const COLORS = {
  BACKGROUND: [220, 220, 220],
  PRIMARY: PINK,
  BLACK: [10],
  WHITE: [255, 255, 255],
  GRAY_LIGHT: [200],

  TEXT_PRIMARY: [100],

  CELL_MINE: PINK,
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
