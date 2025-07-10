// ===== TABELAS DE VALORES =====
const valorLetrasNumerologia = {
  'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
  'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
  'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
};

const valorLetrasCabala = {
  'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8,
  'I': 9, 'J': 600, 'K': 10, 'L': 20, 'M': 30, 'N': 40, 'O': 50,
  'P': 60, 'Q': 70, 'R': 80, 'S': 90, 'T': 100, 'U': 200, 'V': 700,
  'W': 900, 'X': 300, 'Y': 400, 'Z': 500
};

// ===== FUNÇÕES BÁSICAS =====
function calcularValorLetra(letra, tabela) {
  return tabela[letra.toUpperCase()] || 0;
}

function reduzirNumero(numero, preservarMestres = true) {
  const numerosMestres = [11, 22, 33];
  if (preservarMestres && numerosMestres.includes(numero)) return numero;
  
  let num = numero;
  while (num > 9 && !numerosMestres.includes(num)) {
    num = String(num).split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  return num;
}

// ===== CÁLCULOS PRINCIPAIS =====
function calcularNumerologiaNome(nome) {
  const letras = nome.replace(/[^A-Za-z]/g, '');
  let soma = 0;
  
  for (let letra of letras) {
    soma += calcularValorLetra(letra, valorLetrasNumerologia);
  }
  
  return reduzirNumero(soma);
}

function calcularCabalaNome(nome) {
  const letras = nome.replace(/[^A-Za-z]/g, '');
  let soma = 0;
  
  for (let letra of letras) {
    soma += calcularValorLetra(letra, valorLetrasCabala);
  }
  
  return soma; // Não reduzir na Cabala!
}

function calcularNumeroData(data) {
  const numeros = data.replace(/-/g, '').split('').map(Number);
  const soma = numeros.reduce((acc, num) => acc + num, 0);
  return reduzirNumero(soma);
}

// ===== INTERPRETAÇÕES =====
function interpretarNumerologia(numero) {
  const significados = {
    1: 'Liderança, independência e criatividade.',
    2: 'Harmonia, cooperação e sensibilidade.',
    3: 'Expressão, comunicação e otimismo.',
    4: 'Estabilidade, organização e praticidade.',
    5: 'Liberdade, aventura e mudança.',
    6: 'Responsabilidade, amor e equilíbrio.',
    7: 'Espiritualidade, intuição e análise.',
    8: 'Poder, ambição e realização material.',
    9: 'Humanitarismo, compaixão e sabedoria.',
    11: 'Mestre 11: Intuição elevada e inspiração.',
    22: 'Mestre 22: Construtor e visionário.',
    33: 'Mestre 33: Amor incondicional e serviço à humanidade.'
    // ... (complete com outros números)
  };
  return significados[numero] || "Significado espiritual único";
}

function interpretarCabala(numero) {
  if (numero === 7) return "Perfeição divina";
  if (numero >= 40 && numero <= 49) return "Transformação espiritual";
  // ... (adicione mais interpretações)
  return `Número cabalístico: ${numero}`;
}

// ===== FUNÇÃO PRINCIPAL =====
function calcular() {
  const nome = document.getElementById('nome').value.trim();
  const data = document.getElementById('data').value;
  
  if (!nome || !data) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  // Cálculos
  const numeroNome = calcularNumerologiaNome(nome);
  const numeroData = calcularNumeroData(data);
  const numeroDestino = reduzirNumero(numeroNome + numeroData);
  const numeroCabala = calcularCabalaNome(nome);

  // Exibir resultados
  const resultadoHTML = `
    <div class="resultado-box">
      <h3>Numerologia Tradicional</h3>
      <p><strong>Nome (${numeroNome}):</strong> ${interpretarNumerologia(numeroNome)}</p>
      <p><strong>Data (${numeroData}):</strong> ${interpretarNumerologia(numeroData)}</p>
      <p><strong>Destino (${numeroDestino}):</strong> ${interpretarNumerologia(numeroDestino)}</p>
    </div>
    <div class="resultado-box">
      <h3>Cabala</h3>
      <p><strong>Valor do Nome:</strong> ${numeroCabala}</p>
      <p><strong>Significado:</strong> ${interpretarCabala(numeroCabala)}</p>
    </div>
  `;

  document.getElementById('resultado').innerHTML = resultadoHTML;
}
