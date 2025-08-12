function drawGrid(gameState) {
  // Calculate grid dimensions
  const gridWidth = gameState.cols * gameState.cellSize;
  const gridHeight = gameState.rows * gameState.cellSize;
  const gridX = (window.innerWidth - gridWidth) / 2;

  draw3DRectEffect(
    gridX - TOOLBAR.OFFSET,
    GRID.OFFSET_Y - TOOLBAR.OFFSET,
    gridWidth + TOOLBAR.OFFSET * 2,
    gridHeight + TOOLBAR.OFFSET * 2,
    false,
    TOOLBAR.OFFSET
  );

  for (let row = 0; row < gameState.rows; row++) {
    for (let col = 0; col < gameState.cols; col++) {
      let x = col * gameState.cellSize + gridX;
      let y = row * gameState.cellSize + GRID.OFFSET_Y;

      // Draw cell background
      drawCellBackground(gameState, row, col, x, y);

      // Draw 3D effect for unrevealed cells
      if (!gameState.revealed[row][col]) {
        const cellFillColor =
          gameState.mapConfig[row][col] === CELL_TYPES.RIVER
            ? COLORS.PRIMARY
            : null;
        draw3DRectEffect(
          x,
          y,
          gameState.cellSize,
          gameState.cellSize,
          true,
          2,
          cellFillColor
        );
      } else {
        // Draw cell border only for revealed cells
        stroke(COLORS.EFFECT_SHADOW);
        strokeWeight(1);
        noFill();
        rect(x, y, gameState.cellSize, gameState.cellSize);
      }

      drawCellContent(gameState, row, col, x, y);
    }
  }
}

function drawCellBackground(gameState, row, col, x, y) {
  noStroke();
  if (gameState.revealed[row][col]) {
    if (gameState.mapConfig[row][col] === CELL_TYPES.MINE) {
      fill(COLORS.CELL_MINE);
    } else if (gameState.mapConfig[row][col] === CELL_TYPES.RIVER) {
      fill(COLORS.CELL_RIVER);
    } else {
      fill(COLORS.BACKGROUND);
    }
  } else {
    if (gameState.mapConfig[row][col] === CELL_TYPES.RIVER) {
      fill(COLORS.CELL_RIVER);
    } else {
      fill(COLORS.BACKGROUND);
    }
  }
  rect(x, y, gameState.cellSize, gameState.cellSize);
}

function drawCellContent(gameState, row, col, x, y) {
  fill(COLORS.TEXT_PRIMARY);
  textAlign(CENTER, CENTER);
  textSize(12);

  if (gameState.flagged[row][col]) {
    fill(COLORS.FLAG);
    textSize(16);
    text("🚩", x + gameState.cellSize / 2, y + gameState.cellSize / 2);
  } else if (gameState.revealed[row][col]) {
    if (gameState.mapConfig[row][col] === CELL_TYPES.MINE) {
      fill(COLORS.MINE);
      textSize(16);
      text("🦋", x + gameState.cellSize / 2, y + gameState.cellSize / 2);
    } else {
      let neighborCount = getNeighborMineCount(
        row,
        col,
        gameState.mapConfig,
        gameState.rows,
        gameState.cols
      );
      if (neighborCount > 0) {
        drawNumberWithColor(
          neighborCount,
          x + gameState.cellSize / 2,
          y + gameState.cellSize / 2
        );
      }
    }
  }
}

function drawNumberWithColor(count, x, y) {
  noStroke();
  if (COLORS.NUMBERS[count]) {
    fill(COLORS.NUMBERS[count]);
  } else {
    fill(COLORS.TEXT_PRIMARY);
  }
  textSize(14);
  text(count, x, y);
}
