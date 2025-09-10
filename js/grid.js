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

      const background = getCellBackground(gameState, row, col);

      // Draw 3D effect for unrevealed cells
      if (!gameState.revealed[row][col] || gameState.flagged[row][col]) {
        draw3DRectEffect(
          x,
          y,
          gameState.cellSize,
          gameState.cellSize,
          true,
          3.5,
          background
        );
      } else {
        stroke(COLORS.EFFECT_SHADOW);
        strokeWeight(1);
        fill(background);
        rect(x, y, gameState.cellSize, gameState.cellSize);
      }

      drawCellContent(gameState, row, col, x, y);
    }
  }
}

function getCellBackground(gameState, row, col) {
  const revealed = gameState.revealed[row][col];
  const flagged = gameState.flagged[row][col];
  const type = gameState.mapConfig[row][col];

  const isEndMine =
    gameState.endMine?.[0] === row && gameState.endMine?.[1] === col;

  if (revealed) {
    if (type === CELL_TYPES.MINE) {
      if (flagged) {
        if (type === CELL_TYPES.RIVER) {
          return COLORS.CELL_RIVER;
        } else {
          return COLORS.BACKGROUND;
        }
      } else {
        if (isEndMine) {
          return COLORS.CELL_MINE;
        } else {
          return COLORS.BACKGROUND;
        }
      }
    } else if (type === CELL_TYPES.RIVER) {
      return COLORS.CELL_RIVER;
    } else {
      if (flagged) {
        return COLORS.CELL_MINE_LIGHT;
      } else {
        return COLORS.BACKGROUND;
      }
    }
  } else {
    if (type === CELL_TYPES.RIVER) {
      return COLORS.CELL_RIVER;
    } else {
      return COLORS.BACKGROUND;
    }
  }
}

function drawCellContent(gameState, row, col, x, y) {
  textAlign(CENTER, CENTER);
  textSize(12);

  if (gameState.flagged[row][col]) {
    textSize(16);

    image(
      flagImg,
      x + gameState.cellSize * 0.1,
      y + gameState.cellSize * 0.1,
      gameState.cellSize * 0.8,
      gameState.cellSize * 0.8
    );
  } else if (gameState.revealed[row][col]) {
    if (gameState.mapConfig[row][col] === CELL_TYPES.MINE) {
      image(
        babyImg,
        x + gameState.cellSize * 0.05,
        y + gameState.cellSize * 0.05,
        gameState.cellSize * 0.9,
        gameState.cellSize * 0.9
      );
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
    push();
    fill(COLORS.NUMBERS[count]);
    textSize(gameState.cellSize * 0.6);
    textStyle(BOLD);
    text(count, x + 1, y + 2);
    pop();
  }
}
