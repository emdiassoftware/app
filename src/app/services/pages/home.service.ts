import { Injectable } from '@angular/core';
import { UsuarioStorageService } from '../storage/usuario-storage.service';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { LoadingController } from '@ionic/angular';
import { UrlServer } from '../global/serve';


@Injectable({
  providedIn: 'root'
})
export class HomeService{

  constructor(
    private storageService: UsuarioStorageService,
    private loadingController: LoadingController,
    private router: Router,
    private urlServer:UrlServer
  ) { }




    async resumo_dashboard()
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
          url: `${this.urlServer.url_api}monta_dashboard?licenciado_id=${licenciado_id}`,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        };

        console.log(options)
        try {
          //await this.exibirLoading('Sincronizando com servidor');
           const response: HttpResponse = await CapacitorHttp.get(options);

           const res=response.data
           //await this.esconderLoading();
           if(res.message === 'Unauthenticated.') {
            return false;
           } else {
            return res.data;
           }
        }
        catch(e)
        {
        // await this.esconderLoading();
          return;
        }
    }
    async atualiza_dashboard()
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
          url: `${this.urlServer.url_api}monta_dashboard?licenciado_id=${licenciado_id}`,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        };

        console.log(options)
        try {
          const response: HttpResponse = await CapacitorHttp.get(options);
           const res=response.data
           return res.data;
        }
        catch(e)
        {
        // await this.esconderLoading();
          return;
        }
    }

      async exibirLoading(text:string) {
        const loading = await this.loadingController.create({
          message: text,
          spinner: 'crescent',  // Escolha um estilo de spinner (ver documentação do Ionic)
          translucent: true,
          backdropDismiss: false  // Impede que o usuário feche o loading ao tocar fora dele
        });

        await loading.present();
      }

      async esconderLoading() {
        await this.loadingController.dismiss();
      }


      async receber_pagamento(parametro:any) {

        const token         = await this.storageService.get("token");
        const licenciado_id = await this.storageService.get("licenciado_id");
        const api_id = await this.storageService.get("api_id");


        this.storageService.get("token").then((token: string) => {
          token = token;
        });

        this.storageService.get("licenciado_id").then((licenciado_id: string) => {
          licenciado_id = licenciado_id;
        });




          const options = {
            url: `${this.urlServer.url_api}receber?receber_com_juros=${parametro.receber_com_juros}&valor_informado=${parametro.valor_informado}&forma_pagamento=${parametro.forma_pagamento}&lancamento_id=${parametro.lancamento_id}&licenciado_id=${licenciado_id}&user_id=${api_id}`,
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          };




          try {
            await this.exibirLoading('Realizando operação aguarde...');
            const response: HttpResponse = await CapacitorHttp.get(options);
             const res=response.data
             await this.esconderLoading();
             return res;
          }
          catch(e)
          {
            await this.esconderLoading();
            return;
          }



      }




      async renovar_parcela(parametro:any) {

        const token         = await this.storageService.get("token");
        const licenciado_id = await this.storageService.get("licenciado_id");
        const api_id        = await this.storageService.get("api_id");


        this.storageService.get("token").then((token: string) => {
          token = token;
        });

        this.storageService.get("licenciado_id").then((licenciado_id: string) => {
          licenciado_id = licenciado_id;
        });




      const params = new URLSearchParams(parametro).toString();

        const options = {
          url: `${this.urlServer.url_api}renovar_parcela?${params}`,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        };

        console.log(options);

        try {
          await this.exibirLoading('Renovando parcela...');
            const response: HttpResponse = await CapacitorHttp.get(options);
            const res = response.data

            await this.esconderLoading();

            if(res) {
              return res;
            } else {
              return false;
            }
        }
        catch(e)
        {
          await this.esconderLoading();
          return;
        }

      }


}
