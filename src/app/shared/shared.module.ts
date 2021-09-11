import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { InsiteKitModule } from 'projects/insite-kit/src/lib/insite-kit.module';
import { BasicAuthHtppInterceptorService } from 'projects/insite-kit/src/lib/service/http-interceptor/basic-auth-htpp-interceptor.service';
import { AppRoutingModule } from '../app-routing.module';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [UserFormComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    InsiteKitModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
  ],
  exports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    InsiteKitModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    UserFormComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthHtppInterceptorService,
      multi: true,
    },
  ],
})
export class SharedModule {}
