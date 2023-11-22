import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/modules/home/services/home.service';
import { CartService } from 'src/app/modules/tienda-guest/service/cart.service';
import { SubcripcionService } from 'src/app/services/subcripcion.service';
import Swal from 'sweetalert2';
//activacion y uso de jquery, con la adaptacion del archivo main.js
declare var $:any;
declare function HOMEINIT([]):any;
//activacion y uso de jquery
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

 
  CATEGORIES:any = [];
  COURSES_HOME:any = [];

  group_courses_categories:any = [];
  discount_flash:any = [];
  discount_flash_courses:any = [];

  discount_banner:any;
  user:any = null;
  landing_course:any= null;

  // email = new FormControl();
  email: any = null;
  submitted = false;
  error = null;
  errors:any = null;
  year: number = new Date().getFullYear();

   // Registro
   public formSumitted = false;
   public registerForm = this.fb.group({
     id: [''],
     email: [ '', [Validators.required] ]

   });
   // Registro

  constructor(
    public homeService: HomeService,
    public cartService: CartService,
    public router: Router,
    private fb: FormBuilder,
    private subcripcionService: SubcripcionService,
  ){
    //activacion y uso de jquery
    setTimeout(()=>{
      HOMEINIT($);
    },50);
    //activacion y uso de jquery
  }
  username: FormControl<any>;
  ngOnInit(): void {
    window.scrollTo(0,0);
    this.homeService.home().subscribe((resp:any)=>{
      // console.log(resp);
      this.CATEGORIES = resp.categories;
      this.COURSES_HOME = resp.courses_home.data;
      this.group_courses_categories = resp.group_courses_categories;
    })

    this.user = this.cartService.autService.user;
  }



  crearUsuario(){

    let data = {
      email:this.email,
    }
    // console.log(this.registerForm.value);

    this.subcripcionService.crearUsuario(data).subscribe(
      (resp:any) =>{
        Swal.fire('Registrado!', `Gracias por Seguirnos!`, 'success');
      },(error) => {
        Swal.fire('Error', error.error.msg, 'error');
        this.errors = error.error;
      }
    );
    return false;
  }


}
