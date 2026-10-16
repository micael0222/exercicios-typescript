export {};

// Exercício 03: Ficha de paciente

// Tipo de objeto escrito direto na anotação (sem type nem interface)
let paciente: {
  readonly cpf: string;
  nome: string;
  idade: number;
  plano: boolean;
  alergias?: string[];
  contatoEmergencia?: { nome: string; telefone: string };
} = {
  cpf: '123.456.789-00',
  nome: 'Ana Souza',
  idade: 34,
  plano: true,
  alergias: ['dipirona', 'lactose'],
  contatoEmergencia: { nome: 'Pedro Souza', telefone: '(69) 99999-0000' },
};

// Segundo paciente, só com os campos obrigatórios (reaproveita o tipo do primeiro)
const outroPaciente: typeof paciente = {
  cpf: '987.654.321-00',
  nome: 'Carlos Lima',
  idade: 61,
  plano: false,
};

function resumo(p: { nome: string; idade: number; alergias?: string[] }): string {
  const alergias =
    p.alergias && p.alergias.length > 0
      ? `Alergias: ${p.alergias.join(', ')}`
      : 'Sem alergias registradas';
  return `${p.nome}, ${p.idade} anos. ${alergias}`;
}

console.log(resumo(paciente));
console.log(resumo(outroPaciente));

// Erros provocados
// paciente.cpf = '000.000.000-00'; // error TS2540: Cannot assign to 'cpf' because it is a read-only property.
// paciente.peso = 70; // error TS2339: Property 'peso' does not exist on type '{ readonly cpf: string; nome: string; idade: number; plano: boolean; alergias?: string[] | undefined; contatoEmergencia?: { nome: string; telefone: string; } | undefined; }'.

// Reflexão
let dados: object = paciente;
// dados.nome; // error TS2339: Property 'nome' does not exist on type 'object'.
// Por quê: `object` significa apenas "qualquer coisa que não seja primitivo".
// Ele não diz quais propriedades existem, então o compilador não deixa acessar
// nenhuma. O objeto ainda tem `nome`, mas o tipo `object` esqueceu disso.

let x: {} = 10; // aceito
// let y: object = 10; // error TS2322: Type 'number' is not assignable to type 'object'.
// Por quê: `{}` quer dizer "qualquer valor que não seja null ou undefined", e
// isso inclui primitivos como number, string e boolean. Já `object` só aceita
// valores não primitivos (objetos, arrays, funções), e 10 é um primitivo.
