import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './modules/shared-module/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  CreateDataDialogComponent,
  EdcDataComponent,
  OfferListComponent,
  ProviderAddComponent,
  ProviderListComponent,
} from './components';
import { InitiateTransferDialogComponent } from './components/initiate-transfer-dialog/initiate-transfer-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ProviderAddComponent,
    ProviderListComponent,
    OfferListComponent,
    EdcDataComponent,
    CreateDataDialogComponent,
    InitiateTransferDialogComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    BrowserModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      timeOut: 3000,
      easing: 'ease-in',
      maxOpened: 3,
      tapToDismiss: true,
      closeButton: true,
      autoDismiss: true,
      preventDuplicates: true,
    }),
    SharedModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
