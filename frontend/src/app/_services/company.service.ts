import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Company } from '@app/_models/company';

@Injectable({ providedIn: 'root' })
export class CompanyService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Company[]>(`${environment.apiUrl}/companies`);
    }

    getById(id: number) {
        return this.http.get<Company>(`${environment.apiUrl}/companies/${id}`);
    }

    register(company: Company) {
        return this.http.post(`${environment.apiUrl}/companies/register`, company);
    }

    update(id: number, company: Company) {
        return this.http.put(`${environment.apiUrl}/companies/update/${id}`, company);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/companies/${id}`);
    }
}
