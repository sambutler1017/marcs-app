import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'projects/insite-kit/src/lib/components/login/login.component';
import { AuthGuard } from '../../projects/insite-kit/src/lib/service/auth-service/auth.guard';
import { HomeComponent } from './home/home.component';
import { AddManagerComponent } from './managers/add-manager/add-manager.component';
import { EditInfoComponent } from './managers/edit-info/edit-info.component';
import { EditVacationsComponent } from './managers/edit-vacations/edit-vacations.component';
import { ManagerDetailComponent } from './managers/manager-detail/manager-detail.component';
import { ManagerOverviewComponent } from './managers/manager-overview/manager-overview.component';
import { ManagersComponent } from './managers/managers.component';
import { MoveManagerComponent } from './managers/move-manager/move-manager.component';
import { RequestTrackerComponent } from './request-tracker/request-tracker.component';
import { StoresComponent } from './stores/stores.component';

// Other routes will be added here to account for other pages like Calendar, manager, stores, block dates, etc
// Each one will have a canActivate on it to check if the user's jwt to is valid and if the user has access to
// that page.
//
// User Access to page is later improvement.

/**
 * Make sure to add back CanActivate on Home
 */
const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: 'managers',
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
      { path: 'details/:id/edit/info', component: EditInfoComponent },
      { path: 'details/:id/edit/vacations', component: EditVacationsComponent },
    ],
  },
  { path: 'stores', component: StoresComponent, canActivate: [AuthGuard] },
  {
    path: 'requestTracker',
    component: RequestTrackerComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
