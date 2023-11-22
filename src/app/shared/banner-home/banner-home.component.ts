import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/modules/home/services/home.service';
import { CartService } from 'src/app/modules/tienda-guest/service/cart.service';

//activacion y uso de jquery, con la adaptacion del archivo main.js
declare var $:any;
declare function HOMEINIT([]):any;
declare function alertDanger([]):any;
declare function alertWarning([]):any;
declare function alertSuccess([]):any;
// declare function banner_home(): any;
//activacion y uso de jquery

@Component({
  selector: 'app-banner-home',
  templateUrl: './banner-home.component.html',
  styleUrls: ['./banner-home.component.css']
})
export class BannerHomeComponent implements OnInit {
  discount_banner_courses:any = [];
  discount_banner:any = [];
  user:any = null;
  landing_course:any= null;

  constructor(
    public homeService: HomeService,
    public cartService: CartService,
    public router: Router
  ) {
    //activacion y uso de jquery
    setTimeout(()=>{
      HOMEINIT($);
    },50);
    //activacion y uso de jquery
   }

  ngOnInit(): void {
    this.homeService.home().subscribe((resp:any)=>{
      // console.log(resp);
      this.discount_banner_courses = resp.discount_banner_courses;
      this.discount_banner = resp.discount_banner;
    })

    this.user = this.cartService.autService.user;
  }

  getTotalPriceCourse(course:any){
    if(course.discount_g){
      return this.getNewTotal(course,course.discount_g);
    }
    return course.price_usd;
  }

  getNewTotal(course:any,discount_banner:any ){
    if(discount_banner.type_discount == 1){
      return course.price_usd - course.price_usd*(discount_banner.discount*0.01);
      
    }else{
      return course.price_usd - discount_banner.discount;

    }
  }

  addCart(landing_course:any, discount_campaing:any = null){
    if(!this.user){
      alertWarning("Necesitar registrate en la tienda");
      this.router.navigateByUrl("auth/login");
      return;
    }

    
    if(discount_campaing){
      landing_course.discount_g = discount_campaing
    }
    let data={
      course_id: landing_course.id,
        type_discount: landing_course.discount_g ? landing_course.discount_g.type_discount : null,
        discount: landing_course.discount_g ? landing_course.discount_g.discount : null,
        type_campaing: landing_course.discount_g ? landing_course.discount_g.type_campaing : null,
        code_discount: landing_course.discount_g ? landing_course.discount_g.code : null,
        code_cupon: null,
        precio_unitario: landing_course.price_usd,
        total: this.getTotalPriceCourse(landing_course),
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
