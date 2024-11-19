import { Component, OnInit , Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonInput } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { MaskitoOptions, MaskitoElementPredicate } from '@maskito/core';
import { IonSelect } from '@ionic/angular';
import { mascara_dinheiro } from 'src/app/mask';
import { HomeService } from 'src/app/services/pages/home.service';
import { HomePage } from 'src/app/pages/tabs/home/home.page';
import { UsuarioStorageService } from 'src/app/services/storage/usuario-storage.service';
import { ToastrService } from 'ngx-toastr';
import { SucessoJurosComponent } from '../sucesso/sucesso.component';




@Component({
  selector: 'app-renovacao',
  templateUrl: './renovacao.component.html',
  styleUrls: ['./renovacao.component.scss'],
})
export class RenovacaoComponent  implements OnInit {
  @ViewChild('formRenovacao', { static: true }) formRenovacao!: ElementRef;
  @ViewChild('inputValorInformado', { static: false }) inputValorInformado!: IonInput;
  @ViewChild('btnAcoes', { static: true }) btnAcoes!: ElementRef;



  @Input() array: any = {};

  readonly mascara_dinheiro=mascara_dinheiro;



  readonly digitsOnlyMask:  MaskitoOptions = {
    mask: /^\d+$/,
  };

  readonly timeMask: MaskitoOptions = {
    mask: [/\d/, /\d/, ':', /\d/, /\d/],
  };

  readonly moneyMask: MaskitoOptions = {
    mask: [
      'R', '$', ' ',
      /\d/, /\d*/, /\d*/, '.', /\d/, /\d/, /\d/, ',', /\d/, /\d/
    ]
  };





  hoje_agora: string = new Date().toISOString().split('T')[0]; // Obtém a data atual no formato "yyyy-mm-dd"
  readonly maskPredicate: MaskitoElementPredicate = async (el) => (el as HTMLIonInputElement).getInputElement();

  public cliente_whatsapp:string           = '';
  public valor_juros:string                = '';
  contrato_id:string                       = '';
  valor_juros_formatado:string             = '';
  cliente_nome:string                      = '';
  data_vencimento:string                   = '';
  data_proximo_vencimento:string           = '';
  public data_informada:string             = '';
  data_vencimento_convertida:string        = '';
  data_vencimento_formatado:string         = '';
  contrato_qtd_parcelas: string            = '';
  numero_parcela: string                   = '';
  public forma_pagamento: string           = '';
  public forma_pagamento_renovacao: string = '';
  public valor_receber: string             = '';
  public valor_informado:string            = '';
  public valor_coletado:string             = '';
  public proxima_parcela:string             = '';
  receber_com_juros:string                 = '';
  public renovar_sem_coletar               = 'Sim';
  public horaAtual:Date;
  // public loginForm: FormGroup = new FormGroup({});
  numberMask: any;

  constructor(
              private modalController: ModalController,
              private actionSheetController:ActionSheetController,
              private alertController: AlertController,
              private renderer: Renderer2,
              private homeService:HomeService,
              private toastr: ToastrService,
              private usuarioStorageService: UsuarioStorageService
            ) {




            }

  ngOnInit() {

    let dataVencimento = new Date(this.array.data_vencimento_convertida);


    switch (this.array.contrato_tipo_vencimento) {
      case 'Diário':
        dataVencimento.setDate(dataVencimento.getDate() + 1);
        break;
      case 'Semanal':
        dataVencimento.setDate(dataVencimento.getDate() + 7);
        break;
      case 'Mensal':
        dataVencimento.setMonth(dataVencimento.getMonth() + 1);
        break;
      case 'Quinzenal':
        dataVencimento.setDate(dataVencimento.getDate() + 15);
        break;
      case 'Dezenal':
        dataVencimento.setDate(dataVencimento.getDate() + 10);
        break;
      default:

        console.error('Tipo de vencimento não reconhecido:', this.array.contrato_tipo_vencimento);
    }


    let dataVencimentoFormatada = dataVencimento.toISOString().substring(0, 10);




      let valor_juros_: number = ( parseFloat(this.formatarNumero(this.array.contrato_valor)) *  parseFloat(this.array.contrato_juros))  /100 ;
      let valor_juros__: string = `${valor_juros_}`;




      this.cliente_whatsapp              = this.array.cliente_whatsapp;
      this.cliente_nome                  = this.array.cliente_nome;
      this.contrato_id                   = this.array.contrato_id;
      this.data_vencimento               = this.array.data_vencimento;
      this.valor_juros                   = this.formatarMoeda(valor_juros_);
      this.contrato_qtd_parcelas         = this.array.contrato_qtd_parcelas;
      this.numero_parcela                = this.array.numero_parcela;
      this.valor_receber                 = this.array.valor_receber;
      this.valor_juros_formatado         = valor_juros__;
      this.data_vencimento_formatado     = this.array.data_vencimento;
      this.data_vencimento_convertida    = this.array.data_vencimento_convertida;
      this.data_proximo_vencimento       = this.formatarData(dataVencimento);





    //   this.usuarioStorageService.get("api_id").then((api_id) => {
    //     this.api_id = api_id;
    // });

      this.numberMask = (rawValue: string) => {
          const numberValue = parseFloat(rawValue);

          if (isNaN(numberValue)) {
            return null;
          }

          const formattedValue = numberValue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          });

