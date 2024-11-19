import { Injectable } from '@angular/core';
import { DbService } from '../db.service';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {


  private lancamentos:any = [{

    id_api: 1,
    contrato_id: 1,
    contrato_qtd_parcelas: 20,
    contrato_juros_atraso:"Sim",
    contrato_juros_atraso_valor:1.5,
    contrato_multa_atraso:"Sim",
    contrato_multa_atraso_valor:10.5,
    tipo_credito: "Normal",
    lancamento_id: 1,
    cliente_id: 1,
    cliente_nome: "Jorge Aragão da Silva",
    cliente_whatsapp: '85999813469',
    caixa_id: 1,
    tipo_operacao_id: 1,
    user_id: 1,
    tipo_lancamento: null,
    numero_parcela: 1,
    data_vencimento: this.calcularDiferencaDias('2024-02-15'),
    data_vencimento_true: '2024-02-15',
    valor_capital: null,
    lucro: null,
    valor_divida: null,
    valor_pago: null,
    valor_restante: this.formatarMoeda(20),
    status: 'Em aberto'
  },
  {


    id_api: 1,
    contrato_id: 1,
    contrato_qtd_parcelas: 20,
    contrato_juros_atraso:"Sim",
    contrato_juros_atraso_valor:1.5,
    contrato_multa_atraso:"Sim",
    contrato_multa_atraso_valor:10.5,
    tipo_credito: "Normal",
    lancamento_id: 1,
    cliente_id: 1,
    cliente_nome: "Jorge Aragão da Silva",
    cliente_whatsapp: '85999813469',
    caixa_id: 1,
    tipo_operacao_id: 1,
    user_id: 1,
    tipo_lancamento: null,
    numero_parcela: 1,
    data_vencimento: this.calcularDiferencaDias('2024-02-16'),
    data_vencimento_true: '2024-02-16',
    valor_capital: null,
    lucro: null,
    valor_divida: null,
    valor_pago: null,
    valor_restante: this.formatarMoeda(20),
    status: 'Em aberto'
  },
  {


  id_api: 2,
  contrato_id: 1,
  contrato_qtd_parcelas: 20,
  contrato_juros_atraso:"Sim",
  contrato_juros_atraso_valor:1.5,
  contrato_multa_atraso:"Sim",
  contrato_multa_atraso_valor:10.5,
  tipo_credito: "Normal",
  lancamento_id: 2,
  cliente_id: 1,
  cliente_nome: "Jorge Aragão da Silva",
  cliente_whatsapp: '85999813469',
  caixa_id: 1,
  tipo_operacao_id: 1,
  user_id: 1,
  tipo_lancamento: null,
  numero_parcela: 2,
  data_vencimento: this.calcularDiferencaDias('2024-02-27'),
  data_vencimento_true: '2024-02-27',
  valor_capital: null,
  lucro: null,
  valor_divida: null,
  valor_pago: null,
  valor_restante: this.formatarMoeda(20),
  status: 'Em aberto'
},
{


id_api: 2,
contrato_id: 1,
contrato_qtd_parcelas: 20,
contrato_juros_atraso:"Sim",
contrato_juros_atraso_valor:1.5,
contrato_multa_atraso:"Sim",
contrato_multa_atraso_valor:10.5,
tipo_credito: "Normal",
lancamento_id: 2,
cliente_id: 1,
cliente_nome: "Jorge Aragão da Silva",
cliente_whatsapp: '85999813469',
caixa_id: 1,
tipo_operacao_id: 1,
user_id: 1,
tipo_lancamento: null,
numero_parcela: 3,
data_vencimento: this.calcularDiferencaDias('2024-02-28'),
data_vencimento_true: '2024-02-28',
valor_capital: null,
lucro: null,
valor_divida: null,
valor_pago: null,
valor_restante: this.formatarMoeda(20),
status: 'Em aberto'
},
{


id_api: 2,
contrato_id: 1,
contrato_qtd_parcelas: 20,
contrato_juros_atraso:"Sim",
contrato_juros_atraso_valor:1.5,
contrato_multa_atraso:"Sim",
contrato_multa_atraso_valor:10.5,
tipo_credito: "Normal",
lancamento_id: 2,
cliente_id: 1,
cliente_nome: "Jorge Aragão da Silva",
cliente_whatsapp: '85999813469',
caixa_id: 1,
tipo_operacao_id: 1,
user_id: 1,
tipo_lancamento: null,
numero_parcela: 3,
data_vencimento: this.calcularDiferencaDias('2024-02-29'),
data_vencimento_true: '2024-02-29',
valor_capital: null,
lucro: null,
valor_divida: null,
valor_pago: null,
valor_restante: this.formatarMoeda(20),
status: 'Em aberto'
}];

  constructor(
    private dbService: DbService
  ) { }


  public async criarLancamento(param: any) {
    const executar = await this.dbService.executeSql('insert', 'lancamentos', param);
    return executar;
  }




  public async busca_lancamentos() {
    try {
      // Executa a consulta SQL para obter todos os contratos
     const lancamentosPromise = this.dbService.executeSql('getAll', 'lancamentos', []);

      const lancamentos = await lancamentosPromise;
      // Verifica se o retorno é um array
      if (Array.isArray(lancamentos)) {

        if (lancamentos.length === 0)
        {

          for (const lan of this.lancamentos) {
            await this.dbService.executeSql('insert', 'contratos', lan);
          }
          return this.lancamentos;
        } else {
          return lancamentos;
        }
      } else {
        return lancamentos;
      }
    } catch (error) {
      console.error('Erro ao buscar lancamento:', error);
      throw error;
    }
  }
  public async busca_lancamento(id:string) {
    try {
      const executar = await this.dbService.executeSql('get', 'lancamentos', [id]);
      return executar;
      } catch (error) {
          console.error('Erro ao buscar lancamento:', error);
          throw error;
      }
  }






  calcularDiferencaDias(data: string): string {
    // const dataVencimento = moment.tz(data, 'America/Sao_Paulo').startOf('day');



    const hoje = new Date(); // Obtém a data de hoje
    const dataVencimento = new Date(data); // Obtém a outra data

    // Calcula a diferença em milissegundos
    const diferencaEmMilissegundos = dataVencimento.getTime() - hoje.getTime();

    // Converte a diferença de milissegundos para dias e obtém o valor absoluto
    const diferenca = Math.abs(Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24)));




    if (diferenca === 0) {
      return 'Vence hoje';
    } else if (diferenca === 1) {
      return 'Vence amanhã';
    } else if (diferenca === -1) {
      return 'Venceu ontem';
    } else if (diferenca === -3) {
      return 'Venceu há 3 dias';
    } else if (diferenca < 0) {
      return `Venceu há ${Math.abs(diferenca)} dias`;
    } else {
      return `Vence em ${diferenca} dias`;
    }
  }


  formatarMoeda(valor: number): string {
    console.log(valor);
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }





}
