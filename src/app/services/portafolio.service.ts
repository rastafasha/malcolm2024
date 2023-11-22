import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Portafolio } from '../models/portafolio';
import { Categoria } from '../models/categoria';

const baseUrl = environment.URL_SERVICIOS;


@Injectable({
  providedIn: 'root'
})
export class PortafolioService {

  public post: Portafolio;
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
    const url = `${baseUrl}/portafolio`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, portafolios: Portafolio}) => resp.portafolios)
      )
  }

  getPost(post: Portafolio) {
    const url = `${baseUrl}/portafolio/show/${post}`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, portafolio: Portafolio}) => resp.portafolio)
        );
  }

  getRecentPosts() {
    const url = `${baseUrl}/portafolio/recientes`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, portafoliorecientes: Portafolio}) => resp.portafoliorecientes)
      )
  }

  getFeaturedPosts() {
    const url = `${baseUrl}/portafolio/destacados`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, portafolios: Portafolio}) => resp.portafolios)
      )
  }


  getPostByCategory(id: Categoria) {
    const url = `${baseUrl}/portafolio/category/${id}`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, portafolios: Portafolio}) => resp.portafolios)
        );
  }
  getportafoliosWithCategory(portafolios: Portafolio) {
    const url = `${baseUrl}/portafolio/showcategory/${portafolios}`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, portafolios: Portafolio}) => resp.portafolios)
        );
  }

  getPostBySlug(slug: Portafolio) {
    const url = `${baseUrl}/portafolio/show/slug/${slug}`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, portafolio: Portafolio}) => resp.portafolio)
        );
  }

  search(query=''){
    return this.http.get(`${baseUrl}/portafolio/search`, {params: {buscar: query}})

  }
}
