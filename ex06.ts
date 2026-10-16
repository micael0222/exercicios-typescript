export {};

// Exercício 06: Status do pedido no app de delivery

enum StatusPedido {
  Recebido = 1,
  EmPreparo,
  SaiuParaEntrega,
  Entregue,
  Cancelado,
}

enum FormaPagamento {
  Pix = 'PIX',
  Cartao = 'CARTAO',
  Dinheiro = 'DINHEIRO',
}

function mensagem(status: StatusPedido): string {
  switch (status) {
    case StatusPedido.Recebido:
      return 'Recebemos seu pedido!';
    case StatusPedido.EmPreparo:
      return 'Seu pedido está sendo preparado 🍳';
    case StatusPedido.SaiuParaEntrega:
      return 'O entregador está a caminho 🛵';
    case StatusPedido.Entregue:
      return 'Pedido entregue. Bom apetite!';
    case StatusPedido.Cancelado:
      return 'Pedido cancelado.';
  }
}

// Entregue e Cancelado são etapas finais: não mudam
function avancar(status: StatusPedido): StatusPedido {
  if (status === StatusPedido.Entregue || status === StatusPedido.Cancelado) {
    return status;
  }
  return status + 1;
}

// Simulação do pedido, do início ao fim
let status: StatusPedido = StatusPedido.Recebido;
do {
  // Mapeamento reverso: StatusPedido[2] dá 'EmPreparo'
  console.log(`[${status} - ${StatusPedido[status]}] ${mensagem(status)}`);
  if (status === StatusPedido.Entregue) break;
  status = avancar(status);
} while (true);

const pagamento: FormaPagamento = FormaPagamento.Pix;
console.log(`Pagamento: ${pagamento}`);

// const erro: FormaPagamento = 'PIX'; // error TS2322: Type '"PIX"' is not assignable to type 'FormaPagamento'.
// Por quê: um enum de string é um tipo "fechado". Só os membros do próprio
// enum (FormaPagamento.Pix, ...) são aceitos, mesmo que o texto seja idêntico.
// Isso impede que um texto qualquer ('pix', 'Pix ', 'BOLETO') entre onde só
// formas de pagamento válidas deveriam entrar.
