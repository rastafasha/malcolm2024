import { Component, OnInit } from '@angular/core';
import { LugaresService } from 'src/app/services/lugares.service';
import { MapaService } from 'src/app/services/mapa.service';

@Component({
  selector: 'app-btn-localizacion',
  templateUrl: './btn-localizacion.component.html',
  styleUrls: ['./btn-localizacion.component.css']
})
export class BtnLocalizacionComponent implements OnInit {
  googlemap:any=[];
  googlemapM:any=[];
  constructor(
    private lugarService:LugaresService,
    private mapaService: MapaService
  ) { }

  ngOnInit(): void {
  }

  miLocalizacion(){
    if(!this.lugarService.localizacion) throw Error('No hay ubicacion del mapa');
    if(!this.mapaService.mapaListo) throw Error('No hay mapa disponible');

    this.mapaService.flyTo(this.lugarService.localizacion!);
    console.log(this.lugarService.localizacion);

    this.googlemap.push(this.lugarService.localizacion);
    // this.lugarService.localizacion = null;
    console.log(this.googlemapM);

  }
}
