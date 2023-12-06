import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, fromEvent } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { Portafolio } from 'src/app/models/portafolio';
import { AuthService } from 'src/app/modules/auth/service/auth.service';
import { CartService } from 'src/app/modules/tienda-guest/service/cart.service';
import { TiendaGuestService } from 'src/app/modules/tienda-guest/service/tienda-guest.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { PortafolioService } from 'src/app/services/portafolio.service';
import {TranslateService} from '@ngx-translate/core';

declare function cartSidenav():any;
declare function _clickDocTwo():any;
declare function alertSuccess([]):any;
@Component({
  selector: 'app-header-pages',
  templateUrl: './header-pages.component.html',
  styleUrls: ['./header-pages.component.css']
})
export class HeaderPagesComponent implements OnInit {

  

  listCarts: any = [];
  user:any = null;
  totalSum:any = 0;
  
  search:any = null;
  source:any;
  listCourses: any = [];
  categories:any = [];

  categorias: any= Categoria;
  postrecientes: any= Portafolio;
  
  langs: string[] = [];
  public activeLang = 'es';

  flag = false;

  error: string;

  constructor(
    public authService: AuthService,
    public cartService: CartService,
    private portafolioService: PortafolioService,
    private categoryService: CategoriaService,
    public router:Router,
    public tiendaGuestService: TiendaGuestService,
    private translate: TranslateService

  ) { 
    // this.translate.setDefaultLang('es');
    this.translate.setDefaultLang(this.activeLang);
    this.translate.use('es');
    this.translate.addLangs(["es", "en"]);
    this.langs = this.translate.getLangs();
    translate.get(this.langs).subscribe(res =>{
      console.log(res);
    })
    // console.log(this.translate);
  }

  // cambiarLang(lang:string){
  //   this.translate.use(lang);

  // }

  public cambiarLenguaje(lang) {
    this.activeLang = lang;
    this.translate.use(lang);
    this.flag = !this.flag;
  }

  ngOnInit(): void {
    this.user = this.authService.user;

    this.cartService.currentData$.subscribe((resp:any)=>{
      // console.log(resp);
      this.listCarts = resp;
      this.totalSum = this.listCarts.reduce((sum:number, item:any)=> sum + item.total,0 );
    })

    if(this.user){
      this.cartService.listCart().subscribe((resp:any)=>{
        console.log(resp);
        resp.carts.data.forEach((cart:any) => {
          this.cartService.addCart(cart);
        });
      })
    }

    setTimeout(()=>{
      cartSidenav();
      _clickDocTwo();
    }, 50 )

    // this.listarOpciones();
    this.getCategories();
    // this.closeMenu();
  }

 

  logout(){
    this.authService.logout();
  }

  

  removeItem(cart:any){
    this.cartService.deleteCart(cart.id).subscribe((resp:any)=>{
      // console.log(resp);
      alertSuccess('Articulo removido');
      this.cartService.removeItemCart(cart);
    })
  }

  buscarCourses(){
    // this.router.navigateByUrl("/tienda-guest/listado-de-cursos?search="+this.search);
    window.location.href = "/tienda-guest/listado-de-cursos?search="+this.search;

  }

  listarOpciones(){
    this.tiendaGuestService.listConfig().subscribe((resp:any)=>{
      console.log(resp);
      this.categories = resp.categories;
    })
  }
  getPosts(): void {
    // return this.planesService.carga_info();
    this.portafolioService.getRecentPosts().subscribe(
      res =>{
        this.postrecientes = res;
        error => this.error = error
        // console.log(this.recentposts);
      }
    );
  }

  getCategories(): void {
    this.categoryService.getCategoriesActivas().subscribe(
      res =>{
        this.categorias = res;
        error => this.error = error
        // console.log(this.categorias);
      }
    );
  }

  openMenu(){

    var menuLateral = document.getElementsByClassName("popup-mobile-menu");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.toggle("active");

      }
  }

  closeMenu(){

    var menuLateral = document.getElementsByClassName("popup-mobile-menu");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  
}
