// ===== TABELAS DE VALORES =====
const valorLetrasNumerologia = {
  'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
  'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
  'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
};

// ===== FUNÇÕES AUXILIARES =====
function calcularValorLetra(letra, tabela) {
  return tabela[letra.toUpperCase()] || 0;
}

function reduzirNumero(numero) {
  let num = numero;
  while (num > 9) {
    num = String(num).split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  return num;
}

// ===== FUNÇÕES PRINCIPAIS =====
function calcularNumerologiaNome(nome) {
  // Remove caracteres não-alfabéticos e divide por espaços
  const nomesSeparados = nome.replace(/[^A-Za-z ]/g, '').split(' ').filter(n => n !== '');
  
  // Calcula o NOME COMPLETO
  const nomeCompleto = nomesSeparados.join('');
  let somaCompleta = 0;
  for (let letra of nomeCompleto) {
    somaCompleta += calcularValorLetra(letra, valorLetrasNumerologia);
  }

  return {
    completo: reduzirNumero(somaCompleta),
    separados: nomesSeparados.map(nome => {
      let soma = 0;
      for (let letra of nome) {
        soma += calcularValorLetra(letra, valorLetrasNumerologia);
      }
      return {
        nome: nome,
        valor: reduzirNumero(soma),
        valorBruto: soma
      };
    })
  };
}

function agruparPorPlanoNome(nome) {
  const numeroNome = calcularNumerologiaNome(nome).completo;
  
  const planos = {
    fisico: { numeros: [], total: 0, label: "Físico (4,5)" },
    mental: { numeros: [], total: 0, label: "Mental (1,8)" },
    emocional: { numeros: [], total: 0, label: "Emocional (2,3,6)" },
    intuitivo: { numeros: [], total: 0, label: "Intuitivo (7,9)" }
  };

  if ([4, 5].includes(numeroNome)) {
    planos.fisico.numeros.push(numeroNome);
    planos.fisico.total = 1;
  } 
  else if ([1, 8].includes(numeroNome)) {
    planos.mental.numeros.push(numeroNome);
    planos.mental.total = 1;
  }
  else if ([2, 3, 6].includes(numeroNome)) {
    planos.emocional.numeros.push(numeroNome);
    planos.emocional.total = 1;
  }
  else if ([7, 9].includes(numeroNome)) {
    planos.intuitivo.numeros.push(numeroNome);
    planos.intuitivo.total = 1;
  }

  return planos;
}

function calcular2() {
  const nome = document.getElementById('nome').value.trim();
  
  if (!nome) {
    alert("Por favor, digite um nome!");
    return;
  }

  const planosNome = agruparPorPlanoNome(nome);

  let planosHTML = '';
  for (const plano of Object.values(planosNome)) {
    if (plano.total > 0) {
      planosHTML += `
        <p><strong>${plano.label}:</strong> 
        Número ${plano.numeros[0]} | Total: ${plano.total}</p>
      `;
    }
  }

  document.getElementById('resultado').innerHTML = `
    <div class="planos-nome">
      <h3>Planos do Nome Completo</h3>
      ${planosHTML}
    </div>
  `;
}
