import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  categorias: any =null;
  error: any =null;
  constructor(
    private categoryService: CategoriaService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
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

}
