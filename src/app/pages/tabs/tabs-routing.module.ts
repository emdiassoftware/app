import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserResolver } from 'src/app/services/bdd/tabela/usuario/usuario-resolver.service';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
        {
          path: '',
          redirectTo: '/tabs/home',
          pathMatch: 'full'
        },
        {
          path: 'home',
          loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
        },
        {
          path: 'settings',
          loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
        },
        {
          path: 'card',
          loadChildren: () => import('./card/card.module').then( m => m.CardPageModule)
        },
        {
          path: 'transactions',
          loadChildren: () => import('./transactions/transactions.module').then( m => m.TransactionsPageModule)
        }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
