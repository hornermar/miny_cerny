function drawToolbar(gameState) {
  const toolbarX = (window.innerWidth - gameState.gridWidth) / 2;

  drawTitle(toolbarX);

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

  drawLevels(gameState, toolbarX);
}

function drawTitle(toolbarX) {
  const title = TITLE.LABEL;
  noStroke();

  fill(COLORS.TEXT_PRIMARY);
  textAlign(LEFT, CENTER);
  textSize(TITLE.TEXT_SIZE);
  textStyle(BOLD);
  text(title, toolbarX, TITLE.OFFSET_Y);
}

function drawLevels(gameState, toolbarX) {
  const dropdownX = toolbarX + gameState.gridWidth - LEVEL.DROPDOWN_WIDTH;

  // Track dropdown open state globally
  if (typeof window.levelDropdownOpen === "undefined") {
    window.levelDropdownOpen = false;
  }

  draw3DRectEffect(
    dropdownX,
    LEVEL.OFFSET_Y,
    LEVEL.DROPDOWN_WIDTH,
    LEVEL.DROPDOWN_HEIGHT,
    true,
    4
  );
  fill(COLORS.TEXT_PRIMARY);

  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(LEVEL.TEXT_SIZE);
  text(
    LEVEL.NAMES[gameState.level].toLowerCase(),
    dropdownX + LEVEL.INNER_OFFSET_X,
    LEVEL.OFFSET_Y + LEVEL.DROPDOWN_HEIGHT / 2
  );

  // Draw arrow
  const arrowX =
    dropdownX + LEVEL.DROPDOWN_WIDTH - 2 * LEVEL.INNER_OFFSET_X + 4;
  const arrowY = LEVEL.OFFSET_Y + LEVEL.DROPDOWN_HEIGHT / 2 - 1;
  if (window.levelDropdownOpen) {
    triangle(
      arrowX,
      arrowY + 4,
      arrowX + 10,
      arrowY + 4,
      arrowX + 5,
      arrowY - 3
    );
  } else {
    triangle(
      arrowX,
      arrowY - 3,
      arrowX + 10,
      arrowY - 3,
      arrowX + 5,
      arrowY + 4
    );
  }

  if (typeof window.levelDropdownMouseWasPressed === "undefined") {
    window.levelDropdownMouseWasPressed = false;
  }
  if (mouseIsPressed && !window.levelDropdownMouseWasPressed) {
    // Click on dropdown button
    if (
      mouseX >= dropdownX &&
      mouseX <= dropdownX + LEVEL.DROPDOWN_WIDTH &&
      mouseY >= LEVEL.OFFSET_Y &&
      mouseY <= LEVEL.OFFSET_Y + LEVEL.DROPDOWN_HEIGHT
    ) {
      window.levelDropdownOpen = !window.levelDropdownOpen;
    } else if (
      // Click outside dropdown area (when open)
      window.levelDropdownOpen &&
      !(
        mouseX >= dropdownX &&
        mouseX <= dropdownX + LEVEL.DROPDOWN_WIDTH &&
        mouseY >= LEVEL.OFFSET_Y &&
        mouseY <=
          LEVEL.OFFSET_Y +
            LEVEL.DROPDOWN_HEIGHT +
            LEVEL.NAMES.length * LEVEL.DROPDOWN_HEIGHT
      )
    ) {
      window.levelDropdownOpen = false;
    }
    window.levelDropdownMouseWasPressed = true;
  }
  if (!mouseIsPressed) {
    window.levelDropdownMouseWasPressed = false;
  }

  // Draw dropdown list if open
  if (window.levelDropdownOpen) {
    for (let i = 0; i < LEVEL.NAMES.length; i++) {
      const itemY =
        LEVEL.OFFSET_Y + LEVEL.DROPDOWN_HEIGHT + i * LEVEL.DROPDOWN_HEIGHT;

      fill(i === gameState.level ? COLORS.CELL_RIVER : COLORS.GRAY_LIGHT);
      rect(dropdownX, itemY, LEVEL.DROPDOWN_WIDTH, LEVEL.DROPDOWN_HEIGHT);

      fill(COLORS.TEXT_PRIMARY);
      push();
      textAlign(LEFT, CENTER);
      textStyle(BOLD);
      textSize(LEVEL.TEXT_SIZE);
      text(
        LEVEL.NAMES[i].toLowerCase(),
        dropdownX + 14,
        itemY + LEVEL.DROPDOWN_HEIGHT / 2
      );
      pop();

      // Detect click on item
      if (
        mouseIsPressed &&
        mouseX >= dropdownX &&
        mouseX <= dropdownX + LEVEL.DROPDOWN_WIDTH &&
        mouseY >= itemY &&
        mouseY <= itemY + LEVEL.DROPDOWN_HEIGHT &&
        gameState.level !== i
      ) {
        window.pendingLevelReset = i;
        window.levelDropdownOpen = false;
      }
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
  textStyle(NORMAL);
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
  let elapsedTime = 1;
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
      elapsedTime = Math.floor((Date.now() - gameState.startTime) / 1000) + 1;
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
