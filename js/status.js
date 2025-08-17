function drawStatus(gameState) {
  const gridBottomY = GRID.OFFSET_Y + gameState.rows * gameState.cellSize;
  let y = gridBottomY + STATUS.OFFSET_Y;

  textAlign(CENTER, TOP);
  // Responsive text size: scale down for small screens
  let responsiveTextSize = STATUS.TEXT_SIZE;
  if (width < 500) {
    responsiveTextSize = Math.max(14, Math.floor(width / 25));
  }
  textSize(responsiveTextSize);
  fill(COLORS.TEXT_PRIMARY);


  fill(COLORS.BACKGROUND);
  //   noStroke();
  stroke(0, 0, 0)
  rect(0, y , window.innerWidth, STATUS.HEIGHT);

  fill(COLORS.TEXT_PRIMARY);
  if (gameState.currentGameState === "not started") {
    drawWrappedText("Najdi všechny sochy a objekty na mapě! Klikni na libovolné pole pro začátek.", width / 2, y, width * 0.95);
    return;
  }

  if (gameState.currentGameState === "won") {
    drawWrappedText("Gratulujeme! Našel jsi všechny objekty!", width / 2, y, width * 0.95);
    return;
  }

  if (gameState.currentGameState === "lost") {
    drawWrappedText("Konec hry! Narazil jsi na objekt:", width / 2, y, width * 0.95);
    y += STATUS.MINE_INFO_OFFSET_Y;
    drawEndMineInfo(gameState, y);
    return;
  }
}

function drawWrappedText(txt, x, y, maxWidth) {
  const words = txt.split(' ');
  let line = '';
  let lineHeight = textAscent() + textDescent() + 4;
  let yy = y;
  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' ';
    let testWidth = textWidth(testLine);
    if (testWidth > maxWidth && n > 0) {
      text(line, x, yy);
      line = words[n] + ' ';
      yy += lineHeight;
    } else {
      line = testLine;
    }
  }
  text(line, x, yy);
}

function drawEndMineInfo(gameState, y, artworks) {
  const endMine = getFoundMine(gameState, artworks);
  if (endMine) {
    text(`${endMine.name}: ${endMine.description}`, width / 2, y);
  } 
}

function getFoundMine(gameState) {
  if (!gameState.endMine) return null;

  return mines.find(
    (mine) =>
      mine.position[0] === gameState.endMine[0] &&
      mine.position[1] === gameState.endMine[1]
  );
}
