import { Injectable } from '@angular/core';
import {Map, lngLatLike} from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapaService {

  private mapa?:Map;

  get mapaListo():boolean{
    return !!this.mapa;
  };

  setMap(mapa:Map){
    this.mapa = mapa;
  }

  flyTo(coords:lngLatLike){
   if(!this.mapaListo) throw Error('el mapa no esta inicializado');
   this.mapa.flyTo({
    zoom:14,
    center: coords
   }) ;
  }

}
