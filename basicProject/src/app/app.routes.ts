import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { MainPageComponent } from './core/features/main-page/main-page.component';

export const routes: Routes = [
{
    path: '',
    component: MainPageComponent
}
];

@NgModule({
imports: [],
exports: []
})
export class AppRoutingModule { }