      return formattedValue;
    }


    if( this.data_vencimento_convertida < this.hoje_agora) {
        this.perguntaSeRecebeJuros();
    }

  }


async perguntaSeRecebeJuros() { // Método corrigido
  const actionSheet = await this.actionSheetController.create({
    header: 'Como deseja receber?',
    buttons: [
      {
        text: 'Com juros',
        handler: () => {

          this.verificaJuros();
          this.verificaMulta();
          this.receber_com_juros = 'Com';

        }
      },
      {
        text: 'Sem juros',
        handler: () => {
          this.receber_com_juros = 'Sem';
        }
      }
    ]
  });
  const headerEl = document.querySelector('.action-sheet-header');
  if (headerEl) {
    headerEl.innerHTML = '<b>' + actionSheet.header + '</b>';
  }
+


actionSheet.onDidDismiss().then((data) => {
  if (data.role === 'backdrop') {
    this.verificaJuros();
    this.verificaMulta();
  }
});



  await actionSheet.present();
}



  get dataVencimentoMaiorQueHoje(): boolean {



    const hoje           = new Date(this.converterData(this.array.hoje));

    const dataVencimento = new Date(this.converterData(this.array.data_vencimento));





    return dataVencimento < hoje;
  }


  get jurosPorAtraso(): boolean {

    // let valRestante:number = 0;
    // let valJuros:number = 0;

    if(this.array.contrato_juros_atraso==="Sim"){


      //  // Lida com a promessa usando .then()
      // this.formatarNumero(this.array.valor_restante).then((valor: string) => {
      //   valRestante = parseFloat(valor);
      // });

      // this.formatarNumero(this.array.contrato_juros_atraso_valor).then((valor: string) => {
      //   valJuros = parseFloat(valor);
      // });
      // valRestante = valRestante + valJuros;
      // this.valor_restante = this.formatarMoeda(valRestante);


      return true;

    } else {
      return false;
    }
  }


  get multaPorAtraso(): boolean {
    if(this.array.contrato_multa_atraso==="Sim"){
      // console.log(this.valor_restante = this.valor_restante + this.array.contrato_multa_atraso_valor);
      return true;
    } else {
      return false;
    }
  }


  fecharModal() {
    this.modalController.dismiss();
  }




  async renovarJuros() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Receber Pagamento',
      buttons: [{
                  text: 'Dinheiro',
                  icon: 'cash-outline',
                  handler: () => {
                    this.solicitarValor('Dinheiro');
                  }
                },
                {
                  text: 'Cartão',
                  icon: 'card',
                  handler: () => {
                    this.solicitarValor('Cartão');
                  }
                },
                {
                  text: 'Pix',
                  icon: 'pix-logo',
                  handler: () => {
                    this.solicitarValor('Pix');
                  }
                }
              ],
      // Outras opções aqui...
    });




    await actionSheet.present();
  }


  async solicitarValor(tipoPagamento: string) {
    const alert = await this.alertController.create({
      header: 'Qual o valor que você está recebendo?',
      inputs: [
        {
          name: 'valor',
          type: 'text',
          placeholder: 'Digite o valor',
          cssClass: 'formatted-number-input'
        },
        {
          name: 'obs',
          type: 'text',
          placeholder: 'Observações',
          cssClass: 'custom-textarea'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirmar',
          handler: (data) => {
            // Verifica se o campo valor está vazio
            if (!data.valor.trim()) {
              // Mostra uma mensagem de alerta ao usuário informando que o valor é obrigatório
              this.mostrarAlerta('Valor obrigatório', 'Por favor, insira o valor.');
              return false; // Retorna false para impedir que o alerta seja fechado
            }
            // Remove o prefixo e formatação da máscara para obter o valor real
            const valorSemMascara = data.valor.replace('R$ ', '').replace(/\./g, '').replace(',', '.');
            this.enviaRecebimento(tipoPagamento, parseFloat(valorSemMascara));
            return true; // Retorna true para indicar que o alerta deve ser fechado após o manuseio
          }
        }
      ]
    });

    await alert.present();
  }


  async enviarCobranca() {

    const _mensagem = (`*Cobrança* \n ${this.cliente_nome} você possui um débito de ${this.valor_juros} com vencimento para ${this.data_vencimento}. Caso já tenha efetuado o pagamento, por favor, desconsidere esta mensagem automática!`);
    console.log(_mensagem,this.valor_juros);
    const mensagem = encodeURIComponent(_mensagem);



    const linkWhatsapp = `https://api.whatsapp.com/send?phone=+55${this.cliente_whatsapp}&text=${mensagem}`;

    window.open(linkWhatsapp, '_blank'); // Abre o link em uma nova aba

  }



  async mostrarAlerta(titulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }


  enviaRecebimento(tipoPagamento: string, valor: number) {
        console.log(tipoPagamento,this.formatarMoeda(valor));
  }



formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


applyMoneyMask(event: any) {
  const rawValue = event.target.value.replace(/[^\d,]/g, '');
  const maskedValue = this.numberMask(rawValue);
  event.target.value = maskedValue;
}

async mostrarFormularioRenovacao() {
    this.renderer.setStyle(this.formRenovacao.nativeElement, 'display', 'block');

  this.renderer.setStyle(this.btnAcoes.nativeElement, 'display', 'none');

  setTimeout(() => {
    this.inputValorInformado.setFocus();
  }, 300);

}



  async ocultarFormularioRenovacao() {
      this.valor_informado = '';
      this.forma_pagamento = '';
      this.forma_pagamento_renovacao= '';
      this.valor_coletado= '';
      this.proxima_parcela= '';
      this.data_informada = '';


      this.renderer.setStyle(this.formRenovacao.nativeElement, 'display', 'none');
      this.renderer.setStyle(this.btnAcoes.nativeElement, 'display', 'block');
  }


  nextFocus(event: any, nextInput: IonSelect) {
    if (event.detail.value !== '') {
      nextInput.open();
    }
  }



  formatarData(data: Date): string {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }
  converterData(dataString: string): string {
    const [dia, mes, ano] = dataString.split('/');
    const dataFormatada = `${ano}-${mes}-${dia}`;
    return dataFormatada;
  }



  async informarRenovacao() {


    const actionSheet = await this.actionSheetController.create({
      header: `Confirma isso? Essa ação não poderá ser revertida`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.informarRenovacaoApi();
          }
        },
        {
          text: 'Não',
          handler: () => {
            console.log('não');
          }
        }
      ]
    });

    await actionSheet.present();

  }





  formatarNumero(valor: string) {
    const numeroLimpo = valor.replace(/[^\d,.-]/g, '');
    const numeroFormatado = numeroLimpo.replace(',', '.');

    // Retorna o número formatado
    return parseFloat(numeroFormatado).toFixed(2);
  }


  async verificaJuros() {
    let valRestante                : number = 0;
    let valJuros                   : number = 0;
    let valMulta                   : number = 0;
    const agora                    = new Date();
    const hoje                     = new Date(agora.getTime() - agora.getTimezoneOffset() * 60000);
    const dataVencimento           = new Date(this.converterData(this.array.data_vencimento));
    const diferencaEmMilissegundos = hoje.getTime() - dataVencimento.getTime();
    const diferencaEmDias          = Math.abs(Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24)));




    const valorRestanteString: string = await this.formatarNumero(this.valor_juros);


    valRestante = parseFloat(valorRestanteString);


    if (this.array.contrato_juros_atraso === "Sim" && diferencaEmDias > 0) {

      valJuros = parseFloat(this.array.contrato_juros_atraso_valor);

      valJuros = (valRestante * valJuros) / 100;




      valJuros = valJuros * diferencaEmDias;





      valRestante = valRestante += valJuros;




    }


    if (this.array.contrato_multa_atraso === "Sim" && diferencaEmDias > 0 ) {
      valMulta = parseFloat(this.array.contrato_multa_atraso_valor);
      valRestante = valRestante += valMulta;
    }


    this.valor_juros = this.formatarMoeda(valRestante);
  }




  async verificaMulta() {
    let valRestante: number = 0;
    let valJuros: number = 0;
    let valMulta: number = 0;


    return true;
  }




  async informarRenovacaoApi() {



    const parametro:any = {
                            lancamento_id                : this.array.id,
                            licenciado_id                : this.array.licenciado_id,
                            cliente_id                   : this.array.cliente_id,
                            contrato_id                  : this.array.contrato_id,
                            user_id                      : this.array.user_id,
                            receber_com_juros            : this.receber_com_juros,
                            proximo_vencimento           : this.data_proximo_vencimento,
                            tipo_renovacao               : 'Renovação de Juros e Capital'
                          };

      console.log(parametro)

  try {

      const  res = await this.homeService.renovar_parcela(parametro);

      console.log('saber--------------------------------')
      console.log(res)

      this.modalController.dismiss();
      const modal = await this.modalController.create({
        component: SucessoJurosComponent,
        componentProps: {
          array: res
        }
      });

      await modal.present();


  } catch(e) {

      console.warn(e);

  }





  }




}
