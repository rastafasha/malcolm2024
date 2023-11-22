import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Portafolio } from 'src/app/models/portafolio';
import { CategoriaService } from 'src/app/services/categoria.service';
import { PortafolioService } from 'src/app/services/portafolio.service';
import { environment } from 'src/environments/environment';
//activacion y uso de jquery, con la adaptacion del archivo main.js
declare var $:any;
declare function HOMEINIT([]):any;
//activacion y uso de jquery


@Component({
  selector: 'app-foliomovil',
  templateUrl: './foliomovil.component.html',
  styleUrls: ['./foliomovil.component.css']
})
export class FoliomovilComponent implements OnInit {

  categorias: any =[];
  categoria: any;
  category_id: any;
  portafolios: any=[];
  slug: any=null;
  youtubeurl: any=null;
  error: string;
  imagenSerUrl = environment.apiUrlMedia;
  selectedOption:number = 1;

  constructor(
    private portafolioService: PortafolioService,
    private categoryService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sanitizer:DomSanitizer
  ) { 
     //activacion y uso de jquery
     setTimeout(()=>{
      HOMEINIT($);
    },50);
    //activacion y uso de jquery
  }

  
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.closeMenu();
    // this.activatedRoute.params.subscribe( ({id}) => this.getCategory(id));
    this.getCategories();
    this.getCategoriaActivas();
  }

  getCategory(id:any): void {
    this.categoryService.getCategory(id).subscribe(
      (res:any) =>{
        this.categoria = res;
        // error => this.error = error
        // console.log(this.categoria);
        this.activatedRoute.params.subscribe( ({id}) => this.getPosts(id));
      }
    );
  }
  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (res:any) =>{
        this.categorias = res;
        // error => this.error = error
        // console.log(this.categoria);
        // this.activatedRoute.params.subscribe( ({id}) => this.getPosts(id));
      }
    );
  }

  getCategoriaActivas(): void {
    this.categoryService.getCategoriesActivas().subscribe(
      res =>{
        this.categorias = res;
        error => this.error = error
        // console.log(this.categorias);
      }
    );
  }

  getPosts(id:any): void {
    this.portafolioService.getPostByCategory(id).subscribe(
      (resp:any) =>{
        this.portafolios = resp;
        error => this.error = error
        // console.log(this.portafolios);
      }
    );
  }

  selectedPost(slug: Portafolio){
    this.router.navigate(['/portafolio/', slug])
  }

  closeMenu(){

    var menuLateral = document.getElementsByClassName("popup-mobile-menu");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  openModal(){
    var myModal = document.getElementById('myModal')
    var myInput = document.getElementById('myInput')

    myModal.addEventListener('shown.bs.modal', function () {
      myInput.focus()
    })
      console.log('pulsado');
  }

  

  getVideoIframe(url) {
    let youtubeurl: any[];
    let results: any[];

    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    youtubeurl   = (results === null) ? url : results[1];

    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + youtubeurl);
}
}
