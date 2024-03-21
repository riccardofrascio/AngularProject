import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {DxDataGridModule} from 'devextreme-angular';
import { DatagridComponent } from './datagrid/datagrid.component';
import {MatTabsModule} from '@angular/material/tabs';
import { FormComponent } from './form/form.component';
const routes: Routes = [
  {
    path: 'datagrid',
    component: DatagridComponent
  },
  {
    path: 'form',
    component: FormComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DatagridComponent
  ],
  imports: [
    RouterModule, RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule,
    MatBadgeModule, 
    MatButtonModule, 
    MatInputModule,
    MatCardModule,
    MatTableModule,
    DxDataGridModule,
    MatTabsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
