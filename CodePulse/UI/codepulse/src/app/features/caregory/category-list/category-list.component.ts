import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxButtonModule } from 'devextreme-angular';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterModule, CommonModule, DxDataGridModule, DxButtonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit{
  
  categories$?: Observable<Category[]>;
  
  constructor(private categoryService: CategoryService) {
    
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }

}
