// =============================================
// TABELAS DE VALORES
// =============================================
const valorLetrasNumerologia = {
  'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
  'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
  'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
};

// Valores da Cabala (Gematria) para letras latinas (adaptação simplificada)
const valorLetrasCabala = {
  'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8,
  'I': 9, 'J': 600, 'K': 10, 'L': 20, 'M': 30, 'N': 40, 'O': 50,
  'P': 60, 'Q': 70, 'R': 80, 'S': 90, 'T': 100, 'U': 200, 'V': 700,
  'W': 900, 'X': 300, 'Y': 400, 'Z': 500
};

// =============================================
// FUNÇÕES DE CÁLCULO
// =============================================
function calcularValorLetra(letra, tabela) {
  const letraUpper = letra.toUpperCase();
  return tabela[letraUpper] || 0;
}

function reduzirNumero(numero, preservarMestres = true) {
  if (preservarMestres && [11, 22, 33].includes(numero)) return numero;
  while (numero > 9 && numero !== 11 && numero !== 22 && numero !== 33) {
    numero = String(numero).split('').reduce((sum, digit) => sum + Number(digit), 0);
  }
  return numero;
}

function calcularSoma(nome, tabela, reduzir = true) {
  const letrasValidas = nome.replace(/[^A-Za-z]/g, '');
  let soma = 0;
  for (const letra of letrasValidas) {
    soma += calcularValorLetra(letra, tabela);
  }
  return reduzir ? reduzirNumero(soma) : soma; // Cabala pode não reduzir
}

// =============================================
// FUNÇÃO PRINCIPAL
// =============================================
function calcularNumerologia() {
  const nome = document.getElementById('nome').value;
  const data = document.getElementById('data').value;

  if (!nome || !data) {
    alert('Preencha nome e data!');
    return;
  }

  // Numerologia Tradicional
  const numeroNome = calcularSoma(nome, valorLetrasNumerologia);
  const numeroData = calcularSoma(data.replace(/-/g, ''), valorLetrasNumerologia); // Remove hífens
  const numeroDestino = reduzirNumero(numeroNome + numeroData);

  // Cabala (Gematria)
  const numeroCabala = calcularSoma(nome, valorLetrasCabala, false); // Não reduzir!
  const significadoCabala = interpretarCabala(numeroCabala);

  // Exibir resultados
  const resultadoHTML = `
    <div class="resultado-box">
      <h3>Numerologia Tradicional</h3>
      <p><strong>Nome:</strong> ${numeroNome} (${getSignificadoNumero(numeroNome)})</p>
      <p><strong>Data de Nascimento:</strong> ${numeroData}</p>
      <p><strong>Número de Destino:</strong> ${numeroDestino} (${getSignificadoNumero(numeroDestino)})</p>
    </div>
    <div class="resultado-box">
      <h3>Cabala (Gematria)</h3>
      <p><strong>Valor do Nome:</strong> ${numeroCabala}</p>
      <p><strong>Significado:</strong> ${significadoCabala}</p>
    </div>
  `;
  document.getElementById('resultado').innerHTML = resultadoHTML;
}

// =============================================
// INTERPRETAÇÕES (PERSONALIZE!)
// =============================================
function getSignificadoNumero(numero) {
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
  };
    // ... (complete com os outros números)
  };
  return significados[numero] || 'Sem significado definido.';
}

function interpretarCabala(numero) {
  // Exemplos simplificados (pesquise mais sobre Gematria!)
  if (numero >= 1 && numero <= 9) return 'Significado base similar à numerologia.';
  if (numero === 10) return 'Perfeição divina.';
  if (numero === 22) return 'O Mestre Construtor na Cabala.';
  // ... adicione mais interpretações conforme pesquisa
  return `Consulte um especialista em Cabala para o número ${numero}.`;
}
