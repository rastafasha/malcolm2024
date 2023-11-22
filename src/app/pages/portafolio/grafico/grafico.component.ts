import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Portafolio } from 'src/app/models/portafolio';
import { PortafolioService } from 'src/app/services/portafolio.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {

  portafolios:any = Portafolio;
  error: any;
  editorContent: any;
  p: Number = 1;
  count: Number = 8;
  imagenSerUrl = environment.apiUrlMedia;

  constructor(private portafolioService:PortafolioService ,
    private router: Router,) {}

  ngOnInit() {
    this.portafolioService.getRecentPosts().subscribe(
      res =>{
        this.portafolios = res;
        error => this.error = error
        // console.log(this.portafolios);
      }
    );
    window.scrollTo(0,0);
  }


  selectedPost(slug: Portafolio){
    this.router.navigate(['/post/', slug])
  }
}
