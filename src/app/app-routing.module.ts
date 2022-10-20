import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderAddComponent, ProviderListComponent } from './components';

const routes: Routes = [
  { path: '', redirectTo: '/data-provider/1', pathMatch: 'full' },
  { path: 'data-provider/:id', component: ProviderListComponent },
  { path: 'create-asset/:id', component: ProviderAddComponent },
  // { path: 'data-consumer', component: OfferListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
