let toolbarWidth; // TODO: Use grid width from gameState?

function drawToolbar(gameState) {
  toolbarWidth = gameState.cols * gameState.cellSize + TOOLBAR.OFFSET * 2;
  const toolbarX = (window.innerWidth - toolbarWidth) / 2;

  drawLevels(toolbarX);

  draw3DRectEffect(
    toolbarX,
    TOOLBAR.OFFSET_Y - TOOLBAR.OFFSET / 2,
    toolbarWidth,
    TOOLBAR.HEIGHT,
    false,
    TOOLBAR.OFFSET
  );

  drawMineCounter(gameState, toolbarX);
  drawResetButton(gameState, toolbarX);
  drawTimer(gameState, toolbarX);
}

function drawLevels(toolbarX) {
  const levelCount = LEVEL.NAMES.length;
  const buttonWidth = LEVEL.BUTTON_WIDTH;
  const buttonHeight = LEVEL.BUTTON_HEIGHT;
  const buttonY = LEVEL.OFFSET_Y;

  const availableWidth = toolbarWidth - buttonWidth * levelCount;
  const spacing = levelCount > 1 ? availableWidth / (levelCount - 1) : 0;
  const startX = toolbarX;

  for (let i = 0; i < levelCount; i++) {
    const x = startX + i * (buttonWidth + spacing);

    let isHover = mouseX >= x && mouseX <= x + buttonWidth && mouseY >= buttonY && mouseY <= buttonY + buttonHeight;

    let isRaised =  gameState.level !== i;
    const offset = isRaised ? 0 : 2
    draw3DRectEffect(x, buttonY, buttonWidth, buttonHeight, isRaised, 4);

  
    fill(COLORS.TEXT_PRIMARY);
    noStroke();

    push();
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(LEVEL.TEXT_SIZE);
    text(
      LEVEL.NAMES[i].toUpperCase(),
      x + buttonWidth / 2 + offset,
      buttonY + buttonHeight / 2  + offset
    );
    pop();

    if (isHover && mouseIsPressed) {
      resetGame(i);
    }
  }
}

function drawDisplay(x, y, displayText) {
  draw3DRectEffect(x, y, DISPLAY.WIDTH, DISPLAY.HEIGHT, false, 3);

  // Draw display background
  fill(COLORS.BLACK);
  rect(x + 3, y + 1, DISPLAY.WIDTH - 6, DISPLAY.HEIGHT - 6);

  // Display text
  fill(COLORS.PRIMARY);
  textAlign(CENTER, CENTER);
  textSize(DISPLAY.TEXT_SIZE);
  text(displayText, x + DISPLAY.WIDTH / 2, y + DISPLAY.HEIGHT / 2 + 3);
}

function drawMineCounter(gameState, toolbarX) {
  const flaggedCount = getFlaggedCount(gameState);
  const remainingMines = gameState.totalMines - flaggedCount;
  const mineDisplayX = toolbarX + (TOOLBAR.HEIGHT - DISPLAY.HEIGHT) / 2;
  const mineDisplayY =
    TOOLBAR.OFFSET_Y -
    TOOLBAR.OFFSET / 2 +
    (TOOLBAR.HEIGHT - DISPLAY.HEIGHT) / 2;

  const mineText = remainingMines.toString().padStart(3, "0");
  drawDisplay(mineDisplayX, mineDisplayY, mineText);
}

function drawResetButton(gameState, toolbarX) {
  const buttonSize = DISPLAY.HEIGHT;
  const buttonX = toolbarX + toolbarWidth / 2 - buttonSize / 2;
  const buttonY =
    TOOLBAR.OFFSET_Y - TOOLBAR.OFFSET / 2 + (TOOLBAR.HEIGHT - buttonSize) / 2;

  draw3DRectEffect(buttonX, buttonY, buttonSize, buttonSize, true, 4);

  fill(0, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(26);
  text("", buttonX + buttonSize / 2, buttonY + buttonSize / 2 + 2);

  window.resetButton = {
    x: buttonX,
    y: buttonY,
    width: buttonSize,
    height: buttonSize,
  };
}

function drawTimer(gameState, toolbarX) {
  let elapsedTime = 0;
  if (gameState.currentGameState === "playing" && gameState.startTime) {
    elapsedTime = Math.floor((Date.now() - gameState.startTime) / 1000);
    elapsedTime = Math.min(elapsedTime, 999);
  }

  const timerDisplayX =
    toolbarX +
    toolbarWidth -
    DISPLAY.WIDTH -
    (TOOLBAR.HEIGHT - DISPLAY.HEIGHT) / 2;
  const timerDisplayY =
    TOOLBAR.OFFSET_Y -
    TOOLBAR.OFFSET / 2 +
    (TOOLBAR.HEIGHT - DISPLAY.HEIGHT) / 2;

  const timeText = elapsedTime.toString().padStart(3, "0");
  drawDisplay(timerDisplayX, timerDisplayY, timeText);
}
