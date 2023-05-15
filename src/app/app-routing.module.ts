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
import { BlockDatesOverviewComponent } from './pages/block-dates/block-dates-overview/block-dates-overview.component';
import { BlockDatesComponent } from './pages/block-dates/block-dates.component';
import { CalendarOverviewComponent } from './pages/calendar/calendar-overview/calendar-overview.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateAccountComponent } from './pages/login/create-account/create-account.component';
import { ForgotPasswordResetComponent } from './pages/login/forgot-password-reset/forgot-password-reset.component';
import { ForgotPasswordComponent } from './pages/login/forgot-password/forgot-password.component';
import { LoginOverviewComponent } from './pages/login/login-overview/login-overview.component';
import { LoginComponent } from './pages/login/login.component';
import { NotificationDetailComponent } from './pages/notification/notification-detail/notification-detail.component';
import { NotificationOverviewComponent } from './pages/notification/notification-overview/notification-overview.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { ProfileEditComponent } from './pages/profile/profile-edit/profile-edit.component';
import { ProfileOverviewComponent } from './pages/profile/profile-overview/profile-overview.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReportsOverviewComponent } from './pages/reports/reports-overview/reports-overview.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { RequestTrackerOverviewComponent } from './pages/request-tracker/request-tracker-overview/request-tracker-overview.component';
import { RequestTrackerWizardComponent } from './pages/request-tracker/request-tracker-wizard/request-tracker-wizard.component';
import { RequestTrackerComponent } from './pages/request-tracker/request-tracker.component';
import { SchedulerOverviewComponent } from './pages/scheduler/scheduler-overview/scheduler-overview.component';
import { SchedulerComponent } from './pages/scheduler/scheduler.component';
import { StoresDetailEditComponent } from './pages/stores/store-detail/store-detail-edit/store-detail-edit.component';
import { StoresDetailComponent } from './pages/stores/store-detail/stores-detail.component';
import { AddStoreComponent } from './pages/stores/stores-overview/add-store/add-store.component';
import { StoresOverviewComponent } from './pages/stores/stores-overview/stores-overview.component';
import { StoresComponent } from './pages/stores/stores.component';
import { UserDetailComponent } from './pages/users/user-detail/user-detail.component';
import { UserVacationsDetailComponent } from './pages/users/user-detail/user-vacations/user-vacations-detail/user-vacations-detail.component';
import { UserVacationsComponent } from './pages/users/user-detail/user-vacations/user-vacations.component';
import { AddUserComponent } from './pages/users/user-overview/add-user/add-user.component';
import { UserOverviewComponent } from './pages/users/user-overview/user-overview.component';
import { UserComponent } from './pages/users/user.component';
import { EditUserComponent } from './shared/pages/edit-user/edit-user.component';
import { ResetPasswordComponent } from './shared/pages/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './shared/pages/update-password/update-password.component';

/**
 * Make sure to add back CanActivate on Home
 */
const routes: Routes = [
  // Unauthenticated Routes
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: LoginOverviewComponent, pathMatch: 'full' },
      { path: 'create-account', component: CreateAccountComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password/:id', component: ForgotPasswordResetComponent },
    ],
  },
  // Authenticated Routes
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: UserOverviewComponent, pathMatch: 'full' },
      { path: ':id/details', component: UserDetailComponent },
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
      { path: '', component: StoresOverviewComponent, pathMatch: 'full' },
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
    path: 'block-dates',
    component: BlockDatesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: BlockDatesOverviewComponent,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'scheduler',
    component: SchedulerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: SchedulerOverviewComponent,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'notification',
    component: NotificationComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: NotificationOverviewComponent,
        pathMatch: 'full',
      },
      {
        path: 'details/:id',
        component: NotificationDetailComponent,
      },
    ],
  },
  {
    path: 'request-tracker',
    component: RequestTrackerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: RequestTrackerOverviewComponent,
        pathMatch: 'full',
      },
      { path: 'wizard', component: RequestTrackerWizardComponent },
    ],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ProfileOverviewComponent, pathMatch: 'full' },
      { path: 'edit', component: ProfileEditComponent },
      { path: 'update-password', component: UpdatePasswordComponent },
    ],
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: CalendarOverviewComponent, pathMatch: 'full' },
    ],
  },
  {
    path: 'report',
    component: ReportsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ReportsOverviewComponent, pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
