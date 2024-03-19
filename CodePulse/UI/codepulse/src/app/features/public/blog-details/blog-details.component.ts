import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { BlogPostService } from '../../blog-post/services/blogPost.service';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, MarkdownModule],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit{

  url: string | null = null;
  blogPost$?: Observable<BlogPost>

  constructor(private route: ActivatedRoute, private blogPostService: BlogPostService) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (param) => {
        this.url = param.get('url');
      }
    })
    if (this.url) {
      this.blogPost$ = this.blogPostService.getPostByUrl(this.url);      
    }
  }

}
