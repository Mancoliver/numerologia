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

// ===== FUNÇÕES =====
function getValorLetra(letra, tabela) {
  return tabela[letra.toUpperCase()] || 0;
}

function reduzirNumero(numero) {
  const numerosMestres = [11, 22, 33];
  if (numerosMestres.includes(numero)) return numero;
  
  while (numero > 9) {
    numero = String(numero).split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  return numero;
}

function calcularNumerologia(nome) {
  const letras = nome.replace(/[^A-Za-z]/g, '');
  let soma = 0;
  for (let letra of letras) {
    soma += getValorLetra(letra, valorLetrasNumerologia);
  }
  return reduzirNumero(soma);
}

function calcularCabala(nome) {
  const letras = nome.replace(/[^A-Za-z]/g, '');
  let soma = 0;
  for (let letra of letras) {
    soma += getValorLetra(letra, valorLetrasCabala);
  }
  return soma; // Não reduzir na Cabala!
}

function calcularData(data) {
  const numeros = data.replace(/-/g, '').split('').map(Number);
  return reduzirNumero(numeros.reduce((acc, num) => acc + num, 0));
}

// ===== EXECUÇÃO PRINCIPAL =====
document.addEventListener('DOMContentLoaded', function() {
  const btnCalcular = document.getElementById('btnCalcular');
  
  if (btnCalcular) {
    btnCalcular.addEventListener('click', function() {
      const nome = document.getElementById('nome').value.trim();
      const data = document.getElementById('data').value;
      
      if (!nome || !data) {
        alert("Preencha nome e data!");
        return;
      }

      const numeroNome = calcularNumerologia(nome);
      const numeroData = calcularData(data);
      const numeroDestino = reduzirNumero(numeroNome + numeroData);
      const numeroCabala = calcularCabala(nome);

      document.getElementById('resultado').innerHTML = `
        <div class="resultado-box">
          <h3>Numerologia</h3>
          <p><strong>Nome:</strong> ${numeroNome}</p>
          <p><strong>Data:</strong> ${numeroData}</p>
          <p><strong>Destino:</strong> ${numeroDestino}</p>
        </div>
        <div class="resultado-box">
          <h3>Cabala</h3>
          <p><strong>Valor:</strong> ${numeroCabala}</p>
        </div>
      `;
    });
  }
});
