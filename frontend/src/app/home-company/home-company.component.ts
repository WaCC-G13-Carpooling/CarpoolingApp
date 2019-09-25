import { Component, OnInit } from '@angular/core';
import { EmployeeService, CompanyService } from '@app/_services';
import { first } from 'rxjs/operators';
import { Company, Employee } from '@app/_models';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home-company',
  templateUrl: './home-company.component.html',
  styleUrls: ['./home-company.component.css']
})
export class HomeCompanyComponent implements OnInit {
  displayedColumns: string[] = ['First Name', 'Last Name', 'Phone Number', 'Work Address', 'Delete'];
  currentCompany: Company;
  companies: Company[] = [];
  id;
  employees: Employee[] = [];
  dataSource = new MatTableDataSource<Employee>(this.employees);
  constructor(private employeeService: EmployeeService, private companyService: CompanyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params.id);
      this.id = params.id;
      this.companyService.getById(this.id).subscribe(company => {
        this.currentCompany = company;
      });
    });
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  deleteEmployee(id: number) {
    this.employeeService.delete(id).pipe(first()).subscribe(() => {
      this.loadAllEmployees();
    });
  }

  private loadAllEmployees() {
    console.log(this.currentCompany);
    this.employeeService.getAll().pipe(first()).subscribe(employees => {
      employees.forEach(employee => {
        this.currentCompany.employeeList.forEach(employeeOfList => {
          if (employeeOfList === employee.userName) {
            this.employees.push(employee);
          }
        });
      });
    });
  console.log(this.employees);  }
}
