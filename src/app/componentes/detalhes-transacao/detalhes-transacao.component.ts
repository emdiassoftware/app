import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalhes-transacao',
  templateUrl: './detalhes-transacao.component.html',
  styleUrls: ['./detalhes-transacao.component.scss'],
})

export class DetalhesTransacaoComponent  implements OnInit {


  @Input()  array: any[] = [];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log('ID da transação:', this.array);

  }

  fecharModal() {
    this.modalController.dismiss();
  }

}
