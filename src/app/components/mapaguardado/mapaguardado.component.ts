import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LugaresService } from 'src/app/services/lugares.service';
import { MapaService } from 'src/app/services/mapa.service';
import {Map, Popup, Marker} from 'mapbox-gl';
import { DireccionService } from 'src/app/services/direccion.service';
import { Direccion } from 'src/app/models/direccion.model';

@Component({
  selector: 'app-mapaguardado',
  templateUrl: './mapaguardado.component.html',
  styleUrls: ['./mapaguardado.component.css']
})
export class MapaguardadoComponent implements OnInit {

  @ViewChild('mapDiv')mapDivElement!: ElementRef;
  @Input()direccionSelected:any;
  googlemap:any=[];
  direccion:Direccion;
  constructor(
    private lugarService: LugaresService,
    private mapService: MapaService,
    public direccionService: DireccionService,
  ) { }

  ngOnInit(): void {
    this.getDireccion();
  }

  getDireccion(){
    this.direccionService.get_direccion(this.direccion.id).subscribe((resp:any)=>{
      this.direccion = resp;
      console.log(resp);
    })
  }
  ngAfterViewInit(){
    // console.log(this.lugarService.localizacion);
    if(!this.direccion.googlemaps) throw Error('No hay localización');
    if(this.direccion.googlemaps){
      const map = new Map({
        container: this.mapDivElement.nativeElement, // container ID
        style: 'mapbox://styles/mapbox/dark-v10', // style URL
        center: this.direccion.googlemaps, // starting position [lng, lat]
        zoom: 14, // starting zoom
        });
  
        const popup = new Popup();
  
        new Marker({color: 'red'}).setLngLat(this.direccion.googlemaps).addTo(map);
  
        this.mapService.setMap(map);
  
    }

    
  }

}
