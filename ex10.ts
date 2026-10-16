export {};

// Exercício 10: Sistema de estacionamento (projeto integrador)

// ---------- Tipos ----------

type Placa = string;
type Periodo = [entrada: number, saida: number]; // horas cheias, ex.: [8, 11]

type TipoVeiculo = 'carro' | 'moto' | 'caminhao';

// União discriminada: o campo `tipo` (literal) diz qual é o veículo.
// Cada tipo usa um literal específico de TipoVeiculo, para o TS poder estreitar.
type Carro = { readonly placa: Placa; tipo: Extract<TipoVeiculo, 'carro'>; portas: 2 | 4 };
type Moto = { readonly placa: Placa; tipo: Extract<TipoVeiculo, 'moto'>; cilindradas: number };
type Caminhao = { readonly placa: Placa; tipo: Extract<TipoVeiculo, 'caminhao'>; eixos: number };

type Veiculo = Carro | Moto | Caminhao;

enum SituacaoTicket {
  Aberto = 'ABERTO',
  Pago = 'PAGO',
}

type Ticket = {
  veiculo: Veiculo;
  periodo: Periodo;
  selo: boolean;
  situacao: SituacaoTicket;
  valor?: number;
};

// ---------- Tarifa ----------

function cobrar(primeiraHora: number, horaAdicional: number, horas: number): number {
  return primeiraHora + (horas - 1) * horaAdicional;
}

function calcularTarifa(v: Veiculo, horas: number): number {
  switch (v.tipo) {
    case 'carro':
      return cobrar(8, 5, horas);
    case 'moto':
      return cobrar(4, 2, horas);
    case 'caminhao':
      return cobrar(15, 10, horas);
    default: {
      // Verificação exaustiva: se sobrar algum tipo sem tratar, `v` não será never
      const _naoTratado: never = v;
      return _naoTratado;
    }
  }
}

// Teste da verificação exaustiva: acrescentar uma Van à união SEM tratar no switch.
// type Van = { readonly placa: Placa; tipo: 'van'; lugares: number };
// type Veiculo = Carro | Moto | Caminhao | Van;
// Erro no default do switch:
//   const _naoTratado: never = v; // error TS2322: Type 'Van' is not assignable to type 'never'.
// O que o never garantiu: o compilador obriga a tratar TODOS os membros da
// união. Ao esquecer a Van, o código deixa de compilar e aponta exatamente o
// tipo que faltou. Assim ninguém esquece um caso quando a união cresce.

// ---------- Ticket ----------

function calcularHoras(p: Periodo): number {
  const [entrada, saida] = p;
  return Math.max(1, saida - entrada); // todo veículo paga pelo menos 1 hora
}

// Devolve um novo objeto (spread) e não altera o original
function fecharTicket(t: Ticket): Ticket {
  const bruto = calcularTarifa(t.veiculo, calcularHoras(t.periodo));
  const valor = t.selo ? bruto * 0.5 : bruto;
  return { ...t, valor, situacao: SituacaoTicket.Pago };
}

function registrar(msg: string): void {
  console.log(msg);
}

function descrever(t: Ticket): string {
  const valor = (t.valor ?? 0).toFixed(2);
  const selo = t.selo ? ' (selo -50%)' : '';
  return `[${t.situacao}] ${t.veiculo.placa} (${t.veiculo.tipo}) - ${calcularHoras(t.periodo)}h - R$ ${valor}${selo}`;
}

// ---------- Entrada externa (JSON da cancela) ----------

function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

function lerJson(json: string): unknown {
  try {
    return JSON.parse(json);
  } catch (erro: unknown) {
    if (erro instanceof SyntaxError) {
      return falhar('JSON malformado');
    }
    throw erro;
  }
}

function lerVeiculo(json: string): Veiculo {
  const dados = lerJson(json);

  if (typeof dados !== 'object' || dados === null) {
    return falhar('veículo não é um objeto');
  }

  const placa = 'placa' in dados ? dados.placa : undefined;
  if (typeof placa !== 'string') {
    return falhar('campo "placa" inválido');
  }

  const tipo = 'tipo' in dados ? dados.tipo : undefined;
  switch (tipo) {
    case 'carro': {
      const portas = 'portas' in dados ? dados.portas : undefined;
      if (portas !== 2 && portas !== 4) {
        return falhar('campo "portas" inválido');
      }
      return { placa, tipo: 'carro', portas };
    }
    case 'moto': {
      const cilindradas = 'cilindradas' in dados ? dados.cilindradas : undefined;
      if (typeof cilindradas !== 'number') {
        return falhar('campo "cilindradas" inválido');
      }
      return { placa, tipo: 'moto', cilindradas };
    }
    case 'caminhao': {
      const eixos = 'eixos' in dados ? dados.eixos : undefined;
      if (typeof eixos !== 'number') {
        return falhar('campo "eixos" inválido');
      }
      return { placa, tipo: 'caminhao', eixos };
    }
    default:
      return falhar(`tipo "${String(tipo)}" desconhecido`);
  }
}

// ---------- Dados de teste ----------

const entradas: { json: string; periodo: Periodo; selo: boolean }[] = [
  { json: '{"placa":"ABC1D23","tipo":"carro","portas":4}', periodo: [8, 11], selo: false },
  { json: '{"placa":"MOT0A12","tipo":"moto","cilindradas":160}', periodo: [9, 10], selo: false },
  { json: '{"placa":"CAM9Z99","tipo":"caminhao","eixos":3}', periodo: [7, 12], selo: false },
  { json: '{"placa":"XYZ4E56","tipo":"carro","portas":2}', periodo: [14, 16], selo: true },
];

const tickets: Ticket[] = entradas.map((e) => ({
  veiculo: lerVeiculo(e.json),
  periodo: e.periodo,
  selo: e.selo,
  situacao: SituacaoTicket.Aberto,
}));

// ---------- Relatório ----------

const fechados = tickets.map(fecharTicket);
const pagos = fechados.filter((t) => t.situacao === SituacaoTicket.Pago);

pagos.forEach((t) => registrar(descrever(t)));

const faturamento = pagos.reduce((acc, t) => acc + (t.valor ?? 0), 0);
console.log(`Faturamento: R$ ${faturamento.toFixed(2)}`);

type Contagem = { carro: number; moto: number; caminhao: number };
const contagem = tickets.reduce<Contagem>(
  (acc, t) => {
    acc[t.veiculo.tipo] += 1;
    return acc;
  },
  { carro: 0, moto: 0, caminhao: 0 }
);
console.log(`Entradas: carro=${contagem.carro}, moto=${contagem.moto}, caminhao=${contagem.caminhao}`);

// Veículo inválido vindo da cancela
try {
  lerVeiculo('{"placa":"BIC1A11","tipo":"bicicleta"}');
} catch (erro: unknown) {
  if (erro instanceof Error) {
    console.log(`Erro ao ler veículo: ${erro.message}`);
  }
}
