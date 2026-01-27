import { Routes } from '@angular/router';
import { SalaryCalculatorComponent } from './calculator/salary-calculator.component';

export const routes: Routes = [
  { path: '', redirectTo: 'SalaryCalculator', pathMatch: 'full' },
  { path: 'SalaryCalculator', component: SalaryCalculatorComponent }

];
