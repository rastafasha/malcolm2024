import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { TiendaGuestService } from '../service/tienda-guest.service';
declare function courseView():any;
declare function showMoreBtn():any;
declare function magnigyPopup():any;
declare function alertDanger([]):any;
declare function alertWarning([]):any;
declare function alertSuccess([]):any;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  slug:any = null;
  landing_product:any= null;
  // products_related_instructor:any=[];
  products_related_category:any=[];
  campaing_discount_id:any;
  DISCOUNT:any = null;
  user:any = null;
  isHaveProduct: any = false;

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
    this.tiendaGuestService.langinProduct(this.slug, this.campaing_discount_id).subscribe(
      (resp:any)=>{
        console.log(resp);
        this.landing_product = resp.product;
        // this.DISCOUNT = resp.DISCOUNT;
        // if(this.DISCOUNT){
        //   this.landing_course.discount_g = resp.DISCOUNT;
        // }
        setTimeout(()=>{
          magnigyPopup();
        }, 50)
        this.isHaveProduct = resp.isHaveProduct;
      }
    )
    setTimeout(()=>{
      courseView();
      showMoreBtn();
    }, 50);
    // alertSuccess('Alert Success')
    
  }


  getNewTotal(product:any,discount_flash:any ){
    if(discount_flash.type_discount == 1){
      return product.price_usd - product.price_usd*(discount_flash.discount*0.01);
      
    }else{
      return product.price_usd - discount_flash.discount;

    }
  }

  getTotalPriceCourse(product:any){
    if(product.discount_g){
      return this.getNewTotal(product,product.discount_g);
    }
    return product.price_usd;
  }

  addCart(){
    if(!this.user){
      alertWarning("Necesitar registrate en la tienda");
      this.router.navigateByUrl("auth/login");
      return;
    }
    let data={
      product_id: this.landing_product.id,
        // type_discount: this.landing_course.discount_g ? this.landing_course.discount_g.type_discount : null,
        // discount: this.landing_course.discount_g ? this.landing_course.discount_g.discount : null,
        // type_campaing: this.landing_course.discount_g ? this.landing_course.discount_g.type_campaing : null,
        // code_discount: this.landing_course.discount_g ? this.landing_course.discount_g.code : null,
        code_cupon: null,
        precio_unitario: this.landing_product.price_usd,
        total: this.getTotalPriceCourse(this.landing_product),
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
