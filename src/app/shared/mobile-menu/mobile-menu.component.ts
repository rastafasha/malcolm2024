import { style } from '@angular/animations';
import { CssSelector } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
    selector: 'app-mobile-menu',
    templateUrl: './mobile-menu.component.html',
    styleUrls: ['./mobile-menu.component.css'],
    standalone: false
})
export class MobileMenuComponent implements OnInit {
  categorias: any = null;
  public activeLang = 'es';
  public flag = false;
  langs: string[] = [];
  
  constructor(
    private categoryService: CategoriaService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {
    this.translate.setDefaultLang(this.activeLang);
    this.translate.use('es');
    this.translate.addLangs(["es", "en"]);
    this.langs = this.translate.getLangs();
    translate.get(this.langs).subscribe(res =>{
      console.log(res);
    })
   }

  ngOnInit(): void {
    this.getCategories();
  }

  public cambiarLenguaje(lang: string) {
    this.activeLang = lang;
    
    // 1. Ejecutamos el cambio de idioma tradicional
    this.translate.use(lang);
    this.flag = !this.flag;

    // 2. 🚀 LA MAGIA: Forzamos a Angular a re-evaluar los pipes en el HTML inmediatamente
    this.cdr.markForCheck(); 
  }

  closeMenu(){

    var menuLateral = document.getElementsByClassName("popup-mobile-menu");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }
  openSubMenu(){

    var menuLateralmovil = document.getElementsByClassName("abrir");
    var menuLateralmovil2 = document.getElementsByClassName("submenu");
      for (var i = 0; i<menuLateralmovil.length; i++) {
        menuLateralmovil[i].classList.toggle("open");

      }
      for (var i = 0; i<menuLateralmovil2.length; i++) {
        menuLateralmovil2[i].classList.toggle("active");

      }
  }

  getCategories(): void {
    this.categoryService.getCategoriesActivas().subscribe(
      res =>{
        this.categorias = res;
        // console.log(this.categorias);
      }
    );
  }

  

}
