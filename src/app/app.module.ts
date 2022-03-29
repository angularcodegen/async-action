import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AsyncActionDirective } from './async-action.directive';
import { DisableInterceptorDirective } from './disable-interceptor.directive';
import { SubmitIfValidInterceptorDirective } from './submit-if-valid-interceptor.directive';

@NgModule({
  declarations: [AppComponent, AsyncActionDirective, DisableInterceptorDirective, SubmitIfValidInterceptorDirective],
  imports: [BrowserModule, ReactiveFormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
