// Array de emojis relacionados à tecnologia
const emojis = ['💻', '📱', '🖨️', '🖥️', '⌨️', '🖱️', '🔌', '💾'];

// Variáveis globais
let cartas = [];          // Array para armazenar todas as cartas do jogo
let cartasViradas = [];   // Array para armazenar as cartas atualmente viradas
let movimentos = 0;       // Contador de movimentos do jogador
let paresEncontrados = 0; // Contador de pares de cartas encontrados

// Elementos do DOM (Document Object Model)
const tabuleiro = document.getElementById('game-board');
const displayMovimentos = document.getElementById('moves');
const mensagemVitoria = document.getElementById('win-message');
const displayMovimentosFinais = document.getElementById('final-moves');
const botaoReiniciar = document.getElementById('restart-button');

// Função para inicializar o jogo
function iniciarJogo() {
    // Duplicar os emojis e embaralhar
    cartas = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    
    // Resetar variáveis
    cartasViradas = [];
    movimentos = 0;
    paresEncontrados = 0;
    
    // Atualizar display de movimentos
    atualizarDisplayMovimentos();
    
    // Limpar o tabuleiro
    tabuleiro.innerHTML = '';
    
    // Criar cartas e adicionar ao tabuleiro
    cartas.forEach((emoji, indice) => {
        const carta = document.createElement('div');
        carta.className = 'card';
        carta.dataset.indice = indice;
        carta.addEventListener('click', virarCarta);
        tabuleiro.appendChild(carta);
    });
    
    // Esconder mensagem de vitória
    mensagemVitoria.classList.add('hidden');
}

// Função para virar uma carta
function virarCarta() {
    // Verificar se já há duas cartas viradas ou se a carta já está virada
    if (cartasViradas.length === 2 || this.classList.contains('flipped')) return;
    
    // Virar a carta
    this.classList.add('flipped');
    this.textContent = cartas[this.dataset.indice];
    
    // Adicionar à lista de cartas viradas
    cartasViradas.push(this);
    
    // Se duas cartas foram viradas, verificar se são iguais
    if (cartasViradas.length === 2) {
        movimentos++;
        atualizarDisplayMovimentos();
        verificarPar();
    }
}

// Função para verificar se as cartas viradas são iguais
function verificarPar() {
    const [carta1, carta2] = cartasViradas;
    
    if (carta1.textContent === carta2.textContent) {
        // As cartas são iguais
        paresEncontrados++;
        cartasViradas = [];
        
        // Verificar se o jogo terminou
        if (paresEncontrados === emojis.length) {
            setTimeout(mostrarMensagemVitoria, 500);
        }
    } else {
        // As cartas são diferentes
        setTimeout(() => {
            carta1.classList.remove('flipped');
            carta2.classList.remove('flipped');
            carta1.textContent = '';
            carta2.textContent = '';
            cartasViradas = [];
        }, 1000);
    }
}

// Função para atualizar o display de movimentos
function atualizarDisplayMovimentos() {
    displayMovimentos.textContent = `Movimentos: ${movimentos}`;
}

// Função para mostrar a mensagem de vitória
function mostrarMensagemVitoria() {
    mensagemVitoria.classList.remove('hidden');
    displayMovimentosFinais.textContent = `Total de movimentos: ${movimentos}`;
}

// Adicionar evento de clique ao botão de reinício
botaoReiniciar.addEventListener('click', iniciarJogo);

// Inicializar o jogo quando a página carregar
iniciarJogo();

// Explicações detalhadas:

// 1. Variáveis Globais:
//    - cartas: Array que armazena todas as cartas do jogo (emojis duplicados e embaralhados).
//    - cartasViradas: Array que guarda as cartas que estão atualmente viradas (máximo de 2).
//    - movimentos: Contador que registra quantos pares de cartas o jogador tentou combinar.
//    - paresEncontrados: Contador de quantos pares corretos o jogador já encontrou.

// 2. Elementos do DOM:
//    Estas constantes armazenam referências a elementos HTML importantes para o jogo.
//    Usamos document.getElementById() para obter esses elementos pelo seu ID.

// 3. Função iniciarJogo():
//    - Cria um novo conjunto de cartas embaralhadas.
//    - Reseta todas as variáveis do jogo.
//    - Limpa o tabuleiro e cria novas cartas.
//    - É chamada no início e quando o jogo é reiniciado.

// 4. Função virarCarta():
//    - É chamada quando uma carta é clicada.
//    - Verifica se é possível virar a carta.
//    - Adiciona a classe 'flipped' para mostrar o emoji.
//    - Adiciona a carta ao array cartasViradas.
//    - Se duas cartas foram viradas, chama verificarPar().

// 5. Função verificarPar():
//    - Compara as duas cartas viradas.
//    - Se forem iguais, incrementa paresEncontrados.
//    - Se forem diferentes, vira as cartas de volta após um delay.
//    - Verifica se o jogo terminou (todos os pares encontrados).

// 6. Função atualizarDisplayMovimentos():
//    - Atualiza o texto que mostra quantos movimentos o jogador fez.

// 7. Função mostrarMensagemVitoria():
//    - Exibe a mensagem de vitória quando todos os pares são encontrados.
//    - Mostra o número total de movimentos que o jogador fez.

// 8. Evento de clique no botão de reinício:
//    - Quando o botão é clicado, o jogo é reiniciado chamando iniciarJogo().

// 9. Inicialização:
//    - O jogo é iniciado automaticamente quando a página é carregada.