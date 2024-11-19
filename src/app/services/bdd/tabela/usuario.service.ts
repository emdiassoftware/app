import { Injectable } from '@angular/core';
import { DbService } from '../db.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  usuarios:      any;

  constructor(private dbService: DbService) { }


  private usuario:any = {
            api_id: '10',
            licenciado_id: null,
            name: 'Caio Eleutério',
            email: 'caiioacre@gmail.com',
            caixa_id: 10,
            perfil: 'Admin',
            celular: '(85) 9 9999-9999',
            comissao: 'Não',
            periodo_de_visao: 'Aberto',
            auditoria: 'Não',
            simulacao: 'Sim',
            contrato: 'Sim',
            link: null,
            qtd_clientes: 0,
            qtd_emprestimos: 0,
            qtd_recebimentos: 0,
            id_google: null,
            status: 'Ativo',
            valor_comissao: null,
            valor_custo_fixo: null,
            senha: null,
            id_api: '1',
            token: null
          };

  async criarUsuario(usuario: any) {
      return await this.dbService.executeSql('insert', 'usuarios', usuario);
  }


  public async busca_usuarios() {
    const executar =  this.dbService.executeSql('getAll', 'usuarios', []);
    console.warn(executar);
    return executar;
  }

  async consulta_usuario_sistema() {
      var _user:any;
      const consulta = await this.busca_usuario('1');
      return consulta;
  }



  public async busca_usuario(id:string) {
    try {
      const executar = await this.dbService.executeSql('get', 'usuarios', [id]);
      if(!executar) {
        this.criarUsuario(this.usuario);
      } return executar;
      } catch (error) {
          console.error('Erro ao buscar usuário:', error);
          throw error; // Rejeita a Promise para que o erro seja propagado para quem chamou esta função
      }


  }

}
