import { Component, OnInit } from '@angular/core';
import { TiendaGuestService } from '../service/tienda-guest.service';
import { CartService } from '../service/cart.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var $:any;
declare function showMoreBtn():any;
declare function alertWarning([]):any;
declare function alertDanger([]):any;
declare function alertSuccess([]):any;
declare function HOMEINIT([]):any;

@Component({
  selector: 'app-filter-courses',
  templateUrl: './filter-courses.component.html',
  styleUrls: ['./filter-courses.component.css']
})
export class FilterCoursesComponent implements OnInit {

  categories:any = [];
  instructores:any = [];
  levels:any = [];
  idiomas:any = [];

  selectedOption:number = 1;

  selectedCategories:any = [];
  listCoursess:any = [];
  search:any = null;
  user:any = null;

  instructoresSelected: any = [];
  min_price:number = 0;
  max_price:number = 0;
  levelsSelected: any = [];
  idiomasSelected: any = [];
  ratingSelected: number = 0;

  constructor(
    public tiedaGuestService:TiendaGuestService,
    public cartService:CartService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {  
    window.scrollTo(0,0);
    this.user = this.tiedaGuestService.authService.user;
    // this.iniciarPriceRange();
    this.listarOpciones();
    

    this.activatedRoute.queryParams.subscribe((resp:any)=>{
      console.log(resp);
      this.search = resp.search;
      this.listCourses();
      // console.log(this.search);
    })
  }

  // iniciarPriceRange(){
  //   setTimeout(()=>{
  //     $('#slider-range').slider({
  //       range: true,
  //       min: 10,
  //       max: 500,
  //       values: [0, 300],
  //       slide: (event:any, ui:any)=> {
  //         console.log(ui.values[0], ui.values[1]);
  //           $('#amount').val('$' + ui.values[0] + ' - $' + ui.values[1]);
  //           this.min_price = ui.values[0];
  //           this.max_price = ui.values[1];
  //         },
          
  //   });
  //   $('#amount').val('$' + $('#slider-range').slider('values', 0) +
  //       " - $" + $('#slider-range').slider('values', 1));
  //   }, 50 )
    
  // }

  listarOpciones(){
    this.tiedaGuestService.listConfig().subscribe((resp:any)=>{
      console.log(resp);
      this.categories = resp.categories;
      this.instructores = resp.instructores;
      this.levels = resp.levels;
      this.idiomas = resp.idiomas;

      setTimeout(()=>{
        showMoreBtn();
      }, 50)
    })
  }

  addOption(value:number){
    this.selectedOption = value;
    if(value == 2){
      setTimeout(()=>{
        $('#slider-range').slider({
          range: true,
          min: 10,
          max: 500,
          values: [0, 300],
          slide: (event:any, ui:any)=> {
            // console.log(ui.values[0], ui.values[1]);
              $('#amount').val('$' + ui.values[0] + ' - $' + ui.values[1]);
              this.min_price = ui.values[0];
            this.max_price = ui.values[1];
          },
          stop: ()=>{
            this.listCourses();
            
        }
      });
      $('#amount').val('$' + $('#slider-range').slider('values', 0) +
          " - $" + $('#slider-range').slider('values', 1));
      }, 50 )
    }
  }

  listCourses(){
    console.log(this.search);
    let data={
      search: this.search,
      selectedCategories: this.selectedCategories,
      instructoresSelected: this.instructoresSelected,
      min_price: this.min_price,
      max_price: this.max_price,
      levelsSelected: this.levelsSelected,
      idiomasSelected: this.idiomasSelected,
      ratingSelected: this.ratingSelected,
    }
    this.tiedaGuestService.listCourses(data).subscribe((resp:any)=>{
      console.log(resp);
      this.listCoursess = resp.courses.data;
    })


  }

  addCategorie(idcategory:number){
    let INDEX = this.selectedCategories.findIndex((item:any)=> idcategory == item);
    if(INDEX != -1){
      this.selectedCategories.splice(INDEX,1);
    }else{
      this.selectedCategories.push(idcategory);
    }
    // console.log(this.selectedCategories);
    this.listCourses();
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

  addInstructors(instructor:any){
    let INDEX = this.instructoresSelected.findIndex((item:any)=> instructor.id == item);
    if(INDEX != -1){
      this.instructoresSelected.splice(INDEX,1);
    }else{
      this.instructoresSelected.push(instructor.id);
    }
    // console.log(this.selectedCategories);
    this.listCourses();
  }
  addLevels(level:any){
    let INDEX = this.levelsSelected.findIndex((item:any)=> level == item);
    if(INDEX != -1){
      this.levelsSelected.splice(INDEX,1);
    }else{
      this.levelsSelected.push(level);
    }
    // console.log(this.selectedCategories);
    this.listCourses();
  }

  addLanguages(idioma:any){
    let INDEX = this.idiomasSelected.findIndex((item:any)=> idioma == item);
    if(INDEX != -1){
      this.idiomasSelected.splice(INDEX,1);
    }else{
      this.idiomasSelected.push(idioma);
    }
    // console.log(this.selectedCategories);
    this.listCourses();
  }

  selectedRating(value:number){
    this.ratingSelected = value;
    this.listCourses();

  }
}
