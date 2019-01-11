import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestMethod, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable, BehaviorSubject } from 'rxjs';
import {User} from '../../models/user';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthenticationService {
    private _url = "https://rockwell-mobile.herokuapp.com/cms";
    private headerOptions = new Headers({'Content-Type': 'application/json', 'X-API-Key': 'c4b0f6409c117cd17d3c7638541c2029d642d3c9e71c6343741db45765df2a2f'});
    private loggedIn = false;

    constructor(private _router: Router, private _http: Http, private _toastr: ToastrService) {}

    get isLoggedIn(){
        return this.loggedIn;
    }

    login(user: User): Observable<any>{
        var requestOption = new RequestOptions({method: RequestMethod.Post, headers: this.headerOptions});
        return this._http.post(this._url + '/login', user, requestOption)
            .map((response: Response) => {
                if(response){
                    if(response.status == 200){
                        this.loggedIn = true;
                        this._toastr.success("Login Successful!");
                        return [{status: response.status, data: response.json()}]
                    }
                }
            }).catch(this.handleError);
    }

    private handleError(error: any) {
        if (error.json().Message == 'Token expired') {
          alert('Session expired, please login.');
          return Observable.throw('Token expired');
        }
        console.log(error);
        return Observable.throw(error._body || 'Server error');
      }
}