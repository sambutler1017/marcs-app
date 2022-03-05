import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppIconCardComponent } from './components/app-icon-card/app-icon-card.component';
import { AppPageComponent } from './components/app-page/app-page.component';
import { BannerComponent } from './components/banner/banner.component';
import { CardHeaderComponent } from './components/card-header/card-header.component';
import { CardInfoComponent } from './components/card-info/card-info.component';
import { CardComponent } from './components/card/card.component';
import { AppFooterComponent } from './components/footer/app-footer.component';
import { ContactAdminModalComponent } from './components/footer/modals/contact-admin-modal/contact-admin-modal.component';
import { PrivacyPolicyModalComponent } from './components/footer/modals/privacy-policy-modal/privacy-policy-modal.component';
import { ProjectModalComponent } from './components/footer/modals/project-modal/project-modal.component';
import { GridColumnComponent } from './components/grid/grid-column/grid-column.component';
import { GridPagerComponent } from './components/grid/grid-pager/grid-pager.component';
import { GridSearchComponent } from './components/grid/grid-search/grid-search.component';
import { GridShowAllComponent } from './components/grid/grid-show-all/grid-show-all.component';
import { GridComponent } from './components/grid/grid.component';
import { HeaderComponent } from './components/header/header.component';
import { IconComponent } from './components/icon/icon.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { ModalActionBarComponent } from './components/modal/modal-action-bar/modal-action-bar.component';
import { ModalBodyComponent } from './components/modal/modal-body/modal-body.component';
import { ModalHeaderComponent } from './components/modal/modal-header/modal-header.component';
import { ModalComponent } from './components/modal/modal.component';
import { AppNavbarComponent } from './components/navbar/app-navbar/app-navbar.component';
import { HomeImageComponent } from './components/navbar/home-navbar/home-image/home-image.component';
import { HomeNavbarComponent } from './components/navbar/home-navbar/home-navbar.component';
import { FeatureAccessDirective } from './directives/featureAccess/feature-access.directive';
import { UsernamePipe } from './service/pipe/format-user-name.pipe';
import { WebRoleTranslationPipe } from './service/pipe/web-role-translation.pipe';

@NgModule({
  declarations: [
    AppIconCardComponent,
    AppPageComponent,
    HomeNavbarComponent,
    AppNavbarComponent,
    GridComponent,
    GridColumnComponent,
    GridPagerComponent,
    GridShowAllComponent,
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
    WebRoleTranslationPipe,
    ModalActionBarComponent,
    ModalBodyComponent,
    ModalHeaderComponent,
    BannerComponent,
    GridSearchComponent,
    AppFooterComponent,
    PrivacyPolicyModalComponent,
    ProjectModalComponent,
    ContactAdminModalComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  exports: [
    AppIconCardComponent,
    HomeNavbarComponent,
    AppNavbarComponent,
    AppPageComponent,
    GridComponent,
    GridColumnComponent,
    GridPagerComponent,
    GridShowAllComponent,
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
    ModalActionBarComponent,
    ModalBodyComponent,
    ModalHeaderComponent,
    WebRoleTranslationPipe,
    BannerComponent,
    GridSearchComponent,
    AppFooterComponent,
    PrivacyPolicyModalComponent,
    ProjectModalComponent,
    ContactAdminModalComponent,
  ],
  entryComponents: [ModalComponent],
})
export class InsiteKitModule {}
