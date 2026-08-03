import { Component, OnInit } from '@angular/core';
import { inject } from '@vercel/analytics';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'malcolm2024';
  
  ngOnInit() {
    // Se ejecuta una sola vez al cargar la aplicación
    inject();
  }

  // get localizacionListo(){
  //   // console.log(this.lugarService.localizacion);
  //   return this.lugarService.localizacionListo;
  // }

  
}
