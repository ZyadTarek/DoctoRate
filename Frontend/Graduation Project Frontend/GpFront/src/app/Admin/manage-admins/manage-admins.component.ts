import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Admin } from 'src/app/_models/admin';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-manage-admins',
  templateUrl: './manage-admins.component.html',
  styleUrls: ['../../../assets/css/material-dashboard.css','../../../assets/demo/demo.css']
})
export class ManageAdminsComponent implements OnInit {

  admins:Admin[]=[];
  admin:Admin=new Admin();
  count:number=0;
notify:Notification[]=[];

  constructor(public messageService:MessageService, public confirmationService:ConfirmationService, public serv:DashboardService,private notificationService: NotificationService) { 
   
  }
  
  ngOnInit(): void {
    this.notificationService.getAllNotification().subscribe(d=>{
      this.notify=d;
      this.count=this.notify.length;
    });
    this.serv.getAllAdmins().subscribe(d=>{
     this.admins=d;
     // this.changeDetection.detectChanges();
     this.admin.userName=this.admin.email=this.admin.password="";
      console.log(this.admins);
     
    });}
    AddAdmin()
    {
     
      this.serv.addAdmin(this.admin).subscribe(a=>{ 
        console.log(a);
      })
      alert(this.admin.userName+"تم اضافته بنجاح ");
       this.admin.userName=this.admin.email=this.admin.password="";
      
      location.reload();
     
    
  }
  confirm(event: Event,id:string){
    this.confirmationService.confirm({
        target: event.target,
        message: 'هل انت متأكد من تحويل المشرف الي مستخدم ',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel:"نعم",
        rejectLabel:"لا",
        acceptButtonStyleClass:"p-button-info",
        rejectButtonStyleClass:"p-button-secondary",
        accept: () => {
        this.ConverTtoUser(id);
          //this.RemoveFromFavorites(id);
          this.messageService.add({severity:'info', summary:'تم عملية الترقيه', detail:' تم عمليه ترقية'});
        },
        reject: () => {
            //reject action
            this.messageService.add({severity:'info', summary:'تم الغاء عملية الترقيه', detail:'تم الغاء عملية الترقيه'});

        }
    });
}  
  ConverTtoUser( id:string): void {
   // var r = confirm(" هل انت متأكد من تحويل المشرف الي مستخدم ");
   
    //if (r == true) {
      this.serv.FromAdminToUser(id)
      .subscribe(
        response => {
      //    alert("تم تحويل المشرف لمستخدم ");
        //  location.reload();
        
        },
        error => {
          console.log(error);
        });
      //}
      //else{
        //alert("تم إلغاء عمليه التحويل");
      //}
    }  
}