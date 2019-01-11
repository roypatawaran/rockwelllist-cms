import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component';
import { TenantsComponent } from './components/tenants/tenants.component';
import { MoviesComponent } from './components/movies/movies.component';
import { EgcComponent } from './components/egc/egc.component';
import { TenantEditComponent } from './components/tenants/tenant-edit/tenant-edit/tenant-edit.component';
import { MoviesEditComponent } from './components/movies/movies-edit/movies-edit.component';
import { EgcListComponent } from './components/egc/egc-list/egc-list.component';
import { TenantAddComponent } from './components/tenants/tenant-add/tenant-add.component';
import { AuthGuardService } from './guards/authguard.service';
import { FinanceComponent } from './components/finance/finance.component';
import { EgcSoldComponent } from './components/finance/egc-sold/egc-sold.component';
import { EgcLoadComponent } from './components/finance/egc-load/egc-load.component';
import { TenantClaimComponent } from './components/finance/tenant-claim/tenant-claim.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },{path: '*', redirectTo: 'login', pathMatch: 'full'},
    { path: 'home', canActivate: [AuthGuardService],component: HomeComponent },
    { path: 'login',      component: LoginComponent },
    { path: 'tenants',  canActivate: [AuthGuardService], component: TenantsComponent },
    { path: 'tenant/edit/:id', canActivate: [AuthGuardService],component: TenantEditComponent},
    { path: 'tenant/add', canActivate: [AuthGuardService],component: TenantAddComponent},
    { path: 'movie/edit/:id', canActivate: [AuthGuardService],component: MoviesEditComponent},
    { path: 'movies',      canActivate: [AuthGuardService],component: MoviesComponent },
    { path: 'egc',      canActivate: [AuthGuardService],component: EgcComponent },
    { path: 'egc-list', canActivate: [AuthGuardService],component: EgcListComponent},
    { path: 'finance', canActivate: [AuthGuardService],component: FinanceComponent},
    { path: 'finance/egc-sold', canActivate: [AuthGuardService],component: EgcSoldComponent},
    { path: 'finance/egc-load', canActivate: [AuthGuardService],component: EgcLoadComponent},
    { path: 'finance/tenant-claim', canActivate: [AuthGuardService],component: TenantClaimComponent}
];

@NgModule({
  providers: [AuthGuardService],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
