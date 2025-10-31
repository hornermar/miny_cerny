function drawStatus(gameState) {
  const gridBottomY = gridY + gameState.rows * cellSize + strokeWidth * 3;
  let y = gridBottomY + strokeWidth;

  textStyle(NORMAL);
  const x = gridX - strokeWidth;

  textSize(statusTextSize);

  fill(COLORS.TEXT_PRIMARY);

  if (
    gameState.currentGameState === 'not started' ||
    gameState.currentGameState === 'playing'
  ) {
    drawWrappedText(
      INTRODUCTION[gameState.level],
      x,
      y,
      gridWidth + strokeWidth
    );

    y += statusLineHeight * 6;
    drawWrappedText(
      CALL_TO_ACTION[gameState.level],
      x,
      y,
      gridWidth + strokeWidth * 2
    );

    y += statusLineHeight * 2.8;

    if (!gameState.firstClick) {
      drawWrappedText(
        'Začni kliknutím do hracího pole.',
        x,
        y,
        gridWidth + strokeWidth * 2
      );
    }
  } else if (
    gameState.currentGameState === 'lost' ||
    gameState.currentGameState === 'won'
  ) {
    const msElapsed = gameState.endTime - gameState.startTime;

    text(`Čas: ${formatTime(msElapsed)} s`, x, y);

    y += statusLineHeight * 1.5;

    if (gameState.currentGameState === 'won') {
      drawWrappedText(WIN[gameState.level], x, y, gridWidth + strokeWidth * 2);
    } else if (gameState.currentGameState === 'lost') {
      drawEndMineInfo(gameState, x, y);
    }
  }
}

function drawEndMineInfo(gameState, x, y) {
  let endMine = getFoundMine(gameState);

  const endMineText = endMine
    ? `Bum! Narazil*a jsi na dílo „${endMine.name}“. ${endMine.description}`
    : gameState.level === 2 && !endMine
    ? 'Bum! Narazil*a jsi na jedno z budoucích děl. Tuhle hru prohráváš.'
    : '';

  drawWrappedText(endMineText, x, y, gridWidth + strokeWidth * 2);
}

function getFoundMine(gameState) {
  if (!gameState.endMine) return null;

  let mine = mines.find(
    (mine) =>
      mine.position[0] === gameState.endMine[0] &&
      mine.position[1] === gameState.endMine[1]
  );

  // Find first mine with same id (it should have description)
  if (mine && !mine.description) {
    mine = mines.find((item) => item.id === mine.id);
  }

  return mine;
}
