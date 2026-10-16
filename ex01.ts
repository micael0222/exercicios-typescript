export {};

// Exercício 01: Caixa da padaria

// 1) Anotações de tipo explícitas
const nomeProduto1: string = 'Pão francês';
const precoUnitario1: number = 0.75;
let quantidade1: number = 12;

const nomeProduto2: string = 'Bolo de cenoura';
const precoUnitario2: number = 18.5;
const quantidade2: number = 2;

// 2) Sem anotação: o TypeScript infere o tipo a partir do valor
let aberta = true;
// Tipo inferido (passando o mouse no VS Code): boolean
// (com `const aberta = true` o tipo inferido seria o literal `true`)

// 3) Subtotais e total
const subtotal1 = precoUnitario1 * quantidade1;
const subtotal2 = precoUnitario2 * quantidade2;
const total = subtotal1 + subtotal2;

// 4) Separadores numéricos (o _ é só para facilitar a leitura)
const paesVendidosNoAno = 1_250_000;

// 5) Hexadecimal: 0x1A vale 26 em decimal
const categoriaPanificacao = 0x1a;

// 6) Provocando um erro
// quantidade1 = 'doze'; // error TS2322: Type 'string' is not assignable to type 'number'.

console.log(`${nomeProduto1}: ${quantidade1} x R$ ${precoUnitario1.toFixed(2)} = R$ ${subtotal1.toFixed(2)}`);
console.log(`${nomeProduto2}: ${quantidade2} x R$ ${precoUnitario2.toFixed(2)} = R$ ${subtotal2.toFixed(2)}`);
console.log(`Total: R$ ${total.toFixed(2)}`);
console.log(`Padaria aberta? ${aberta}`);
console.log(`Pães vendidos no ano: ${paesVendidosNoAno}`);
console.log(`Categoria: ${categoriaPanificacao}`);
