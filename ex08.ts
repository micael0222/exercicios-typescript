export {};

// Exercício 08: Formulário de cadastro

// 1) number | string e estreitamento com typeof
const codigo: number | string = 'CLI-0042';

function formatarCodigo(c: number | string): string {
  let numero: number;
  if (typeof c === 'number') {
    numero = c; // aqui c é number
  } else {
    numero = parseInt(c.replace(/\D/g, ''), 10); // aqui c é string: pega só os dígitos
  }
  return `CLI-${String(numero).padStart(4, '0')}`;
}

// 2) Tipo literal
type Tamanho = 'P' | 'M' | 'G' | 'GG';
const camiseta: Tamanho = 'M';
// const camisetaErrada: Tamanho = 'XG'; // error TS2322: Type '"XG"' is not assignable to type 'Tamanho'.

// 3) Frete por região
function calcularFrete(regiao: 'norte' | 'nordeste' | 'centro-oeste' | 'sudeste' | 'sul'): number {
  switch (regiao) {
    case 'norte':
      return 25;
    case 'nordeste':
      return 20;
    case 'centro-oeste':
      return 18;
    case 'sudeste':
      return 12;
    case 'sul':
      return 15;
  }
}

// 4) string | null
const rua = 'Rua das Flores, 100';
const complemento: string | null = null;
function textoComplemento(c: string | null): string {
  if (c === null) {
    return '(sem complemento)';
  }
  return c; // aqui c é string
}

// 5) Só os dígitos do telefone
function limparTelefone(tel: string | number): string {
  if (typeof tel === 'number') {
    return String(tel);
  }
  return tel.replace(/\D/g, '');
}

// 6) Inferência de literais
const r = 'sul'; // const: o tipo inferido é o literal 'sul'
calcularFrete(r); // ok

let r2 = 'sul'; // let: o valor pode mudar, então o tipo é alargado para string
// calcularFrete(r2); // error TS2345: Argument of type 'string' is not assignable to parameter of type '"centro-oeste" | "nordeste" | "norte" | "sudeste" | "sul"'.
// Por quê: com const o valor nunca muda, então o TS guarda o literal 'sul'.
// Com let, o valor pode virar qualquer texto depois, então o TS "alarga" o
// tipo para string, que é mais amplo do que as cinco regiões aceitas.

let r3 = 'sul' as const; // corrigido com as const: o tipo continua sendo o literal 'sul'
calcularFrete(r3); // ok

console.log(`Cliente: ${formatarCodigo(codigo)} | Camiseta: ${camiseta}`);
console.log(`Entrega: ${rua} - ${textoComplemento(complemento)}`);
console.log(`Frete para o sul: R$ ${calcularFrete(r3).toFixed(2)}`);
console.log(`Telefone: ${limparTelefone('(69) 99999-0000')}`);

// Extras: o mesmo telefone vindo como número, e o código vindo como número
console.log(`Telefone (número): ${limparTelefone(69999990000)}`);
console.log(`Código (número): ${formatarCodigo(42)}`);
