import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/modules/home/services/home.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/modules/tienda-guest/service/cart.service';

declare var $:any;
declare function HOMEINIT([]):any;
declare function alertDanger([]):any;
declare function alertWarning([]):any;
declare function alertSuccess([]):any;
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  PRODUCTS_HOME:any = [];
  user:any = null;
  landing_product:any= null;

  group_courses_categories:any = [];
  discount_flash:any = [];
  discount_flash_courses:any = [];

  discount_banner:any;

  constructor(
    public homeService: HomeService,
    public cartService: CartService,
    public router: Router
  ){
    //activacion y uso de jquery
    setTimeout(()=>{
      HOMEINIT($);
    },50);
    //activacion y uso de jquery
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.homeService.home().subscribe((resp:any)=>{
      console.log(resp);
      this.PRODUCTS_HOME = resp.products_home.data;
    })
  }
  // getNewTotal(course:any,discount_flash:any ){
  //   if(discount_flash.type_discount == 1){
  //     return course.price_usd - course.price_usd*(discount_flash.discount*0.01);
      
  //   }else{
  //     return course.price_usd - discount_flash.discount;

  //   }
  // }

  getTotalPriceCourse(course:any){
    // if(course.discount_g){
    //   return this.getNewTotal(course,course.discount_g);
    // }
    return course.price_usd;
  }

  addCart(landing_product:any, discount_campaing:any = null){
    // if(!this.user){
    //   alertWarning("Necesitar registrate en la tienda");
    //   this.router.navigateByUrl("auth/login");
    //   return;
    // }
    if(discount_campaing){
      landing_product.discount_g = discount_campaing
    }
    
    let data={
      product_id: landing_product.id,
        type_discount: landing_product.discount_g ? landing_product.discount_g.type_discount : null,
        discount: landing_product.discount_g ? landing_product.discount_g.discount : null,
        type_campaing: landing_product.discount_g ? landing_product.discount_g.type_campaing : null,
        code_discount: landing_product.discount_g ? landing_product.discount_g.code : null,
        code_cupon: null,
        precio_unitario: landing_product.price_usd,
        total: this.getTotalPriceCourse(landing_product),
    }
    
    this.cartService.registerCart(data).subscribe((resp:any)=>{
      if(resp.message == 403){
        alertDanger(resp.message_text);
        return;
      }else{
        this.cartService.addCart(resp.cart);
        alertSuccess('El Curso se agregó al carrito exitosamente!');

      }

    })
  }

}
