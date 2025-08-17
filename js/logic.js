function revealCell(row, col) {
  if (
    !isValidCell(row, col, gameState.rows, gameState.cols) ||
    gameState.revealed[row][col] ||
    gameState.flagged[row][col]
  ) {
    return;
  }

  gameState.revealed[row][col] = true;

  if (gameState.mapConfig[row][col] === CELL_TYPES.MINE) {
    gameState.currentGameState = "lost";
    revealAllMines();
    gameState.endMine = [row, col];
    gameState.endTime = Date.now();
    return;
  }

  if (
    getNeighborMineCount(
      row,
      col,
      gameState.mapConfig,
      gameState.rows,
      gameState.cols
    ) === CELL_TYPES.CITY
  ) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        revealCell(row + i, col + j);
      }
    }
  }

  checkWin();
}

function toggleFlag(row, col) {
  if (
    !isValidCell(row, col, gameState.rows, gameState.cols) ||
    gameState.revealed[row][col]
  ) {
    return;
  }

  gameState.flagged[row][col] = !gameState.flagged[row][col];
}

function revealAllMines() {
  for (let row = 0; row < gameState.rows; row++) {
    for (let col = 0; col < gameState.cols; col++) {
      if (gameState.mapConfig[row][col] === CELL_TYPES.MINE) {
        gameState.revealed[row][col] = true;
      }
    }
  }
}

function checkWin() {
  let revealedCount = 0;
  let totalSafeCells = gameState.rows * gameState.cols - gameState.totalMines;

  for (let row = 0; row < gameState.rows; row++) {
    for (let col = 0; col < gameState.cols; col++) {
      if (
        gameState.revealed[row][col] &&
        gameState.mapConfig[row][col] !== CELL_TYPES.MINE
      ) {
        revealedCount++;
      }
    }
  }

  if (revealedCount === totalSafeCells) {
    gameState.currentGameState = "won";
    gameState.endTime = Date.now();
  }
}

function revealSafeNeighbors(row, col) {
  if (!gameState.revealed[row][col]) return;
  const neighborMines = getNeighborMineCount(
    row, col,
    gameState.mapConfig,
    gameState.rows,
    gameState.cols
  );
  if (neighborMines < 1) return;

  // Count flagged neighbors
  let flaggedCount = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const nRow = row + i, nCol = col + j;
      if (isValidCell(nRow, nCol, gameState.rows, gameState.cols) && gameState.flagged[nRow][nCol]) {
        flaggedCount++;
      }
    }
  }
  if (flaggedCount === neighborMines) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const nRow = row + i, nCol = col + j;
        if (
          isValidCell(nRow, nCol, gameState.rows, gameState.cols) &&
          !gameState.flagged[nRow][nCol] &&
          !gameState.revealed[nRow][nCol]
        ) {
          revealCell(nRow, nCol);
        }
      }
    }
  }
}

function addRandomMines(probability) {
  for (let row = 0; row < gameState.rows; row++) {
    for (let col = 0; col < gameState.cols; col++) {
      if (
        gameState.mapConfig[row][col] !== CELL_TYPES.MINE &&
        gameState.mapConfig[row][col] !== CELL_TYPES.RIVER
      ) {
        if (Math.random() < probability) {
          gameState.mapConfig[row][col] = CELL_TYPES.MINE;
        }
      }
    }
  }
}
