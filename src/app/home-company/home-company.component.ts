import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { first } from 'rxjs/operators';
import { Company } from '@app/_models/company';


@Component({
  selector: 'app-home-company',
  templateUrl: './home-company.component.html',
  styleUrls: ['./home-company.component.css']
})
export class HomeCompanyComponent implements OnInit {
  currentCompany: Company;
  currentUser: User;
  users: User[] = [];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadAllUsers();
  }


  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
        this.loadAllUsers();
    });
}

private loadAllUsers() {
  this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
  });
}

}
