import { User } from 'src/app/_models/user';
import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/_services/client.service';
import { AuthService } from 'src/app/_services/auth.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private clientService:ClientService,private authService:AuthService) { }
  data:any;
  username;
  email;
  phone;
  Address;
  DOB;
  DataEdited:User;
  ngOnInit(): void {

    const promise = new Promise((resolve,reject)=>{


      resolve(this.clientService.getUser());

    });

    promise.then((res)=>{

     //this.clientService.getUser();

     setTimeout(()=>{
     console.log(this.clientService.currentUser);
     this.data = this.clientService.currentUser;

     console.log(this.data);
     console.log(this.data.username);
     this.username=this.data.username;
this.email=this.data.user.email;
this.phone=this.data.user.user_Phone;
this.Address=this.data.user.user_Address;
this.DOB=this.data.user.user_DOB;

   },500)


    });

    promise.catch((err)=>{

    });

    promise.finally(()=>{

    });


}

submit()
  {
    this.DataEdited=new User("",this.username,this.email,this.phone,"",this.DOB,this.Address);
    console.log("allllll"+this.username+this.email+this.phone) ;
    console.log("editeddata"+this.DataEdited.Email);
    this.authService.EditUserData(this.DataEdited).subscribe(a=>{console.log(a);});
    window.location.reload();
  }

  }
