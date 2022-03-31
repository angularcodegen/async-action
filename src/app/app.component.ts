import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, defer, EMPTY, filter, take, tap, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
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
