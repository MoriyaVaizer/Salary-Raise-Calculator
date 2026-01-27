import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SalaryResult, SalaryService } from '../services/salary.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-salary-calculator',
  templateUrl: './salary-calculator.component.html',
  styleUrls: ['./salary-calculator.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatSlideToggleModule
  ]
})
export class SalaryCalculatorComponent {
  salaryForm: FormGroup;
  result = signal<SalaryResult | null>(null);
  loading = false;

  currentYear = new Date().getFullYear();

  // רשימות בחירה לטופס
  percentages = [100, 75, 50];
  mgmtLevels = [0, 1, 2, 3, 4];

  constructor(private fb: FormBuilder, private salaryService: SalaryService) {
    this.salaryForm = this.fb.group({
      percentage: [100, Validators.required],
      profLevel: ['Beginner', Validators.required],
      adminLevel: [0, Validators.required],
      seniority: [0, [Validators.required, Validators.min(0), Validators.max(60)]],
      eligibleForLaw: [false],
      bonusGroup: ['A']
    });
  }

  calculate() {
    if (this.salaryForm.valid) {
      this.loading = true;
      this.salaryService.calculateSalary(this.salaryForm.value).subscribe({
        next: (res) => {
          this.result.set(res);
          this.loading = false;
          // גלילה לתוצאות
          setTimeout(() => {
            document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    }
  }


}