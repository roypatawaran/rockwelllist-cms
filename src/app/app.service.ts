
import { NgModule } from '@angular/core';

import { AuthenticationService } from './components/services/authentication.service';
import { ItemsService } from './components/services/item.service';
import { EGCService } from './components/services/egc.service';
import { MoviesService } from './components/services/movies.service';
import { AuthGuardService } from './guards/authguard.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [AuthenticationService, ItemsService, EGCService, MoviesService]
})
export class AppServices { }
