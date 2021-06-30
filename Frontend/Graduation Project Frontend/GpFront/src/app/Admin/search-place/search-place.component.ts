import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../../_services/place.service';
import { Place } from 'src/app/_models/place-admin';
import { NgbModal,NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { TypesService } from 'src/app/_services/types.service';
import { Type } from 'src/app/_models/type';
import { AlertifyService } from './../../_services/alertify.service';
import { Offer } from 'src/app/_models/offer';
import { OfferService } from 'src/app/_services/offer.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { ConfirmationService, MessageService } from 'primeng/api';



@Component({
  selector: 'app-search-place',
  templateUrl: './search-place.component.html',
  styleUrls: ['../../../assets/css/material-dashboard.css','../../../assets/demo/demo.css']
})
export class SearchPlaceComponent{
  public  a: AlertifyService;


  constructor(private messageService:MessageService, private confirmationService:ConfirmationService,private notificationService: NotificationService,public serv:PlaceService,public servOffer:OfferService, notifierService: AlertifyService ,private modalService: NgbModal,config: NgbModalConfig,private ac:ActivatedRoute,    private typeSer:TypesService) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.a = notifierService
  }
  p:Place[]=[];
  filteredplaces:Place[]=[];
private  _searchterm:string="";
private  _filterterm:string="";
public filterValue:number=0;
placetoEdit:Place=new Place();
placetodel:Place=new Place();
count:number=0;
notify:Notification[]=[];
AddOffer:any;
//Filte by type 
types:Type[]=this.typeSer.getTypesForAdmin();
selectedType:number=0;



// public listItems: Array<string> = [
//   "1",
//   "2",
//   "3",
//   "4",

// ];
get searchterm():string{
  return this._searchterm;
}
set searchterm(value:string){
  this._searchterm=value;
  this.filteredplaces=this.filtered_places(value);
}
get filterterm():string{
  return this._filterterm;
}
set filterterm(value:string){
  this._filterterm=value;
  this.filteredplaces=this.filtered_loc(value);
}
filtered_places(s:string){
  return this.p.filter(p => p.name?.toLowerCase().indexOf(s.toLowerCase()) !== -1);
}
filtered_loc(s:string){
  return this.p.filter(p => p.place_id?.toLowerCase().indexOf(s.toLowerCase()) !== -1);
}
  ngOnInit(): void {
    this.serv.getallplaces().subscribe(d=>{
      this.p=d;
      this.filteredplaces=d;//added new
      console.log(d);
    });
    this.notificationService.getAllNotification().subscribe(d=>{
      this.notify=d;
      this.count=this.notify.length
    });

  }
replaceType(id:number){
  return this.types.find(a=>a.type_id==id).type_name_ar;
}

  open(content: any,id:string) {


      this.serv.getPlaceById(id).subscribe(d=>{
        this.placetoEdit=d;

  });

    this.modalService.open(content);

  }
 
  saveedit(){
    this.serv.Updateplace (this.placetoEdit,this.placetoEdit.place_id).subscribe(d=>{

        console.log(d);
       });
       location.reload();


  }

  confirm(event: Event,id:string){
    this.confirmationService.confirm({
        target: event.target,
        message: 'هل انت متأكد من حذف هذا المكان  ؟',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel:"نعم",
        rejectLabel:"لا",
        acceptButtonStyleClass:"p-button-danger",
        rejectButtonStyleClass:"p-button-secondary",
        accept: () => {
        this.DeletePlaces(id);
         
            //this.RemoveFromFavorites(id);
           
        },
        reject: () => {
            //reject action
            this.messageService.add({severity:'info', summary:'تم الغاءعملية الحذف', detail:'تم الحذف من المفضلات'});

        }
    });
}  

 DeletePlaces(id:string):void{

  //  var r = confirm("هل انت متاكد من حذف هذا المكان");
//var r=this.a.confirm("هل انت متاكد من حذف هذا المكان");

 //   if (r == true) {
      this.serv.Deleteplace(id)
      .subscribe(
        response => {
          //this.a.error("تم الحذف")
          //alert("تم الحذف");
          //location.reload();
          this.messageService.add({severity:'info', summary:'تم الحذف', detail:'تم الحذف '});
          setTimeout(()=>{
            window.location.reload();
          },500)
        },
        error => {
          this.messageService.add({severity:'error', summary:'فشل الحذف', detail:'لا يمكنك حذف هذا المكان'});
        });
   //   }
     // else{
        //this.a.success("تم الغاء الحذف")
        //alert("تم الغاء الحذف");
      //}


  }
   close()
 {

 this.modalService.dismissAll()
 }
 search()
 {
   console.log("lololololo");
   this.filteredplaces= this.p.filter(s=> s.type==this.filterValue);
}
//Add Offer
openOffer(Offer: any,id:string) {


  this.serv.getPlaceById(id).subscribe(d=>{
    this.AddOffer=d;
   
  

});

this.modalService.open(Offer);

}
SaveOffer(){
this.servOffer.addOffer(this.AddOffer).subscribe(d=>{

    console.log(d);
   });
   this.a.success("تم اضافه العرض");
   close();
   
}
}





