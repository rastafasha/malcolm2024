import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';
import { TiendaAuthService } from '../service/tienda-auth.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { LugaresService } from 'src/app/services/lugares.service';
import { Direccion } from 'src/app/models/direccion.model';
import Swal from 'sweetalert2';
import { MapaService } from 'src/app/services/mapa.service';
import { ActivatedRoute } from '@angular/router';

declare function alertSuccess([]):any;
declare function alertDanger([]):any;

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.css']
})
export class ProfileClientComponent implements OnInit {

  new_option:number =1;
  enrolledCourseCount:number = 0;
  activeCourseCount:number = 0;
  completedCourseCount:number = 0;
  user: any = null;
  usuario: any = null;
  
  enrolledCourses:any=[];
  activeCourses:any=[];
  completedCourses:any=[];
  saleDetails:any=[];
  saleDetailSelected:any = null;
  message:any;
  rating:number = 0;
  sales:any;
  saleSelected:any;
 
  name:any = null;
  surname:any = null;
  email:any = null;
  phone:any = null;
  profesion:any = null;
  description:any = null;
  password:any = null;
  new_password:any = null;
  file_imagen:any = null;
  
  title:any =null;
  direccion:any =null;
  referencia:any =null;
  pais:any =null;
  ciudad:any =null;
  zip:any =null;
  googlemaps:any =[];
  direccionSelected:any;
  direccions:any;
  text_regueriments:any = null;

  constructor(
    public authService: AuthService,
    public tiendaAuthService: TiendaAuthService,
    public direccionService: DireccionService,
    public activatedRoute: ActivatedRoute,
    private lugarService: LugaresService,
    private mapaService: MapaService,

  ) { }

  get localizacionListo(){
    // console.log(this.lugarService.localizacion);
    return this.lugarService.localizacionListo;
    
  }
  ngOnInit(): void {
    window.scrollTo(0,0);
    this.tiendaAuthService.profileClient().subscribe((resp:any)=>{
      console.log(resp);
      this.enrolledCourseCount = resp.enrolledCourseCount;
      this.activeCourseCount = resp.activeCourseCount;
      this.completedCourseCount = resp.completedCourseCount;
      this.user = resp.user;
      this.name = this.user.name;
      this.surname = this.user.surname;
      this.email = this.user.email;
      this.phone = this.user.phone;
      this.profesion = this.user.profesion;
      this.description = this.user.description;
      this.enrolledCourses = resp.enrolledCourses;
      this.activeCourses = resp.activeCourses;
      this.completedCourses = resp.completedCourses;
      this.saleDetails = resp.saleDetails;
      this.sales = resp.sales.data;
    })
    this.getCliente();
    this.getAddresses();
  }

  getCliente(){
    this.usuario = JSON.parse(localStorage.getItem('user'));
  }
  getAddresses(){
    this.direccionService.listarDirecciones().subscribe((resp:any)=>{
      this.direccions = resp.direccions.data;
      console.log(this.direccions);
      // this.nombres_completos  = resp.direccions.data.user.name+resp.direccions.data.user.surname;
      this.title  = resp.direccions.data.title;
      this.name  = resp.direccions.data.user.name;
      this.direccion = resp.direccions.data.direccion;
      this.referencia = resp.direccions.data.referencia;
      this.pais = resp.direccions.data.pais;
      this.ciudad = resp.direccions.data.ciudad;
      this.zip = resp.direccions.data.zip;
      this.googlemaps = resp.direccions.data.googlemaps;

    })
  }

  newOption(val:number){
    this.new_option = val;
  }

  logout(){
    this.authService.logout();
  }

  openReview(saleDetail:any){
    this.saleDetailSelected = saleDetail;
    if(this.saleDetailSelected.review){
      this.rating = this.saleDetailSelected.review.rating;
      this.message = this.saleDetailSelected.review.message;
    }
  }

  selectedRating(rating:number){
    this.rating = rating;

  }

