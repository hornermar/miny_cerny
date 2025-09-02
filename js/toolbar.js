function drawToolbar(gameState) {
  const toolbarX = (window.innerWidth - gameState.gridWidth) / 2;

  drawTitle(toolbarX);
  drawLevels(gameState, toolbarX);

  draw3DRectEffect(
    toolbarX,
    TOOLBAR.OFFSET_Y - TOOLBAR.OFFSET / 2,
    gameState.gridWidth,
    TOOLBAR.HEIGHT,
    false,
    TOOLBAR.OFFSET
  );

  drawMineCounter(gameState, toolbarX);
  drawResetButton(gameState, toolbarX);
  drawTimer(gameState, toolbarX);
}

function drawTitle(toolbarX) {
  const title = TITLE.LABEL;

  fill(COLORS.WHITE);
  textAlign(RIGHT, CENTER);
  textSize(TITLE.TEXT_SIZE);
  text(title, toolbarX + gameState.gridWidth - 4, TITLE.OFFSET_Y);
}

function drawLevels(gameState, toolbarX) {
  const levelCount = LEVEL.NAMES.length;
  const buttonWidth = LEVEL.BUTTON_WIDTH;
  const buttonHeight = LEVEL.BUTTON_HEIGHT;
  const buttonY = LEVEL.OFFSET_Y;

  const availableWidth = gameState.gridWidth - buttonWidth * levelCount;
  const spacing = levelCount > 1 ? availableWidth / (levelCount - 1) : 0;
  const startX = toolbarX;

  for (let i = 0; i < levelCount; i++) {
    const x = startX + i * (buttonWidth + spacing);

    let isHover =
      mouseX >= x &&
      mouseX <= x + buttonWidth &&
      mouseY >= buttonY &&
      mouseY <= buttonY + buttonHeight;

    let isRaised = gameState.level !== i;
    const offset = isRaised ? 0 : 2;
    draw3DRectEffect(x, buttonY, buttonWidth, buttonHeight, isRaised, 4);

    fill(COLORS.TEXT_PRIMARY);
    noStroke();

    push();
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(LEVEL.TEXT_SIZE);
    text(
      LEVEL.NAMES[i].toLocaleLowerCase(),
      x + buttonWidth / 2 + offset,
      buttonY + buttonHeight / 2 + offset
    );
    pop();

    if (isHover && mouseIsPressed && gameState.level !== i) {
      window.pendingLevelReset = i;
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
  const emoji = getEmoji(gameState.currentGameState);
  const buttonSize = DISPLAY.HEIGHT;
  const buttonX = toolbarX + gameState.gridWidth / 2 - buttonSize / 2;
  const buttonY =
    TOOLBAR.OFFSET_Y - TOOLBAR.OFFSET / 2 + (TOOLBAR.HEIGHT - buttonSize) / 2;

  const isPressed = isButtonPressed(buttonX, buttonY, buttonSize, buttonSize);
  const offset = isPressed ? 2 : 0;

  draw3DRectEffect(buttonX, buttonY, buttonSize, buttonSize, !isPressed, 4);
  image(
    emoji,
    buttonX + 4 + offset,
    buttonY + 4 + offset,
    buttonSize - 8,
    buttonSize - 8
  );

  window.resetButton = {
    x: buttonX,
    y: buttonY,
    width: buttonSize,
    height: buttonSize,
  };
}

function drawTimer(gameState, toolbarX) {
  let elapsedTime = 0;
  if (gameState.startTime) {
    if (
      gameState.currentGameState === "won" ||
      gameState.currentGameState === "lost"
    ) {
      if (gameState.endTime) {
        elapsedTime = Math.floor(
          (gameState.endTime - gameState.startTime) / 1000
        );
      }
    } else if (gameState.currentGameState === "playing") {
      elapsedTime = Math.floor((Date.now() - gameState.startTime) / 1000);
    }
    elapsedTime = Math.min(elapsedTime, 999);
  }

  const timerDisplayX =
    toolbarX +
    gameState.gridWidth -
    DISPLAY.WIDTH -
    (TOOLBAR.HEIGHT - DISPLAY.HEIGHT) / 2;
  const timerDisplayY =
    TOOLBAR.OFFSET_Y -
    TOOLBAR.OFFSET / 2 +
    (TOOLBAR.HEIGHT - DISPLAY.HEIGHT) / 2;

  const timeText = elapsedTime.toString().padStart(3, "0");
  drawDisplay(timerDisplayX, timerDisplayY, timeText);
}
