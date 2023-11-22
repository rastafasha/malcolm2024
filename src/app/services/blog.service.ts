import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Blog } from '../models/blog';
import { Categoria } from '../models/categoria';
import { Portafolio } from '../models/portafolio';
import { environment } from 'src/environments/environment';

const baseUrl = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  public blog: Blog;
  public categoria: Categoria;


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
    const url = `${baseUrl}/blogs`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, blogs: Blog}) => resp.blogs)
      )
  }

  getPost(blog: Blog) {
    const url = `${baseUrl}/blog/show/${blog}`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, blog: Blog}) => resp.blog)
        );
  }

  getRecentPosts() {
    const url = `${baseUrl}/blog/recientes`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, blogs: Blog}) => resp.blogs)
      )
  }

  getActivos() {
    const url = `${baseUrl}/blog/activos`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, blogs: Blog}) => resp.blogs)
      )
  }


  getPostByCategory(id: Categoria) {
    const url = `${baseUrl}/blog/category/${id}`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, blogs: Blog}) => resp.blogs)
        );
  }
  getportafoliosWithCategory(portafolios: Blog) {
    const url = `${baseUrl}/blog/showcategory/${portafolios}`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, blogs: Blog}) => resp.blogs)
        );
  }

  getPostBySlug(slug: Portafolio) {
    const url = `${baseUrl}/blog/show/slug/${slug}`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, blog: Blog}) => resp.blog)
        );
  }

  search(query=''){
    return this.http.get(`${baseUrl}/blog/search`, {params: {buscar: query}})

  }
}
