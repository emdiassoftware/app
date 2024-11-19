import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TransactionsService } from 'src/app/services/pages/transactions/transactions.service';
import { ModalController } from '@ionic/angular';
import { ReceberPagamentoComponent } from 'src/app/componentes/modal/transacao/receber-pagamento/receber-pagamento.component';
import { RenovacaoComponent } from 'src/app/componentes/modal/transacao/renovacao/renovacao/renovacao.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  @ViewChild('noLancamentos', { static: false }) noLancamentos!: ElementRef;
  @ViewChild('thisLancamentos', { static: false }) thisLancamentos!: ElementRef;

  allTransactions: any[] = [];
  transactions: any[] = [];
  filteredTransactions: any[] = []; // Transações filtradas
  segmentValue = 'in';
  interval: any; // variável para armazenar o intervalo
  searchTerm: string = ''; // Termo de pesquisa

  constructor(
    private transactionsService: TransactionsService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.setarVariaveis();
    this.iniciarIntervalo();
  }

  filterTransactions() {
    const hoje = new Date();

    if (this.segmentValue == 'in') {
      this.transactions = this.allTransactions.filter((transacao: any) => {
        const dataVencimento = new Date(transacao.data_vencimento_convertida);
        return dataVencimento < hoje; // Transações com data de vencimento anterior à data atual
      });
    } else {
      this.transactions = this.allTransactions.filter((transacao: any) => {
        const dataVencimento = new Date(transacao.data_vencimento_convertida);
        return dataVencimento > hoje; // Transações com data de vencimento posterior à data atual
      });
    }
  }

  segmentChanged(event: any) {
    console.log(event);
    this.segmentValue = event.detail.value;
    this.filterTransactions();
  }

  setarVariaveis() {
    this.transactionsService.todos_lancamentos().then((res: any) => {
      this.allTransactions = res;
      this.filterTransactions();
    });
  }

  iniciarIntervalo() {
    // Definir um intervalo para chamar montaDashboard() a cada 30 segundos
    // this.interval = setInterval(() => {
    //   this.setarVariaveis();
    // }, 5000); // 30 segundos
  }

  async detalhesTransacao(id: string) {
    const itemSelecionado = this.allTransactions.find(item => item.id === id);

    if (itemSelecionado.tipo_credito === "Normal") {
      const modal = await this.modalController.create({
        component: ReceberPagamentoComponent,
        componentProps: {
          array: itemSelecionado
        }
      });
      await modal.present();
    } else if (itemSelecionado.tipo_credito === "Renovação de Juros e Capital") {
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
    const hoje = new Date();
    const dataVencimento = new Date(data);
    const diferencaEmMilissegundos = dataVencimento.getTime() - hoje.getTime();
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
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }


  searchTransactions(event: any) {
    // Verifica se o evento e o valor estão definidos
    if (event && event.target && event.target.value) {
      // Obtém o termo de pesquisa do evento
      const searchTerm = event.target.value.toLowerCase();
  
      // Filtra as transações com base no termo de pesquisa
      this.transactions = this.allTransactions.filter((lancamento: any) => {
        // Verifica se os campos não são nulos antes de converter para minúsculas
        const clienteNome = lancamento.cliente_nome ? lancamento.cliente_nome.toLowerCase() : '';
        const clienteCPF = lancamento.cliente_cpf ? lancamento.cliente_cpf.toLowerCase() : '';
        const dataVencimento = lancamento.data_vencimento ? lancamento.data_vencimento.toLowerCase() : '';
  
        return clienteNome.includes(searchTerm) ||
               clienteCPF.includes(searchTerm) ||
               dataVencimento.includes(searchTerm);
      });
    } else {
      // Se não houver um valor de pesquisa, exibe todas as transações
      this.transactions = this.allTransactions;
    }
  }
  
  
}
