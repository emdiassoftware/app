import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UsuarioStorageService {

  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage(){
    await this.storage.create();
  }

  async set(key: string, value: any){
    await this.storage.set(key, value);
    return true;
  }

  async get(key: string){
    const value = await this.storage.get(key);

    return value;
  }

  async remove(key:string) {
    await this.storage.remove(key);
    return;
  }

}
