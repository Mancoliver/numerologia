// ===== TABELA DE VALORES DAS LETRAS =====
const valorLetras = {
  'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
  'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
  'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
};

// ===== FUNÇÃO PARA CALCULAR VALOR DE CADA LETRA =====
function calcularValorLetra(letra) {
  return valorLetras[letra.toUpperCase()] || 0;
}

// ===== FUNÇÃO PRINCIPAL ATUALIZADA =====
function calcularNumerologiaNomeCompleto(nome) {
  // 1. Processa cada letra do nome completo
  const letras = nome.replace(/[^A-Za-z]/g, '').split('');
  
  // 2. Calcula o valor de cada letra e conta ocorrências
  const contagemNumeros = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0};
  
  for (const letra of letras) {
    const valor = calcularValorLetra(letra);
    contagemNumeros[valor]++;
  }

  // 3. Agrupa por plano conforme sua especificação
  const planos = {
    fisico: {
      '4': contagemNumeros[4],
      '5': contagemNumeros[5],
      total: contagemNumeros[4] + contagemNumeros[5]
    },
    mental: {
      '1': contagemNumeros[1],
      '8': contagemNumeros[8],
      total: contagemNumeros[1] + contagemNumeros[8]
    },
    emocional: {
      '2': contagemNumeros[2],
      '3': contagemNumeros[3],
      '6': contagemNumeros[6],
      total: contagemNumeros[2] + contagemNumeros[3] + contagemNumeros[6]
    },
    intuitivo: {
      '7': contagemNumeros[7],
      '9': contagemNumeros[9],
      total: contagemNumeros[7] + contagemNumeros[9]
    }
  };

  // 4. Calcula o número reduzido do nome completo
  const somaTotal = Object.entries(contagemNumeros)
    .reduce((acc, [num, qtd]) => acc + (num * qtd), 0);
  const numeroReduzido = reduzirNumero(somaTotal);

  return {
    letras: letras,
    contagemNumeros: contagemNumeros,
    planos: planos,
    numeroReduzido: numeroReduzido
  };
}

// ===== FUNÇÃO PARA EXIBIR RESULTADOS =====
function calcular2() {
  const nome = document.getElementById('nome').value.trim();
  
  if (!nome) {
    alert("Por favor, digite um nome!");
    return;
  }

  const resultado = calcularNumerologiaNomeCompleto(nome);

  // 1. Exibe detalhes das letras
  let detalhesLetras = '<div class="letras"><h4>Letras e Valores:</h4><ul>';
  for (const letra of resultado.letras) {
    detalhesLetras += `<li>${letra.toUpperCase()}: ${calcularValorLetra(letra)}</li>`;
  }
  detalhesLetras += '</ul></div>';

  // 2. Exibe contagem por plano
  let planosHTML = '<div class="planos"><h4>Contagem por Plano:</h4>';
  
  const templatePlano = (plano, label) => {
    const itens = Object.entries(plano)
      .filter(([key]) => key !== 'total')
      .map(([num, qtd]) => `<li>${num} = ${qtd}</li>`)
      .join('');
    
    return `
      <div class="plano">
        <h5>${label}</h5>
        <ul>${itens}</ul>
        <p class="total">Total: ${plano.total}</p>
      </div>
    `;
  };

  planosHTML += `
    ${templatePlano(resultado.planos.fisico, '💪 Físico (4,5)')}
    ${templatePlano(resultado.planos.mental, '🧠 Mental (1,8)')}
    ${templatePlano(resultado.planos.emocional, '❤️ Emocional (2,3,6)')}
    ${templatePlano(resultado.planos.intuitivo, '🔮 Intuitivo (7,9)')}
  </div>`;

  // 3. Saída final
  document.getElementById('resultado2').innerHTML = `
    <div class="resultado-box">
      <!-- 
      <h3>Análise do Nome: "${nome}"</h3>
      <p>Número reduzido: <strong>${resultado.numeroReduzido}</strong></p>
      -->
      ${detalhesLetras}
      ${planosHTML}
    </div>
  `;
}

// Função para reduzir número (mantida do código anterior)
function reduzirNumero(numero) {
  let num = numero;
  while (num > 9) {
    num = String(num).split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  return num;
}
