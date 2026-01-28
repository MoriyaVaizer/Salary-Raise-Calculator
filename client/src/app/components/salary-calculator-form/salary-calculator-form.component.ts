import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ProfLevel } from '../../enums/prof-level.enum';
import { BonusGroup } from '../../enums/bonus-group.enum';

@Component({
  selector: 'app-salary-calculator-form',
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
    MatRadioModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './salary-calculator-form.component.html',
   styleUrls: ['./salary-calculator-form.component.scss'],
})
export class SalaryCalculatorFormComponent {

  @Input({ required: true }) salaryForm!: FormGroup;
  @Input() loading = false;

  @Output() submitCalculation = new EventEmitter<void>();

  ProfLevel = ProfLevel;
  BonusGroup = BonusGroup;

  percentages = [100, 75, 50];
  mgmtLevels = [0, 1, 2, 3, 4];

  onSubmit() {
  this.salaryForm.markAllAsTouched();
  this.submitCalculation.emit();
}
}
