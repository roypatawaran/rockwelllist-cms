import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './shared/footer/footer.component'
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TenantsComponent } from './tenants/tenants.component';
import { MoviesComponent } from './movies/movies.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EgcComponent } from './egc/egc.component';
import { TenantEditComponent } from './tenants/tenant-edit/tenant-edit/tenant-edit.component';
import { MoviesEditComponent } from './movies/movies-edit/movies-edit.component';
import { EgcListComponent } from './egc/egc-list/egc-list.component';
import { TenantAddComponent } from './tenants/tenant-add/tenant-add.component';
import { FinanceComponent } from './finance/finance.component';
import { EgcSoldComponent } from './finance/egc-sold/egc-sold.component';
import { EgcLoadComponent } from './finance/egc-load/egc-load.component';
import { TenantClaimComponent } from './finance/tenant-claim/tenant-claim.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxSpinnerModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    LoginComponent,
    TenantsComponent,
    MoviesComponent,
    EgcComponent,
    TenantEditComponent,
    MoviesEditComponent,
    EgcListComponent,
    TenantAddComponent,
    FinanceComponent,
    EgcSoldComponent,
    EgcLoadComponent,
    TenantClaimComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
