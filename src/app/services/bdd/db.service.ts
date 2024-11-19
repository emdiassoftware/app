import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DbService {

  private dbReady: boolean = false;
  private usuario: any;
  private usuarioReady: boolean = false;


  private db: IDBDatabase | null = null; // Variável para armazenar a conexão com o banco de dados

  constructor(

  ) {
    this.initDB();

  }





   async initDB(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        const request = window.indexedDB.open('emdias_db', 1);

        request.onerror = (event) => {
          console.error('Erro ao abrir o banco de dados:', (event.target as IDBOpenDBRequest).error);
          reject((event.target as IDBOpenDBRequest).error);
        };

        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          this.createTables(db);
          this.dbReady = true;
          //console.log('Banco de dados criado com sucesso!');
        };

        request.onsuccess = (event) => {
          this.db = (event.target as IDBOpenDBRequest).result;
          console.log('Conexão com o banco de dados estabelecida.');
          resolve();
        };
      } catch (error) {
        console.error('Erro ao criar o banco de dados:', error);
        reject(error);
      }
    });
  }

  setUsuario(usuario: any) {
    this.usuario = usuario;
    this.usuarioReady = true;
  }

  getUsuario(): any {
    return this.usuario;
  }

  async getBancoDeDadosPronto(): Promise<boolean> {
    return this.dbReady;
  }

  getUsuarioPronto(): Promise<boolean> {
    return Promise.resolve(this.usuarioReady);
  }


