
import { NgModule } from '@angular/core';

import { AuthenticationService } from './components/services/authentication.service';
import { ItemsService } from './components/services/item.service';
import { EGCService } from './components/services/egc.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [AuthenticationService, ItemsService, EGCService]
})
export class AppServices { }
