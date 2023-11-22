import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { RegisterForm } from '../interfaces/register-form.interface';

@Injectable({
  providedIn: 'root'
})
export class SubcripcionService {

  serverUrl = environment.URL_SERVICIOS;
  public user;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.user;
  }


  crearUsuario(data){
    return this.http.post(`${this.serverUrl}/subcripcion/store`, data);

  }

}
