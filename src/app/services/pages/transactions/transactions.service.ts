import { Injectable } from '@angular/core';
import { UsuarioStorageService } from '../../storage/usuario-storage.service';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { LoadingController } from '@ionic/angular';
import { UrlServer } from '../../global/serve';
import { HomePage } from 'src/app/pages/tabs/home/home.page';


@Injectable({
  providedIn: 'root'
})
export class TransactionsService{

  constructor(
    private storageService: UsuarioStorageService,
    private loadingController: LoadingController,
    private router: Router,
    private urlServer:UrlServer
  ) { }




    async todos_lancamentos()
    {

        const token         = await this.storageService.get("token");
        const licenciado_id = await this.storageService.get("licenciado_id");

        this.storageService.get("token").then((token: string) => {
          token = token;
        });

        this.storageService.get("licenciado_id").then((licenciado_id: string) => {
          licenciado_id = licenciado_id;
        });




        const options = {
          url: `${this.urlServer.url_api}todos_lancamentos?licenciado_id=${licenciado_id}`,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        };

        try {
           const response: HttpResponse = await CapacitorHttp.get(options);

           const res = response.data
           return res.lancamentos;

          //  if(res.message === 'Unauthenticated.') {
          //   return false;
          //  } else {
          //  }
        }
        catch(e)
        {
          return;
        }
    }
}
