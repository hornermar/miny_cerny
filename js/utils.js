function countMinesFromMap(mapConfig) {
  let mineCount = 0;
  for (let row = 0; row < mapConfig.length; row++) {
    for (let col = 0; col < mapConfig[row].length; col++) {
      if (mapConfig[row][col] === CELL_TYPES.MINE) {
        mineCount++;
      }
    }
  }
  return mineCount;
}

function countSafeCellsFromMap(mapConfig) {
  let safeCount = 0;
  for (let row = 0; row < mapConfig.length; row++) {
    for (let col = 0; col < mapConfig[row].length; col++) {
      if (mapConfig[row][col] === CELL_TYPES.CITY) {
        safeCount++;
      }
    }
  }
  return safeCount;
}

function isValidCell(row, col, rows, cols) {
  return row >= 0 && row < rows && col >= 0 && col < cols;
}

function isMineCell(row, col, mapConfig) {
  if (
    row < 0 ||
    row >= mapConfig.length ||
    col < 0 ||
    col >= mapConfig[0].length
  ) {
    return false;
  }
  return mapConfig[row][col] === CELL_TYPES.MINE;
}

function getNeighborMineCount(row, col, mapConfig, rows, cols) {
  if (mapConfig[row][col] === CELL_TYPES.MINE) {
    return 0;
  }

  let count = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let newRow = row + i;
      let newCol = col + j;
      if (
        isValidCell(newRow, newCol, rows, cols) &&
        mapConfig[newRow][newCol] === CELL_TYPES.MINE
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

function formatTime(ms) {
  if (typeof ms !== "number" || isNaN(ms)) return "0.000";
  return (ms / 1000).toFixed(3);
}

function drawWrappedText(txt, x, y, maxWidth) {
  const words = txt.split(" ");
  let line = "";
  let lineHeight = textAscent() + textDescent() + 4;
  let yy = y;
  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + " ";
    let testWidth = textWidth(testLine);
    if (testWidth > maxWidth && n > 0) {
      text(line, x, yy);
      line = words[n] + " ";
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
const colorAdjustment = 20;

  const dark = fillColor ? [fillColor[0] - colorAdjustment, fillColor[1] - colorAdjustment, fillColor[2] - colorAdjustment] : COLORS.EFFECT_SHADOW;
  const light = fillColor ? [fillColor[0] + colorAdjustment, fillColor[1] + colorAdjustment, fillColor[2] + colorAdjustment] : COLORS.EFFECT_HIGHLIGHT;

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
