﻿import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {

    constructor(
        private router: Router
    ) {}

    ngOnInit() {

    }

    ngOnDestroy() {

    }

  registerEmployee() {
      this.router.navigateByUrl('/employee-register');
  }

  registerCompany() {
    this.router.navigateByUrl('/company-register');
}

login() {
  this.router.navigateByUrl('/login');
}

}
