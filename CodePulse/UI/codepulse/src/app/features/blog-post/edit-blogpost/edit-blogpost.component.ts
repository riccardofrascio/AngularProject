import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPostService } from '../services/blogPost.service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogPost } from '../models/blog-post.model';
import { MarkdownComponent } from 'ngx-markdown';
import { CategoryService } from '../../caregory/services/category.service';
import { Category } from '../../caregory/models/category.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';

@Component({
  selector: 'app-edit-blogpost',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownComponent],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  
  routeSubscription?: Subscription;
  id:string | null = null;
  model?: BlogPost;
  allCategories?: Observable<Category[]>;
  selectedCategories?: string[];
  updateSubscription?: Subscription;
  deleteSubscription?: Subscription;
  

  constructor(private route: ActivatedRoute, private blogPostService : BlogPostService, private router:Router, private categoryService: CategoryService) {
      
  }

  onFormSubmit() {
    const updateBlogPostRequest: UpdateBlogPost = {
      title: this.model?.title ?? '',
      shortDescription: this.model?.shortDescription ?? '',
      content: this.model?.content ?? '',
      featuredImageUrl: this.model?.featuredImageUrl ?? '',
      urlHandle: this.model?.urlHandle ?? '',
      publishedDate: new Date(this.model?.publishedDate ?? ''),
      author: this.model?.author ?? '',
      isVisible: this.model?.isVisible ?? false,
      categories:  this.selectedCategories ?? [],
    };
    if(this.id) {
      console.log(updateBlogPostRequest);
      this.updateSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPostRequest).subscribe({
        next: (response) => {
          this.router.navigateByUrl('admin/blogposts');
        }
      });

    }
  }

  onDelete() {
    console.log(this.id);
    if(this.id) {
      this.deleteSubscription = this.blogPostService.deleteBlogPost(this.id).subscribe({
        next: (response) => {
          this.router.navigateByUrl('admin/blogposts');
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateSubscription?.unsubscribe();
    this.deleteSubscription?.unsubscribe();
  }
  
  ngOnInit(): void {
    this.allCategories = this.categoryService.getAllCategories();
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
      }
    })
    if(this.id) {
      this.blogPostService.getPostById(this.id).subscribe({
        next: (response) => {
          this.model = response;
          this.selectedCategories = response.categories.map(x => x.id);
        }
      })
    }
  }

}
