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

const planosNumerologia = {
  fisico: [4, 5],
  mental: [1, 8],
  emocional: [2, 3, 6],
  intuitivo: [7, 9]
};

// ===== FUNÇÕES BÁSICAS =====
function calcularValorLetra(letra, tabela) {
  return tabela[letra.toUpperCase()] || 0;
}

function reduzirNumero(numero, preservarMestres = true) {
  const numerosMestres = [11, 22, 33, 44, 55, 66, 77, 88, 99];
  if (preservarMestres && numerosMestres.includes(numero)) return numero;
  
  let num = numero;
  while (num > 9 && !numerosMestres.includes(num)) {
    num = String(num).split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  return num;
}
// ===== FUNÇÕES PARA SOMAR VOGAIS E CONSOANTES =====
function isVogal(letra) {
  const vogais = ['A', 'E', 'I', 'O', 'U'];
  return vogais.includes(letra.toUpperCase());
}

function somarVogais(nome, tabela) {
  const letras = nome.replace(/[^A-Za-z]/g, '');
  let soma = 0;
  
  for (let letra of letras) {
    if (isVogal(letra)) {
      soma += calcularValorLetra(letra, tabela);
    }
  }
  
  return tabela === valorLetrasNumerologia ? reduzirNumero(soma) : soma;
}

function somarConsoantes(nome, tabela) {
  const letras = nome.replace(/[^A-Za-z]/g, '');
  let soma = 0;
  
  for (let letra of letras) {
    if (!isVogal(letra)) {
      soma += calcularValorLetra(letra, tabela);
    }
  }
  
  return tabela === valorLetrasNumerologia ? reduzirNumero(soma) : soma;
}

// ===== CÁLCULOS PRINCIPAIS =====
function calcularNumerologiaNome(nome) {
  // Remove caracteres não-alfabéticos e divide por espaços
  const nomesSeparados = nome.replace(/[^A-Za-z ]/g, '').split(' ').filter(n => n !== '');
  
  // Calcula o NOME COMPLETO (como antes)
  const nomeCompleto = nomesSeparados.join('');
  let somaCompleta = 0;
  for (let letra of nomeCompleto) {
    somaCompleta += calcularValorLetra(letra, valorLetrasNumerologia);
  }

  // Calcula CADA NOME SEPARADAMENTE
  const calculosSeparados = nomesSeparados.map(nome => {
    let soma = 0;
    for (let letra of nome) {
      soma += calcularValorLetra(letra, valorLetrasNumerologia);
    }
    return {
      nome: nome,
      valor: reduzirNumero(soma),
      valorBruto: soma // Opcional: inclui o número sem redução
    };
  });

  // Retorna um objeto com todos os resultados
  return {
    completo: reduzirNumero(somaCompleta),
    separados: calculosSeparados
  };
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
    33: 'Mestre 33: Amor incondicional e serviço à humanidade.',
    44: 'Mestre 44: Transformação prática e disciplina.',
    55: 'Mestre 55: Liberdade radical e mudanças profundas.' 
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

// ===== FUNÇÕES DE CONTAGEM =====
function contarNumeros(numeros) {
  const contagem = {};
  numeros.forEach(num => {
    contagem[num] = (contagem[num] || 0) + 1;
  });
  return contagem;
}

function agruparPorPlano(ocorrencias) {
  const resultado = {};
  // Inicializa todos os planos
  for (const plano in planosNumerologia) {
    resultado[plano] = { numeros: {}, total: 0 };
  }
// Classifica cada número no plano correspondente
  for (const num in ocorrencias) {
    for (const [plano, numerosDoPlano] of Object.entries(planosNumerologia)) {
      if (numerosDoPlano.includes(parseInt(num))) {
        resultado[plano].numeros[num] = ocorrencias[num];
        resultado[plano].total += ocorrencias[num];
        break;
      }
    }
  }
  return resultado;
}
// ===== FUNÇÃO PRINCIPAL =====
function calcular() {
  const nome = document.getElementById('nome').value.trim();
  const data = document.getElementById('data').value;
  
  if (!nome || !data) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  // Cálculos principais
  const numerologiaNome = calcularNumerologiaNome(nome);
  const numeroNomeCompleto = numerologiaNome.completo; // Nome completo reduzido
  const numerosSeparados = numerologiaNome.separados;  // Nomes separados
  const numeroData = calcularNumeroData(data);
  const numeroDestino = reduzirNumero(numeroNomeCompleto + numeroData); // Corrigido aqui!
  const numeroCabala = calcularCabalaNome(nome);

  // Cálculos de vogais/consoantes
  const vogaisNumerologia = somarVogais(nome, valorLetrasNumerologia);
  const consoantesNumerologia = somarConsoantes(nome, valorLetrasNumerologia);
  const vogaisCabala = somarVogais(nome, valorLetrasCabala);
  const consoantesCabala = somarConsoantes(nome, valorLetrasCabala);

  // Junta todos os números para análise
  const todosNumeros = [numeroNomeCompleto, numeroData, numeroDestino];
  const ocorrencias = contarNumeros(todosNumeros);
  const planos = agruparPorPlano(ocorrencias);

   // Formatação dos resultados
  const nomesSeparadosHTML = numerosSeparados.map(item => `
    <p><strong>${item.nome}:</strong> ${item.valor} (valor bruto: ${item.valorBruto})</p>
  `).join('');

  // Contagem por planos
  let planosHTML = '';
  for (const [plano, dados] of Object.entries(planos)) {
    if (dados.total > 0) {
      const detalhes = Object.entries(dados.numeros).map(([num, qtd]) => `${qtd}(${num})`).join(' + ');
      planosHTML += `
        <p><strong>${plano.toUpperCase()}:</strong> ${detalhes} | Total: ${dados.total}</p>
      `;
    }
  }

  // HTML final único
  const resultadoHTML = `
    <div class="resultado-box">
      <h3>Numerologia Tradicional</h3>
      <p><strong>Nome Pesquisado:</strong> ${nome}</p>
      <p><strong>Nome completo (${numeroNomeCompleto}):</strong> ${interpretarNumerologia(numeroNomeCompleto)}</p>
      <br>
      <h4>Nomes separados:</h4>
      ${nomesSeparadosHTML}
      <p><strong>Data de Nascimento (${numeroData}):</strong> ${interpretarNumerologia(numeroData)}</p>
      <p><strong>Vogais do Nome (${vogaisNumerologia}):</strong> ${interpretarNumerologia(vogaisNumerologia)}</p>
      <p><strong>Consoantes do Nome (${consoantesNumerologia}):</strong> ${interpretarNumerologia(consoantesNumerologia)}</p>
      <p><strong>Número de Destino (${numeroDestino}):</strong> ${interpretarNumerologia(numeroDestino)}</p>
      <br>
      <h4>Contagem por Plano</h4>
      ${planosHTML}
    </div>
    <div class="resultado-box">
      <h3>Análise na Cabala Mística</h3>
      <p><strong>Valor do Nome:</strong> ${numeroCabala}</p>
      <p><strong>Vogais do Nome:</strong> ${vogaisCabala}</p>
      <p><strong>Consoantes do Nome:</strong> ${consoantesCabala}</p>
      <p><strong>Significado:</strong> ${interpretarCabala(numeroCabala)}</p>
    </div>
  `;

  document.getElementById('resultado').innerHTML = resultadoHTML;
}
