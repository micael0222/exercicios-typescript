export {};

// Exercício 07: Central de notificações

type Notificador = (destinatario: string, mensagem: string) => void;

const porEmail: Notificador = (destinatario, mensagem) => {
  console.log(`[E-MAIL] para ${destinatario}: ${mensagem}`);
};

const porSms: Notificador = (destinatario, mensagem) => {
  if (mensagem.length > 160) {
    console.log('SMS ignorado: mensagem longa');
    return; // return antecipado (vazio): encerra a função aqui
  }
  console.log(`[SMS] para ${destinatario}: ${mensagem}`);
};

const porApp: Notificador = (destinatario, mensagem) => {
  console.log(`[APP] para ${destinatario}: ${mensagem}`);
};

function notificarTodos(destinatarios: string[], mensagem: string, enviar: Notificador): void {
  destinatarios.forEach((destinatario) => enviar(destinatario, mensagem));
}

const aviso = 'Reunião de pais sexta às 19h';
notificarTodos(['ana@escola.com'], aviso, porEmail);
notificarTodos(['joao.resp'], aviso, porApp);
notificarTodos(['(69) 99999-0000'], 'x'.repeat(200), porSms);

// function teste(): void { return 10; } // error TS2322: Type 'number' is not assignable to type 'void'.

// Reflexão: um Notificador que retorna número é aceito.
const contar: Notificador = (d, m) => m.length;
// Por quê: quando um TIPO DE FUNÇÃO declara retorno void, o TypeScript quer
// dizer "quem chama não vai usar o retorno", e não "a função não pode retornar
// nada". Assim, qualquer função serve como callback. Por exemplo, o
// forEach((x) => lista.push(x)) funciona mesmo com push devolvendo number.
// O valor é simplesmente ignorado. Já uma função declarada diretamente com
// `: void` (como `teste`) não pode retornar valor, e por isso dá erro.
// `contar` é compatível com o tipo, mas o valor devolvido não pode ser usado.
const resultado = contar('x', 'abc'); // resultado tem tipo void, mesmo que a função devolva 3
