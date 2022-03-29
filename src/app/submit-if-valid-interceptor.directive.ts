import { Directive, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { defer, Observable } from 'rxjs';
import { ActionInterceptor, ACTION_INTERCEPTORS } from './async-action.directive';

export class InvalidFormError extends Error {
  constructor() {
    super('Form is invalid');
  }
}

@Directive({
  selector: '[appSubmitIfValidInterceptor]',
  providers: [
    {
      provide: ACTION_INTERCEPTORS,
      multi: true,
      useExisting: SubmitIfValidInterceptorDirective,
    },
  ],
})
export class SubmitIfValidInterceptorDirective implements ActionInterceptor {
  @Input('appSubmitIfValidInterceptor') form!: AbstractControl;

  intercept(action$: Observable<unknown>): Observable<unknown> {
    return defer(() => {
      if (!this.form.valid) {
        alert('Form is invalid');
        this.form.markAllAsTouched();
        throw new InvalidFormError();
      }

      return action$;
    });
  }
}
