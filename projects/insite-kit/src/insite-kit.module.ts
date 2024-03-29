import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppIconCardComponent } from './components/app-icon-card/app-icon-card.component';
import { AppPageComponent } from './components/app-page/app-page.component';
import { CardHeaderComponent } from './components/card-header/card-header.component';
import { CardInfoComponent } from './components/card-info/card-info.component';
import { CardComponent } from './components/card/card.component';
import { GridComponent } from './components/grid/grid.component';
import { HeaderComponent } from './components/header/header.component';
import { IconComponent } from './components/icon/icon.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { ModalComponent } from './components/modal/modal.component';
import { AppNavbarComponent } from './components/navbar/app-navbar/app-navbar.component';
import { HomeImageComponent } from './components/navbar/home-navbar/home-image/home-navbar.component';
import { HomeNavbarComponent } from './components/navbar/home-navbar/home-navbar.component';
import { FeatureAccessDirective } from './directives/featureAccess/feature-access.directive';
import { UsernamePipe } from './service/pipe/format-user-name.pipe';

@NgModule({
  declarations: [
    AppIconCardComponent,
    AppPageComponent,
    HomeNavbarComponent,
    AppNavbarComponent,
    GridComponent,
    HeaderComponent,
    CardComponent,
    CardInfoComponent,
    LoadingIndicatorComponent,
    HomeImageComponent,
    FeatureAccessDirective,
    CardHeaderComponent,
    IconComponent,
    UsernamePipe,
    ModalComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  exports: [
    AppIconCardComponent,
    HomeNavbarComponent,
    AppPageComponent,
    GridComponent,
    HeaderComponent,
    CardComponent,
    CardInfoComponent,
    LoadingIndicatorComponent,
    HomeImageComponent,
    FeatureAccessDirective,
    CardHeaderComponent,
    IconComponent,
    UsernamePipe,
    ModalComponent,
  ],
  entryComponents: [ModalComponent],
})
export class InsiteKitModule {}
