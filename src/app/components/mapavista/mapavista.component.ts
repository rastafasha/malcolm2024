import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LugaresService } from 'src/app/services/lugares.service';

import {Map, Popup, Marker} from 'mapbox-gl';
import { MapaService } from 'src/app/services/mapa.service';

@Component({
  selector: 'app-mapavista',
  templateUrl: './mapavista.component.html',
  styleUrls: ['./mapavista.component.css']
})
export class MapavistaComponent implements AfterViewInit, OnInit{

  @ViewChild('mapDiv')mapDivElement!: ElementRef;

  constructor(
    private lugarService: LugaresService,
    private mapService: MapaService
  ) { }

  ngOnInit(): void {
    // console.log(this.lugarService.localizacion);
    
  }
  ngAfterViewInit(){
    // console.log(this.lugarService.localizacion);
    if(!this.lugarService.localizacion) throw Error('No hay localización');
    if(this.lugarService.localizacion){
      const map = new Map({
        container: this.mapDivElement.nativeElement, // container ID
        style: 'mapbox://styles/mapbox/dark-v10', // style URL
        center: this.lugarService.localizacion, // starting position [lng, lat]
        zoom: 14, // starting zoom
        });
  
        const popup = new Popup().setHTML(`
          <h6>Aquí estoy</h6>
          <span>Este es mi geolocalizacion</span>
        `);
  
        new Marker({color: 'red'}).setLngLat(this.lugarService.localizacion).setPopup(popup).addTo(map);
  
        this.mapService.setMap(map);
  
    }

    
  }


}
