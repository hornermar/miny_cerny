function drawStatus(gameState) {
  const gridBottomY = GRID.OFFSET_Y + gameState.rows * gameState.cellSize;
  const y = gridBottomY + STATUS.OFFSET_Y;

  textAlign(CENTER, TOP);

  textSize(STATUS.TEXT_SIZE);
  fill(COLORS.BLACK);

  fill(COLORS.BACKGROUND);
  noStroke();
  //stroke(0, 0, 0)
  rect(0, y - 2, window.innerWidth, STATUS.HEIGHT);

  fill(COLORS.TEXT_PRIMARY);
  if (
    gameState.currentGameState === "not started" ||
    gameState.currentGameState === "playing"
  ) {
    drawWrappedText(
      "Praha bude brzo plná Černýho.",
      width / 2,
      y,
      gameState.gridWidth
    );
    drawWrappedText(
      "Jeho sochy se objevují po městě jako miny. Najdi je a znič dřív, než ovládnou město.",
      width / 2,
      y + STATUS.TEXT_SIZE * 2,
      gameState.gridWidth
    );
    return;
  }

  if (
    gameState.currentGameState === "lost" ||
    gameState.currentGameState === "won"
  ) {
    const msElapsed = gameState.endTime - gameState.startTime;

    drawWrappedText(
      `Čas: ${formatTime(msElapsed)} s`,
      width / 2,
      y,
      gameState.gridWidth
    );

    if (gameState.currentGameState === "lost") {
      drawEndMineInfo(gameState, y + STATUS.MINE_INFO_OFFSET_Y);
    }
    return;
  }
}

function drawEndMineInfo(gameState, y, artworks) {
  const endMine = getFoundMine(gameState, artworks);
  const description = endMine ? endMine.description : "Tuhle hru nevyhraješ!";

  if (endMine) {
    drawWrappedText(
      `Narazil*a jsi na dílo: ${endMine.name}`,
      width / 2,
      y,
      gameState.gridWidth
    );
  }

  drawWrappedText(
    description,
    width / 2,
    endMine ? y + STATUS.MINE_INFO_OFFSET_Y * 2 : y + STATUS.MINE_INFO_OFFSET_Y,
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
