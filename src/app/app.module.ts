import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DetalhesTransacaoComponent } from './componentes/detalhes-transacao/detalhes-transacao.component'; // Importe seu componente aqui
import { ReceberPagamentoComponent } from './componentes/modal/transacao/receber-pagamento/receber-pagamento.component';
import { SucessoComponent } from './componentes/modal/transacao/receber-pagamento/sucesso/sucesso.component';
import { MaskitoDirective } from '@maskito/angular';
import { DbService } from './services/bdd/db.service';
import { RenovacaoSucessoComponent } from './componentes/modal/transacao/receber-pagamento/renovacao/renovacao-sucesso/renovacao-sucesso.component';
import { SucessoJurosComponent } from './componentes/modal/transacao/renovacao/sucesso/sucesso.component';
import { RenovacaoComponent } from './componentes/modal/transacao/renovacao/renovacao/renovacao.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { UrlServer } from './services/global/serve';
import { ToastrModule } from 'ngx-toastr'; // Importe o ToastrModule

@NgModule({
  declarations: [AppComponent,DetalhesTransacaoComponent, ReceberPagamentoComponent, RenovacaoSucessoComponent,SucessoComponent,RenovacaoComponent,SucessoJurosComponent],
  imports:[
   IonicStorageModule.forRoot(), // Adicione o BrowserAnimationsModule aqui
   ToastrModule.forRoot(),
  ReactiveFormsModule,
  FormsModule,BrowserModule, MaskitoDirective, IonicModule.forRoot(), AppRoutingModule],
  exports: [ReceberPagamentoComponent,SucessoComponent,SucessoJurosComponent,RenovacaoSucessoComponent,RenovacaoComponent],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },  DbService, UrlServer],
  bootstrap: [AppComponent],
})
export class AppModule {}
