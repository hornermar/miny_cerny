function drawGrid(gameState) {
  const gridHeight = gameState.rows * cellSize;

  draw3DRectEffect(
    gridX - strokeWidth,
    gridY - strokeWidth,
    gridWidth + strokeWidth * 2,
    gridHeight + strokeWidth * 2,
    false,
    strokeWidth
  );

  for (let row = 0; row < gameState.rows; row++) {
    for (let col = 0; col < gameState.cols; col++) {
      let x = col * cellSize + gridX;
      let y = row * cellSize + gridY;

      const background = getCellBackground(gameState, row, col);

      // Draw 3D effect for unrevealed cells
      if (!gameState.revealed[row][col] || gameState.flagged[row][col]) {
        draw3DRectEffect(
          x,
          y,
          cellSize,
          cellSize,
          true,
          strokeWidth / 2,
          background
        );
      } else {
        stroke(COLORS.EFFECT_SHADOW);
        strokeWeight(1);
        fill(background);
        rect(x, y, cellSize, cellSize);
      }

      drawCellContent(gameState, row, col, x, y);
    }
  }
}

function getCellBackground(gameState, row, col) {
  const revealed = gameState.revealed[row][col];
  const flagged = gameState.flagged[row][col];
  const cellType = gameState.mapConfig[row][col][0];

  const isMine = gameState.mapConfig[row][col][1] === 1;

  const isEndMine =
    gameState.endMine?.[0] === row && gameState.endMine?.[1] === col;

  if (revealed) {
    if (isMine) {
      if (flagged) {
        if (cellType === CELL_TYPES.RIVER) {
          return COLORS.CELL_RIVER;
        } else {
          return COLORS.BACKGROUND;
        }
      } else {
        if (isEndMine) {
          return COLORS.CELL_MINE;
        } else if (cellType === CELL_TYPES.RIVER) return COLORS.CELL_RIVER;
        {
          return COLORS.BACKGROUND;
        }
      }
    } else if (cellType === CELL_TYPES.RIVER) {
      return COLORS.CELL_RIVER;
    } else {
      if (flagged) {
        return COLORS.CELL_MINE_LIGHT;
      } else {
        return COLORS.BACKGROUND;
      }
    }
  } else {
    if (cellType === CELL_TYPES.RIVER) {
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
      x + cellSize * 0.1,
      y + cellSize * 0.1,
      cellSize * 0.8,
      cellSize * 0.8
    );
  } else if (gameState.revealed[row][col]) {
    if (gameState.mapConfig[row][col][1] === CELL_TYPES.MINE) {
      image(
        babyImg,
        x + cellSize * 0.05,
        y + cellSize * 0.05,
        cellSize * 0.9,
        cellSize * 0.9
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
        drawNumberWithColor(neighborCount, x + cellSize / 2, y + cellSize / 2);
      }
    }
  }
}

function drawNumberWithColor(count, x, y) {
  noStroke();

  if (COLORS.NUMBERS[count]) {
    push();
    fill(COLORS.NUMBERS[count]);
    textSize(cellSize * 0.6);
    textStyle(BOLD);
    text(count, x + 1, y + 2);
    pop();
  }
}
