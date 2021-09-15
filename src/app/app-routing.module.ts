import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'projects/insite-kit/src/lib/components/login/login.component';
import {
  Access,
  Application,
  Feature,
} from 'projects/insite-kit/src/lib/models/common.model';
import { FeatureAccessGuard } from 'projects/insite-kit/src/lib/service/auth-service/feature-access.guard';
import { AuthGuard } from '../../projects/insite-kit/src/lib/service/auth-service/auth.guard';
import { CalendarOverviewComponent } from './calendar/calendar-overview/calendar-overview.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from './home/home.component';
import { AddManagerComponent } from './managers/add-manager/add-manager.component';
import { EditInfoComponent } from './managers/edit-info/edit-info.component';
import { EditVacationsComponent } from './managers/edit-vacations/edit-vacations.component';
import { ManagerDetailComponent } from './managers/manager-detail/manager-detail.component';
import { ManagerOverviewComponent } from './managers/manager-overview/manager-overview.component';
import { ManagersComponent } from './managers/managers.component';
import { MoveManagerComponent } from './managers/move-manager/move-manager.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestTrackerComponent } from './request-tracker/request-tracker.component';
import { StoresDetailComponent } from './stores/store-detail/stores-detail.component';
import { StoresOverviewComponent } from './stores/stores-overview/stores-overview.component';
import { StoresComponent } from './stores/stores.component';

/**
 * Make sure to add back CanActivate on Home
 */
const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: 'manager',
    component: ManagersComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: ManagerOverviewComponent },
      {
        path: 'details/:id',
        component: ManagerDetailComponent,
      },
      { path: 'move-manager', component: MoveManagerComponent },
      { path: 'add-manager', component: AddManagerComponent },
      {
        path: 'details/:id/edit/info',
        component: EditInfoComponent,
        canActivate: [FeatureAccessGuard],
        data: {
          feature: [Application.MANAGER, Feature.MANAGER_DETAIL, Access.UPDATE],
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
export class AppRoutingModule { }
