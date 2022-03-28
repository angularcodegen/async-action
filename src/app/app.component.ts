import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { defer, tap, mapTo, of, timer, EMPTY, take, filter, BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <form class="my-5" [formGroup]="form">
        <div class="mb-3">
          <label for="title">Title *</label>
          <input class="form-control" formControlName="title" id="title" />
        </div>

        <div class="mb-3">
          <label for="content">Content</label>
          <textarea class="form-control" formControlName="content" id="content"></textarea>
        </div>

        <div class="d-flex align-items-center">
          <button class="btn btn-primary" [appAsyncAction]="save$">Save</button>
          <span *ngIf="counter$ | async as counter" class="ms-3 d-inline-block">{{ counter }}</span>
        </div>
      </form>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  form = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null),
  });

  counter$ = new BehaviorSubject<number>(0);

  save$ = defer(() => {
    if (!this.form.invalid) {
      this.counter$.next(5);
      return timer(0, 1_000).pipe(
        tap((i) => this.counter$.next(this.counter$.value - 1)),
        take(5),
        filter((i) => i === 4),
        tap(() => alert('Form saved')),
      );
    } else {
      alert('Form is invalid');
      return EMPTY;
    }
  });
}
