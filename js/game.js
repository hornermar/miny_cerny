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
  endTime: null,
};

let longTouchTimeout = null;
const LONG_TOUCH_DURATION = 500;
const minesArray = [MINES_0, MINES_1, MINES_2];
const minCanvasHeight = 620;

let babyImg;
let flagImg;
let headImg;

window.pendingLevelReset = null;

function recalculateCellSizeAndGridWidth() {
  const gridBorderWidth = TOOLBAR.OFFSET * 2;
  const gridWidth = window.innerWidth - GRID.OFFSET_X * 2 - gridBorderWidth;
  const calculatedCellSize = Math.floor(gridWidth / gameState.cols);
  gameState.cellSize = Math.max(
    GRID.MIN_CELL_SIZE,
    Math.min(calculatedCellSize, GRID.MAX_CELL_SIZE)
  );
  gameState.gridWidth = gameState.cols * gameState.cellSize + gridBorderWidth;
}

function windowResized() {
  const canvasSize = getCanvasSize();
  createCanvas(canvasSize.width, canvasSize.height);
  recalculateCellSizeAndGridWidth();
  draw();
}

function preload() {
  babyImg = loadImage("assets/baby.png");
  flagImg = loadImage("assets/flag.svg");
  emojiSmileImg = loadImage("assets/emoji-smile.svg");
  emojiSadImg = loadImage("assets/emoji-sad.svg");
  emojiGlassesImg = loadImage("assets/emoji-glasses.svg");
}

function setup() {
  const canvasSize = getCanvasSize();
  createCanvas(canvasSize.width, canvasSize.height);
  recalculateCellSizeAndGridWidth();
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
    addRandomMines(0.15);
  }

  gameState.totalMines = countMinesFromMap(gameState.mapConfig);

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
  background(COLORS.BACKGROUND);
  textFont(COMMON.fontFamily);
  drawGame(gameState);
}

function drawGame(gameState) {
  drawGrid(gameState);
  drawToolbar(gameState);
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
  if (
    window.resetButton &&
    mouseX >= window.resetButton.x &&
    mouseX <= window.resetButton.x + window.resetButton.width &&
    mouseY >= window.resetButton.y &&
    mouseY <= window.resetButton.y + window.resetButton.height
  ) {
    resetGame();
    return;
  }

  if (
    gameState.currentGameState === "won" ||
    gameState.currentGameState === "lost"
  ) {
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

function mouseReleased() {
  if (window.pendingLevelReset !== null) {
    resetGame(window.pendingLevelReset);
    window.pendingLevelReset = null;
  }
}

function touchStarted() {
  if (longTouchTimeout) {
    clearTimeout(longTouchTimeout);
  }
  const gridX = (window.innerWidth - gameState.cols * gameState.cellSize) / 2;
  const col = Math.floor((mouseX - gridX) / gameState.cellSize);
  const row = Math.floor((mouseY - GRID.OFFSET_Y) / gameState.cellSize);
  const isInGameArea = isValidCell(row, col, gameState.rows, gameState.cols);

  if (isInGameArea) {
    longTouchTimeout = setTimeout(() => {
      toggleFlag(row, col);
      vibrate(80);
      longTouchTimeout = null;
    }, LONG_TOUCH_DURATION);
  }
}

function touchEnded() {
  if (window.pendingLevelReset !== null) {
    vibrate();
    resetGame(window.pendingLevelReset);
    window.pendingLevelReset = null;
    if (longTouchTimeout) {
      clearTimeout(longTouchTimeout);
      longTouchTimeout = null;
    }
    return false;
  }
  const btn = window.resetButton;
  if (
    btn &&
    mouseX >= btn.x &&
    mouseX <= btn.x + btn.width &&
    mouseY >= btn.y &&
    mouseY <= btn.y + btn.height
  ) {
    vibrate();
    resetGame();
    if (longTouchTimeout) {
      clearTimeout(longTouchTimeout);
      longTouchTimeout = null;
    }
    return false;
  }
  // If timeout is still pending, treat as short tap
  if (longTouchTimeout) {
    clearTimeout(longTouchTimeout);
    longTouchTimeout = null;
    if (
      gameState.currentGameState === "won" ||
      gameState.currentGameState === "lost"
    ) {
      return false;
    }
    // Compute cell coordinates once
    const gridX = (window.innerWidth - gameState.cols * gameState.cellSize) / 2;
    const col = Math.floor((mouseX - gridX) / gameState.cellSize);
    const row = Math.floor((mouseY - GRID.OFFSET_Y) / gameState.cellSize);
    const isInGameArea = isValidCell(row, col, gameState.rows, gameState.cols);
    if (!isInGameArea) return false;
    if (gameState.currentGameState === "not started") {
      gameState.startTime = Date.now();
      gameState.currentGameState = "playing";
    }
    vibrate();
    if (gameState.revealed[row][col]) {
      revealSafeNeighbors(row, col);
    } else {
      revealCell(row, col);
    }
  }
  return false;
}
