import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {environment} from 'src/environments/environment';
import { Delivery } from "../models/dlivery.model";

import { map } from 'rxjs/operators';

const base_url = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class PostalService {

  public url;

  constructor(
    private http : HttpClient
  ) {
    this.url = environment.URL_SERVICIOS;
   }

   get token():string{
    return localStorage.getItem('token') || '';
  }


  get headers(){
    return{
      headers: {
        'x-token': this.token
      }
    }
  }

  registro(data:any):Observable<any>{
    const url = `${base_url}/delivery`;
    return this.http.post(url, data, this.headers);
  }

  listar():Observable<any>{
    const url = `${base_url}/delivery`;
    return this.http.get(url, this.headers);
    }

  getDelivery(id:string):Observable<any>{
    const url = `${base_url}/delivery/${id}`;
    return this.http.get<any>(url, this.headers)
    .pipe(
      map((resp:{ok: boolean, cupon: Delivery}) => resp.cupon)
      );
  }

  eliminar(_id:string):Observable<any>{
    const url = `${base_url}/delivery/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
