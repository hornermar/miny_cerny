function drawStatus(gameState) {
  const gridBottomY = GRID.OFFSET_Y + gameState.rows * gameState.cellSize;
  let y = gridBottomY + STATUS.OFFSET_Y;

  textStyle(NORMAL);
  const x = (window.innerWidth - gameState.gridWidth) / 2;

  textSize(STATUS.TEXT_SIZE);

  fill(COLORS.TEXT_PRIMARY);

  if (
    gameState.currentGameState === "not started" ||
    gameState.currentGameState === "playing"
  ) {
    drawWrappedText(INTRODUCTION[gameState.level], x, y, gameState.gridWidth);

    drawWrappedText(
      "Začni kliknutím do hracího pole.",
      x,
      y + STATUS.LINE_HEIGHT * 2,
      gameState.gridWidth
    );
    return;
  }

  if (
    gameState.currentGameState === "lost" ||
    gameState.currentGameState === "won"
  ) {
    const msElapsed = gameState.endTime - gameState.startTime;

    text("Čas:", x, y);
    text(`${formatTime(msElapsed)} s`, x + 40, y);
  }

  y += STATUS.LINE_HEIGHT_SMALL;
  textSize(STATUS.TEXT_SIZE);

  if (gameState.currentGameState === "won") {
    drawWrappedText(
     WIN[gameState.level],
      x,
      y,
      gameState.gridWidth
    );
  } else if (gameState.currentGameState === "lost") {
    drawEndMineInfo(gameState, x, y);
  }
}

function drawEndMineInfo(gameState, x, y) {
  const endMine = getFoundMine(gameState);

  if (endMine) {
    drawWrappedText(
      `Bum! Narazil*a jsi na "${endMine.name}".`,
      x,
      y,
      gameState.gridWidth
    );
  }

  drawWrappedText(
    LOSS[gameState.level],
    width / 2,
    y + STATUS.MINE_INFO_OFFSET_Y * 2 ,
    gameState.gridWidth
  );
}

function getFoundMine(gameState) {
  if (!gameState.endMine) return null;

  return mines.find(
    (mine) =>
      mine.position[0] === gameState.endMine[0] &&
      mine.position[1] === gameState.endMine[1]
  );
}
