import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/_services/client.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  CurrentUser:any;
  IsAdminRole:any;
  userInitials:any;
  hasPicture = false;
  navClass = "";
  constructor(private clientService:ClientService,private route:Router) { }

  ngOnInit(){

    if(localStorage.getItem('token') != null)
    this.clientService.getUser();
    else
    console.log("cannot get token!");

   setTimeout(()=>{
    this.CurrentUser = this.clientService.currentUser;
    },100);
    setTimeout(()=>{
      this.userInitials = this.getUserIntials();
      console.log("User Initials"+this.userInitials);
      this.IsAdmin();
     // this.route.navigateByUrl("/dashboard");
    },1000);
  }
  IsAdmin(){
    if((this.clientService.currentUser.role == "Admin" && this.IsThereAnyUser() == true)){
      this.IsAdminRole = true;
      this.navClass = "navbar navbar-expand-lg navbar-dark fixed-top";
    } 
    else if(this.clientService.currentUser.role == "User" || localStorage.getItem('tokem') == null){
      this.IsAdminRole = false;
      this.navClass = "navbar navbar-expand-lg navbar-dark";
      }
      else{
      this.navClass = "navbar navbar-expand-lg navbar-dark";
      }
      console.log("IsAdmin ? "+this.IsAdminRole+ " " +this.clientService.currentUser.role);
    }
    IsThereAnyUser():boolean{
      if(localStorage.getItem('token') != null) {
       return true;
      }
      else return false;
    }
    logout(){
      localStorage.removeItem('token');
      window.location.href="/home";
    }
    getUserIntials():string{
      console.log("Get User Initials: ",this.CurrentUser.username +" service: "+ this.clientService.currentUser.username);
      if(this.CurrentUser.user.user_Image == null){
        this.hasPicture = false;
        console.log("false get user iinitials: ",this.CurrentUser);
        return `${this.clientService.currentUser.username[0]}${this.clientService.currentUser.username[1]}`.toUpperCase();
      }
      else{
        this.hasPicture = true;
        console.log("true get user iinitials: ",this.CurrentUser);
        return this.clientService.currentUser.user.user_Image;
       }
    }
}
