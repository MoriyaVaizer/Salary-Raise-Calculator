import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SalaryResult, SalaryService } from '../../services/salary.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfLevel } from '../../enums/prof-level.enum';
import { BonusGroup } from '../../enums/bonus-group.enum';
import { SalaryCalculatorFormComponent } from '../salary-calculator-form/salary-calculator-form.component';
import { SalaryCalculationResultComponent } from '../salary-calculation-result/salary-calculation-result.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-salary-calculator',
  templateUrl: './salary-calculator.component.html',
  styleUrls: ['./salary-calculator.component.scss'],
  standalone: true,
  imports: [
    CommonModule,   
    SalaryCalculatorFormComponent,
    SalaryCalculationResultComponent,
    MatProgressSpinnerModule,
    MatIconModule
  ]
})

export class SalaryCalculatorComponent {
  salaryForm: FormGroup;
  result = signal<SalaryResult | null>(null);
  loading = false;  
  currentYear = new Date().getFullYear(); 

  constructor(private fb: FormBuilder, private salaryService: SalaryService) {
    this.salaryForm = this.fb.group({
      percentage: [100, Validators.required],
      profLevel: [ProfLevel.junior, Validators.required],
      adminLevel: [0, Validators.required],
      seniority: [0, [Validators.required, Validators.min(0), Validators.max(50)]],
      eligibleForLaw: [false],
      bonusGroup: [BonusGroup.groupA]
    });
  }

  calculate() {
    if (this.salaryForm.valid) {
      this.loading = true;
      this.salaryService.calculateSalary(this.salaryForm.value).subscribe({
        next: (res) => {
          this.result.set(res);
          this.loading = false;
         
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    }
  }

}