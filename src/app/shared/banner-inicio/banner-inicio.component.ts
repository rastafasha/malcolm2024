import { Component, OnInit } from '@angular/core';
//activacion y uso de jquery, con la adaptacion del archivo main.js
declare var $:any;
declare function HOMEINIT([]):any;
//activacion y uso de jquery
@Component({
  selector: 'app-banner-inicio',
  templateUrl: './banner-inicio.component.html',
  styleUrls: ['./banner-inicio.component.css']
})
export class BannerInicioComponent implements OnInit {

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
