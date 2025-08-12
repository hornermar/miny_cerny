let gameState = {
  rows: GRID.ROWS,
  cols: GRID.COLS,
  cellSize: GRID.MIN_CELL_SIZE,
  totalMines: 0,
  currentGameState: "not started", // 'not started', 'playing', 'won', 'lost'
  revealed: [],
  flagged: [],
  mapConfig: MAP,
  startTime: null,
};

let touchStartTime = null;
const LONG_TOUCH_DURATION = 500;

function initializeGame() {
  gameState.totalMines = countMinesFromMap(gameState.mapConfig);

  const gridBorderWidth = TOOLBAR.OFFSET * 2;
  const maxCellSizeByWidth = Math.floor(
    (window.innerWidth - GRID.OFFSET_X * 2 - gridBorderWidth) / gameState.cols
  );

  gameState.cellSize = Math.max(maxCellSizeByWidth, GRID.MIN_CELL_SIZE);

  for (let row = 0; row < gameState.rows; row++) {
    gameState.revealed[row] = [];
    gameState.flagged[row] = [];
    for (let col = 0; col < gameState.cols; col++) {
      gameState.revealed[row][col] = false;
      gameState.flagged[row][col] = false;
    }
  }
}

function revealCell(row, col) {
  if (
    !isValidCell(row, col, gameState.rows, gameState.cols) ||
    gameState.revealed[row][col] ||
    gameState.flagged[row][col]
  ) {
    return;
  }

  gameState.revealed[row][col] = true;

  // If clicked on mine
  if (gameState.mapConfig[row][col] === CELL_TYPES.MINE) {
    gameState.currentGameState = "lost";
    revealAllMines();
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
  }
}

function resetGame() {
  gameState.currentGameState = "not started";
  gameState.firstClick = true;
  gameState.startTime = null;
  initializeGame();
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(COLORS.BACKGROUND);

  initializeGame();

  // Prevent right-click context menu on the canvas
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    return false;
  });
}

function touchStarted() {
  touchStartTime = Date.now();
}

function touchEnded() {
  if (!touchStartTime) return true;

  const duration = Date.now() - touchStartTime;
  touchStartTime = null;

  // Check if reset button was touched
  const btn = window.resetButton;
  if (
    btn &&
    mouseX >= btn.x &&
    mouseX <= btn.x + btn.width &&
    mouseY >= btn.y &&
    mouseY <= btn.y + btn.height
  ) {
    resetGame();
    return false;
  }

  // Compute cell coordinates once
  const gridX = (window.innerWidth - gameState.cols * gameState.cellSize) / 2;
  const col = Math.floor((mouseX - gridX) / gameState.cellSize);
  const row = Math.floor((mouseY - GRID.OFFSET_Y) / gameState.cellSize);
  const isInGameArea = isValidCell(row, col, gameState.rows, gameState.cols);

  if (!isInGameArea) return false;

  if (duration >= LONG_TOUCH_DURATION) {
    toggleFlag(row, col);
  } else {
    if (gameState.currentGameState === "not started") {
      gameState.startTime = Date.now();
      gameState.currentGameState = "playing";
    }
    revealCell(row, col);
  }
  return false;
}

function draw() {
  textFont("Kode Mono");
  drawGame(gameState);
}

function mousePressed() {
  // Check if resetButton button was clicked
  if (
    window.resetButton &&
    mouseX >= window.resetButton.x &&
    mouseX <= window.resetButton.x + window.resetButton.width &&
    mouseY >= window.resetButton.y &&
    mouseY <= window.resetButton.y + window.resetButton.height
  ) {
    console.log("resetButton button clicked");
    resetGame();
    return;
  }

  const gridX = (window.innerWidth - gameState.cols * gameState.cellSize) / 2;
  const col = Math.floor((mouseX - gridX) / gameState.cellSize);
  const row = Math.floor((mouseY - GRID.OFFSET_Y) / gameState.cellSize);
  const isInGameArea = isValidCell(row, col, gameState.rows, gameState.cols);

  if (isInGameArea && gameState.currentGameState === "not started") {
    gameState.startTime = Date.now();
    gameState.currentGameState = "playing";
  }

  if (mouseButton === LEFT) {
    if (isInGameArea) {
      revealCell(row, col);
    }
  } else if (mouseButton === RIGHT) {
    if (isInGameArea) {
      toggleFlag(row, col);
    }
  }
}

// p5.js keyboard event
function keyPressed() {
  if (key === "r" || key === "R") {
    resetGame();
  }
}

function drawGame(gameState) {
  drawToolbar(gameState);
  drawGrid(gameState);
  //drawGameStatus(gameState);
}
