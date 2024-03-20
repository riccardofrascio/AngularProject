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
import { HomeComponent } from './features/public/home/home.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './features/auth/guards/auth.guard';
import { DxDataGridModule } from 'devextreme-angular';

export const routes: Routes = [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'blog/:url',
      component: BlogDetailsComponent
    },
    {
        path: 'admin/categories',
        component: CategoryListComponent,
        canActivate: [authGuard]
    },
    {
      path: 'admin/categories/add',
      component: AddCategoryComponent,
      canActivate: [authGuard]
    }, 
    {
      path: 'admin/categories/:id',
      component: EditCategoryComponent,
      canActivate: [authGuard]
    },
    {
      path: 'admin/blogposts',
      component: BlogpostListComponent,
      canActivate: [authGuard]
    },
    {
      path: 'admin/blogposts/add',
      component: AddBlogpostComponent,
      canActivate: [authGuard]
    }, 
    {
      path: 'admin/blogposts/:id',
      component: EditBlogpostComponent,
      canActivate: [authGuard]
    }
];

@NgModule({
  imports: [RouterModule, RouterModule.forRoot(routes), HttpClientModule, MarkdownModule, MarkdownModule.forRoot(), DxDataGridModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }