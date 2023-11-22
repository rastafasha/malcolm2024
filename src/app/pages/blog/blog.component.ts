import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/models/blog';
import { Portafolio } from 'src/app/models/portafolio';
import { BlogService } from 'src/app/services/blog.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { environment } from 'src/environments/environment';

//activacion y uso de jquery, con la adaptacion del archivo main.js
declare var $:any;
declare function HOMEINIT([]):any;
//activacion y uso de jquery

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  
  categorias: any =[];
  categoria: any;
  blogs: any;
  slug: any=null;
  error: string;
  imagenSerUrl = environment.apiUrlMedia;
  selectedOption:number = 1;

  constructor(
    private blogService: BlogService,
    private categoryService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
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
    this.getblogs();
  }


  getblogs(): void {
    this.blogService.getActivos().subscribe(
      (res:any) =>{
        this.blogs = res;
        error => this.error = error
        console.log(this.blogs);
      }
    );
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

}
