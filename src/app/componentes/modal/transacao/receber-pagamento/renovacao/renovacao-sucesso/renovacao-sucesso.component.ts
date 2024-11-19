import { Component, OnInit , Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController, NavController } from '@ionic/angular';
import { HomePage } from 'src/app/pages/tabs/home/home.page';



@Component({
  selector: 'app-renovacao-sucesso',
  templateUrl: './renovacao-sucesso.component.html',
  styleUrls: ['./renovacao-sucesso.component.scss'],
})
export class RenovacaoSucessoComponent  implements OnInit {
  @Input() array: any = {};

constructor(
    private modalController: ModalController,
    private router: Router,
    private navController: NavController

  ) { }

  ngOnInit() {
    console.log(this.array);
  }


  async cobrar() {

    this.modalController.dismiss();
    this.router.navigate([
      '/tabs/transactions'
    ]);
  }

  async fecharModal() {
    this.modalController.dismiss();
  }




}
