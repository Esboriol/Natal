let draggedBlock = null;
let correctPositions = {};
let initialTouch = { x: 0, y: 0 };

function shufflePositions() {
  const colors = ['red', 'blue', 'yellow', 'green'];
  const positions = [0, 1, 2, 3];
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  colors.forEach((color, index) => {
    correctPositions[color] = positions[index];
  });
  console.log("Posições corretas:", correctPositions);
}

shufflePositions();

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  draggedBlock = event.target;
  draggedBlock.style.opacity = "0.5";
}

function drop(event) {
  event.preventDefault();
  draggedBlock.style.opacity = "1";

  if (event.target.classList.contains("empty-block")) {
    event.target.appendChild(draggedBlock);
    resetBlockPosition(draggedBlock);
    checkPosition(draggedBlock, event.target);
  }
}

function touchStart(event) {
  draggedBlock = event.target;
  draggedBlock.style.opacity = "0.5";
  const touch = event.changedTouches[0];
  initialTouch.x = touch.pageX - draggedBlock.offsetLeft;
  initialTouch.y = touch.pageY - draggedBlock.offsetTop;
}

function touchMove(event) {
  const touch = event.changedTouches[0];
  const newX = touch.pageX - initialTouch.x;
  const newY = touch.pageY - initialTouch.y;

  requestAnimationFrame(() => {
    draggedBlock.style.left = `${newX}px`;
    draggedBlock.style.top = `${newY}px`;
  });

  event.preventDefault();
}

function touchEnd(event) {
  draggedBlock.style.opacity = "1";

  const touch = event.changedTouches[0];
  const droppedElement = document.elementFromPoint(touch.pageX, touch.pageY);

  if (droppedElement && droppedElement.classList.contains("empty-block")) {
    droppedElement.appendChild(draggedBlock);
    resetBlockPosition(draggedBlock);
    checkPosition(draggedBlock, droppedElement);
  }

  draggedBlock = null;
}

const blocks = document.querySelectorAll(".block");
blocks.forEach(block => {
  block.addEventListener("dragstart", drag);
  block.addEventListener("touchstart", touchStart);
  block.addEventListener("touchmove", touchMove);
  block.addEventListener("touchend", touchEnd);
});

function resetBlockPosition(block) {
  block.style.position = "absolute";
  block.style.left = "50%";
  block.style.top = "50%";
  block.style.transform = "translate(-50%, -50%)";
}

function checkPosition(block, target) {
  const color = block.id;
  const emptyBlocks = Array.from(document.querySelectorAll(".empty-block"));
  const targetIndex = emptyBlocks.indexOf(target);

  if (correctPositions[color] === targetIndex) {
    setTimeout(() => {
      alert(`Você acertou! O bloco ${color} está na posição correta.`);
    }, 50);

    if (color == "blue") {
      acertou("natalecotec/ligar/faixa/blue");
    } else if (color == "red") {
      acertou("natalecotec/ligar/faixa/red");
    } else if (color == "yellow") {
      acertou("natalecotec/ligar/faixa/yellow");
    } else if (color == "green") {
      acertou("natalecotec/ligar/faixa/green");
    }
  }
}
