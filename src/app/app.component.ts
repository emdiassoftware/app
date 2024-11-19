import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DbService } from './services/bdd/db.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(

    private platform: Platform,
    private db: DbService

  ) {

  }
}
