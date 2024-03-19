import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AddBlogPost } from "../models/add-blog-post.model";
import { Observable } from "rxjs";
import { environment } from '../../../../environments/environment.development';
import { BlogPost } from "../models/blog-post.model";
import { UpdateBlogPost } from "../models/update-blog-post.model";

@Injectable({
    providedIn: 'root'
  })

  export class BlogPostService {

    constructor(private http: HttpClient) { }

    addCategory(model: AddBlogPost): Observable<void> {
      return this.http.post<void>(`${environment.apiBaseUrl}/api/blogpost`, model);
    }

    getAllBlogPosts(): Observable<BlogPost[]> {
      return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/blogpost`);
    }

    getPostById(id:string): Observable<BlogPost> {
      return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogpost/${id}`);
    }

    getPostByUrl(url:string): Observable<BlogPost> {
      return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogpost/${url}`);
    }

    updateBlogPost(id:string, updateBlogPostRequest:UpdateBlogPost): Observable<BlogPost> {
      return this.http.put<BlogPost>(`${environment.apiBaseUrl}/api/blogpost/${id}`, updateBlogPostRequest);
    }

    deleteBlogPost(id: string): Observable<BlogPost> {
      return this.http.delete<BlogPost>(`${environment.apiBaseUrl}/api/blogpost/${id}`);
    }

  }