import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileOverviewComponent } from './profile-overview/profile-overview.component';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileOverviewComponent,
    ProfileEditComponent,
  ],
  imports: [SharedModule],
})
export class ProfileModule {}
