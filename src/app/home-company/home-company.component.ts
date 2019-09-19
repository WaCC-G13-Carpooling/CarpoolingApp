import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { UserService } from '@app/_services';
import { first } from 'rxjs/operators';
import { Company } from '@app/_models/company';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-home-company',
  templateUrl: './home-company.component.html',
  styleUrls: ['./home-company.component.css']
})
export class HomeCompanyComponent implements OnInit {
  loading = false;
  displayedColumns: string[] = ['First Name', 'Last Name', 'Phone Number', 'Work Address', 'Delete'];
  currentCompany: Company;
  currentUser: User;
  users: User[] = [];
  dataSource = new MatTableDataSource<User>(this.users);
  constructor(private userService: UserService) {}

  ngOnInit() {
    // tslint:disable-next-line: no-unused-expression
    this.loading = true;
    /*const novo: User = {
      id: 1,
      firstName: 'oi',
      lastName: 'oi',
      userName: 'oi',
      password: 'oi',
      phoneNumber: 'oi',
      hasCar: true
    };
    this.users.push(novo);
    console.log(this.users);*/
    this.loadAllUsers;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
        this.loadAllUsers();
    });
}

private loadAllUsers() {
  this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
  });
}


}
