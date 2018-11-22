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
export class EGCService {
    private _url = "http://localhost:3000/v1/coupon";
    private headerOptions = new Headers({'Content-Type': 'application/json', 'X-API-Key': 'c4b0f6409c117cd17d3c7638541c2029d642d3c9e71c6343741db45765df2a2f'});

    constructor(private _router: Router, private _http: Http, private _toastr: ToastrService) {}

    load_egc(req: any): Observable<any>{
        var requestOption = new RequestOptions({method: RequestMethod.Post, headers: this.headerOptions});
        return this._http.post(this._url + '/load', req, requestOption)
            .map((response: Response) => {
                if(response){
                    if(response.status == 200){
                        this._toastr.success("Load Successful.");
                        return [{status: response.status, data: response.json()}]
                    }
                }
            }).catch(this.handleError);
    }

    
    getTransactions(): Observable<any>{
        var requestOption = new RequestOptions({method: RequestMethod.Get, headers: this.headerOptions});
        return this._http.get(this._url + '/transactions', requestOption)
            .map((response: Response) => {
                if(response){
                    if(response.status == 200){
                        //this._toastr.success("Load Successful.");
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