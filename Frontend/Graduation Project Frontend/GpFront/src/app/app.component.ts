import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgwWowService } from 'ngx-wow';
import { ConfirmationService } from 'primeng/api';
import { ClientService } from './_services/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'GpFront';
  CurrentUser:any;
  IsAdminRole:any;
  userInitials:any;
  constructor(private wowService: NgwWowService,private clientService:ClientService,private route:Router,private confirmationService:ConfirmationService) {
    this.wowService.init();
  }
  ngOnInit(){
   
  //   if(localStorage.getItem('token') != null)
  //   this.clientService.getUser();
     
  //  setTimeout(()=>{
  //   this.CurrentUser = this.clientService.currentUser.username;
  //   },100);
  //   setTimeout(()=>{
  //     this.userInitials = this.getUserIntials();
  //     console.log("User Initials"+this.userInitials);
  //     this.IsAdmin();
  //     this.route.navigateByUrl("/dashboard");
  //   },1000);
  }


  // IsAdmin(){  
  // if((this.clientService.currentUser.role == "Admin" && this.IsThereAnyUser() == true)) this.IsAdminRole = true;
  // else if(this.clientService.currentUser.role == "User" || localStorage.getItem('tokem') == null){
  //   this.IsAdminRole = false;   
  //   }
  //   console.log("IsAdmin ? "+this.IsAdminRole+ " " +this.clientService.currentUser.role);
  // }
  // IsThereAnyUser():boolean{
  //   if(localStorage.getItem('token') != null) {
  //    return true;
  //   }
  //   else return false;
  // }
  // logout(){
  //   localStorage.removeItem('token');
  // }
  // getUserIntials():string{
  //   return `${this.CurrentUser[0]}${this.CurrentUser[1]}`.toUpperCase();
  // }
}
