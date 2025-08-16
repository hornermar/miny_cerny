function drawLevel(toolbarX) {
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
      buttonY + buttonHeight / 2 + 1 + offset
    );
    pop();

    // Only trigger click on mouse down transition ??
    if (isHover) {
      resetGame(i);
    }
  }
}
