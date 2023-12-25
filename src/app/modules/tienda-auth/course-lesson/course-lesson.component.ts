import { Component, OnInit } from '@angular/core';
import { TiendaAuthService } from '../service/tienda-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

declare function alertDanger([]):any;

@Component({
  selector: 'app-course-lesson',
  templateUrl: './course-lesson.component.html',
  styleUrls: ['./course-lesson.component.css']
})
export class CourseLessonComponent implements OnInit {

  slug:any = null;
  coursesSelected:any = null;
  classeSelected:any = null;
  videoSelected:any = null;
  option_selected:number = 1;

  constructor(
    public tiendaAuthService: TiendaAuthService,
    public activatedRoute:ActivatedRoute,
    public router:Router,
    public sanitizer:DomSanitizer
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe((resp:any)=>{
      console.log(resp);
      this.slug = resp.slug;
    })
    this.tiendaAuthService.showCourse(this.slug).subscribe((resp:any)=>{
      console.log(resp);
      if(resp.message == 403){
        alertDanger(resp.message_text);
        this.router.navigateByUrl("/");
      }
      this.coursesSelected = resp.course;
      this.videoSelected = this.coursesSelected.malla[0].clases[0].vimeo;
      this.classeSelected = this.coursesSelected.malla[0].clases[0];

    })
  }

  urlVideo(classeSelected:any){
    console.log(this.classeSelected.vimeo);
    return this.sanitizer.bypassSecurityTrustResourceUrl(classeSelected.vimeo)
  }

  openClase(clase:any){
    this.classeSelected = clase;
  }

  optionSelected(value:number){
    this.option_selected = value;
    console.log(value);
  }

}
