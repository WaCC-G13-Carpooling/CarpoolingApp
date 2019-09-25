import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AlertService, EmployeeService, CompanyService } from '@app/_services';
import { Employee, Company } from '@app/_models';
import { first } from 'rxjs/operators';


@Component({ templateUrl: 'employee-register.component.html' })
export class EmployeeRegisterComponent implements OnInit {
  public userForm: FormGroup;
  public newEmployee: Employee;
  public employees: Employee[];
  public currentEmployee: Employee;
  public actualCompany: Company;

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private companyService: CompanyService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {

    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      hasCar: new FormControl('', [Validators.required]),
      companyName: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {

    this.newEmployee = {
      userName: this.userForm.get('userName').value,
      password: this.userForm.get('password').value,
      firstName: this.userForm.get('firstName').value,
      lastName: this.userForm.get('lastName').value,
      hasCar: this.userForm.get('hasCar').value,
      companyName: this.userForm.get('companyName').value,
      phoneNumber: this.userForm.get('phoneNumber').value,
      homeAddress: null,
      workAddress: null,
      isAdmin: false,
      vehicleCapacity: 0
    };

    this.employeeService.register(this.newEmployee).pipe(first()).subscribe(
      data => {
        this.alertService.success('Registration successful', true);
        this.router.navigateByUrl('/login');
      },
      error => {
        this.alertService.error(error);
      });




    this.companyService.getAll().pipe(first()).subscribe(companies => {
      companies.forEach(company => {
        if (company.name === this.newEmployee.companyName) {
          this.actualCompany = company;
          this.actualCompany.employeeList = [];
          this.actualCompany.employeeList.push(this.newEmployee.userName);
        }
      });
      this.companyService.update((Object.values(this.actualCompany)[2]), this.actualCompany).subscribe();
    });
  }

}
