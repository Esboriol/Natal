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

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  draggedBlock = event.target;
}

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
  event.dataTransfer = event.dataTransfer || {}; // Verificando se dataTransfer existe

  // Usando touchstart e armazenando a posição inicial do toque
  const touch = event.changedTouches ? event.changedTouches[0] : event;
  event.dataTransfer.setData("text", event.target.id); // Identificando o elemento
  event.target.style.opacity = "0.5"; // Um efeito visual para mostrar que o item está sendo arrastado
}

function touchMove(event) {
  // Em vez de usar o evento 'dragmove', usamos o 'touchmove' para movimentar o item
  const touch = event.changedTouches[0];
  const draggedElement = document.getElementById(event.target.id);
  
  draggedElement.style.left = `${touch.pageX - 30}px`; // Movendo o item conforme o toque
  draggedElement.style.top = `${touch.pageY - 50}px`;
  event.preventDefault(); // Previne o comportamento padrão (se necessário)
}

function touchEnd(event) {
  const draggedElement = document.getElementById(event.target.id);
  draggedElement.style.opacity = "1"; // Remover o efeito de arrasto
}

function addTouchEvents(element) {
  element.addEventListener('touchstart', dragStart, false);
  element.addEventListener('touchmove', touchMove, false);
  element.addEventListener('touchend', touchEnd, false);
}

// Adicionar os eventos de toque aos blocos
const blocks = document.querySelectorAll('.block');
blocks.forEach(block => {
  addTouchEvents(block);
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
    alert("Você acertou!");

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
