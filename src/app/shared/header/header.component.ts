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

declare function cartSidenav():any;
declare function _clickDocTwo():any;
declare function alertSuccess([]):any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild("filter") filter?:ElementRef;

  listCarts: any = [];
  user:any = null;
  totalSum:any = 0;
  
  search:any = null;
  source:any;
  listCourses: any = [];
  categories:any = [];

  categorias: any= [];
  postrecientes: any= Portafolio;
  
  error: string;

  constructor(
    public authService: AuthService,
    public cartService: CartService,
    private portafolioService: PortafolioService,
    private categoryService: CategoriaService,
    public router:Router,
    public tiendaGuestService: TiendaGuestService,

  ) { }

  ngOnInit(): void {
    this.user = this.authService.user;

    this.cartService.currentData$.subscribe((resp:any)=>{
      // console.log(resp);
      this.listCarts = resp;
      this.totalSum = this.listCarts.reduce((sum:number, item:any)=> sum + item.total,0 );
    })

    if(this.user){
      this.cartService.listCart().subscribe((resp:any)=>{
        // console.log(resp);
        resp.carts.data.forEach((cart:any) => {
          this.cartService.addCart(cart);
        });
      })
    }

    setTimeout(()=>{
      cartSidenav();
      _clickDocTwo();
    }, 50 )

    this.listarOpciones();
    this.getCategories();
    this.closeMenu();
  }

  ngAfterViewInit(): void {
    this.source = fromEvent(this.filter?.nativeElement,"keyup");
    this.source.pipe(debounceTime(500)).subscribe((resp:any)=>{
      // console.log(this.search);
      //el filtro
      let data = {
        search: this.search
      }
      if(this.search.lenght > 0){
        this.tiendaGuestService.listCourses(data).subscribe((resp:any)=>{
          // console.log(resp);
          this.listCourses = resp.courses.data;
        })

      }
    })
    
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
      // console.log(resp);
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
    // return this.planesService.carga_info();
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
