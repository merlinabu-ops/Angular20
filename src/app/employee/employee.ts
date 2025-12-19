import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Employee {
  id: number;
  name: string;
  role: string;
  email: string;
}

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.html',
  styleUrls: ['./employee.css']
})
export class EmployeeComponent {
  employees: Employee[] = [
    { id: 1, name: 'Alice Johnson', role: 'Developer', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', role: 'Designer', email: 'bob@example.com' },
    { id: 3, name: 'Carol Lee', role: 'Product Manager', email: 'carol@example.com' }
  ];

  selected?: Employee;

  // Form-backed new employee
  newEmployee: Partial<Employee> = {};

  select(e: Employee) {
    this.selected = e;
  }

  addEmployee() {
    if (!this.newEmployee.name || !this.newEmployee.email) {
      return;
    }
    const maxId = this.employees.reduce((m, x) => Math.max(m, x.id), 0);
    const emp: Employee = {
      id: maxId + 1,
      name: String(this.newEmployee.name),
      role: String(this.newEmployee.role ?? 'Employee'),
      email: String(this.newEmployee.email)
    };
    this.employees = [...this.employees, emp];
    this.selected = emp;
    this.clearForm();
  }

  clearForm() {
    this.newEmployee = {};
  }
}
