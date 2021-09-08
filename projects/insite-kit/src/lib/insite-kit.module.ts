import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppIconCardComponent } from './components/app-icon-card/app-icon-card.component';
import { AppPageComponent } from './components/app-page/app-page.component';
import { CardHeaderComponent } from './components/card-header/card-header.component';
import { CardInfoComponent } from './components/card-info/card-info.component';
import { CardComponent } from './components/card/card.component';
import { GridCardComponent } from './components/grid-card/grid-card.component';
import { GridComponent } from './components/grid/grid.component';
import { HeaderComponent } from './components/header/header.component';
import { IconComponent } from './components/icon/icon.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { AppNavbarComponent } from './components/navbar/app-navbar/app-navbar.component';
import { HomeImageComponent } from './components/navbar/home-navbar/home-image/home-navbar.component';
import { HomeNavbarComponent } from './components/navbar/home-navbar/home-navbar.component';
import { FeatureAccessDirective } from './directives/featureAccess/feature-access.directive';
import { InsiteKitComponent } from './insite-kit.component';

@NgModule({
  declarations: [
    AppIconCardComponent,
    AppPageComponent,
    HomeNavbarComponent,
    AppNavbarComponent,
    GridComponent,
    InsiteKitComponent,
    HeaderComponent,
    CardComponent,
    CardInfoComponent,
    GridCardComponent,
    LoadingIndicatorComponent,
    HomeImageComponent,
    FeatureAccessDirective,
    CardHeaderComponent,
    IconComponent
  ],
  imports: [BrowserModule],
  exports: [
    AppIconCardComponent,
    HomeNavbarComponent,
    AppPageComponent,
    GridComponent,
    InsiteKitComponent,
    HeaderComponent,
    CardComponent,
    CardInfoComponent,
    GridCardComponent,
    LoadingIndicatorComponent,
    HomeImageComponent,
    FeatureAccessDirective,
    CardHeaderComponent,
    IconComponent
  ],
})
export class InsiteKitModule { }
