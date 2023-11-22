import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Portafolio } from 'src/app/models/portafolio';
import { PortafolioService } from 'src/app/services/portafolio.service';
declare var $:any;
declare function magnigyPopup():any;
declare function HOMEINIT([]):any;
@Component({
  selector: 'app-modalgrafico',
  templateUrl: './modalgrafico.component.html',
  styleUrls: ['./modalgrafico.component.css']
})
export class ModalgraficoComponent implements OnInit {

  portafolios:any;
  error: any;
  editorContent: any;

  constructor(
    private portafolioService: PortafolioService, 
    private router: ActivatedRoute) {
    //activacion y uso de jquery
    setTimeout(()=>{
      HOMEINIT($);
    },50);
    //activacion y uso de jquery
   }

  ngOnInit() {
    // this.getportafolio();
  }
  
  getportafolio(){
    this.portafolioService.getPosts().subscribe(
      (data: any) => {
        this.portafolios = data,
        error => this.error = error
      }
    );
  }
}
