import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/caregory/category-list/category-list.component';
import { AddCategoryComponent } from './features/caregory/add-category/add-category.component';
import { HttpClientModule } from '@angular/common/http';
import { EditCategoryComponent } from './features/caregory/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { MarkdownModule } from 'ngx-markdown';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';

export const routes: Routes = [
    {
        path: 'admin/categories',
        component: CategoryListComponent
    },
    {
      path: 'admin/categories/add',
      component: AddCategoryComponent
    }, 
    {
      path: 'admin/categories/:id',
      component: EditCategoryComponent
    },
    {
      path: 'admin/blogposts',
      component: BlogpostListComponent
    },
    {
      path: 'admin/blogposts/add',
      component: AddBlogpostComponent
    }, 
    {
      path: 'admin/blogposts/:id',
      component: EditBlogpostComponent
    }
];

@NgModule({
  imports: [RouterModule, RouterModule.forRoot(routes), HttpClientModule, MarkdownModule, MarkdownModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule { }