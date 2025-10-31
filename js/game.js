let gameState = {
  rows: MAP.length,
  cols: MAP[0].length,
  totalMines: 0,
  currentGameState: 'not started', // 'not started', 'playing', 'won', 'lost'
  revealed: [],
  flagged: [],
  mapConfig: MAP,
  startTime: null,
  level: 1, // 0, 1, 2
  endMine: null,
  endTime: null,
  firstClick: false,
};

let longTouchTimeout = null;
const LONG_TOUCH_DURATION = 500;
const minesArray = [MINES_0, MINES_1, MINES_2];

let babyImg;
let flagImg;
let headImg;

window.pendingLevelReset = null;

function windowResized() {
  const canvasSize = getCanvasSize();
  createCanvas(canvasSize.width, canvasSize.height);
  setSizes();
}

function preload() {
  babyImg = loadImage('assets/baby.png');
  flagImg = loadImage('assets/flag.svg');
  emojiSmileImg = loadImage('assets/emoji-smile.svg');
  emojiSadImg = loadImage('assets/emoji-sad.svg');
  emojiGlassesImg = loadImage('assets/emoji-glasses.svg');
}

function setup() {
  const canvasSize = getCanvasSize();
  createCanvas(canvasSize.width, canvasSize.height);
  setSizes();

  initializeGame();

  // Prevent right-click context menu on the canvas
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
  });

  // Prevent pinch-zoom on mobile devices
  document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
  });
}

function initializeGame() {
  gameState.mapConfig = MAP.map((row) => row.map((cell) => [cell, 0]));

  const minePositions = minesArray[gameState.level];
  for (const [row, col] of minePositions) {
    gameState.mapConfig[row][col][1] = CELL_TYPES.MINE;
  }

  if (gameState.level === 2) {
    addRandomMines(0.13);
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
  textFont(FONT_FAMILY);
  drawGame(gameState);
}

function drawGame(gameState) {
  drawGrid(gameState);
  drawToolbar(gameState);
  drawStatus(gameState);
}

function resetGame(level) {
  gameState.currentGameState = 'not started';
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
    gameState.currentGameState === 'won' ||
    gameState.currentGameState === 'lost'
  ) {
    return;
  }

  const col = Math.floor((mouseX - gridX) / cellSize);
  const row = Math.floor((mouseY - gridY) / cellSize);

  const isInGameArea = isValidCell(row, col, gameState.rows, gameState.cols);

  if (isInGameArea && gameState.currentGameState === 'not started') {
    gameState.firstClick = true;
    gameState.startTime = Date.now();
    gameState.currentGameState = 'playing';
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

  const col = Math.floor((mouseX - gridX) / cellSize);
  const row = Math.floor((mouseY - gridY) / cellSize);

  const isInGameArea = isValidCell(row, col, gameState.rows, gameState.cols);

  if (
    (isInGameArea && gameState.currentGameState === 'not started') ||
    gameState.currentGameState === 'playing'
  ) {
    longTouchTimeout = setTimeout(() => {
      toggleFlag(row, col);
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
      gameState.currentGameState === 'won' ||
      gameState.currentGameState === 'lost'
    ) {
      return false;
    }

    const col = Math.floor((mouseX - gridX) / cellSize);
    const row = Math.floor((mouseY - gridY) / cellSize);

    const isInGameArea = isValidCell(row, col, gameState.rows, gameState.cols);
    if (!isInGameArea) return false;
    if (gameState.currentGameState === 'not started') {
      gameState.firstClick = true;
      gameState.startTime = Date.now();
      gameState.currentGameState = 'playing';
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
