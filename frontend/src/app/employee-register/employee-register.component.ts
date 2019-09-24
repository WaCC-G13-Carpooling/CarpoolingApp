import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { AlertService, EmployeeService} from '@app/_services';
import { Employee } from '@app/_models';
import { first } from 'rxjs/operators';


@Component({templateUrl: 'employee-register.component.html'})
export class EmployeeRegisterComponent implements OnInit{
  public userForm: FormGroup;
  public newEmployee: Employee;
  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private alertService: AlertService,
) {}

ngOnInit() {

  this.userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    hasCar: new FormControl('', [Validators.required]),
    companyName : new FormControl('', [Validators.required]),
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
  isAdmin: false
    };

    this.employeeService.register(this.newEmployee).pipe(first()).subscribe(
                data => {
                  console.log('in');
                    this.alertService.success('Registration successful', true);
                    this.router.navigateByUrl('/login');
                },
                error => {
                    this.alertService.error(error);
                });
  }

/*
  firstNameError() {
    return this.firstName.hasError('required') ? 'You must enter a value' :
        this.firstName.hasError('firstName') ? 'Not a valid first Name' :
            '';

  }
  lastNameError() {
    return this.lastName.hasError('required') ? 'You must enter a value' :
        this.lastName.hasError('lastName') ? 'Not a valid last Name' :
            '';

  }
  userNameError() {
    return this.userName.hasError('required') ? 'You must enter a value' :
        this.userName.hasError('userName') ? 'Not a valid user Name' :
            '';

  }

  passwordError() {
    return this.password.hasError('required') ? 'You must enter a value' :
        this.password.hasError('password') ? 'Not a valid password' :
            '';

  }

  phoneNumberError() {
    return this.phoneNumber.hasError('required') ? 'You must enter a value' :
        this.phoneNumber.hasError('phoneNumber') ? 'Not a valid phone number' :
            '';

  }
*/}
