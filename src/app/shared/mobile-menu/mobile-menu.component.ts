import { style } from '@angular/animations';
import { CssSelector } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.css']
})
export class MobileMenuComponent implements OnInit {
  categorias: any = null;
  
  constructor(
    private categoryService: CategoriaService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
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
