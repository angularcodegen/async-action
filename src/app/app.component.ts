import { Component } from '@angular/core';
import { delayWhen, filter, interval, pipe, take, takeWhile, tap, timer } from 'rxjs';
import { AsyncAction } from './async-action.directive';

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  users = [
    { id: 1, name: 'John Doe', _timer: 0 },
    { id: 2, name: 'John Doe', _timer: 0 },
    { id: 3, name: 'John Doe', _timer: 0 },
  ];

  removeUser$: AsyncAction<typeof this.users[0]> = pipe(
    tap((user) => (user._timer = 5)),
    delayWhen((user) =>
      interval(1_000).pipe(
        tap(() => --user._timer),
        take(5),
        filter((value) => value === 4),
      ),
    ),
    tap((userToRemove) => (this.users = this.users.filter((user) => user !== userToRemove))),
    tap((user) => alert(`User with id ${user.id} was removed`)),
  );

  addNewUser() {
    this.users.push({
      _timer: 0,
      id: random(1, 100),
      name: 'John Doe',
    });
  }
}
