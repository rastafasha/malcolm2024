import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/categoria';
import { AuthService } from '../modules/auth/service/auth.service';
const baseUrl = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  public category!: Categoria;


  constructor(
    private http: HttpClient,
    public authservice: AuthService,
    ) { }

  get token():string{
    return localStorage.getItem('auth_token') || '';
  }


  get headers(){
    return{
      headers: {
        'auth_token': this.token
      }
    }
  }


  getCategories() {
    const url = `${baseUrl}/categorias`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, categorias: Categoria}) => resp.categorias)
      )
  }
  getCategoriesActivas() {
    let headers = new HttpHeaders({"Authorization": "Bearer "+this.authservice.token});
    // let URL = baseUrl+"/categorias/activos/";
    // return this.http.get(URL,{headers:headers});
    const url = `${baseUrl}/categorias/activos`;
    return this.http.get<any>(url, {headers:headers})
      .pipe(
        map((resp:{ok: boolean, categorias: Categoria}) => resp.categorias)
      )
  }

  getCategory(id:any) {
    let headers = new HttpHeaders({"Authorization": "Bearer "+this.authservice.token});
    const url = `${baseUrl}/categorias/show/${id}`;
    return this.http.get<any>(url, {headers:headers})
      .pipe(
        map((resp:{ok: boolean, categoria: Categoria}) => resp.categoria)
        );
  }

  

  // getCategory(id:any) {
  //   let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

  //   let URL = baseUrl+'/categorias/show/'+id;

  //   return this.http.get(URL,{headers: headers})
  // }


  editarCategory(data:any, id:number){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authservice.token});

    let URL = baseUrl+'/categorias/update/'+id;

    return this.http.put(URL,data, {headers: headers})
  }


  deleteCategory(categoria:any){
    // this.isLoadingSubject.next(true);
    const url = `${baseUrl}/categorias/destroy/${categoria}`;
    return this.http.delete(url, this.headers);
  }



}
