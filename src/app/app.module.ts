import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { InsiteKitModule } from 'projects/insite-kit/src/lib/insite-kit.module';
import { BasicAuthHtppInterceptorService } from 'projects/insite-kit/src/lib/service/http-interceptor/basic-auth-htpp-interceptor.service';
import { LoginComponent } from '../../projects/insite-kit/src/lib/components/login/login.component';
import { AuthGuard } from '../../projects/insite-kit/src/lib/service/auth-service/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlockDatesComponent } from './block-dates/block-dates.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { AddManagerComponent } from './managers/add-manager/add-manager.component';
import { EditInfoComponent } from './managers/edit-info/edit-info.component';
import { EditVacationsComponent } from './managers/edit-vacations/edit-vacations.component';
import { ManagerDetailComponent } from './managers/manager-detail/manager-detail.component';
import { ManagerOverviewComponent } from './managers/manager-overview/manager-overview.component';
import { ManagersComponent } from './managers/managers.component';
import { MoveManagerComponent } from './managers/move-manager/move-manager.component';
import { MapComponent } from './map/map.component';
import { RegionalsComponent } from './regionals/regionals.component';
import { ReportsComponent } from './reports/reports.component';
import { RequestTrackerComponent } from './request-tracker/request-tracker.component';
import { StoresDetailComponent } from './stores/store-detail/stores-detail.component';
import { StoresOverviewComponent } from './stores/stores-overview/stores-overview.component';
import { StoresComponent } from './stores/stores.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ManagersComponent,
    StoresComponent,
    CalendarComponent,
    BlockDatesComponent,
    MapComponent,
    ReportsComponent,
    RegionalsComponent,
    RequestTrackerComponent,
    ContactComponent,
    ManagerOverviewComponent,
    ManagerDetailComponent,
    MoveManagerComponent,
    AddManagerComponent,
    EditInfoComponent,
    EditVacationsComponent,
    StoresOverviewComponent,
    StoresDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    InsiteKitModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthHtppInterceptorService,
      multi: true,
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
