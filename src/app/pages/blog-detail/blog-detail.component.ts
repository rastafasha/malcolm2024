import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  blog: Blog;
  error:string;
  slug:any;
  id: number;

  imagenSerUrl = environment.apiUrlMedia;
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: BlogService,
  ) { }

  ngOnInit() {

    window.scrollTo(0, 0);
    const slug = this.activatedRoute.snapshot.paramMap.get('slug');

    this.slug = slug;
    this.postService.getPostBySlug(this.slug).subscribe(
      res => {
        this.blog = res[0];
        console.log(this.blog);
      }
    );

  }


}
