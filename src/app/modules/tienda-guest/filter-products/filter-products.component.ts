import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../service/cart.service';
import { TiendaGuestService } from '../service/tienda-guest.service';

declare var $:any;
declare function showMoreBtn():any;
declare function alertWarning([]):any;
declare function alertDanger([]):any;
declare function alertSuccess([]):any;
declare function HOMEINIT([]):any;


@Component({
  selector: 'app-filter-products',
  templateUrl: './filter-products.component.html',
  styleUrls: ['./filter-products.component.css']
})
export class FilterProductsComponent implements OnInit {

  categories:any = [];
  categories_products:any = [];
  instructores:any = [];
  levels:any = [];
  idiomas:any = [];
  colors:any = [];
  material:any = [];
  medida:any = [];
  peso:any = [];

  selectedOption:number = 1;

  selectedCategories:any = [];
  listProductos:any = [];
  search:any = null;
  user:any = null;

  instructoresSelected: any = [];
  min_price:number = 0;
  max_price:number = 0;
  levelsSelected: any = [];
  idiomasSelected: any = [];
  ratingSelected: number = 0;
  coloresSelected: any = [];
  materialSelected: any = [];
  pesosSelected: any = [];
  medidasSelected: any = [];

  constructor(
    public tiedaGuestService:TiendaGuestService,
    public cartService:CartService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {  
    window.scrollTo(0,0);
    this.user = this.tiedaGuestService.authService.user;
    this.iniciarPriceRange();
    this.listarOpciones();
    

    this.activatedRoute.queryParams.subscribe((resp:any)=>{
      console.log(resp);
      this.search = resp.search;
      this.listProducts();
      // console.log(this.search);
    })
  }

  iniciarPriceRange(){
    setTimeout(()=>{
      $('#slider-range').slider({
        range: true,
        min: 10,
        max: 500,
        values: [0, 300],
        slide: (event:any, ui:any)=> {
          console.log(ui.values[0], ui.values[1]);
            $('#amount').val('$' + ui.values[0] + ' - $' + ui.values[1]);
            this.min_price = ui.values[0];
            this.max_price = ui.values[1];
          },
          
    });
    $('#amount').val('$' + $('#slider-range').slider('values', 0) +
        " - $" + $('#slider-range').slider('values', 1));
    }, 50 )
    
  }

  listarOpciones(){
    this.tiedaGuestService.listConfig().subscribe((resp:any)=>{
      console.log(resp);
      this.categories = resp.categories;
      this.categories_products = resp.categories_products;
      this.instructores = resp.instructores;
      // this.colors = resp.colors;
      // this.medida = resp.medida;
      // this.peso = resp.peso;
      // this.material = resp.material;

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
            this.listProducts();
            
        }
      });
      $('#amount').val('$' + $('#slider-range').slider('values', 0) +
          " - $" + $('#slider-range').slider('values', 1));
      }, 50 )
    }
  }

  listProducts(){
    console.log(this.search);
    let data={
      search: this.search,
      selectedCategories: this.selectedCategories,
      instructoresSelected: this.instructoresSelected,
      min_price: this.min_price,
      max_price: this.max_price,
      coloresSelected: this.coloresSelected,
      materialSelected: this.materialSelected,
      pesosSelected: this.pesosSelected,
      medidasSelected: this.medidasSelected,
      ratingSelected: this.ratingSelected,
    }
    this.tiedaGuestService.listProducts(data).subscribe((resp:any)=>{
      console.log(resp);
      this.listProductos = resp.products.data;
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
    this.listProducts();
  }

  getNewTotal(producto:any,discount_flash:any ){
    if(discount_flash.type_discount == 1){
      return producto.price_usd - producto.price_usd*(discount_flash.discount*0.01);
      
    }else{
      return producto.price_usd - discount_flash.discount;

    }
  }

  getTotalPriceCourse(producto:any){
    if(producto.discount_g){
      return this.getNewTotal(producto,producto.discount_g);
    }
    return producto.price_usd;
  }

  addCart(landing_producto:any, discount_campaing:any = null){
    if(!this.user){
      alertWarning("Necesitar registrate en la tienda");
      this.router.navigateByUrl("auth/login");
      return;
    }
    if(discount_campaing){
      landing_producto.discount_g = discount_campaing
    }
    
    let data={
      course_id: landing_producto.id,
        type_discount: landing_producto.discount_g ? landing_producto.discount_g.type_discount : null,
        discount: landing_producto.discount_g ? landing_producto.discount_g.discount : null,
        type_campaing: landing_producto.discount_g ? landing_producto.discount_g.type_campaing : null,
        code_discount: landing_producto.discount_g ? landing_producto.discount_g.code : null,
        code_cupon: null,
        precio_unitario: landing_producto.price_usd,
        total: this.getTotalPriceCourse(landing_producto),
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
    this.listProducts();
  }
  addLevels(level:any){
    let INDEX = this.levelsSelected.findIndex((item:any)=> level == item);
    if(INDEX != -1){
      this.levelsSelected.splice(INDEX,1);
    }else{
      this.levelsSelected.push(level);
    }
    // console.log(this.selectedCategories);
    this.listProducts();
  }

  addLanguages(idioma:any){
    let INDEX = this.idiomasSelected.findIndex((item:any)=> idioma == item);
    if(INDEX != -1){
      this.idiomasSelected.splice(INDEX,1);
    }else{
      this.idiomasSelected.push(idioma);
    }
    // console.log(this.selectedCategories);
    this.listProducts();
  }

  addColors(color:any){
    let INDEX = this.coloresSelected.findIndex((item:any)=> color == item);
    if(INDEX != -1){
      this.coloresSelected.splice(INDEX,1);
    }else{
      this.coloresSelected.push(color);
    }
    // console.log(this.selectedCategories);
    this.listProducts();
  }
  addMaterials(material:any){
    let INDEX = this.materialSelected.findIndex((item:any)=> material == item);
    if(INDEX != -1){
      this.materialSelected.splice(INDEX,1);
    }else{
      this.materialSelected.push(material);
    }
    // console.log(this.selectedCategories);
    this.listProducts();
  }
  addPesos(peso:any){
    let INDEX = this.pesosSelected.findIndex((item:any)=> peso == item);
    if(INDEX != -1){
      this.pesosSelected.splice(INDEX,1);
    }else{
      this.pesosSelected.push(peso);
    }
    // console.log(this.selectedCategories);
    this.listProducts();
  }
  addMedidas(medida:any){
    let INDEX = this.medidasSelected.findIndex((item:any)=> medida == item);
    if(INDEX != -1){
      this.medidasSelected.splice(INDEX,1);
    }else{
      this.medidasSelected.push(medida);
    }
    // console.log(this.selectedCategories);
    this.listProducts();
  }

  selectedRating(value:number){
    this.ratingSelected = value;
    this.listProducts();

  }

}
