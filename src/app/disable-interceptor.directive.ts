import { Directive, ElementRef } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { ActionInterceptor, ACTION_INTERCEPTORS } from './async-action.directive';

@Directive({
  selector: '[appDisableInterceptor]',
  providers: [
    {
      provide: ACTION_INTERCEPTORS,
      multi: true,
      useExisting: DisableInterceptorDirective,
    },
  ],
})
export class DisableInterceptorDirective implements ActionInterceptor {
  constructor(private elementRef: ElementRef<HTMLButtonElement>) {}

  intercept(action$: Observable<unknown>): Observable<unknown> {
    this.elementRef.nativeElement.disabled = true;
    return action$.pipe(finalize(() => (this.elementRef.nativeElement.disabled = false)));
  }
}
