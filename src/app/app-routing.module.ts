import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/models/common.model';
import { FeatureAccessGuard } from 'projects/insite-kit/src/service/auth-service/feature-access.guard';
import { StoreResolverService } from 'src/service/store-service/store-resolver.service';
import { UserResolverService } from 'src/service/user-service/user-resolver.service';
import { AuthGuard } from '../../projects/insite-kit/src/service/auth-service/auth.guard';
import { BlockDatesOverviewComponent } from './block-dates/block-dates-overview/block-dates-overview.component';
import { BlockDatesComponent } from './block-dates/block-dates.component';
import { CalendarOverviewComponent } from './calendar/calendar-overview/calendar-overview.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from './home/home.component';
import { CreateAccountComponent } from './login/create-account/create-account.component';
import { ForgotPasswordResetComponent } from './login/forgot-password-reset/forgot-password-reset.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { LoginOverviewComponent } from './login/login-overview/login-overview.component';
import { LoginComponent } from './login/login.component';
import { NotificationDetailComponent } from './notification/notification-detail/notification-detail.component';
import { NotificationOverviewComponent } from './notification/notification-overview/notification-overview.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileOverviewComponent } from './profile/profile-overview/profile-overview.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportsOverviewComponent } from './reports/reports-overview/reports-overview.component';
import { ReportsComponent } from './reports/reports.component';
import { RequestTrackerOverviewComponent } from './request-tracker/request-tracker-overview/request-tracker-overview.component';
import { RequestTrackerComponent } from './request-tracker/request-tracker.component';
import { EditUserComponent } from './shared/pages/edit-user/edit-user.component';
import { ResetPasswordComponent } from './shared/pages/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './shared/pages/update-password/update-password.component';
import { StoresDetailEditComponent } from './stores/store-detail/store-detail-edit/store-detail-edit.component';
import { StoresDetailComponent } from './stores/store-detail/stores-detail.component';
import { AddStoreComponent } from './stores/stores-overview/add-store/add-store.component';
import { StoresOverviewComponent } from './stores/stores-overview/stores-overview.component';
import { StoresComponent } from './stores/stores.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserVacationsDetailComponent } from './users/user-detail/user-vacations/user-vacations-detail/user-vacations-detail.component';
import { UserVacationsComponent } from './users/user-detail/user-vacations/user-vacations.component';
import { AddUserComponent } from './users/user-overview/add-user/add-user.component';
import { UserOverviewComponent } from './users/user-overview/user-overview.component';
import { UserComponent } from './users/user.component';

/**
 * Make sure to add back CanActivate on Home
 */
const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: LoginOverviewComponent },
      { path: 'create-account', component: CreateAccountComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password/:id', component: ForgotPasswordResetComponent },
    ],
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: UserOverviewComponent },
      {
        path: ':id/details',
        component: UserDetailComponent,
      },
      {
        path: 'add-user',
        component: AddUserComponent,
        canActivate: [FeatureAccessGuard],
        data: {
          feature: [App.USER, Feature.USER_DETAIL, Access.CREATE],
        },
      },
      {
        path: ':id/details/edit/info',
        component: EditUserComponent,
        canActivate: [FeatureAccessGuard],
        resolve: { user: UserResolverService },
        data: {
          feature: [App.USER, Feature.USER_DETAIL, Access.UPDATE],
        },
      },
      {
        path: ':id/details/reset-password',
        component: ResetPasswordComponent,
        canActivate: [FeatureAccessGuard],
        data: {
          feature: [App.USER, Feature.USER_DETAIL, Access.UPDATE],
        },
      },
      {
        path: ':id/details/vacations',
        component: UserVacationsComponent,
        canActivate: [FeatureAccessGuard],
        data: {
          feature: [App.USER, Feature.USER_VACATION, Access.READ],
        },
      },
      {
        path: ':id/details/vacations/:vacId/details',
        canActivate: [FeatureAccessGuard],
        data: {
          feature: [App.USER, Feature.USER_VACATION, Access.UPDATE],
        },
        component: UserVacationsDetailComponent,
      },
    ],
  },
  {
    path: 'store',
    component: StoresComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: StoresOverviewComponent },
      { path: ':id/details', component: StoresDetailComponent },
      {
        path: 'add-store',
        component: AddStoreComponent,
        canActivate: [FeatureAccessGuard],
        data: {
          feature: [App.STORE, Feature.STORE_DETAIL, Access.CREATE],
        },
      },
      {
        path: ':id/details/edit/info',
        component: StoresDetailEditComponent,
        canActivate: [FeatureAccessGuard],
        resolve: { store: StoreResolverService },
        data: {
          feature: [App.STORE, Feature.STORE_DETAIL, Access.UPDATE],
        },
      },
    ],
  },
  {
    path: 'blockDates',
    component: BlockDatesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: BlockDatesOverviewComponent },
    ],
  },
  {
    path: 'notification',
    component: NotificationComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: NotificationOverviewComponent,
      },
      {
        path: 'details/:id',
        component: NotificationDetailComponent,
      },
    ],
  },
  {
    path: 'requestTracker',
    component: RequestTrackerComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: RequestTrackerOverviewComponent },
    ],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: ProfileOverviewComponent },
      { path: 'edit', component: ProfileEditComponent },
      { path: 'update-password', component: UpdatePasswordComponent },
    ],
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
  {
    path: 'report',
    component: ReportsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: ReportsOverviewComponent },
    ],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
