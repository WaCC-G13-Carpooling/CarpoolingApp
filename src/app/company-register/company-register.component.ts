import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Company } from '@app/_models';

import { AlertService, CompanyService, AuthenticationService } from '@app/_services';

@Component({templateUrl: 'company-register.component.html'})
export class CompanyRegisterComponent implements OnInit {
    companyForm: FormGroup;
    loading = false;
    submitted = false;
  textBoxDisabled = true;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private companyService: CompanyService,
        private alertService: AlertService
    ) {
    }

    ngOnInit() {
        this.companyForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            userName: new FormControl('', Validators.required),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            location: new FormControl('', [Validators.required]),
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.companyForm.controls; }
    toggle() {
      this.textBoxDisabled = !this.textBoxDisabled;
    }
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.companyForm.invalid) {
            return;
        }

        this.loading = true;
        this.companyService.register(this.companyForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
