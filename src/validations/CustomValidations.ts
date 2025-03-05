import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export default class CustomValidations {
  static forbiddenWords(forbidden: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null; // Allow empty values (handled by required validator)

      // Create a regex pattern that matches any of the forbidden words
      const pattern = new RegExp(`\\b(${forbidden.join('|')})\\b`, 'i'); // \b ensures whole words, 'i' makes it case-insensitive

      return pattern.test(control.value)
        ? {
            forbiddenWord: `Your superhero name cannot include: ${forbidden.join(
              ', '
            )}`,
          }
        : null;
    };
  }
}
