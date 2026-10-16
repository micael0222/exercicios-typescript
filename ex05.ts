export {};

// Exercício 05: Boletim do clima

// Tupla nomeada: [cidade, temperatura]
const leituras: [cidade: string, temperatura: number][] = [
  ['Porto Velho', 34],
  ['Curitiba', 12],
  ['Manaus', 31],
  ['Porto Alegre', 9],
  ['Natal', 29],
];

function extremos(temps: number[]): [number, number] {
  return [Math.min(...temps), Math.max(...temps)];
}

const temperaturas = leituras.map(([, temp]) => temp);
const [minima, maxima] = extremos(temperaturas);
const media = temperaturas.reduce((acc, t) => acc + t, 0) / temperaturas.length;

for (const [cidade, temp] of leituras) {
  console.log(`${cidade}: ${temp}°C`);
}
console.log(`Mínima: ${minima}°C | Máxima: ${maxima}°C | Média: ${media.toFixed(1)}°C`);

// Contatos de imprensa: o e-mail é um elemento opcional da tupla
type Contato = [nome: string, telefone: string, email?: string];
const contatoComEmail: Contato = ['Marina Alves', '(69) 99999-1111', 'marina@jornal.com'];
const contatoSemEmail: Contato = ['Rafael Costa', '(69) 99999-2222'];

// Histórico semanal com elemento rest: cidade seguida de qualquer quantidade de temperaturas
const historico: [string, ...number[]] = ['Porto Velho', 33, 34, 35, 32, 34, 36, 33];
function mediaHistorico(h: [string, ...number[]]): number {
  const [, ...temps] = h;
  return temps.reduce((acc, t) => acc + t, 0) / temps.length;
}

// readonly em tupla
const capitalOficial: readonly [string, string] = ['RO', 'Porto Velho'];
// capitalOficial[0] = 'AC'; // error TS2540: Cannot assign to '0' because it is a read-only property.

// Extras (além da saída esperada)
console.log(`Contato 1: ${contatoComEmail[0]}, ${contatoComEmail[1]}, ${contatoComEmail[2]}`);
console.log(`Contato 2: ${contatoSemEmail[0]}, ${contatoSemEmail[1]}, ${contatoSemEmail[2] ?? '(sem e-mail)'}`);
console.log(`Média semanal de ${historico[0]}: ${mediaHistorico(historico).toFixed(1)}°C`);
console.log(`Capital oficial: ${capitalOficial[1]} (${capitalOficial[0]})`);
