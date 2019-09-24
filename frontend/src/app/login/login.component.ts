import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService, UserService, EmployeeService } from '@app/_services';
import { User, Employee } from '@app/_models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',

})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService: UserService,
        private employeeService: EmployeeService,
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/employee-home']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

        this.employeeService.getAll();

        var storedNames = JSON.parse(localStorage.getItem('users'));
        for (let index = 0; index < storedNames.length; index++) {
            const element = storedNames[index];
            console.log(element.userName);
            console.log(element.password);
            console.log(this.f.username.value);
            console.log(this.f.password.value);
            if (element.userName === this.f.username.value) {
                if (element.password === this.f.password.value) {
                    console.log("IM IN");
                    localStorage.setItem('currentUser', JSON.stringify(element));
                    this.router.navigateByUrl('/employee-home');
                    this.loading = false;
                }
            }
            console.log("IM out");
        }
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
