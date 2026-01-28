import { Component, input } from '@angular/core';
import { SalaryResult } from '../../services/salary.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-salary-calculation-result',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './salary-calculation-result.component.html',
  styleUrls: ['./salary-calculation-result.component.scss'],

})
export class SalaryCalculationResultComponent {
  result = input.required<SalaryResult | null>();
}
