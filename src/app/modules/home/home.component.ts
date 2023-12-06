import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';
import { Router } from '@angular/router';
import { CartService } from '../tienda-guest/service/cart.service';
//activacion y uso de jquery, con la adaptacion del archivo main.js
declare var $:any;
declare function HOMEINIT([]):any;
declare function countdownT():any;
declare function alertDanger([]):any;
declare function alertWarning([]):any;
declare function alertSuccess([]):any;
//activacion y uso de jquery
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  CATEGORIES:any = [];
  COURSES_HOME:any = [];
  PRODUCTS_HOME:any = [];

  group_courses_categories:any = [];
  discount_flash:any = [];
  discount_flash_courses:any = [];

  discount_banner:any;
  user:any = null;
  landing_course:any= null;
  landing_product:any= null;

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
      this.CATEGORIES = resp.categories;
      this.COURSES_HOME = resp.courses_home.data;
      this.group_courses_categories = resp.group_courses_categories;
      this.discount_flash = resp.discount_flash;
      this.discount_flash_courses = resp.discount_flash_courses;
      this.PRODUCTS_HOME = resp.products_home.data;
      setTimeout(()=>{
        countdownT();
      },50);
    })

    this.user = this.cartService.autService.user;
  }

  getNewTotal(course:any,discount_flash:any ){
    if(discount_flash.type_discount == 1){
      return course.price_usd - course.price_usd*(discount_flash.discount*0.01);
      
    }else{
      return course.price_usd - discount_flash.discount;

    }
  }

  getTotalPriceCourse(course:any){
    if(course.discount_g){
      return this.getNewTotal(course,course.discount_g);
    }
    return course.price_usd;
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
