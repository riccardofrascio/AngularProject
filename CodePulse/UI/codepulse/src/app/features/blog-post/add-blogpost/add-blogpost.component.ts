import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blogPost.service';
import { Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../caregory/services/category.service';
import { Category } from '../../caregory/models/category.model';

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [FormsModule, MarkdownModule, CommonModule],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})

export class AddBlogpostComponent implements OnDestroy, OnInit {

  model: AddBlogPost;
  private addBlogPostSubscription? : Subscription;
  categories$? : Observable<Category[]>;


  constructor(private blogPostService: BlogPostService, private categoryService: CategoryService, private router : Router) {
    this.model = {
      title : '',
      shortDescription : '',
      urlHandle : '',
      content : '',
      featuredImageUrl : '',
      author : '',
      isVisible : true,
      publishedDate : new Date(),
      categories: []
  };
  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }

  ngOnDestroy(): void {
    this.addBlogPostSubscription?.unsubscribe();
  }


  onFormSubmit() {
    this.addBlogPostSubscription = this.blogPostService.addCategory(this.model)
      .subscribe({
        next: (successResponse) => {
            this.router.navigateByUrl('admin/blogposts');
        },
        error: (errorResponse) => {
          console.log("error");
        } 
      });
  }

}
