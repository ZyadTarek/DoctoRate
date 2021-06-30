import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/_services/client.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  IsAdminRole:any;
  constructor(private clientService:ClientService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null)
    this.clientService.getUser();
     
   setTimeout(()=>{
    //this.CurrentUser = this.clientService.currentUser.username;
    },100);
    setTimeout(()=>{
     // this.userInitials = this.getUserIntials();
  //    console.log("User Initials"+this.userInitials);
      this.IsAdmin();
    //  this.route.navigateByUrl("/dashboard");
    },1000);
  }
  IsThereAnyUser():boolean{
    if(localStorage.getItem('token') != null) {
     return true;
    }
    else return false;
  }
  IsAdmin(){  
    if((this.clientService.currentUser.role == "Admin" && this.IsThereAnyUser() == true)) this.IsAdminRole = true;
    else if(this.clientService.currentUser.role == "User" || localStorage.getItem('tokem') == null){
      this.IsAdminRole = false;   
      }
      console.log("IsAdmin ? "+this.IsAdminRole+ " " +this.clientService.currentUser.role);
    }
    top(){
      window.scrollTo(0, 0);
    }
}
