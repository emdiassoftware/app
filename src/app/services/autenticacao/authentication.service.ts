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
export class AuthenticationService {


  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	token = '';
  public isValidToken=false

  constructor(
      private loadingController: LoadingController,
      private usuarioStorageService:UsuarioStorageService,
      private router:Router,
      private urlServer:UrlServer
    ) { }


    async isAuthenticatedUser()
    {
      const token=await this.usuarioStorageService.get("token");
      if(!token)
      return false;

      var isExpired=this.isTokenExpired(token);
      if (isExpired) {
        return false;
      } else {
        return true;
      }


    }


    private isTokenExpired(token: any): boolean {
      const decodedToken: any = jwtDecode(token);

      // Verifica se 'exp' está presente e é um número
      if (decodedToken && typeof decodedToken.exp === 'number') {
        const expiry = decodedToken.exp;
        const currentTimestamp = Math.floor((new Date).getTime() / 1000);
        const isExpired = currentTimestamp >= expiry;

        return isExpired;
      }

      // Se 'exp' não está presente ou não é um número, considera como expirado
      return true;
    }



  async registerUser(formData: any)
  {
      if(!formData) return;

      const options = {
        url: `${this.urlServer.url_api}register`,
        headers: { 'Content-Type': 'application/json'  },
        data: JSON.stringify(formData),
      };

      try{
        const response: HttpResponse = await CapacitorHttp.post(options);
        return response.data;
      }
      catch(e)
      {
        return;
      }
  }

  async login(formData: any)
  {
      if(!formData) return;

      const options = {
        url: `${this.urlServer.url_api}login`,
        headers: { 'Content-Type': 'application/json'  },
        data: JSON.stringify(formData),
      };

      try {

        await this.exibirLoading();

        const response: HttpResponse = await CapacitorHttp.post(options);


        if(response.status === 403) {
          await this.esconderLoading();
          return 'credenciaisInvalidas';
        }


        const res=response.data


        if(res && res.data.token)
        {
            this.usuarioStorageService.set("token",res.data.token);
            this.usuarioStorageService.set("name", res.data.usuario.name);
            this.usuarioStorageService.set("email", res.data.usuario.email);
            this.usuarioStorageService.set("licenciado_id", res.data.usuario.licenciado_id);
            this.usuarioStorageService.set("api_id", res.data.usuario.id);
            this.isAuthenticated.next(true);
            await this.esconderLoading();
            return res;
          }
        else
        await this.esconderLoading();
        return res;

      }
      catch(e)
      {
        await this.esconderLoading();
        return 'erro';
      }
  }


  async logout() {
		this.isAuthenticated.next(false);
		await this.usuarioStorageService.remove("token");
    this.router.navigateByUrl('/login', { replaceUrl: true });
	}


  public async checkAuthentication(){

    const token=await this.usuarioStorageService.get("token");
    if(!token)  return false;

    var isExpired=this.isTokenExpired(token);
    console.log("isExpired  " +isExpired)
    if (isExpired) return false;

    var isValidToken=false;
    isValidToken=await this.validateToken(token);
    console.log("isValidToken" +isValidToken)

    if(!isValidToken)
      return false;
    else
      return true;

  }

  async validateToken(token:any)
  {

    console.log(token);

    const options = {
      url: `${this.urlServer.url_api}verify`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }


    };

    try {

        const response: HttpResponse = await CapacitorHttp.get(options);
        const res=response.data
      if(response && response.status === 401) {

          this.usuarioStorageService.remove('name');
          this.usuarioStorageService.remove('email');
          this.usuarioStorageService.remove('api_id');
          this.usuarioStorageService.remove('licenciado_id');
          this.router.navigateByUrl('/login', { replaceUrl: true });

        return false;
      } else {

            this.usuarioStorageService.set('name', res.user.name);
            console.log(this.usuarioStorageService.get('name'));
            this.usuarioStorageService.set('email', res.user.email);
            this.usuarioStorageService.set('licenciado_id', res.user.licenciado_id);
            this.usuarioStorageService.set('api_id', res.user.id);

        return true;
      }
    }
    catch(e)
    {
      return false;
    }
  }






  async exibirLoading() {
    const loading = await this.loadingController.create({
      message: 'Aguarde...',
      spinner: 'crescent',  // Escolha um estilo de spinner (ver documentação do Ionic)
      translucent: true,
      backdropDismiss: false  // Impede que o usuário feche o loading ao tocar fora dele
    });

    await loading.present();
  }

  async esconderLoading() {
    await this.loadingController.dismiss();
  }




}
