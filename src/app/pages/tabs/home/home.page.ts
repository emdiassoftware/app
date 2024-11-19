import { AfterContentChecked, Component, OnInit, Input, ViewChild, ElementRef,Renderer2 } from '@angular/core';


import SwiperCore, { Pagination } from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ReceberPagamentoComponent } from 'src/app/componentes/modal/transacao/receber-pagamento/receber-pagamento.component';
import { RenovacaoComponent } from 'src/app/componentes/modal/transacao/renovacao/renovacao/renovacao.component';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/bdd/db.service';
import { UsuarioService } from 'src/app/services/bdd/tabela/usuario.service';
import { ContratoService } from 'src/app/services/bdd/tabela/contrato.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LancamentoService } from 'src/app/services/bdd/tabela/lancamento.service';
import { ActivatedRoute } from '@angular/router';
import { UsuarioStorageService } from 'src/app/services/storage/usuario-storage.service';
import { AuthenticationService } from 'src/app/services/autenticacao/authentication.service';
import { HomeService } from 'src/app/services/pages/home.service';


// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterContentChecked {

  @ViewChild('introducao', { static: true }) introducao!: ElementRef;
  @ViewChild('page', { static: false }) page!: ElementRef;
  @ViewChild('page_', { static: false }) page_!: ElementRef;
  @ViewChild('noLancamentos', { static: false }) noLancamentos!: ElementRef;
  @ViewChild('thisLancamentos', { static: false }) thisLancamentos!: ElementRef;
  @ViewChild('prebanners', { static: false }) prebanners!: ElementRef;
  @ViewChild('banner', { static: false }) banner!: ElementRef;

  bancoDeDadosPronto = false;
  intro               = true; // Variável de controle para o estado do splash
  hoje_agora: string = new Date().toISOString().split('T')[0]; // Obtém a data atual no formato "yyyy-mm-dd"



  // Variáveis do Sistema
  mainForm: FormGroup;
  licenciado_id                        = 0;
  bannerConfig:  SwiperOptions         = {};
  prebannerConfig: SwiperOptions       = {};
  featureConfig: SwiperOptions         = {};
  Data:          any[]                 = [];
  accounts:      any[]                 = [];
  features:      any[]                 = [];
  features_two:  any[]                 = [];
  transactions:  any[]                 = [];
  resumo_geral:  any[]                 = [];
  cobrar:        any[]                 = [];
  usuario:       any                   = {};
  dataLoaded:    boolean               = false;
  usuarios:      any;
  contratos:     any;
  interval: any; // variável para armazenar o intervalo


  lancamentos:   any                   = [{
                                              licenciado_id: 0,
                                              url_redirect: null,
                                              tipo_resumo: 'Receber Hoje',
                                              valor: 'R$ 0,00',
                                              qtd: 0
                                          },
                                          {
                                            licenciado_id: 0,
                                              url_redirect: null,
                                              tipo_resumo: "Atrasados",
                                              valor: 'R$ 0,00',
                                              qtd: 0
                                          },
                                          {
                                            licenciado_id: 0,
                                              url_redirect: null,
                                              tipo_resumo: "Recebido hoje",
                                              valor: 'R$ 0,00',
                                              qtd: 0
                                          },
                                          {
                                            licenciado_id: 0,
                                              url_redirect: null,
                                              tipo_resumo: "À receber mês",
                                              valor: 'R$ 0,00',
                                              qtd: 0
                                          }];


  constructor(
                private modalController: ModalController,
                private platform: Platform,
                private authenticationService:AuthenticationService,
                private usuarioStorageService: UsuarioStorageService,
                private navController: NavController,
                private router: Router,
                private toast:ToastController,
                private formBuilder:FormBuilder,
                private dbService: DbService,
                private usuarioService: UsuarioService,
                private contratoService: ContratoService,
                private lancamentoService: LancamentoService,
                private route:ActivatedRoute,
                private renderer: Renderer2,
                private homeService:HomeService

              ) {

              }

  ngOnInit() {

    this.usuarioStorageService.get("name").then((nome) => {
        this.usuario.name = nome;
    });
    this.usuarioStorageService.get("licenciado_id").then((licenciado_id) => {
        this.usuario.licenciado_id = licenciado_id;
    });

    this.montaDashboard();
    this.montaDashboard();
    this.iniciarIntervalo();


    setTimeout(() => {
      this.dataLoaded = true; // Marque como verdadeiro quando os dados estiverem prontos
    }, 360); // Tempo simulado de carregamento em milissegundos








    this.features = [
      { id: 1, color: '', redirect:"", icon: 'add-circle-outline', name: 'Novo contrato' },
      { id: 2, color: '', redirect:"/tabs/transactions", icon: 'cash-outline', name: 'Cobrar' },
      { id: 3, color: '', redirect:"", icon: 'calendar-outline', name: 'Á vencer' },
      { id: 4, color: '-tint', icon: 'logo-youtube', name: 'Tutoriais' },
      { id: 5, color: '', icon: 'cog-outline', name: 'Configurações' },
    ];
    this.features_two = [
      { id: 1, color: '', icon: 'people-circle-outline', name: 'Usuários' },
      { id: 2, color: '', icon: 'people-outline', name: 'Clientes' },
      { id: 3, color: '', icon: 'layers-outline', name: 'Contratos' },
      { id: 4, color: '', redirect:"", icon: 'wallet-outline', name: 'Extrato' },
      { id: 5, color: '', icon: 'information-circle-outline', name: 'Dúvidas' },
    ];



    this.transactions = [
      { id: 1, to: 'Entrada', date: '2022-05-22', amount: 5000 },
      { id: 2, to: 'Avinash', date: '2022-03-02', amount: 7000 },
      { id: 3, to: 'Catherine', date: '2022-07-28', amount: -3250 },
      { id: 4, to: 'Akhil Ag.', date: '2022-01-09', amount: 1000 },
      { id: 5, to: 'Prem Ag.', date: '2022-04-13', amount: -800 },
    ];


  }


  iniciarIntervalo() {
    // Definir um intervalo para chamar montaDashboard() a cada 30 segundos
    this.interval = setInterval(() => {
      this.montaDashboard();
      this.montaDashboard();
    }, 30000); // 30 segundos
  }



  ngAfterContentChecked() {
    this.prebannerConfig = {
      slidesPerView: 1,
      pagination: { clickable: false }
    };

    this.bannerConfig = {
      slidesPerView: 1,
      pagination: { clickable: true }
    };
    this.featureConfig = {
      slidesPerView: 3.5,
    };
  }

  async detalhesTransacao(id:string) {

    console.log(id);
    const itemSelecionado = this.cobrar.find(item => item.id === id);

    console.log(itemSelecionado);
    if (itemSelecionado.tipo_credito === "Normal") {
      console.log(itemSelecionado);
      const arrayParametro = itemSelecionado.seuArray;

      const modal = await this.modalController.create({
        component: ReceberPagamentoComponent,
        componentProps: {
          array: itemSelecionado
        }
      });


      modal.onDidDismiss().then(async () => {
        await this.atualizaDashboard();
          await this.atualizaDashboard();      });

        await modal.present();

    } else if (itemSelecionado.tipo_credito === "Renovação de Juros e Capital"){
      const arrayParametro = itemSelecionado.seuArray;
      const modal = await this.modalController.create({
        component: RenovacaoComponent,
        componentProps: {
          array: itemSelecionado
        }
      });

      return await modal.present();
    } else {
      console.error('Item não encontrado');
    }

  }



  converterData(dataString: string): string {
    const [dia, mes, ano] = dataString.split('/');
    const dataFormatada = `${ano}-${mes}-${dia}`;
    return dataFormatada;
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



  async chamaTela(redirect:string) {
    this.router.navigate([redirect])
  }
// Resto do seu código

  getDateColor(date: string): string {
    return date === this.hoje_agora ? 'primary' : (date < this.hoje_agora ? 'danger' : 'primary');
  }






  async muda_splash(state:boolean) {
    this.intro = state;
  }
















  async atualizaDashboard() {
    this.montaDashboard();
    this.montaDashboard();
  }

  async montaDashboard() {


    this.homeService.resumo_dashboard().then((res:any) => {

      if(res===false){
          this.authenticationService.logout()
      }

      let arr:any =  [
        {
            licenciado_id: this.licenciado_id,
            url_redirect: null,
            tipo_resumo: 'Receber Hoje',
            valor: res.resumo.receber_hoje.valor,
            qtd: res.resumo.receber_hoje.qtd
        },
        {
          licenciado_id: this.licenciado_id,
            url_redirect: null,
            tipo_resumo: "Atrasados",
            valor: res.resumo.atrasados.valor,
            qtd: res.resumo.atrasados.qtd
        },
        {
          licenciado_id: this.licenciado_id,
            url_redirect: null,
            tipo_resumo: "Recebido hoje",
            valor: res.resumo.recebido_hoje.valor,
            qtd: res.resumo.recebido_hoje.qtd
        },
        {
          licenciado_id: this.licenciado_id,
            url_redirect: null,
            tipo_resumo: "À receber mês",
            valor: res.resumo.a_receber_mes.valor,
            qtd: res.resumo.a_receber_mes.qtd
        }
      ];

      this.resumo_geral = arr;
      this.cobrar = res.lancamentos;
      this.lancamentos = res.lancamentos;
      this.dataLoaded = true
      this.resumo_geral = arr;
    });






  }











}

