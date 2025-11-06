/*
  Global variables for responsive UI element sizes and grid positioning.
  These are recalculated in setSizes().
*/

// Toolbar
let titleTextSize = undefined;
let titleHeight = undefined;
let toolbarHeight = undefined;
let dropdownWidth = undefined;
let dropdownTextSize = undefined;
let arrowSize = undefined;
let displayTextSize = undefined;
let displayWidth = undefined;
let displayHeight = undefined;
let emojiPadding = undefined;

// Status
let statusTextSize = undefined;
let statusLineHeight = undefined;

// Grid
let gridWidth = undefined;
let cellSize = undefined;

let strokeWidth = undefined;

let gridX = undefined;
let gridY = undefined;

/* 
  Responsive canvas utility functions
 */

function setSizes() {
  gridWidth = getResponsiveWidth(gridWidthRatio);
  cellSize = gridWidth / gameState.cols;

  strokeWidth = getResponsiveWidth(strokeWidthRatio);

  titleTextSize = getResponsiveWidth(titleTextSizeRatio);
  titleHeight = getResponsiveWidth(titleHeightRatio);

  toolbarHeight = getResponsiveWidth(toolbarHeightRatio);
  dropdownWidth = getResponsiveWidth(dropdownWidthRatio);
  dropdownTextSize = getResponsiveWidth(dropdownTextSizeRatio);
  displayTextSize = getResponsiveWidth(displayTextSizeRatio);
  arrowSize = getResponsiveWidth(arrowSizeRatio);
  displayWidth = getResponsiveWidth(displayWidthRatio);
  displayHeight = getResponsiveWidth(displayHeightRatio);
  emojiPadding = getResponsiveWidth(emojiPaddingRatio);

  statusTextSize = getResponsiveWidth(statusTextSizeRatio);
  statusLineHeight = getResponsiveWidth(statusLineHeightRatio);

  gridX = (width - gridWidth) / 2;
  gridY = titleHeight + toolbarHeight + strokeWidth * 3;
}

function getResponsiveWidth(ratio) {
  let newSize = ratio * width;
  return newSize;
}

function getCanvasSize() {
  const width = Math.min(window.innerWidth, MAX_CANVAS_WIDTH);
  let height;

  const relativeHeight = width * gridWidthRatio * 2.3;

  if (window.innerHeight < relativeHeight) {
    height = relativeHeight;
    document.body.style.overflowY = 'auto';
  } else {
    height = window.innerHeight;
    document.body.style.overflowY = 'hidden';
  }

  return { width, height };
}

/*
  Cell and map utility functions
*/

function countMinesFromMap(mapConfig) {
  let mineCount = 0;
  for (let row = 0; row < mapConfig.length; row++) {
    for (let col = 0; col < mapConfig[row].length; col++) {
      if (mapConfig[row][col][1] === CELL_TYPES.MINE) {
        mineCount++;
      }
    }
  }
  return mineCount;
}

function isValidCell(row, col, rows, cols) {
  return row >= 0 && row < rows && col >= 0 && col < cols;
}

function getNeighborMineCount(row, col, mapConfig, rows, cols) {
  if (mapConfig[row][col][1] === CELL_TYPES.MINE) {
    return 0;
  }

  let count = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let newRow = row + i;
      let newCol = col + j;
      if (
        isValidCell(newRow, newCol, rows, cols) &&
        mapConfig[newRow][newCol][1] === CELL_TYPES.MINE
      ) {
        count++;
      }
    }
  }
  return count;
}

const getFlaggedCount = (gameState) => {
  let flaggedCount = 0;
  for (let row = 0; row < gameState.rows; row++) {
    for (let col = 0; col < gameState.cols; col++) {
      if (gameState.flagged[row][col]) {
        flaggedCount++;
      }
    }
  }
  return flaggedCount;
};

/*
  Just some utility functions
*/

function isButtonPressed(x, y, w, h) {
  if (
    mouseIsPressed &&
    mouseX >= x &&
    mouseX <= x + w &&
    mouseY >= y &&
    mouseY <= y + h
  ) {
    return true;
  }
  if (
    typeof touches !== 'undefined' &&
    touches.length > 0 &&
    touches[0].x >= x &&
    touches[0].x <= x + w &&
    touches[0].y >= y &&
    touches[0].y <= y + h
  ) {
    return true;
  }
  return false;
}

function formatTime(ms) {
  if (typeof ms !== 'number' || isNaN(ms)) return '0.000';
  return (ms / 1000).toFixed(3);
}

function vibrate(pattern = 35) {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

/*
  UI utility functions
*/

function getEmoji(state) {
  switch (state) {
    case 'lost':
      return emojiSadImg;
    case 'won':
      return emojiGlassesImg;
    default:
      return emojiSmileImg;
  }
}

function drawWrappedText(txt, x, y, maxWidth) {
  const words = txt.split(' ');
  let line = '';
  let lineHeight = textAscent() + textDescent() + strokeWidth / 2;
  let yy = y;
  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' ';
    let testWidth = textWidth(testLine);
    if (testWidth > maxWidth && n > 0) {
      text(line, x, yy);
      line = words[n] + ' ';
      yy += lineHeight;
    } else {
      line = testLine;
    }
  }
  text(line, x, yy);
}

function draw3DRectEffect(
  x,
  y,
  width,
  height,
  isRaised = false,
  strokeWidth = 10,
  fillColor = null
) {
  const colorAdjustment = 30;

  const dark = fillColor
    ? [
        fillColor[0] - colorAdjustment,
        fillColor[1] - colorAdjustment,
        fillColor[2] - colorAdjustment,
      ]
    : COLORS.EFFECT_SHADOW;
  const light = fillColor
    ? [
        fillColor[0] + colorAdjustment,
        fillColor[1] + colorAdjustment,
        fillColor[2] + colorAdjustment,
      ]
    : COLORS.EFFECT_HIGHLIGHT;

  const topLeftColor = isRaised ? light : dark;
  const bottomRightColor = isRaised ? dark : light;

  // First draw the main rectangle background
  fill(fillColor || COLORS.BACKGROUND);
  noStroke();
  rect(x, y, width, height);

  // // Draw beveled edges that go inward from the sides (envelope style)
  noStroke();

  // Top beveled area (trapezoid shape)
  fill(topLeftColor);
  quad(
    x,
    y, // Top-left corner
    x + width,
    y, // Top-right corner
    x + width - strokeWidth,
    y + strokeWidth, // Inner top-right
    x + strokeWidth,
    y + strokeWidth // Inner top-left
  );

  // Left beveled area (trapezoid shape)
  fill(topLeftColor);
  quad(
    x,
    y, // Top-left corner
    x + strokeWidth,
    y + strokeWidth, // Inner top-left
    x + strokeWidth,
    y + height - strokeWidth, // Inner bottom-left
    x,
    y + height // Bottom-left corner
  );

  // Bottom beveled area (trapezoid shape)
  fill(bottomRightColor);
  quad(
    x,
    y + height, // Bottom-left corner
    x + strokeWidth,
    y + height - strokeWidth, // Inner bottom-left
    x + width - strokeWidth,
    y + height - strokeWidth, // Inner bottom-right
    x + width,
    y + height // Bottom-right corner
  );

  // Right beveled area (trapezoid shape)
  fill(bottomRightColor);
  quad(
    x + width,
    y, // Top-right corner
    x + width,
    y + height, // Bottom-right corner
    x + width - strokeWidth,
    y + height - strokeWidth, // Inner bottom-right
    x + width - strokeWidth,
    y + strokeWidth // Inner top-right
  );
}
