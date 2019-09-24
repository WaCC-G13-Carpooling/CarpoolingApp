﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmployeeService } from '@app/_services';
import { Employee } from '@app/_models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',

})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    employees: Employee[];
    currentUser: Employee;

    constructor(
        private formBuilder: FormBuilder,
        private employeeService: EmployeeService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });

    }


    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

        this.employeeService.getAll().subscribe((data: Employee[]) => {
            this.employees = [];
            this.employees = data;
            this.employees.forEach(element => {
                if (element.userName === this.loginForm.get('userName').value) {
                    if (element.password === this.loginForm.get('password').value) {
                        this.loading = false;
                        this.currentUser = element;
                        this.router.navigateByUrl('/employee-home/' + Object.values(element)[0]);
                    }
                }
            });
        });
/*
        var storedNames = JSON.parse(localStorage.getItem('users'));
        for (let index = 0; index < storedNames.length; index++) {
            const element = storedNames[index];
            if (element.userName === this.f.username.value) {
                if (element.password === this.f.password.value) {
                    console.log("IM IN");
                    localStorage.setItem('currentUser', JSON.stringify(element));
                    this.router.navigateByUrl('/employee-home');
                    this.loading = false;
                }
            }
            console.log("IM out");
        }*/
        /*this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });*/
    }
}
