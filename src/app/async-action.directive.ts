import { Directive, HostListener, Inject, InjectionToken, Input, OnDestroy, Optional } from '@angular/core';
import { isObservable, Observable, of, OperatorFunction, Subscription } from 'rxjs';

export interface ActionInterceptor {
  intercept(action$: Observable<unknown>): Observable<unknown>;
}

export const ACTION_INTERCEPTORS = new InjectionToken<ActionInterceptor[]>('ACTION_INTERCEPTORS');

export type AsyncAction<T = unknown> = Observable<T> | OperatorFunction<T, unknown>;

@Directive({
  selector: '[appAsyncAction]',
})
export class AsyncActionDirective implements OnDestroy {
  @Input('appAsyncAction') action$!: AsyncAction<any>;
  @Input('appAsyncActionData') data?: unknown;

  private activeSubscription?: Subscription;

  constructor(
    @Optional()
    @Inject(ACTION_INTERCEPTORS)
    private actionInterceptors: ActionInterceptor[] | null,
  ) {}

  @HostListener('click')
  handleClick() {
    if (this.activeSubscription?.closed === false) {
      return;
    }
    const observable$ = isObservable(this.action$) ? this.action$ : this.action$(of(this.data));
    const interceptedAction$ = (this.actionInterceptors ?? []).reduceRight(
      (action$, interceptor) => interceptor.intercept(action$),
      observable$,
    );

    this.activeSubscription = interceptedAction$.subscribe();
  }

  ngOnDestroy(): void {
    this.activeSubscription?.unsubscribe();
  }
}
