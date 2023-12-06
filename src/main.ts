import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = 'pk.eyJ1IjoicmFzdGFmYXNoYSIsImEiOiJjbHBhZW1id3owNWdoMmpvd2ttY3Y2a2ZqIn0.o-lnvPTjuXmNhKMbIQfTFg';


if (environment.production) {
  enableProdMode();
}


if(!navigator.geolocation){
  alert('El navegador no soporta la geolocalizacion');
  throw new Error('El navegador no soporta la geolocalizacion')
}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
