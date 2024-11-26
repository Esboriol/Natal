let draggedBlock = null;
let correctPositions = {}; // Objeto para guardar as posições corretas dos blocos

// Função para gerar posições corretas aleatórias ao carregar a página
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
  console.log("Posições corretas:", correctPositions); // Para depuração
}

// Chama a função para definir as posições corretas ao carregar a página
shufflePositions();

// Função para permitir o "drop"
function allowDrop(event) {
  event.preventDefault();
}

// Função de arraste (drag)
function drag(event) {
  draggedBlock = event.target;
}

// Função de drop (soltar o bloco)
function drop(event) {
  event.preventDefault();
  const target = event.target;

  // Verifica se o alvo é um bloco vazio
  if (target.classList.contains("empty-block") && target.children.length === 0) {
    // Adiciona o bloco arrastado ao bloco vazio
    target.appendChild(draggedBlock);
    resetBlockPosition(draggedBlock);
  } else if (target.classList.contains("block")) {
    // Troca os blocos se o alvo for outro bloco colorido
    swapBlocks(target, draggedBlock);
  }

  // Verifica se a posição do bloco está correta após a troca
  checkPosition(draggedBlock, target);
  draggedBlock = null; // Limpa o bloco arrastado
}

// Adicionar eventos de toque para funcionar no celular
function dragStart(event) {
  // No caso de dispositivos móveis, podemos armazenar o elemento que está sendo arrastado
  const touch = event.changedTouches ? event.changedTouches[0] : event;
  draggedBlock = event.target; // Define o bloco que está sendo arrastado
  draggedBlock.style.opacity = "0.5"; // Um efeito visual para mostrar que o item está sendo arrastado
}

// Função para mover o bloco com o toque (touch)
function touchMove(event) {
  const touch = event.changedTouches[0];
  draggedBlock.style.left = `${touch.pageX - 30}px`; // Movendo o item conforme o toque
  draggedBlock.style.top = `${touch.pageY - 50}px`;
  event.preventDefault(); // Previne o comportamento padrão (se necessário)
}

// Função para finalizar o toque e restabelecer a opacidade
function touchEnd(event) {
  draggedBlock.style.opacity = "1"; // Remover o efeito de arrasto
  const droppedElement = document.elementFromPoint(event.changedTouches[0].pageX, event.changedTouches[0].pageY);

  if (droppedElement && droppedElement.classList.contains('empty-block')) {
    droppedElement.appendChild(draggedBlock);
    resetBlockPosition(draggedBlock);
  }
  draggedBlock = null; // Limpa o bloco arrastado
}

// Adicionar os eventos de toque aos blocos
const blocks = document.querySelectorAll('.block');
blocks.forEach(block => {
  block.addEventListener('dragstart', dragStart);
  block.addEventListener('touchstart', dragStart);
  block.addEventListener('touchmove', touchMove);
  block.addEventListener('touchend', touchEnd);
});

// Função para trocar os blocos de lugar
function swapBlocks(targetBlock, draggedBlock) {
  const draggedParent = draggedBlock.parentNode;
  const targetParent = targetBlock.parentNode;

  // Move o bloco arrastado para o local do bloco alvo
  targetParent.appendChild(draggedBlock);
  resetBlockPosition(draggedBlock);

  // Move o bloco alvo para o local do bloco arrastado
  draggedParent.appendChild(targetBlock);
  resetBlockPosition(targetBlock);
}

// Função para centralizar o bloco dentro do `empty-block`
function resetBlockPosition(block) {
  block.style.position = "relative";
  block.style.left = "50%";
  block.style.top = "50%";
  block.style.transform = "translate(-50%, -50%)";
}

// Função para verificar se o bloco está na posição correta
function checkPosition(block, target) {
  const color = block.id;
  const emptyBlocks = Array.from(document.querySelectorAll(".empty-block"));
  const targetIndex = emptyBlocks.indexOf(target);

  if (correctPositions[color] === targetIndex) {
    // Alerta quando o bloco é colocado na posição correta
    alert(`Você acertou! O bloco ${color} está na posição correta.`);

    // Ações após acertar a posição (por exemplo, acionar algo no sistema)
    if (color == "blue") {
      acertou("natalecotec/ligar/faixa/blue")
    } else if (color == "red") {
      acertou("natalecotec/ligar/faixa/red")
    } else if (color == "yellow") {
      acertou("natalecotec/ligar/faixa/yellow")
    } else if (color == "green") {
      acertou("natalecotec/ligar/faixa/green")
    }
  }
}
