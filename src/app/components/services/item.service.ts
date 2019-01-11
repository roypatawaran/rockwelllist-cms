import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestMethod, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import {Items} from '../../models/items';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ItemsService {
    private _url = "http://localhost:3000/v1/items/";
    private token = sessionStorage.getItem("token");
    private headerOptions = new Headers({'Content-Type': 'application/json', 'X-API-Key': 'c4b0f6409c117cd17d3c7638541c2029d642d3c9e71c6343741db45765df2a2f', 'Authorization': 'Bearer ' + this.token, 'x-android-version' : 1});


    constructor(private _router: Router, private _http: Http, private _toastr: ToastrService) {}

    getItems(): Observable<any>{
        var requestOption = new RequestOptions({method: RequestMethod.Get, headers: this.headerOptions});
        return this._http.get(this._url + 'get/cms', requestOption)
            .map((response: Response) => {
                if(response){
                    if(response.status == 200){
                        return [{status: response.status, data: <Items>response.json()}]
                    }
                }
            }).catch(this.handleError);
    }

    getItemDetails(tenant_id: any): Observable<any>{
        var requestOption = new RequestOptions({method: RequestMethod.Get, headers: this.headerOptions});
        return this._http.get(this._url + 'get/cms/' + tenant_id, requestOption)
            .map((response: Response) => {
                if(response){
                    if(response.status == 200){
                        return [{status: response.status, data: <Items>response.json()}]
                    }
                }
            }).catch(this.handleError);
    }

    addItem(item: Items): Observable<any>{
        var requestOption = new RequestOptions({method: RequestMethod.Get, headers: this.headerOptions});
        return this._http.post(this._url, item, requestOption)
            .map((response: Response) => {
                if(response){
                    if(response.status == 200){
                        this._toastr.success("Item added successfully");
                        return [{status: response.status, data: <Items>response.json()}]
                    }
                }
            }).catch(this.handleError);
    }

    
    updateItem(item: Items): Observable<any>{
        var requestOption = new RequestOptions({method: RequestMethod.Put, headers: this.headerOptions});
        return this._http.put(this._url + "cms", item, requestOption)
            .map((response: Response) => {
                if(response){
                    if(response.status == 200){
                        this._toastr.success("Item updated successfully");
                        return [{status: response.status, data: <Items>response.json()}]
                    }
                }
            }).catch(this.handleError);
    }

    deleteItem(id: any): Observable<any>{
        var requestOption = new RequestOptions({method: RequestMethod.Get, headers: this.headerOptions});
        return this._http.delete(this._url + id, requestOption)
            .map((response: Response) => {
                if(response){
                    if(response.status == 200){
                        this._toastr.success("Item deleted successfully");
                        return [{status: response.status, data: <Items>response.json()}]
                    }
                }
            }).catch(this.handleError);
    }

    getFeaturedItems(): Observable<any>{
        var requestOption = new RequestOptions({method: RequestMethod.Get, headers: this.headerOptions});
        return this._http.get(this._url + 'featured', requestOption)
            .map((response: Response) => {
                if(response){
                    if(response.status == 200){
                        return [{status: response.status, data: <Items>response.json()}]
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