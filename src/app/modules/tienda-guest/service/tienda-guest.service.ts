import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TiendaGuestService {

  constructor(
    public http:HttpClient,
    public authService: AuthService
  ) { }

  langinCourse(slug:string, campaing_discount:any=null){
    let headers = new HttpHeaders({"Authorization": "Bearer "+this.authService.token});
    let LINK = "";
    if(campaing_discount){
      LINK = LINK + "?campaing_discount="+campaing_discount;
    }
    let URL = URL_SERVICIOS+"/ecommerce/course-detail/"+slug+LINK;
    return this.http.get(URL, {headers:headers});
  }

  
  listCourses(data:any){
    let URL = URL_SERVICIOS+"/ecommerce/list_courses/";
    return this.http.post(URL,data );
  }
  listConfig(){
    let URL = URL_SERVICIOS+"/ecommerce/config_all/";
    return this.http.get(URL);
  }

  searchCourse(data:any){
    let URL = URL_SERVICIOS+"/ecommerce/course-detail/"+data;
    return this.http.post(URL,data );
  }

  langinProduct(slug:string, campaing_discount:any=null){
    let headers = new HttpHeaders({"Authorization": "Bearer "+this.authService.token});
    let LINK = "";
    if(campaing_discount){
      LINK = LINK + "?campaing_discount="+campaing_discount;
    }
    let URL = URL_SERVICIOS+"/ecommerce/product-detail/"+slug+LINK;
    return this.http.get(URL, {headers:headers});
  }
  listProducts(data:any){
    let URL = URL_SERVICIOS+"/ecommerce/list_products/";
    return this.http.post(URL,data );
  }
  
}
