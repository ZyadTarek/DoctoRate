import { AlertifyService } from './../../_services/alertify.service';
import { Component, OnInit,ElementRef, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { DashboardService } from 'src/app/_services/dashboard.service'
import { NotificationService } from '../../_services/notification.service';
import * as signalR from '@microsoft/signalr';
import { NotificationCountResult, NotificationResult } from '../../_models/notification';
import {MessageService} from 'primeng/api';
import {Message} from 'primeng//api';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../../assets/css/material-dashboard.css'],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {
   numOfAllUser ;
   numOfAllAdmins;
   numOfAllEntities;
   numOfHospital;
   numOfDoctors;
   numOfDentist;
   numOfPharmacy;
   numOfLabs;
   AllUsers;
   numOfphysiotherapist;
   users:User[]=[];
   msgs1: Message[];
   public connection!: signalR.HubConnection;
   public  a: AlertifyService;

   closeModal: string="";

   notification: NotificationCountResult=new NotificationCountResult() ;
   user:string="";
   public count:number=0;

   //notify:Notification[]=[];

  // constructor(private notificationService: NotificationService) { }
 
   
   messages: Array<NotificationResult>=new Array<NotificationResult>();
   @Input() id: string | undefined;
     private element: any;
  comment: any;
  allcomments:any []=[];
  name: any;
  notify:Notification[]=[];


  constructor(private messageService: MessageService,public dashBoardServ:DashboardService,private notificationService: NotificationService,notifierService: AlertifyService) {     this.a = notifierService;
  }

  ngOnInit(): void {
    this.notificationService.getAllNotification().subscribe(d=>{
      this.notify=d;
      this.count=this.notify.length
    });


    //*****************signalr connection */
    //this.connection = new signalR.HubConnectionBuilder().withUrl('https://localhost:5001/notify').build();

    // count  ALl Member
    this.dashBoardServ.getAllMember().subscribe(a=>{
      this.AllUsers=a;
    });
    this.connection = new signalR.HubConnectionBuilder().withUrl('https://localhost:44392/notify').build();
    this.notificationService.getAllNotification().subscribe(d=>{
      this.notify=d;
      this.count=this.notify.length;
      console.log(this.notify.length);
    });
  
    // count  number of user
    this.dashBoardServ.getNumOfUsers().subscribe(a=>{
      this.numOfAllUser=a;
      console.log(a);
    });
      // count  number of user
      this.dashBoardServ.getNumOfUsers().subscribe(a=>{
        this.numOfAllUser=a;
        console.log(a);
      });
    this.dashBoardServ.getNumOfAdmins().subscribe(a=>{
      this.numOfAllAdmins=a;
      console.log(a);
    });
     // count  number of Hospital
     this.dashBoardServ.getNumOfSpecificEntity(2).subscribe(c=>{
      this.numOfHospital=c;

    });
      // count  number of Doctors
    this.dashBoardServ.getNumOfSpecificEntity(1).subscribe(c=>{
        this.numOfDoctors=c;

      });
      // count  number of Dentist
      this.dashBoardServ.getNumOfSpecificEntity(6).subscribe(c=>{
        this.numOfDentist=c;
        console.log(c);
      });
        // count  number of Pharmacy
    this.dashBoardServ.getNumOfSpecificEntity(3).subscribe(c=>{
      this.numOfPharmacy=c;
      console.log(c);
    });
      // count  number of Laboratory
      this.dashBoardServ.getNumOfSpecificEntity(4).subscribe(c=>{
        this.numOfLabs=c;
        console.log(c);
      });
       // count  number of physiotherapist
       this.dashBoardServ.getNumOfSpecificEntity(7).subscribe(c=>{
        this.numOfphysiotherapist=c;
        console.log(c);
      });
//******************************signalr connection */

this.connection.start().then(function () {
  console.log('SignalR Connected!');
}).catch(function (err: { toString: () => any; }) {
  return console.error(err.toString());
});
/***************old connection*********************************************** */
// this.connection.on("BroadcastMessage", (comment, type) => {
//   console.log("hi ");
//   console.log(comment,type);
//   this.comment=comment;
//  this.type=type;
// });

this.connection.on("adminListen", (uname,ucomment) => {
  console.log("hi reported ");
//   console.log(comment,type);
 this.comment=ucomment;
  this.name=uname;
  //this.allcomments.push(this.comment);
  console.log(ucomment,uname);
  //alert(ucomment);
 //this.messageService.add({severity:'info', summary: ucomment, detail: uname, sticky: true});

 this.a.success(uname+':'+ucomment);
});
this.connection.on("adminListenLowRate", (uname,ucomment,place_name) => {
  console.log("lowrate reported ");
//   console.log(comment,type);
 this.comment=ucomment;
  this.name=uname;
  //this.allcomments.push(this.comment);
  console.log(ucomment,uname,place_name);
  //alert(ucomment);
 //this.messageService.add({severity:'info', summary: ucomment, detail: uname, sticky: true});

 this.a.success(uname+' Low Rate on =>'+place_name+'with comment'+ucomment);
});
this.connection.on("getCount",(countn)=>{
  console.log(countn);
  this.count=countn;
});

}
}

