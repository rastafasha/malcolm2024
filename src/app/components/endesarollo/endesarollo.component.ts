import { Component, OnInit } from '@angular/core';
import { EndesarolloService } from 'src/app/services/endesarollo.service';
//activacion y uso de jquery, con la adaptacion del archivo main.js
declare var $:any;
declare function HOMEINIT([]):any;
//activacion y uso de jquery
@Component({
  selector: 'app-endesarollo',
  templateUrl: './endesarollo.component.html',
  styleUrls: ['./endesarollo.component.css']
})
export class EndesarolloComponent implements OnInit {

  endesarollos: any=[];

  constructor(
    public endesarolloService: EndesarolloService
  ) {
    //activacion y uso de jquery
    setTimeout(()=>{
      HOMEINIT($);
    },50);
    //activacion y uso de jquery
   }

  ngOnInit(): void {
    this.getportafolio();
  }

  getportafolio(){
    this.endesarolloService.getPosts().subscribe(
      (data: any) => {
        this.endesarollos = data;
      }
    );
  }

}
