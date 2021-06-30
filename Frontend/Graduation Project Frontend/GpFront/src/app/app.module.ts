import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { GoogleMapsModule } from '@angular/google-maps'
import {ButtonModule} from 'primeng/button';
import {RatingModule} from 'primeng/rating';
import {ToastModule} from 'primeng/toast';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CardModule} from 'primeng/card';
import {FieldsetModule} from 'primeng/fieldset';
import {SidebarComponent} from './Admin/sidebar/sidebar.component'
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { SearchPlaceComponent } from './Admin/search-place/search-place.component';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaceDetailsComponent } from './place/place-details/place-details.component';
import { MessageService } from 'primeng/api';
import { PlaceSearchComponent } from './place/place-search/place-search.component';
import {ManageUsersComponent}from './Admin/manage-users/manage-users.component'
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
//primeNg
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {CarouselModule} from 'primeng/carousel';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmationService} from 'primeng/api';
import {BadgeModule} from 'primeng/badge';
import {DialogModule} from 'primeng/dialog';
import {CalendarModule} from 'primeng/calendar';
//googleApi
import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavbarComponent } from './Admin/navbar/navbar.component'
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';

//
//import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgwWowModule } from 'ngx-wow';

import { HomeComponent } from './home/home.component';
import { ManageAdminsComponent } from './Admin/manage-admins/manage-admins.component';
import { OfferComponent } from './offer/offer.component';
import { NotificationService } from './_services/notification.service';
import { NotifierModule } from 'angular-notifier';
import { AlertifyService } from './_services/alertify.service';
import { NotificationsComponent } from './Admin/notifications/notifications.component';
import { OffersComponent } from './Admin/offers/offers.component';
import { UserProfileComponent } from './userProfile/user-profile/user-profile.component';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import { DataComponent } from './userProfile/data/data.component';
import { EditComponent } from './userProfile/edit/edit.component';
import { AboutUsComponent } from './about-us/about-us.component';
/////////////////////////////////





@NgModule({
    declarations: [

    AppComponent,
    PlaceDetailsComponent,
    SidebarComponent,
    DashboardComponent,
    SearchPlaceComponent,
    PlaceSearchComponent,
    LoginComponent,
    RegisterComponent,
    ManageUsersComponent,
    NavbarComponent,
    HomeComponent,
    ManageAdminsComponent,
    OfferComponent ,
    NotificationsComponent,
    OffersComponent,
    UserProfileComponent,
    HeaderComponent,
    FooterComponent,
    DataComponent,
    EditComponent,
    AboutUsComponent
    ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule.withConfig({
      // Custom options in here
    }),
    //GoogleMapsModule,
    ButtonModule,
    RatingModule,
    ToastModule,
    BrowserAnimationsModule,
    CardModule,
    FieldsetModule,
    //ngprimr
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    NotifierModule,
    AvatarModule,
    AvatarGroupModule,
    ConfirmPopupModule,
    //
    CarouselModule,
    NgwWowModule,
    BadgeModule,
    DialogModule,
    CalendarModule,
    //////


    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBD77-EivcGrFUZAn0sLFA33xachzYoUkw',
      libraries: ['places']
    }),
    SocialLoginModule
  ],
  providers: [
    MessageService,
    NotificationService,
    AlertifyService,
    ConfirmationService,
    NgbModal,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '94058846877-6lp5stvk47dd0kanfgt016f6jctkdufc.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

