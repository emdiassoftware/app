import { Component, OnInit , Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController, NavController } from '@ionic/angular';
import { HomePage } from 'src/app/pages/tabs/home/home.page';


@Component({
  selector: 'app-sucesso',
  templateUrl: './sucesso.component.html',
  styleUrls: ['./sucesso.component.scss'],
})
export class SucessoComponent  implements OnInit {
  @Input() array       : any = {};
           lancamento  : any = {};

constructor(
    private modalController: ModalController,
    private router: Router,
    private navController: NavController

  ) { }

  ngOnInit() {
    this.lancamento = this.array;
  }

   async cobrar() {

    this.router.navigate([
      '/tabs/transactions'
    ]);
    this.modalController.dismiss();
  }

  async fecharModal() {
    this.router.navigate([
      '/tabs/home'
    ]);
    this.modalController.dismiss();
  }

}
