import { Directive, HostListener, Input, OnDestroy } from '@angular/core';
import { isObservable, Observable, of, OperatorFunction, Subscription } from 'rxjs';

export type AsyncAction<T = unknown> = Observable<T> | OperatorFunction<T, unknown>;

@Directive({
  selector: '[appAsyncAction]',
})
export class AsyncActionDirective implements OnDestroy {
  @Input('appAsyncAction') action$!: AsyncAction<any>;
  @Input('appAsyncActionData') data?: unknown;

  private activeSubscription?: Subscription;

  @HostListener('click')
  handleClick() {
    if (this.activeSubscription?.closed === false) {
      return;
    }

    const observable$ = isObservable(this.action$) ? this.action$ : this.action$(of(this.data));
    this.activeSubscription = observable$.subscribe();
  }

  ngOnDestroy(): void {
    this.activeSubscription?.unsubscribe();
  }
}
