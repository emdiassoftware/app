import { Injectable } from '@angular/core';
import { DbService } from '../db.service';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {


  private contratos:any = [{
                licenciado_id: 1,
                cliente_id: 1,
                user_id: 1,
                user_baixa_id: null,
                tipo_vencimento: null,
                caixa_id: null,
                tipo_credito: null,
                deduz_caixa: null,
                fnds: null,
                juros_recorrente: null,
                divida: null,
                valor: null,
                juros: null,
                valor_pago: null,
                integracao: null,
                mercado_pago: null,
                taxa_plataforma: null,
                taxa_plataforma_valor: null,
                juros_atraso_valor: null,
                multa_atraso_valor: null,
                juros_por_atraso: null,
                juros_atraso: null,
                multa_atraso: null,
                primeira_parcela: null,
                data_emprestimo: null,
                data_pago: null,
                status: null,
                prazo: null,
                obs: null,
              },{
                licenciado_id: 1,
                cliente_id: 1,
                user_id: 1,
                user_baixa_id: null,
                tipo_vencimento: null,
                caixa_id: null,
                tipo_credito: null,
                deduz_caixa: null,
                fnds: null,
                juros_recorrente: null,
                divida: null,
                valor: null,
                juros: null,
                valor_pago: null,
                integracao: null,
                mercado_pago: null,
                taxa_plataforma: null,
                taxa_plataforma_valor: null,
                juros_atraso_valor: null,
                multa_atraso_valor: null,
                juros_por_atraso: null,
                juros_atraso: null,
                multa_atraso: null,
                primeira_parcela: null,
                data_emprestimo: null,
                data_pago: null,
                status: null,
                prazo: null,
                obs: null,
              },
              {
                licenciado_id: 1,
                cliente_id: 1,
                user_id: 2,
                user_baixa_id: null,
                tipo_vencimento: null,
                caixa_id: null,
                tipo_credito: null,
                deduz_caixa: null,
                fnds: null,
                juros_recorrente: null,
                divida: null,
                valor: null,
                juros: null,
                valor_pago: null,
                integracao: null,
                mercado_pago: null,
                taxa_plataforma: null,
                taxa_plataforma_valor: null,
                juros_atraso_valor: null,
                multa_atraso_valor: null,
                juros_por_atraso: null,
                juros_atraso: null,
                multa_atraso: null,
                primeira_parcela: null,
                data_emprestimo: null,
                data_pago: null,
                status: null,
                prazo: null,
                obs: null,
              }
            ];

  constructor(
      private dbService: DbService
  ) { }


    public async criarContrato(param: any[]) {
      const executar = await this.dbService.executeSql('insert', 'contratos', param);
      return executar;
    }



    public async busca_contratos() {
      try {
        // Executa a consulta SQL para obter todos os contratos
       const contratosPromise = this.dbService.executeSql('getAll', 'contratos', []);

        const contratos = await contratosPromise;
        // Verifica se o retorno é um array
        if (Array.isArray(contratos)) {

          if (contratos.length === 0) {


            for (const contrato of this.contratos) {
              await this.dbService.executeSql('insert', 'contratos', contrato);
            }

            return this.contratos;


          } else {
            return contratos;
          }
        } else {
          return contratos;
        }
      } catch (error) {
        console.error('Erro ao buscar contrato:', error);
        throw error;
      }
    }






    // public async busca_contratos(id:string) {
    //   try {
    //     const executar = await this.dbService.executeSql('get', 'contratos', [id]);
    //     if(!executar) {
    //       this.criarContrato(this.contratos);
    //     } return executar;
    //     } catch (error) {
    //         console.error('Erro ao buscar contrato:', error);
    //         throw error;
    //     }
    // }


}
