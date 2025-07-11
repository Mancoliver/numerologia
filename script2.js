// ===== TABELAS DE VALORES =====
const valorLetrasNumerologia = {
  'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
  'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
  'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
};

function agruparPorPlanoNome(nome) {
  // 1. Calcula apenas o número do nome completo
  const numeroNome = calcularNumerologiaNome(nome).completo;
  
  // 2. Define os planos
  const planos = {
    fisico: { numeros: [], total: 0, label: "Físico (4,5)" },
    mental: { numeros: [], total: 0, label: "Mental (1,8)" },
    emocional: { numeros: [], total: 0, label: "Emocional (2,3,6)" },
    intuitivo: { numeros: [], total: 0, label: "Intuitivo (7,9)" }
  };

  // 3. Classifica o número do nome
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

function calcularNumerologiaNome(nome) {
  // Remove caracteres não-alfabéticos e divide por espaços
  const nomesSeparados = nome.replace(/[^A-Za-z ]/g, '').split(' ').filter(n => n !== '');
  
  // Calcula o NOME COMPLETO (como antes)
  const nomeCompleto = nomesSeparados.join('');
  let somaCompleta = 0;
  for (let letra of nomeCompleto) {
    somaCompleta += calcularValorLetra(letra, valorLetrasNumerologia);
  }

// função principal chamada
function calcular2() {
  const nome = document.getElementById('nome').value.trim();
  
  // ... (cálculos existentes)

  // Foca apenas no nome completo
  const planosNome = agruparPorPlanoNome(nome);

  // Exibição simplificada
  let planosHTML = '';
  for (const plano of Object.values(planosNome)) {
    if (plano.total > 0) {
      planosHTML += `
        <p><strong>${plano.label}:</strong> 
        Número ${plano.numeros[0]} | Total: ${plano.total}</p>
      `;
    }
  }

  // Adiciona ao resultado
  document.getElementById('resultado').innerHTML += `
    <div class="planos-nome">
      <h3>Planos do Nome Completo</h3>
      ${planosHTML}
    </div>
  `;
}
