import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AuthenticationService} from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {

  user: User = new User('','','','','','','','','','','',null);
  constructor(private _spinner: NgxSpinnerService,
              private _authService: AuthenticationService,
              private _router: Router,
              private _toastr: ToastrService) {}


  ngOnInit() {
  }

  login() {
    this._spinner.show();
      this._authService.login(this.user).subscribe(
        data => {
          sessionStorage.setItem("account", JSON.stringify(data[0].data));
          sessionStorage.setItem("token", data[0].data.access_token);
          this._router.navigate(['home']);
          //location.reload();
          this._spinner.hide();
        },
        error => {
          this._spinner.hide();
          this._toastr.error("Invalid password", "Authentication Failed");
        }
      )
  }

}
