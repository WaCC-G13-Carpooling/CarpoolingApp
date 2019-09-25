import { Component, OnInit} from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { Employee } from '@app/_models';
import { EmployeeService, AuthenticationService } from '@app/_services';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-employee',
  templateUrl: './home-employee.component.html',
  styleUrls: ['./home-employee.component.css']
})
export class HomeEmployeeComponent implements OnInit {
  currentUser: Employee;
  employees: Employee[] = [];
  id;
  vehicleCapacity: Number;
  public vehicleCapacityForm: FormGroup;
  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.employeeService.getById(this.id).subscribe(employee => {
        this.currentUser = employee;
      });
  });

  this.vehicleCapacityForm = new FormGroup({
    vehicleCapacity: new FormControl(''),
  });

}

onSubmit() {
  this.vehicleCapacity = this.vehicleCapacityForm.get('vehicleCapacity').value;
  console.log(this.vehicleCapacity);
}

deleteUser(id: number) {
    this.employeeService.delete(id).pipe(first()).subscribe(() => {
        this.loadAllUsers();
    });
}

private loadAllUsers() {
    this.employeeService.getAll().pipe(first()).subscribe(employees => {
        this.employees = employees;
    });
}

}

