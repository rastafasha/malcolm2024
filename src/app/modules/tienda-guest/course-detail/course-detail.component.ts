import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TiendaGuestService } from '../service/tienda-guest.service';
import { CartService } from '../service/cart.service';

declare function courseView():any;
declare function showMoreBtn():any;
declare function magnigyPopup():any;
declare function alertDanger([]):any;
declare function alertWarning([]):any;
declare function alertSuccess([]):any;

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  slug:any = null;
  landing_course:any= null;
  courses_related_instructor:any=[];
  courses_related_category:any=[];
  campaing_discount_id:any;
  DISCOUNT:any = null;
  user:any = null;
  isHaveCourse: any = false;
  option_selected:number = 1;

  constructor(
    public activatedRoute:ActivatedRoute,
    public tiendaGuestService: TiendaGuestService,
    public cartService: CartService,
    public router: Router
  ) { 

  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.user = this.cartService.autService.user;
    
    this.activatedRoute.params.subscribe((resp:any)=>{
      console.log(resp);
      this.slug = resp.slug;
    });
    this.activatedRoute.queryParams.subscribe((resp:any)=>{
      console.log(resp);
      this.campaing_discount_id = resp.campaing_discount;
    })
    this.tiendaGuestService.langinCourse(this.slug, this.campaing_discount_id).subscribe(
      (resp:any)=>{
        console.log(resp);
        this.landing_course = resp.course;
        this.courses_related_instructor = resp.courses_related_instructor;
        this.courses_related_category = resp.courses_related_category;
        this.DISCOUNT = resp.DISCOUNT;
        if(this.DISCOUNT){
          this.landing_course.discount_g = resp.DISCOUNT;
        }
        setTimeout(()=>{
          magnigyPopup();
        }, 50)
        this.isHaveCourse = resp.isHaveCourse;
      }
    )
    setTimeout(()=>{
      courseView();
      showMoreBtn();
    }, 50);
    // alertSuccess('Alert Success')
    
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

  addCart(){
    if(!this.user){
      alertWarning("Necesitar registrate en la tienda");
      this.router.navigateByUrl("auth/login");
      return;
    }
    let data={
      course_id: this.landing_course.id,
        type_discount: this.landing_course.discount_g ? this.landing_course.discount_g.type_discount : null,
        discount: this.landing_course.discount_g ? this.landing_course.discount_g.discount : null,
        type_campaing: this.landing_course.discount_g ? this.landing_course.discount_g.type_campaing : null,
        code_discount: this.landing_course.discount_g ? this.landing_course.discount_g.code : null,
        code_cupon: null,
        precio_unitario: this.landing_course.price_usd,
        total: this.getTotalPriceCourse(this.landing_course),
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

  optionSelected(value:number){
    this.option_selected = value;
    console.log(value);
  }

}
