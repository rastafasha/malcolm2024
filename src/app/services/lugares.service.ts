import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LugaresService {

  localizacion!:[number, number];

  get localizacionListo():boolean{
    return !!this.localizacion //true
  }

  constructor() {
    this.getLocalizacion();
   }

  public async getLocalizacion():Promise<[number, number]>{
    return new Promise((resolve, reject)=>{
      navigator.geolocation.getCurrentPosition(
        ({coords})=>{
          this.localizacion = [coords.longitude, coords.latitude];
          resolve(this.localizacion);
        }, (err)=>{
          alert('No se pudo obtener la geolocalización');
          reject();
        }
      )
    })
  }
}
