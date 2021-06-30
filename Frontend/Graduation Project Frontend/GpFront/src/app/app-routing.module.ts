
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPlaceComponent } from './Admin/search-place/search-place.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import{ManageUsersComponent}from './Admin/manage-users/manage-users.component'
import { Admin } from './_models/admin';
import { NavbarComponent } from './Admin/navbar/navbar.component';

import { PlaceDetailsComponent } from './place/place-details/place-details.component';
//import { PlaceSearchComponent } from './place/place-search/place-search.component';
import { HomeComponent } from './home/home.component';
import { ManageAdminsComponent } from './Admin/manage-admins/manage-admins.component';
import { AuthGuard } from './_helpers/auth.guard';
import { UserProfileComponent } from './userProfile/user-profile/user-profile.component';
import { NotificationsComponent } from './Admin/notifications/notifications.component';
import { OfferComponent } from './offer/offer.component';
import{OffersComponent} from './Admin/offers/offers.component'
import { AboutUsComponent } from './about-us/about-us.component';
//import { ManageUsersComponent } from './Admin/manage-users/manage-users.component';
const routes: Routes = [
{path:"dashboard",component:DashboardComponent,
canActivate:[AuthGuard]},
{path:"notifications",component:NotificationsComponent},
{path:"manageusers",component:ManageUsersComponent,
canActivate:[AuthGuard]},
{path:"searchplace",component:SearchPlaceComponent,
canActivate:[AuthGuard]},
{path:"manageadmins",component:ManageAdminsComponent,
canActivate:[AuthGuard]},
{path:"offers/:id",component:OffersComponent,
canActivate:[AuthGuard]},
{path:"offers",component:OffersComponent,
canActivate:[AuthGuard]},
{path:"Login",component:LoginComponent},
{path:"Register",component:RegisterComponent},
{path:"home",component:HomeComponent},
{path:"Detail/:id",component:PlaceDetailsComponent},
{path:"UserProfile",component:UserProfileComponent},
{path:"offer",component:OfferComponent},
{path:"data",component:OfferComponent},
{path:"about",component:AboutUsComponent},
{path:"",redirectTo: '/home',pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes )], 
  exports: [RouterModule]
})


export class AppRoutingModule { }
