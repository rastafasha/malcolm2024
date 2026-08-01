import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: false
})
export class FooterComponent implements OnInit {

  categorias: Categoria =null;
  error: any =null;
  isLoading = false;
  year: number = new Date().getFullYear();
  constructor(
    private categoryService: CategoriaService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategoriesActivas().subscribe(
      res =>{
        this.isLoading = true;
        this.categorias = res;
        this.isLoading = false;
        error => this.error = error
        // console.log(this.categorias);
      }
    );
  }

}
