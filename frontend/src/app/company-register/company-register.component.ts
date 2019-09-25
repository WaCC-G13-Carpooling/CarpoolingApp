import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Company, Employee } from '@app/_models';
import { AlertService, CompanyService } from '@app/_services';

@Component({ templateUrl: 'company-register.component.html' })
export class CompanyRegisterComponent implements OnInit {
    companyForm: FormGroup;
    newCompany: Company;
    emptyEmployeeArray: Employee[] = [];

    constructor(
        private router: Router,
        private companyService: CompanyService,
        private alertService: AlertService
    ) {
    }

    ngOnInit() {
        this.companyForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            userName: new FormControl('', Validators.required),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        });
    }

    onSubmit() {
        this.newCompany = {
            name: this.companyForm.get('name').value,
            userName: this.companyForm.get('userName').value,
            password: this.companyForm.get('password').value,
            baseLocation: null,
            locations: null,
            employeeList: null,
        };

        this.companyService.register(this.newCompany)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                });
    }
}
