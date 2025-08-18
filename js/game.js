let gameState = {
  rows: GRID.ROWS,
  cols: GRID.COLS,
  cellSize: GRID.MIN_CELL_SIZE,
  gridWidth: null,
  totalMines: 0,
  currentGameState: "not started", // 'not started', 'playing', 'won', 'lost'
  revealed: [],
  flagged: [],
  mapConfig: MAP,
  startTime: null,
  level: 1, // 0, 1, 2
  endMine: null,
  endTime: null
};

let touchStartTime = null;
const LONG_TOUCH_DURATION = 500;
const minesArray = [MINES_0, MINES_1, MINES_2];

let babyImg;

function preload() {
  babyImg = loadImage("assets/baby.png");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(COLORS.BACKGROUND);
  textFont(COMMON.fontFamily);
  initializeGame();

  // Prevent right-click context menu on the canvas
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    return false;
  });
}

function initializeGame() {
  gameState.mapConfig = MAP.map((row) => row.slice());

  const minePositions = minesArray[gameState.level];
  for (const [row, col] of minePositions) {
    gameState.mapConfig[row][col] = CELL_TYPES.MINE;
  }

  if (gameState.level === 2) {
    addRandomMines(0.7);
  }

  gameState.totalMines = countMinesFromMap(gameState.mapConfig);

  const gridBorderWidth = TOOLBAR.OFFSET * 2;
  const gridWidth = window.innerWidth - GRID.OFFSET_X * 2 - gridBorderWidth;
  const calculatedCellSize = Math.floor(gridWidth / gameState.cols);

  gameState.cellSize = Math.max(
    GRID.MIN_CELL_SIZE,
    Math.min(calculatedCellSize, GRID.MAX_CELL_SIZE)
  );
  gameState.gridWidth = gameState.cols * gameState.cellSize + gridBorderWidth;

  for (let row = 0; row < gameState.rows; row++) {
    gameState.revealed[row] = [];
    gameState.flagged[row] = [];
    for (let col = 0; col < gameState.cols; col++) {
      gameState.revealed[row][col] = false;
      gameState.flagged[row][col] = false;
    }
  }
}

function draw() {
  drawGame(gameState);
}

function drawGame(gameState) {
  drawToolbar(gameState);
  drawGrid(gameState);
  drawStatus(gameState);
}

function resetGame(level) {
  gameState.currentGameState = "not started";
  gameState.firstClick = true;
  gameState.startTime = null;
  gameState.level = level ?? gameState.level;
  gameState.endMine = null;
  gameState.endTime = null;
  initializeGame();
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
      if (gameState.revealed[row][col]) {
        revealSafeNeighbors(row, col);
      } else {
        revealCell(row, col);
      }
    }
  } else if (mouseButton === RIGHT) {
    if (isInGameArea) {
      toggleFlag(row, col);
    }
  }
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

    if (gameState.revealed[row][col]) {
      revealSafeNeighbors(row, col);
    } else {
      revealCell(row, col);
    }
  }
  return false;
}
