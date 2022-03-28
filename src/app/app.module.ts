import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AsyncActionDirective } from './async-action.directive';

@NgModule({
  declarations: [AppComponent, AsyncActionDirective],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
