import { Component } from '@angular/core';
import { Employee, EmployeesService } from './service/data-grid-service.service';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrl: './datagrid.component.css'
})
export class DatagridComponent {
  
  employees: Employee[] = [];
 
  constructor(service: EmployeesService) {
      this.employees = service.getEmployees();
  }
}
