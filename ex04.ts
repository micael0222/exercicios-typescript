export {};

// Exercício 04: Lista de compras do mês

const itens: { nome: string; preco: number; quantidade: number }[] = [
  { nome: 'Arroz 5kg', preco: 28.9, quantidade: 1 },
  { nome: 'Feijão 1kg', preco: 8.49, quantidade: 2 },
  { nome: 'Leite 1L', preco: 4.99, quantidade: 6 },
  { nome: 'Café 500g', preco: 17.9, quantidade: 1 },
  { nome: 'Sabão em pó', preco: 12.5, quantidade: 1 },
];

// Somente map, filter e reduce (sem for)
const nomes: string[] = itens.map((item) => item.nome);
const caros = itens.filter((item) => item.preco > 10);
const total: number = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

// readonly em array
const categorias: readonly string[] = ['Mercearia', 'Laticínios', 'Limpeza'];
// categorias.push('Higiene'); // error TS2339: Property 'push' does not exist on type 'readonly string[]'.

// Matriz: quantidade de itens em cada posição das 3 prateleiras
const despensa: number[][] = [[2, 0, 1], [4, 4], [1]];
const itensNaDespensa = despensa.reduce(
  (acc, prateleira) => acc + prateleira.reduce((soma, qtd) => soma + qtd, 0),
  0
);

// Desestruturação e spread
const [primeiro, segundo] = itens;
const listaComExtra = [...itens, { nome: 'Açúcar 1kg', preco: 5.2, quantidade: 1 }];

console.log(`Itens: ${nomes.join(', ')}`);
console.log(`Acima de R$ 10: ${caros.map((item) => item.nome).join(', ')}`);
console.log(`Total da compra: R$ ${total.toFixed(2)}`);
console.log(`Itens na despensa: ${itensNaDespensa}`);

// Extras (além da saída esperada): desestruturação e spread
console.log(`Primeiro e segundo: ${primeiro.nome} e ${segundo.nome}`);
console.log(`Lista original: ${itens.length} itens | Nova lista: ${listaComExtra.length} itens`);
console.log(`Categorias: ${categorias.join(', ')}`);
