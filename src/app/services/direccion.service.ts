import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { Direccion } from '../models/direccion.model';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
const base_url = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  public direccion: Direccion;
  public url;

  constructor(
    private _http: HttpClient,
    private router: Router,
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



  registro(data:any){
    const url = `${base_url}/direccion/store`;
    return this._http.post(url, data, this.headers);
  }

  listarDirecciones():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + '/direccion/',{headers:headers})
  }

  listarUsuarioDireccion(id:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + '/direccion/direcciones/'+id,{headers:headers})

  }

  // getClientById() {
  //   const url = `${base_url}/users/showuser/${id}`;
  //   return this._http.get<any>(url)
  //     .pipe(
  //       map((resp:{ok: boolean, user: User[]}) => resp.user),
  //       )
  // }

  get_direccion(id:number){
    const url = `${base_url}/direccion/show/${id}`;
    return this._http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, direccion: Direccion}) => resp.direccion)
        );
  }

 
  update(data:any){
    const url = `${base_url}/direccion/update/${data}`;
    return this._http.put(url, data, this.headers);
  }

  eliminar(direccion:Direccion){
    const url = `${base_url}/direccion/destroy/${direccion.id}`;
    return this._http.delete(url, this.headers);
  }


}
