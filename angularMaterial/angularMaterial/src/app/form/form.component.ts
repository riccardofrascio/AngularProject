import { Component } from '@angular/core';

import {
  DxSelectBoxModule,
  DxTextAreaModule,
  DxDateBoxModule,
  DxFormModule,
} from 'devextreme-angular';
import { Employee, FormService } from './service/form-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  standalone: true,
  providers: [FormService],
  imports: [CommonModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxFormModule],
})

export class FormComponent {
  
  employee: Employee;

  positions: string[];

  states: string[];

  constructor(service: FormService) {
    this.employee = service.getEmployee();
    this.positions = service.getPositions();
    this.states = service.getStates();
  }
}
