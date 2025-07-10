// =============================================
// FUNÇÕES DE CÁLCULO NUMEROLÓGICO
// =============================================

// 1. Calcula o valor de uma única letra (A=1, B=2, ..., I=9, J=1, ..., Z=8)
function calcularValorLetra(letra) {
  const letraUpper = letra.toUpperCase();
  const valorLetras = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
    'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
  };
  return valorLetras[letraUpper] || 0; // Retorna 0 se não for letra
}

// 2. Reduz um número para 1 dígito (exceto números mestres 11, 22, 33)
function reduzirNumero(numero) {
  if ([11, 22, 33].includes(numero)) return numero; // Mantém mestres
  while (numero > 9) {
    numero = String(numero).split('').reduce((sum, digit) => sum + Number(digit), 0);
  }
  return numero;
}

// 3. Calcula o número do nome (soma letras e reduz)
function calcularNumeroNome(nomeCompleto) {
  const letrasValidas = nomeCompleto.replace(/[^A-Za-z]/g, ''); // Remove espaços e caracteres especiais
  let soma = 0;
  for (const letra of letrasValidas) {
    soma += calcularValorLetra(letra);
  }
  return reduzirNumero(soma);
}

// 4. Calcula o número da data de nascimento (dd/mm/aaaa)
function calcularNumeroData(data) {
  const [dia, mes, ano] = data.split('-').map(Number); // Formato: YYYY-MM-DD (input type="date")
  const soma = dia + mes + ano;
  return reduzirNumero(soma);
}

// =============================================
// FUNÇÃO PRINCIPAL (executada ao clicar no botão)
// =============================================
function calcularNumerologia() {
  // 1. Pega os valores do formulário
  const nome = document.getElementById('nome').value;
  const data = document.getElementById('data').value;

  // 2. Validações básicas
  if (!nome || !data) {
    alert('Por favor, preencha nome e data de nascimento!');
    return;
  }

  // 3. Calcula os números
  const numeroNome = calcularNumeroNome(nome);
  const numeroData = calcularNumeroData(data);
  const numeroDestino = reduzirNumero(numeroNome + numeroData);

  // 4. Exibe os resultados
  const resultadoHTML = `
    <h3>Resultado:</h3>
    <p><strong>Nome:</strong> ${numeroNome} (${getSignificadoNumero(numeroNome)})</p>
    <p><strong>Data de Nascimento:</strong> ${numeroData} (${getSignificadoNumero(numeroData)})</p>
    <p><strong>Número de Destino:</strong> ${numeroDestino} (${getSignificadoNumero(numeroDestino)})</p>
  `;
  document.getElementById('resultado').innerHTML = resultadoHTML;
}

// =============================================
// SIGNIFICADOS DOS NÚMEROS (personalize aqui!)
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
  return significados[numero] || 'Significado não definido.';
}
