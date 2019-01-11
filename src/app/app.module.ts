import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import {AppServices} from './app.service';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { MoviesComponent } from './components/movies/movies.component';
import { AppRoutingModule } from './app.routing';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { TenantsComponent } from './components/tenants/tenants.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
    { path: 'home',      component: HomeComponent },
    { path: 'login',      component: LoginComponent },
    { path: 'tenants',      component: TenantsComponent },
    { path: 'movies',      component: MoviesComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    HttpModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      onActivateTick: false,
      enableHtml: true,
      preventDuplicates: true,
      positionClass: 'toast-bottom-right'
    }),
    ComponentsModule,
    RouterModule.forRoot(routes),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxQRCodeModule,
    NgxDaterangepickerMd.forRoot()
  ],
  providers: [AppServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
