import { Component, OnInit } from '@angular/core';
declare var $:any;
declare function HOMEINIT([]):any;
@Component({
  selector: 'app-banner-soluciones',
  templateUrl: './banner-soluciones.component.html',
  styleUrls: ['./banner-soluciones.component.css']
})
export class BannerSolucionesComponent implements OnInit {

  constructor() {
    //activacion y uso de jquery
    setTimeout(()=>{
      HOMEINIT($);
    },50);
    //activacion y uso de jquery
   }

  ngOnInit(): void {
    
  }

}
