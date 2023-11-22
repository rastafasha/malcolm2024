import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart= new BehaviorSubject<Array<any>>([]);
  public currentData$ = this.cart.asObservable();


  constructor(
    public http: HttpClient,
    public autService: AuthService,
    
  ) { }

  addCart(dataCart:any){
    let listCart = this.cart.getValue();
    let Index = listCart.findIndex(item => item.id == dataCart.course_id);
    if(Index == -1){
      listCart.unshift(dataCart);
    }
    this.cart.next(listCart);

  }

  resetCart(){
    let listCart:any = [];
    this.cart.next(listCart);
  }

  removeItemCart(dataCart:any){
    let listCart = this.cart.getValue();
    let Index = listCart.findIndex(item => item.id == dataCart.id);
    if(Index != -1){
      listCart.splice(Index, 1);
    }
    this.cart.next(listCart);
  }

  listCart(){
    let headers = new HttpHeaders({"Authorization": "Bearer "+this.autService.token});
    let URL = URL_SERVICIOS+"/ecommerce/cart";
    return this.http.get(URL, {headers:headers});
  }

  registerCart(data:any){
    let headers = new HttpHeaders({"Authorization": "Bearer "+this.autService.token});
    let URL = URL_SERVICIOS+"/ecommerce/cart";
    return this.http.post(URL, data,{headers:headers});
  }

  deleteCart(cart_id:any){
    let headers = new HttpHeaders({"Authorization": "Bearer "+this.autService.token});
    let URL = URL_SERVICIOS+"/ecommerce/cart/"+cart_id;
    return this.http.delete(URL, {headers:headers});
  }

  applyCoupon(data:any){
    let headers = new HttpHeaders({"Authorization": "Bearer "+this.autService.token});
    let URL = URL_SERVICIOS+"/ecommerce/apply_coupon";
    return this.http.post(URL, data,{headers:headers});
  }
  checkout(data:any){
    let headers = new HttpHeaders({"Authorization": "Bearer "+this.autService.token});
    let URL = URL_SERVICIOS+"/ecommerce/checkout";
    return this.http.post(URL, data,{headers:headers});
  }
}
