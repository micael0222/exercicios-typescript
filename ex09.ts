export {};

// Exercício 09: Lendo a resposta de uma API de clima

const respostaOk = '{"cidade":"Porto Velho","temperatura":34,"umidade":0.62}';
const respostaQuebrada = '{"cidade":"Porto Velho","temperatura":"quente"}';
const respostaInvalida = '{ cidade: Porto Velho ';

// 1) Versão com any: o compilador deixa passar qualquer coisa
function lerComAny(json: string): string {
  const dados: any = JSON.parse(json);
  return dados.temperatura.toFixed(1);
}
// lerComAny(respostaQuebrada);
// Erro só na execução: TypeError: dados.temperatura.toFixed is not a function
// O compilador não avisou nada, porque com any ele desiste de checar. O app
// quebra com o usuário usando, e não na hora de compilar.

// 3) never: função que nunca retorna normalmente
function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

// 2) Versão segura com unknown
function lerClima(json: string): { cidade: string; temperatura: number } {
  let dados: unknown;
  try {
    dados = JSON.parse(json);
  } catch (erro: unknown) {
    // JSON.parse lança SyntaxError quando o texto não é JSON válido
    if (erro instanceof SyntaxError) {
      return falhar('JSON malformado');
    }
    throw erro;
  }

  if (typeof dados !== 'object' || dados === null) {
    return falhar('resposta não é um objeto');
  }

  // Com `in`, o TS sabe que a propriedade existe, mas o valor ainda é unknown.
  const cidade = 'cidade' in dados ? dados.cidade : undefined;
  if (typeof cidade !== 'string') {
    return falhar('campo "cidade" inválido');
  }

  const temperatura = 'temperatura' in dados ? dados.temperatura : undefined;
  if (typeof temperatura !== 'number') {
    return falhar('campo "temperatura" inválido');
  }

  return { cidade, temperatura };
}

// 4) e 5) try/catch com catch (erro: unknown), testando as três respostas
for (const resposta of [respostaOk, respostaQuebrada, respostaInvalida]) {
  try {
    const clima = lerClima(resposta);
    console.log(`${clima.cidade}: ${clima.temperatura.toFixed(1)}°C`);
  } catch (erro: unknown) {
    if (erro instanceof Error) {
      console.log(`Erro: ${erro.message}`);
    } else {
      console.log('Erro desconhecido');
    }
  }
}
