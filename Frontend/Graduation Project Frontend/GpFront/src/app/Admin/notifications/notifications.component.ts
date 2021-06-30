import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['../../../assets/css/material-dashboard.css','../../../assets/demo/demo.css']
})
export class NotificationsComponent implements OnInit {
  notify:Notification[]=[];

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.getAllNotification().subscribe(d=>{
      this.notify=d;
      console.log("lololool");
      console.log(this.notify.length);
    });
  }
  
  DeleteComment( id:number): void {
    // var r = confirm(" هل انت متأكد من حذف التعليق من صفحه الاشعارات ");
   
    // if (r == true) {
      this.notificationService.DeleteNotification(id)
      .subscribe(
        response => {
          //alert("تم حذف التعليق بنجاج");
          location.reload();
        },
        error => {
          console.log(error);
        });
      }
      // else{
      //   alert("تم إلغاء عمليه الحذف");
      // }
    //}  

  

}

