function drawToolbar(gameState) {
  const toolbarX = (width - gridWidth) / 2;

  drawTitle(toolbarX);

  draw3DRectEffect(
    toolbarX - strokeWidth,
    titleHeight,
    gridWidth + strokeWidth * 2,
    toolbarHeight,
    false,
    strokeWidth
  );

  drawMineCounter(gameState, toolbarX);
  drawResetButton(gameState, toolbarX);
  drawTimer(gameState, toolbarX);

  drawLevels(gameState, toolbarX);
}

function drawTitle(toolbarX) {
  noStroke();

  fill(COLORS.TEXT_PRIMARY);
  textAlign(LEFT, CENTER);
  textSize(titleTextSize);
  textStyle(BOLD);
  text(TITLE, toolbarX - strokeWidth, titleHeight / 2);
}

function drawLevels(gameState, toolbarX) {
  const dropdownHeight = toolbarHeight / 2;

  const dropdownX = toolbarX + gridWidth - dropdownWidth + strokeWidth;
  const dropdownY = titleHeight / 2 - dropdownHeight / 2;

  // Track dropdown open state globally
  if (typeof window.levelDropdownOpen === 'undefined') {
    window.levelDropdownOpen = false;
  }

  draw3DRectEffect(
    dropdownX,
    dropdownY,
    dropdownWidth,
    dropdownHeight,
    true,
    strokeWidth / 1.5
  );
  fill(COLORS.TEXT_PRIMARY);

  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(dropdownTextSize);
  text(
    LEVEL_NAMES[gameState.level].toLowerCase(),
    dropdownX + strokeWidth * 2,
    dropdownY + dropdownHeight / 2
  );

  // Draw arrow
  const arrowX = dropdownX + dropdownWidth - 2 - strokeWidth * 3;
  const arrowY = dropdownY + dropdownHeight / 2;
  const arrowHeight = arrowSize;
  const arrowWidth = arrowHeight * 1.3;
  if (window.levelDropdownOpen) {
    triangle(
      arrowX,
      arrowY + arrowHeight / 2,
      arrowX + arrowWidth,
      arrowY + arrowHeight / 2,
      arrowX + arrowWidth / 2,
      arrowY - arrowHeight / 2
    );
  } else {
    triangle(
      arrowX,
      arrowY - arrowHeight / 2,
      arrowX + arrowWidth,
      arrowY - arrowHeight / 2,
      arrowX + arrowWidth / 2,
      arrowY + arrowHeight / 2
    );
  }

  if (typeof window.levelDropdownMouseWasPressed === 'undefined') {
    window.levelDropdownMouseWasPressed = false;
  }
  if (mouseIsPressed && !window.levelDropdownMouseWasPressed) {
    // Click on dropdown button
    if (
      mouseX >= dropdownX &&
      mouseX <= dropdownX + dropdownWidth &&
      mouseY >= dropdownY &&
      mouseY <= dropdownY + dropdownHeight
    ) {
      window.levelDropdownOpen = !window.levelDropdownOpen;
    } else if (
      // Click outside dropdown area (when open)
      window.levelDropdownOpen &&
      !(
        mouseX >= dropdownX &&
        mouseX <= dropdownX + dropdownWidth &&
        mouseY >= dropdownY &&
        mouseY <=
          dropdownY + dropdownHeight + LEVEL_NAMES.length * dropdownHeight
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
    for (let i = 0; i < LEVEL_NAMES.length; i++) {
      const itemY = dropdownY + dropdownHeight + i * dropdownHeight;

      fill(i === gameState.level ? COLORS.CELL_RIVER : COLORS.GRAY_LIGHT);
      rect(dropdownX, itemY, dropdownWidth, dropdownHeight);

      fill(COLORS.TEXT_PRIMARY);
      push();
      textAlign(LEFT, CENTER);
      textStyle(BOLD);
      textSize(dropdownTextSize);
      text(
        LEVEL_NAMES[i].toLowerCase(),
        dropdownX + strokeWidth * 2.5,
        itemY + dropdownHeight / 2
      );
      pop();

      // Detect click on item
      if (
        mouseIsPressed &&
        mouseX >= dropdownX &&
        mouseX <= dropdownX + dropdownWidth &&
        mouseY >= itemY &&
        mouseY <= itemY + dropdownHeight &&
        gameState.level !== i
      ) {
        window.pendingLevelReset = i;
        window.levelDropdownOpen = false;
      }
    }
  }
}

function drawDisplay(x, y, displayText) {
  const frameSize = strokeWidth / 2;
  draw3DRectEffect(x, y, displayWidth, displayHeight, false, frameSize);

  // Display background
  fill(COLORS.BLACK);
  rect(
    x + frameSize,
    y + frameSize,
    displayWidth - frameSize * 2,
    displayHeight - frameSize * 2
  );

  // Display text
  fill(COLORS.PRIMARY);
  textAlign(CENTER, CENTER);
  textSize(displayTextSize);
  textStyle(NORMAL);

  let extraOffset = 0;
  // Apply extra offset for iOS devices
  if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
    extraOffset = strokeWidth / 4;
  }
  text(
    displayText,
    x + displayWidth / 2,
    y + displayHeight / 2 + frameSize - extraOffset
  );
}

function drawMineCounter(gameState, toolbarX) {
  const flaggedCount = getFlaggedCount(gameState);
  const remainingMines = gameState.totalMines - flaggedCount;
  const mineDisplayX =
    toolbarX + (toolbarHeight - displayHeight) / 2 - strokeWidth;
  const mineDisplayY = titleHeight + (toolbarHeight - displayHeight) / 2;

  const mineText = remainingMines.toString().padStart(3, '0');
  drawDisplay(mineDisplayX, mineDisplayY, mineText);
}

function drawResetButton(gameState, toolbarX) {
  const emoji = getEmoji(gameState.currentGameState);
  const buttonSize = displayHeight;
  const buttonX = toolbarX + gridWidth / 2 - buttonSize / 2;
  const buttonY = titleHeight + (toolbarHeight - buttonSize) / 2;

  const isPressed = isButtonPressed(buttonX, buttonY, buttonSize, buttonSize);
  const offset = isPressed ? strokeWidth / 8 : 0;
  const stroke = strokeWidth / 2;

  draw3DRectEffect(
    buttonX,
    buttonY,
    buttonSize,
    buttonSize,
    !isPressed,
    stroke
  );

  const emojiSize = buttonSize - emojiPadding * 2;

  image(
    emoji,
    buttonX + emojiPadding + offset,
    buttonY + emojiPadding + offset,
    emojiSize,
    emojiSize
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
      gameState.currentGameState === 'won' ||
      gameState.currentGameState === 'lost'
    ) {
      if (gameState.endTime) {
        elapsedTime = Math.floor(
          (gameState.endTime - gameState.startTime) / 1000
        );
      }
    } else if (gameState.currentGameState === 'playing') {
      elapsedTime = Math.floor((Date.now() - gameState.startTime) / 1000) + 1;
    }
    elapsedTime = Math.min(elapsedTime, 999);
  }

  const timerDisplayX =
    toolbarX +
    gridWidth -
    displayWidth -
    (toolbarHeight - displayHeight) / 2 +
    strokeWidth;
  const timerDisplayY = titleHeight + (toolbarHeight - displayHeight) / 2;

  const timeText = elapsedTime.toString().padStart(3, '0');
  drawDisplay(timerDisplayX, timerDisplayY, timeText);
}
