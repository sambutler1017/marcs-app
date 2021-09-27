import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'projects/insite-kit/src/components/login/login.component';
import {
  Access,
  Application,
  Feature,
} from 'projects/insite-kit/src/models/common.model';
import { FeatureAccessGuard } from 'projects/insite-kit/src/service/auth-service/feature-access.guard';
import { AuthGuard } from '../../projects/insite-kit/src/service/auth-service/auth.guard';
import { CalendarOverviewComponent } from './calendar/calendar-overview/calendar-overview.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestTrackerComponent } from './request-tracker/request-tracker.component';
import { AddUserComponent } from './shared/add-user/add-user.component';
import { EditUserComponent } from './shared/edit-user/edit-user.component';
import { EditVacationsComponent } from './shared/edit-vacations/edit-vacations.component';
import { ResetPasswordComponent } from './shared/reset-password/reset-password.component';
import { StoresDetailComponent } from './stores/store-detail/stores-detail.component';
import { StoresOverviewComponent } from './stores/stores-overview/stores-overview.component';
import { StoresComponent } from './stores/stores.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserOverviewComponent } from './users/user-overview/user-overview.component';
import { UserComponent } from './users/user.component';

/**
 * Make sure to add back CanActivate on Home
 */
const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: UserOverviewComponent },
      {
        path: 'details/:id',
        component: UserDetailComponent,
      },
      { path: 'add-user', component: AddUserComponent },
      {
        path: 'details/:id/edit/info',
        component: EditUserComponent,
        canActivate: [FeatureAccessGuard],
        data: {
          feature: [Application.USER, Feature.USER_DETAIL, Access.UPDATE],
        },
      },
      {
        path: 'details/:id/reset-password',
        component: ResetPasswordComponent,
        canActivate: [FeatureAccessGuard],
        data: {
          feature: [Application.USER, Feature.USER_DETAIL, Access.UPDATE],
        },
      },
      { path: 'details/:id/edit/vacations', component: EditVacationsComponent },
    ],
  },
  {
    path: 'store',
    component: StoresComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: StoresOverviewComponent },
      { path: 'details/:id', component: StoresDetailComponent },
    ],
  },
  {
    path: 'requestTracker',
    component: RequestTrackerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: CalendarOverviewComponent },
    ],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
