export {};

// Exercício 02: Cupom fiscal

const nomeDigitado: string = ' maria da silva ';

function formatarNome(nome: string): string {
  const minusculas: string[] = ['da', 'de', 'do'];

  // Remove espaços das pontas (trim) e espaços duplicados (split + filter + join)
  const limpo = nome
    .trim()
    .split(' ')
    .filter((palavra) => palavra !== '')
    .join(' ');

  // Primeira letra maiúscula, exceto em "da", "de" e "do"
  return limpo
    .split(' ')
    .map((palavra, i) => {
      const p = palavra.toLowerCase();
      if (i > 0 && minusculas.includes(p)) {
        return p;
      }
      return p.charAt(0).toUpperCase() + p.slice(1);
    })
    .join(' ');
}

// Conversões: o leitor de código de barras entrega texto
const precoLido = '12.40';
const quantidadeLida = '3un';
const preco: number = Number(precoLido);
const quantidade: number = parseInt(quantidadeLida, 10); // lê "3" e ignora "un"

const clienteFidelidade: boolean = true;
const numeroCupom = 42;

const subtotal = preco * quantidade;
const desconto = clienteFidelidade ? subtotal * 0.05 : 0;
const totalCupom = subtotal - desconto;

const cupom = `CUPOM Nº ${String(numeroCupom).padStart(6, '0')}
Cliente: ${formatarNome(nomeDigitado)}
Item: ${quantidade} x R$ ${preco.toFixed(2)}
Subtotal: R$ ${subtotal.toFixed(2)}
Desconto fidelidade: R$ ${desconto.toFixed(2)}
TOTAL: R$ ${totalCupom.toFixed(2)}`;

console.log(cupom);
