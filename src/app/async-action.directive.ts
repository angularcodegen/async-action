import { Directive, HostListener, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[appAsyncAction]',
})
export class AsyncActionDirective implements OnDestroy {
  @Input('appAsyncAction') action$!: Observable<unknown>;
  private activeSubscription?: Subscription;

  @HostListener('click')
  handleClick() {
    if (this.activeSubscription?.closed === false) {
      return;
    }

    this.activeSubscription = this.action$.subscribe();
  }

  ngOnDestroy(): void {
    this.activeSubscription?.unsubscribe();
  }
}
