import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';
import { TiendaAuthService } from '../service/tienda-auth.service';

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

  constructor(
    public authService: AuthService,
    public tiendaAuthService: TiendaAuthService,
  ) { }

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

    // let data ={
    //   name: this.name,
    //   surname: this.surname,
    //   email: this.email,
    //   phone: this.phone,
    //   profesion: this.profesion,
    //   description: this.description,
    //   new_password: this.new_password,
    // };
    
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
      alertSuccess("Se Actualizo correctamente");
      this.ngOnInit();
    })
  }

  processFile($event:any){
    this.file_imagen = $event.target.files[0];
  }

}