async  createTables(db: IDBDatabase) {


        // Criando Usuário
        if (!db.objectStoreNames.contains('usuarios')) {
            const tabela_usuario = db.createObjectStore('usuarios', { keyPath: 'id', autoIncrement: true });
                  tabela_usuario.createIndex('licenciado_id','licenciado_id', { unique: false});
                  tabela_usuario.createIndex('name','name', { unique: false});
                  tabela_usuario.createIndex('email','email', { unique: true});
                  tabela_usuario.createIndex('password','password', { unique: false});
                  tabela_usuario.createIndex('caixa_id','caixa_id', { unique: false});
                  tabela_usuario.createIndex('perfil','perfil', { unique: false});
                  tabela_usuario.createIndex('celular','celular', { unique: false});
                  tabela_usuario.createIndex('comissao','comissao', { unique: false});
                  tabela_usuario.createIndex('periodo_de_visao','periodo_de_visao', { unique: false});
                  tabela_usuario.createIndex('auditoria','auditoria', { unique: false});
                  tabela_usuario.createIndex('simulacao','simulacao', { unique: false});
                  tabela_usuario.createIndex('contrato','contrato', { unique: false});
                  tabela_usuario.createIndex('link','link', { unique: false});
                  tabela_usuario.createIndex('qtd_clientes','qtd_clientes', { unique: false});
                  tabela_usuario.createIndex('qtd_emprestimos','qtd_emprestimos', { unique: false});
                  tabela_usuario.createIndex('qtd_recebimentos','qtd_recebimentos', { unique: false});
                  tabela_usuario.createIndex('id_google','id_google', { unique: false});
                  tabela_usuario.createIndex('status','status', { unique: false});
                  tabela_usuario.createIndex('valor_comissao','valor_comissao', { unique: false});
                  tabela_usuario.createIndex('valor_custo_fixo','valor_custo_fixo', { unique: false});
                  tabela_usuario.createIndex('senha','senha', { unique: false});
                  tabela_usuario.createIndex('id_api', 'id_api', {unique:false});
                  tabela_usuario.createIndex('token', 'token', {unique:false});

        }


        // Criando Usuário
        if (!db.objectStoreNames.contains('licenciado')) {
          const tabela_licenciado = db.createObjectStore('licenciado', { keyPath: 'id', autoIncrement: true });

                tabela_licenciado.createIndex('plano_id'                     , 'plano_id', {unique:false});
                tabela_licenciado.createIndex('juros_repete'                 , 'juros_repete', {unique:false});
                tabela_licenciado.createIndex('nome'                         , 'nome', {unique:false});
                tabela_licenciado.createIndex('email'                        , 'email', {unique:false});
                tabela_licenciado.createIndex('cep'                          , 'cep', {unique:false});
                tabela_licenciado.createIndex('endereco'                     , 'endereco', {unique:false});
                tabela_licenciado.createIndex('numero'                       , 'numero', {unique:false});
                tabela_licenciado.createIndex('complemento'                  , 'complemento', {unique:false});
                tabela_licenciado.createIndex('bairro'                       , 'bairro', {unique:false});
                tabela_licenciado.createIndex('cidade'                       , 'cidade', {unique:false});
                tabela_licenciado.createIndex('estado'                       , 'estado', {unique:false});
                tabela_licenciado.createIndex('celular'                      , 'celular', {unique:false});
                tabela_licenciado.createIndex('caixa'                        , 'caixa', {unique:false});
                tabela_licenciado.createIndex('caixa_1'                      , 'caixa_1', {unique:false});
                tabela_licenciado.createIndex('data_entrada'                 , 'data_entrada', {unique:false});
                tabela_licenciado.createIndex('data_inicio'                  , 'data_inicio', {unique:false});
                tabela_licenciado.createIndex('data_vencimento'              , 'data_vencimento', {unique:false});
                tabela_licenciado.createIndex('colaboradores_comissionados'  , 'colaboradores_comissionados', {unique:false});
                tabela_licenciado.createIndex('status'                       , 'status', {unique:false});
                tabela_licenciado.createIndex('obs'                          , 'obs', {unique:false});
                tabela_licenciado.createIndex('texto_cobrança_whatsapp'      , 'texto_cobrança_whatsapp', {unique:false});
                tabela_licenciado.createIndex('chave_pix'                    , 'chave_pix', {unique:false});
                tabela_licenciado.createIndex('nome_completo_chave'          , 'nome_completo_chave', {unique:false});

      }


      // Tabela Clientes
      if(!db.objectStoreNames.contains('clientes')) {
        const tabela_clientes = db.createObjectStore('clientes', {keyPath: 'id', autoIncrement: true});

              tabela_clientes.createIndex('licenciado_id', 'licenciado_id', {unique:false});
              tabela_clientes.createIndex('user_id', 'user_id', {unique:false});
              tabela_clientes.createIndex('grupo_id', 'grupo_id', {unique:false});
              tabela_clientes.createIndex('regiao_id', 'regiao_id', {unique:false});
              tabela_clientes.createIndex('nome', 'nome', {unique:false});
              tabela_clientes.createIndex('email', 'email', {unique:false});
              tabela_clientes.createIndex('idade', 'idade', {unique:false});
              tabela_clientes.createIndex('telefone_1', 'telefone_1', {unique:false});
              tabela_clientes.createIndex('telefone_2', 'telefone_2', {unique:false});
              tabela_clientes.createIndex('telefone_3', 'telefone_3', {unique:false});
              tabela_clientes.createIndex('endereco', 'endereco', {unique:false});
              tabela_clientes.createIndex('cep', 'cep', {unique:false});
              tabela_clientes.createIndex('cpf', 'cpf', {unique:false});
              tabela_clientes.createIndex('rg', 'rg', {unique:false});
              tabela_clientes.createIndex('chave_pix', 'chave_pix', {unique:false});
              tabela_clientes.createIndex('ocupacao', 'ocupacao', {unique:false});
              tabela_clientes.createIndex('data_entrada', 'data_entrada', {unique:false});
              tabela_clientes.createIndex('obs', 'obs', {unique:false});
              tabela_clientes.createIndex('limite_emprestimo','limite_emprestimo', {unique:false});
              tabela_clientes.createIndex('credito','credito', {unique:false});
              tabela_clientes.createIndex('status', 'status', {unique:false});
              tabela_clientes.createIndex('data_nascimento', 'data_nascimento', {unique:false});
              tabela_clientes.createIndex('tipo_documento', 'tipo_documento', {unique:false});
              tabela_clientes.createIndex('numero_documento', 'numero_documento', {unique:false});
              tabela_clientes.createIndex('data_emissao', 'data_emissao', {unique:false});
              tabela_clientes.createIndex('orgao_expeditor', 'orgao_expeditor', {unique:false});
              tabela_clientes.createIndex('sexo', 'sexo', {unique:false});
              tabela_clientes.createIndex('estado_civil', 'estado_civil', {unique:false});
              tabela_clientes.createIndex('pai', 'pai', {unique:false});
              tabela_clientes.createIndex('telefone_pai', 'telefone_pai', {unique:false});
              tabela_clientes.createIndex('mae', 'mae', {unique:false});
              tabela_clientes.createIndex('telefone_mae', 'telefone_mae', {unique:false});
              tabela_clientes.createIndex('nome_conjugue', 'nome_conjugue', {unique:false});
              tabela_clientes.createIndex('telefone_conjugue', 'telefone_conjugue', {unique:false});
              tabela_clientes.createIndex('endereco_residencial', 'endereco_residencial', {unique:false});
              tabela_clientes.createIndex('referencia_nome_um', 'referencia_nome_um', {unique:false});
              tabela_clientes.createIndex('referencia_fone_um', 'referencia_fone_um', {unique:false});
              tabela_clientes.createIndex('referencia_nome_dois', 'referencia_nome_dois', {unique:false});
              tabela_clientes.createIndex('referencia_fone_dois', 'referencia_fone_dois', {unique:false});
              tabela_clientes.createIndex('tipo_de_fonte_pagadora', 'tipo_de_fonte_pagadora', {unique:false});
              tabela_clientes.createIndex('nome_empregador', 'nome_empregador', {unique:false});
              tabela_clientes.createIndex('cnpj_empregador', 'cnpj_empregador', {unique:false});
              tabela_clientes.createIndex('tempo_servico', 'tempo_servico', {unique:false});
              tabela_clientes.createIndex('enderco_empregador', 'enderco_empregador', {unique:false});
              tabela_clientes.createIndex('cidade_empregador', 'cidade_empregador', {unique:false});
              tabela_clientes.createIndex('cidade', 'cidade', {unique:false});
              tabela_clientes.createIndex('estado', 'estado', {unique:false});
              tabela_clientes.createIndex('estado_empregador', 'estado_empregador', {unique:false});
              tabela_clientes.createIndex('valor_renda_mensal_parcial', 'valor_renda_mensal_parcial', {unique:false});
              tabela_clientes.createIndex('valor_renda_extra', 'valor_renda_extra', {unique:false});
              tabela_clientes.createIndex('data_local', 'data_local', {unique:false});
              tabela_clientes.createIndex('assinatura_proponente', 'assinatura_proponente', {unique:false});
              tabela_clientes.createIndex('check_list', 'check_list', {unique:false});
              tabela_clientes.createIndex('anexocontrato', 'anexocontrato', {unique:false});
              tabela_clientes.createIndex('documento_frente', 'documento_frente', {unique:false});
              tabela_clientes.createIndex('selfie', 'selfie', {unique:false});
              tabela_clientes.createIndex('documento_verso', 'documento_verso', {unique:false});
              tabela_clientes.createIndex('comprovante_endereco', 'comprovante_endereco', {unique:false});
              tabela_clientes.createIndex('assinatura_igual_documento', 'assinatura_igual_documento', {unique:false});
              tabela_clientes.createIndex('user_id_inc', 'user_id_inc', {unique:false});
              tabela_clientes.createIndex('user_id_alt', 'user_id_alt', {unique:false});
              tabela_clientes.createIndex('user_id_last_alt', 'user_id_last_alt', {unique:false});
      }



      // Tabela Contratos
      if(!db.objectStoreNames.contains('contratos'))  {
        const tabela_contratos = db.createObjectStore('contratos', {keyPath:'id', autoIncrement: true});

              tabela_contratos.createIndex('licenciado_id','licenciado_id', {unique:false});
              tabela_contratos.createIndex('cliente_id','cliente_id', {unique:false});
              tabela_contratos.createIndex('user_id','user_id', {unique:false});
              tabela_contratos.createIndex('user_baixa_id','user_baixa_id', {unique:false});
              tabela_contratos.createIndex('tipo_vencimento','tipo_vencimento', {unique:false});
              tabela_contratos.createIndex('caixa_id','caixa_id', {unique:false});
              tabela_contratos.createIndex('tipo_credito','tipo_credito', {unique:false});
              tabela_contratos.createIndex('deduz_caixa','deduz_caixa', {unique:false});
              tabela_contratos.createIndex('fnds','fnds', {unique:false});
              tabela_contratos.createIndex('juros_recorrente','juros_recorrente', {unique:false});
              tabela_contratos.createIndex('divida','divida', {unique:false});
              tabela_contratos.createIndex('valor','valor', {unique:false});
              tabela_contratos.createIndex('juros','juros', {unique:false});
              tabela_contratos.createIndex('valor_pago','valor_pago', {unique:false});
              tabela_contratos.createIndex('integracao','integracao', {unique:false});
              tabela_contratos.createIndex('mercado_pago','mercado_pago', {unique:false});
              tabela_contratos.createIndex('taxa_plataforma','taxa_plataforma', {unique:false});
              tabela_contratos.createIndex('taxa_plataforma_valor','taxa_plataforma_valor', {unique:false});
              tabela_contratos.createIndex('juros_atraso_valor','juros_atraso_valor', {unique:false});
              tabela_contratos.createIndex('multa_atraso_valor','multa_atraso_valor', {unique:false});
              tabela_contratos.createIndex('juros_por_atraso','juros_por_atraso', {unique:false});
              tabela_contratos.createIndex('juros_atraso','juros_atraso', {unique:false});
              tabela_contratos.createIndex('multa_atraso','multa_atraso', {unique:false});
              tabela_contratos.createIndex('primeira_parcela','primeira_parcela', {unique:false});
              tabela_contratos.createIndex('data_emprestimo','data_emprestimo', {unique:false});
              tabela_contratos.createIndex('data_pago','data_pago', {unique:false});
              tabela_contratos.createIndex('status','status', {unique:false});
              tabela_contratos.createIndex('prazo','prazo', {unique:false});
              tabela_contratos.createIndex('obs','obs', {unique:false});
      }


      // Tabela Lançamentos
      if(!db.objectStoreNames.contains('lancamentos')) {
        const tabela_lancamentos = db.createObjectStore('lancamentos', {keyPath: 'id', autoIncrement: true});

        tabela_lancamentos.createIndex('licenciado_id', 'licenciado_id', {unique:false});
              tabela_lancamentos.createIndex('id_api', 'licenciado_id', {unique:false});
              tabela_lancamentos.createIndex('contrato_id', 'contrato_id', {unique:false});
              tabela_lancamentos.createIndex('contrato_qtd_parcelas', 'contrato_qtd_parcelas', {unique:false});
              tabela_lancamentos.createIndex('contrato_juros_atraso', 'contrato_juros_atraso', {unique:false});
              tabela_lancamentos.createIndex('contrato_juros_atraso_valor', 'contrato_juros_atraso_valor', {unique:false});
              tabela_lancamentos.createIndex('contrato_multa_atraso', 'contrato_multa_atraso', {unique:false});
              tabela_lancamentos.createIndex('contrato_multa_atraso_valor', 'contrato_multa_atraso_valor', {unique:false});
              tabela_lancamentos.createIndex('tipo_credito', 'tipo_credito', {unique:false});
              tabela_lancamentos.createIndex('lancamento_id', 'lancamento_id', {unique:false});
              tabela_lancamentos.createIndex('cliente_id', 'cliente_id', {unique:false});
              tabela_lancamentos.createIndex('cliente_nome', 'cliente_nome', {unique:false});
              tabela_lancamentos.createIndex('cliente_whatsapp', 'cliente_whatsapp', {unique:false});
              tabela_lancamentos.createIndex('caixa_id', 'caixa_id', {unique:false});
              tabela_lancamentos.createIndex('tipo_operacao_id', 'tipo_operacao_id', {unique:false});
              tabela_lancamentos.createIndex('user_id', 'user_id', {unique:false});
              tabela_lancamentos.createIndex('tipo_lancamento', 'tipo_lancamento', {unique:false});
              tabela_lancamentos.createIndex('numero_parcela', 'numero_parcela', {unique:false});
              tabela_lancamentos.createIndex('data_vencimento', 'data_vencimento', {unique:false});
              tabela_lancamentos.createIndex('data_vencimento_true', 'data_vencimento_true', {unique:false});
              tabela_lancamentos.createIndex('valor_capital', 'valor_capital', {unique:false});
              tabela_lancamentos.createIndex('lucro', 'lucro', {unique:false});
              tabela_lancamentos.createIndex('valor_divida', 'valor_divida', {unique:false});
              tabela_lancamentos.createIndex('valor_pago', 'valor_pago', {unique:false});
              tabela_lancamentos.createIndex('valor_restante', 'valor_restante', {unique:false});
              tabela_lancamentos.createIndex('status', 'status', {unique:false});
      }

      // Tabela Regioes
      if(!db.objectStoreNames.contains('regioes')) {
        const tabela_regioes = db.createObjectStore('regioes', {keyPath:'id', autoIncrement:true});
              tabela_regioes.createIndex('licenciado_id', 'licenciado_id', {unique:false});
              tabela_regioes.createIndex('descricao', 'descricao', {unique:false});
              tabela_regioes.createIndex('obs', 'obs', {unique:false});
              tabela_regioes.createIndex('custo_diario', 'custo_diario', {unique:false});
              tabela_regioes.createIndex('valor_em_andamento', 'valor_em_andamento', {unique:false});
              tabela_regioes.createIndex('valor_injetado', 'valor_injetado', {unique:false});
              tabela_regioes.createIndex('valor_retorno', 'valor_retorno', {unique:false});
              tabela_regioes.createIndex('valor_lucro', 'valor_lucro', {unique:false});
              tabela_regioes.createIndex('status', 'status', {unique:false});
      }


      // Tabela Grupos
      if(!db.objectStoreNames.contains('grupos')) {
        const tabela_grupos = db.createObjectStore('grupos', {keyPath:'id', autoIncrement:true});
              tabela_grupos.createIndex('licenciado_id', 'licenciado_id', {unique:false});
              tabela_grupos.createIndex('descricao', 'descricao', {unique:false});
              tabela_grupos.createIndex('obs', 'obs', {unique:false});
              tabela_grupos.createIndex('status', 'status', {unique:false});
      }

      // Tabela Extratos
      if(!db.objectStoreNames.contains('extratos')) {
        const tabela_extratos = db.createObjectStore('extratos', {keyPath: 'id', autoIncrement: true});

              tabela_extratos.createIndex('licenciado_id', 'licenciado_id', {unique:false});
              tabela_extratos.createIndex('cliente_id', 'cliente_id', {unique:false});
              tabela_extratos.createIndex('caixa_id', 'caixa_id', {unique:false});
              tabela_extratos.createIndex('lancamento_id', 'lancamento_id', {unique:false});
              tabela_extratos.createIndex('tipo_operacao_id', 'tipo_operacao_id', {unique:false});
              tabela_extratos.createIndex('emprestimo_id', 'emprestimo_id', {unique:false});
              tabela_extratos.createIndex('user_id', 'user_id', {unique:false});
              tabela_extratos.createIndex('tipo_transacao', 'tipo_transacao', {unique:false});
              tabela_extratos.createIndex('tipo_operacao', 'tipo_operacao', {unique:false});
              tabela_extratos.createIndex('data', 'data', {unique:false});
              tabela_extratos.createIndex('valor', 'valor', {unique:false});
      }


      // Tabela Solicitacoes
      if(!db.objectStoreNames.contains('solicitacoes')) {
        const tabela_solicitacoes = db.createObjectStore('solicitacoes', {keyPath: 'id', autoIncrement: true});

              tabela_solicitacoes.createIndex('licenciado_id','licenciado_id', {unique:false});
              tabela_solicitacoes.createIndex('user_id','user_id', {unique:false});
              tabela_solicitacoes.createIndex('user_id_aprovado','user_id_aprovado', {unique:false});
              tabela_solicitacoes.createIndex('user_id_recusado','user_id_recusado', {unique:false});
              tabela_solicitacoes.createIndex('cliente_id','cliente_id', {unique:false});
              tabela_solicitacoes.createIndex('valor_solicitado','valor_solicitado', {unique:false});
              tabela_solicitacoes.createIndex('valor_aprovado','valor_aprovado', {unique:false});
              tabela_solicitacoes.createIndex('data_solicitacao','data_solicitacao', {unique:false});
              tabela_solicitacoes.createIndex('data_aprovado','data_aprovado', {unique:false});
              tabela_solicitacoes.createIndex('data_recusado','data_recusado', {unique:false});
              tabela_solicitacoes.createIndex('status','status', {unique:false});
              tabela_solicitacoes.createIndex('obs','obs', {unique:false});

      }


      // Tabela Licenciado Faturas
      if(!db.objectStoreNames.contains('licenciado_faturas')) {
        const tabela_licenciado_faturas = db.createObjectStore('licenciado_faturas', {keyPath: 'id', autoIncrement: true});

              tabela_licenciado_faturas.createIndex('licenciado_id', 'licenciado_id', {unique:true});
              tabela_licenciado_faturas.createIndex('user_id', 'user_id', {unique:true});
              tabela_licenciado_faturas.createIndex('user_licenciado_id', 'user_licenciado_id', {unique:true});
              tabela_licenciado_faturas.createIndex('plano_id', 'plano_id', {unique:true});
              tabela_licenciado_faturas.createIndex('pix_id', 'pix_id', {unique:true});
              tabela_licenciado_faturas.createIndex('meses', 'meses', {unique:true});
              tabela_licenciado_faturas.createIndex('qr_code', 'qr_code', {unique:true});
              tabela_licenciado_faturas.createIndex('qr_code_base64', 'qr_code_base64', {unique:true});
              tabela_licenciado_faturas.createIndex('data_emissao', 'data_emissao', {unique:true});
              tabela_licenciado_faturas.createIndex('data_vencimento', 'data_vencimento', {unique:true});
              tabela_licenciado_faturas.createIndex('data_pagamento', 'data_pagamento', {unique:true});
              tabela_licenciado_faturas.createIndex('renovado', 'renovado', {unique:true});
              tabela_licenciado_faturas.createIndex('valor', 'valor', {unique:true});
              tabela_licenciado_faturas.createIndex('desconto', 'desconto', {unique:true});
              tabela_licenciado_faturas.createIndex('taxa_plataforma', 'taxa_plataforma', {unique:true});
              tabela_licenciado_faturas.createIndex('descricao', 'descricao', {unique:true});
              tabela_licenciado_faturas.createIndex('status', 'status', {unique:true});
      }


  }


  public async executeSql(operation: string, table: string, params: any[] = []): Promise<any[] | boolean> {

    if(typeof params[0] === 'string') {

      params[0] = parseInt(params[0], 10);

    }

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('Conexão com o banco de dados não está disponível.');
        return;
      }

      const transaction = this.db.transaction([table], 'readwrite');
      const objectStore = transaction.objectStore(table);

      let request;

      switch (operation) {
        case 'insert':
          request = objectStore.add(params);
          break;
        case 'update':
          request = objectStore.put(params);
          break;
        case 'delete':
          request = objectStore.delete(params);
          break;
        case 'get':
          request = objectStore.get(params[0]);
          break;
        case 'getAll':
          request = objectStore.getAll();
          break;
        default:
          reject('Operação não suportada.');
          return;
      }

      request.onsuccess = (event) => {
        const target = event.target as IDBRequest;
        if (target && target.result) {
          const res = target.result;
          resolve(res);
        } else {
          if (operation === 'get') {
            resolve(false);
          } else {
            reject('Não foi possível obter os resultados da consulta.');
          }
        }
      };

      request.onerror = (event) => {
        console.error('Erro ao executar consulta SQL:', event);
        console.error('Erro:', event.target);
        reject(event);
      };
    });
  }





}










