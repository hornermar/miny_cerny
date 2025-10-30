function drawStatus(gameState) {
  const gridBottomY = GRID.OFFSET_Y + gameState.rows * gameState.cellSize;
  let y = gridBottomY + STATUS.OFFSET_Y;

  textStyle(NORMAL);
  const x = (window.innerWidth - gameState.gridWidth) / 2;

  textSize(STATUS.TEXT_SIZE);

  fill(COLORS.TEXT_PRIMARY);

  if (
    gameState.currentGameState === 'not started' ||
    gameState.currentGameState === 'playing'
  ) {
    drawWrappedText(INTRODUCTION[gameState.level], x, y, gameState.gridWidth);

    y += STATUS.LINE_HEIGHT * 6;
    drawWrappedText(CALL_TO_ACTION[gameState.level], x, y, gameState.gridWidth);

    y += STATUS.LINE_HEIGHT * 2.8;

    if (!gameState.firstClick) {
      drawWrappedText(
        'Začni kliknutím do hracího pole.' + gameState.cellSize,
        x,
        y,
        gameState.gridWidth
      );
    }
  } else if (
    gameState.currentGameState === 'lost' ||
    gameState.currentGameState === 'won'
  ) {
    const msElapsed = gameState.endTime - gameState.startTime;

    text(`Čas: ${formatTime(msElapsed)} s`, x , y);

    y += STATUS.LINE_HEIGHT * 1.5;

    if (gameState.currentGameState === 'won') {
      drawWrappedText(WIN[gameState.level], x, y, gameState.gridWidth);
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

  drawWrappedText(endMineText, x, y, gameState.gridWidth);
}

function getFoundMine(gameState) {
  if (!gameState.endMine) return null;

  let mine = mines.find(
    (mine) =>
      mine.position[0] === gameState.endMine[0] &&
      mine.position[1] === gameState.endMine[1]
  )


  // Find first mine with same id (it should have description)
  if(mine && !mine.description) {
    mine = mines.find(item => item.id === mine.id);
  }

  return mine;
}
