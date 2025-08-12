function drawLevel(toolbarX) {
  const levelCount = LEVEL.NAMES.length;
  const buttonWidth = LEVEL.BUTTON_WIDTH;
  const buttonHeight = LEVEL.BUTTON_HEIGHT;
  const buttonY = LEVEL.OFFSET_Y;

  // Calculate dynamic spacing for space-between effect
  const availableWidth = toolbarWidth - buttonWidth * levelCount;
  const spacing = levelCount > 1 ? availableWidth / (levelCount - 1) : 0;
  const startX = toolbarX;

  window.levelButtons = [];
  for (let i = 0; i < levelCount; i++) {
    const x = startX + i * (buttonWidth + spacing);
    draw3DRectEffect(x, buttonY, buttonWidth, buttonHeight, true, 4);

    fill(COLORS.PRIMARY);
    textAlign(CENTER, CENTER);
    textSize(LEVEL.TEXT_SIZE);
    text(
      LEVEL.NAMES[i].toUpperCase(),
      x + buttonWidth / 2,
      buttonY + buttonHeight / 2 + 1
    );
    window.levelButtons.push({
      x: x,
      y: buttonY,
      width: buttonWidth,
      height: buttonHeight,
      label: LEVEL.NAMES[i],
      level: i,
    });
  }
}
