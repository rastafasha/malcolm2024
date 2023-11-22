import { Component, OnInit } from '@angular/core';
declare var $:any;
declare function HOMEINIT([]):any;
@Component({
  selector: 'app-soluciones-web',
  templateUrl: './soluciones-web.component.html',
  styleUrls: ['./soluciones-web.component.css']
})
export class SolucionesWebComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    //activacion y uso de jquery
    setTimeout(()=>{
      HOMEINIT($);
    },50);
    //activacion y uso de jquery
  }

}
