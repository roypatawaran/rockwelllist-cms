import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component';
import { TenantsComponent } from './components/tenants/tenants.component';
import { MoviesComponent } from './components/movies/movies.component';
import { EgcComponent } from './components/egc/egc.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
    { path: 'home',      component: HomeComponent },
    { path: 'login',      component: LoginComponent },
    { path: 'tenants',      component: TenantsComponent },
    { path: 'movies',      component: MoviesComponent },
    { path: 'egc',      component: EgcComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
