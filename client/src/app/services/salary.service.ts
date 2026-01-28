import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class SalaryService {
  private apiUrl = 'https://localhost:7085/api/salary/calculate'; 

  constructor(private http: HttpClient) {}

  calculateSalary(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}