import { Component, OnInit} from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { Employee } from '@app/_models';
import { EmployeeService, AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-home-employee',
  templateUrl: './home-employee.component.html',
  styleUrls: ['./home-employee.component.css']
})
export class HomeEmployeeComponent implements OnInit {
  currentUser: Employee;
  employees: Employee[] = [];
  id;
  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.employeeService.getById(this.id).subscribe(employee => { 
        this.currentUser = employee;
        console.log(this.currentUser);
      });
  });
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

