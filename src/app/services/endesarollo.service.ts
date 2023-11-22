import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Blog } from '../models/blog';
import { Categoria } from '../models/categoria';
import { Endesarrollo } from '../models/endesarollo';
const baseUrl = environment.URL_SERVICIOS;
@Injectable({
  providedIn: 'root'
})
export class EndesarolloService {

  public endesarrollo: Endesarrollo;
  public categoria!: Categoria;


  constructor(private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }


  get headers(){
    return{
      headers: {
        'token': this.token
      }
    }
  }


 
  getPosts() {
    const url = `${baseUrl}/endesarrollo`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, endesarollos: Endesarrollo}) => resp.endesarollos)
      )
  }

  getPost(blog: Blog) {
    const url = `${baseUrl}/endesarrollo/show/${blog}`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, endesarrollo: Endesarrollo}) => resp.endesarrollo)
        );
  }

  getRecentPosts() {
    const url = `${baseUrl}/endesarrollo/recientes`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, endesarrollos: Endesarrollo}) => resp.endesarrollos)
      )
  }

  getFeaturedPosts() {
    const url = `${baseUrl}/endesarrollo/destacados`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, endesarrollos: Endesarrollo}) => resp.endesarrollos)
      )
  }


}
