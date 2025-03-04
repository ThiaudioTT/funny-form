import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  funnyForm: FormGroup;
  isSubmitted = false;
  alreadySubmitted = false;
  formShake = false;
  randomFeedback = '';

  funnyFeedbacks = [
    'This form is judging you silently.',
    'Your form-filling skills need work.',
    'Even my grandma could fill this form better.',
    'Are you sure you want to submit this?',
    "I've seen better form entries from cats walking on keyboards.",
    'Is this really the best you can do?',
    "Take your time, it's not like I have other forms to validate.",
    'Your form is as incomplete as my will to live (this is just a joke, i complety fine).',
  ];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.funnyForm = this.fb.group({
      superheroName: ['', [Validators.required, Validators.minLength(3)]],
      secretTalent: ['', Validators.required],
      reason: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  ngOnInit() {
    this.funnyForm.valueChanges.subscribe(() => {
      if (this.funnyForm.invalid && this.funnyForm.touched) {
        this.randomFeedback =
          this.funnyFeedbacks[
            Math.floor(Math.random() * this.funnyFeedbacks.length)
          ];
      }
    });
  }

  onSubmit() {
    // user can't submit the form if isn't valid, so when we already submitted the form, we shake it
    if (this.isSubmitted) {
      this.alreadySubmitted = true;
      this.formShake = true;
      setTimeout(() => {
        this.formShake = false;
      }, 500);
      return;
    }
    if (this.funnyForm.valid) {
      this.isSubmitted = true;
      this.snackBar.open('Form submitted successfully! (Not really)', 'Cool!', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }
}
