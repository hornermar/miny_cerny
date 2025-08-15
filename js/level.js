let levelButtonPressed = [];

function drawLevel(toolbarX) {
  const levelCount = LEVEL.NAMES.length;
  const buttonWidth = LEVEL.BUTTON_WIDTH;
  const buttonHeight = LEVEL.BUTTON_HEIGHT;
  const buttonY = LEVEL.OFFSET_Y;

  const availableWidth = toolbarWidth - buttonWidth * levelCount;
  const spacing = levelCount > 1 ? availableWidth / (levelCount - 1) : 0;
  const startX = toolbarX;

  // Initialize pressed state array if needed ??
  if (!Array.isArray(levelButtonPressed) || levelButtonPressed.length !== levelCount) {
    levelButtonPressed = Array(levelCount).fill(null).map(() => ({ pressed: false, timer: 0 }));
  }

  textAlign(CENTER, CENTER);
  textFont(COMMON.fontFamily);
  textSize(LEVEL.TEXT_SIZE);

  // Track previous mouse state globally ??
  if (typeof window._prevMousePressed === 'undefined') {
    window._prevMousePressed = false;
  }

  for (let i = 0; i < levelCount; i++) {
    const x = startX + i * (buttonWidth + spacing);

    let isHover = mouseX >= x && mouseX <= x + buttonWidth && mouseY >= buttonY && mouseY <= buttonY + buttonHeight;

    // If pressed, check timer
    if (levelButtonPressed[i].pressed && millis() - levelButtonPressed[i].timer > 150) {
      levelButtonPressed[i].pressed = false;
    }

    let isRaised = !levelButtonPressed[i].pressed;
    draw3DRectEffect(x, buttonY, buttonWidth, buttonHeight, isRaised, 4);

  
    fill(COLORS.PRIMARY);
    noStroke();

    text(
      LEVEL.NAMES[i],
      x + buttonWidth / 2,
      buttonY + buttonHeight / 2
    );

    // Only trigger click on mouse down transition ??
    if (isHover && mouseIsPressed && !window._prevMousePressed && !levelButtonPressed[i].pressed) {
      levelButtonPressed[i].pressed = true;
      levelButtonPressed[i].timer = millis();
      resetGame(i);
    }
  }
  window._prevMousePressed = mouseIsPressed;
}
