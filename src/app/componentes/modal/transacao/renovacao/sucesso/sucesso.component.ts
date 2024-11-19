import { Component, OnInit , Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonInput } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { MaskitoOptions, MaskitoElementPredicate } from '@maskito/core';
import { HomePage } from 'src/app/pages/tabs/home/home.page';


@Component({
  selector: 'app-sucesso',
  templateUrl: './sucesso.component.html',
  styleUrls: ['./sucesso.component.scss'],
})
export class SucessoJurosComponent  implements OnInit {

  @Input() array: any = {};

  constructor(
              private modalController: ModalController,
              private actionSheetController:ActionSheetController,
              private alertController: AlertController
  ) { }

  ngOnInit() {
    console.log(this.array)
  }

  fecharModal() {
    this.modalController.dismiss();
  }




}
