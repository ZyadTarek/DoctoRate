import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/_services/client.service';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  constructor(private clientService:ClientService) { }
  data:any
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

   },500)


    });

    promise.catch((err)=>{

    });

    promise.finally(()=>{

    });
  }
  getPhoneNumber()
  {
if(this.data.user.user_Phone==null)
{
  return  "اضافه"
}
else return this.data.user.user_Phone;
  }
  getAddress()
  {
if(this.data.user.user_Address==null)
{
  return  "اضافه";
}
else return this.data.user.user_Address;
  }
  getDOB()
  {
if(this.data.user.user_DOB==null)
{
  return  "اضافه";
}
else return this.data.user.user_DOB;
  }

}