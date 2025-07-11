// ===== TABELAS DE VALORES =====
const valorLetrasNumerologia2 = {
  'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
  'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
  'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
};

// ===== FUNÇÕES AUXILIARES =====
function calcularValorLetra2(letra) {
  return valorLetrasNumerologia2[letra.toUpperCase()] || 0;
}

function reduzirNumero2(numero) {
  let num = numero;
  while (num > 9) {
    num = String(num).split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  return num;
}

// ===== FUNÇÕES PRINCIPAIS =====
function calcularNumerologiaNome2(nome) {
  const letras = nome.replace(/[^A-Za-z]/g, '');
  let soma = 0;
  
  for (let letra of letras) {
    soma += calcularValorLetra2(letra);
  }
  
  return reduzirNumero2(soma);
}

function agruparPorPlanoNome(nome) {
  const numeroNome2 = calcularNumerologiaNome2(nome);
  
  const planos = {
    fisico: { numeros: [], total: 0, label: "Físico (4,5)" },
    mental: { numeros: [], total: 0, label: "Mental (1,8)" },
    emocional: { numeros: [], total: 0, label: "Emocional (2,3,6)" },
    intuitivo: { numeros: [], total: 0, label: "Intuitivo (7,9)" }
  };

  if ([4, 5].includes(numeroNome2)) {
    planos.fisico.numeros.push(numeroNome2);
    planos.fisico.total = 1;
  } 
  else if ([1, 8].includes(numeroNome2)) {
    planos.mental.numeros.push(numeroNome2);
    planos.mental.total = 1;
  }
  else if ([2, 3, 6].includes(numeroNome2)) {
    planos.emocional.numeros.push(numeroNome2);
    planos.emocional.total = 1;
  }
  else if ([7, 9].includes(numeroNome2)) {
    planos.intuitivo.numeros.push(numeroNome2);
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
  const numeroNome2 = calcularNumerologiaNome2(nome);

  let planosHTML = '';
  for (const plano of Object.values(planosNome)) {
    if (plano.total > 0) {
      planosHTML += `
        <p><strong>${plano.label}:</strong> 
        Número ${plano.numeros[0]} | Total: ${plano.total}</p>
      `;
    }
  }

  document.getElementById('resultado2').innerHTML = `
    <div class="resultado-container">
      
      <div class="planos">
        <h3>Planos do Nome</h3>
        ${planosHTML}
      </div>
    </div>
  `;
}
