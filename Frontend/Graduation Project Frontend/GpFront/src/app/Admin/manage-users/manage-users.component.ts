//import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'src/app/_models/user';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['../../../assets/css/material-dashboard.css','../../../assets/demo/demo.css']
})
export class ManageUsersComponent implements OnInit {
  users:User[]=[];
  filteredUsers:User[]=[];
  private  _searchterm:string="";
private  _filterterm:string="";
count:number=0;
notify:Notification[]=[];
  

  
  constructor(public messageService:MessageService, public confirmationService:ConfirmationService,public serv:DashboardService,private notificationService: NotificationService) { }
  
  ngOnInit(): void {
    
this.notificationService.getAllNotification().subscribe(d=>{
  this.notify=d;
  this.count=this.notify.length
});
    this.serv.getAllUsers().subscribe(d=>{
      this.users=d;
      this.filteredUsers=d;
      console.log(d);
    });
  }
  get searchterm():string{
    return this._searchterm;
  }
  set searchterm(value:string){
    this._searchterm=value;
    this.filteredUsers=this.filtered_users(value);
  }
  filtered_users(s:string){
    return this.users.filter(users => users.userName?.toLowerCase().indexOf(s.toLowerCase()) !== -1);
  }
  confirm(event: Event,id:string, str){
    if(str == "Delete"){
    this.confirmationService.confirm({
        target: event.target,
        message: 'هل انت متأكد من حذف هذا المكان  ؟',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel:"نعم",
        rejectLabel:"لا",
        acceptButtonStyleClass:"p-button-danger",
        rejectButtonStyleClass:"p-button-secondary",
        accept: () => {
        this.Delete(id);
        setTimeout(()=>{
          window.location.reload();
        },500)
         
           
        },
        reject: () => {
            //reject action
            this.messageService.add({severity:'info', summary:'تم الغاءعملية الحذف', detail:'تم الحذف من المفضلات'});

        }
    });
}
  else if(str == "Upgrade"){
    this.confirmationService.confirm({
      target: event.target,
      message: 'هل انت متأكد من ترقية هذا المستخدم ؟',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:"نعم",
      rejectLabel:"لا",
      acceptButtonStyleClass:"p-button-success",
      rejectButtonStyleClass:"p-button-secondary",
      accept: () => {
     this.Upgrade(id); 
     setTimeout(()=>{
      window.location.reload();
    },500)
    
       
         
      },
      reject: () => {
          //reject action
          this.messageService.add({severity:'info', summary:'فشل الترقية', detail:'تم الغاءعملية الترقية'});

      }
  });
  }
  }  
 
  
  Delete( id:string): void {
  //  var r = confirm(" هل انت متأكد من حذف المستخدم ");
   
    //if (r == true) {
      this.serv.DeleteUser(id)
      .subscribe(
        response => {
        // alert("تم حذف المستخدم بنجاج");
         // location.reload();
         this.messageService.add({severity:'info', summary:'تم الحذف', detail:'تم حذف المستخدم بنجاج'});

        },
        error => {
          console.log(error);
        });
     // }
      // else{
      //   alert("تم إلغاء عمليه الحذف");
      // }
    }  
    Upgrade( id:string): void {
    //var r = confirm(" هل انت متأكد من ترقيه المستخدم الي مشرف ");
   
  //  if (r == true) {
      this.serv.UpgradetoAdmin(id)
      .subscribe(
        response => {
         this.messageService.add({severity:'success', summary:'تمت الترقية', detail:'تم الترقية بنجاح '});

         // alert("تم ترقيه المستخدم بنجاج");
         // location.reload();

        },
        error => {
          console.log(error);
        });
//      }
      // else{
      //   alert("تم إلغاء عمليه الترقيه");
      // }
    }  
}
