import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



export interface SalaryResult {
  baseSalaryByPercentage: number;
  seniorityBonusPercent: number;
  seniorityBonusAmount: number;
  legalBonusAmount: number;
  totalBeforeIncrease: number;
  increaseRatePercent: number;
  increaseAmount: number;
  totalAfterIncrease: number;
}


@Injectable({ providedIn: 'root' })
export class SalaryService {
  private apiUrl = 'https://localhost:7085/api/salary/calculate'; // שנה לפי ה-URL של השרת שלך

  constructor(private http: HttpClient) {}

  calculateSalary(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}