  saveReview(){
    if(!this.message || !this.rating){
      alertDanger("La Calificación y la Reseña son obligatorios")
      return;
    }
    let data ={
      course_id : this.saleDetailSelected.course.id,
      sale_detail_id: this.saleDetailSelected.id,
      message: this.message,
      rating: this.rating
    }
    if(this.saleDetailSelected.review){
      this.tiendaAuthService.updateReview(data, this.saleDetailSelected.review.id).subscribe((resp:any)=>{
        console.log(resp);
        alertSuccess("la Reseña se ha editado satisfactoriamente.");
        let INDEX = this.saleDetails.findIndex((item:any)=>item.id == this.saleDetailSelected.id);
        if(INDEX != -1){
          this.saleDetails[INDEX].review = resp.review;
        }
      })
    }else{

      this.tiendaAuthService.registerReview(data).subscribe((resp:any)=>{
        console.log(resp);
        alertSuccess("la Reseña se ha creado satisfactoriamente.");
        let INDEX = this.saleDetails.findIndex((item:any)=>item.id == this.saleDetailSelected.id);
        if(INDEX != -1){
          this.saleDetails[INDEX].review = resp.review;
        }
      })
    }
  }

  back(){
    this.saleDetailSelected = null;
    this.rating = 0;
    this.message = null;
  }

  selectedSale(sale:any){
    this.saleSelected = sale
  }
  selectedDireccion(direccion:any){
    this.direccionSelected = direccion
  }

  getNameCampaing(type:number){
    let Name = "";
    switch (type){
      case 1:
        Name = "Campaña Normal"
        break;
      case 2:
          Name = "Campaña Flash"
          break;
      case 3:
          Name = "Campaña Banner"
          break;

      default:
          break;
    }
    return Name;
  }

  updateUser(){
    if(this.password || this.new_password){
      if(this.password != this.new_password){
        alertDanger("Las Contraseñas deben ser Iguales");
      }
    }
    let formData = new FormData();
    if(this.file_imagen){
      formData.append('imagen', this.file_imagen)
    }
    formData.append('name', this.name);
    formData.append('surname', this.surname);
    formData.append('email', this.email);
    formData.append('phone', this.phone);
    formData.append('profesion', this.profesion);
    formData.append('description', this.description);

    if(this.new_password){
      formData.append('new_password', this.new_password)
    }
    this.tiendaAuthService.updateUser(formData).subscribe((resp:any)=>{
      console.log(resp);
      alertSuccess("Se Registró correctamente");
      this.ngOnInit();
    })
  }

  processFile($event:any){
    this.file_imagen = $event.target.files[0];
  }

  miLocalizacion(){
    if(!this.lugarService.localizacion) throw Error('No hay ubicacion del mapa');
    if(!this.mapaService.mapaListo) throw Error('No hay mapa disponible');

    this.mapaService.flyTo(this.lugarService.localizacion!);
    this.addRequirements();
  }

  addRequirements(){
    let text_regueriments = this.lugarService.localizacion;
    
    this.googlemaps.push(text_regueriments);
    // this.text_regueriments = null;
    console.log(this.googlemaps);
  }

  saveDireccion(){
   
    

    let formData = new FormData();
    formData.append('title', this.title);
    formData.append('direccion', this.direccion);
    formData.append('referencia', this.referencia);
    formData.append('pais', this.pais);
    formData.append('ciudad', this.ciudad);
    formData.append('googlemaps', this.googlemaps);
    formData.append('zip', this.zip);
    formData.append('name', this.usuario.name);
    formData.append('user_id', this.usuario.id);
    

    this.direccionService.registro(formData).subscribe((resp:any)=>{
      console.log(resp);
      alertSuccess("la Dirección se ha creado satisfactoriamente.");
      this.getAddresses();
      this.title = null;
          this.direccion = null;
          this.referencia = null;
          this.pais = null;
          this.ciudad = null;
          this.zip = null;
          this.googlemaps =  [];
    })
  }

  deleteDireccion(direccion:Direccion){
    

    Swal.fire({
      title: 'Estas Seguro?',
      text: "No podras recuperarlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.direccionService.eliminar(direccion).subscribe(
          response =>{
            this.getAddresses();
          }
          );
        Swal.fire(
          'Borrado!',
          'El Archivo fue borrado.',
          'success'
        )
        this.ngOnInit();
      }
    });
  }

  

  

}
