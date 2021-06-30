import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Offer } from 'src/app/_models/offer';
import { Place } from 'src/app/_models/place';
import { NotificationService } from 'src/app/_services/notification.service';
import { OfferService } from 'src/app/_services/offer.service';
import { PlaceService } from 'src/app/_services/place.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['../../../assets/css/material-dashboard.css','../../../assets/demo/demo.css']
})
export class OffersComponent implements OnInit {

  offers:Offer[]=[];
   offer:Offer = new Offer();
// offer:any;
  count:number=0;
  notify:Notification[]=[];
  place:Place=new Place();

  constructor(public servPlace:PlaceService,  public serv:OfferService,private notificationService: NotificationService,private ac:ActivatedRoute,private router:Router) { 
   
  }
  
  ngOnInit(): void {
    this.ac.params.subscribe(a=>{
            this.servPlace.getPlaceById(a.id).subscribe(d=>{
            this.offer=d;
            })
          })
    this.notificationService.getAllNotification().subscribe(d=>{
      this.notify=d;
      this.count=this.notify.length
    });
    

    this.serv.getAllOffer().subscribe(d=>{
     this.offers=d;
     // this.changeDetection.detectChanges();
      console.log(this.offers);
     
    });}
    DeleteOffer( id:number): void{

      console.log(id);
      this.serv.DeleteOffer(id).subscribe(d=>{
        
      });
      location.reload();

    }
}
// import { placesService } from '../../_service/placesService';
// import { Component, OnInit } from '@angular/core';
// import { places } from 'src/app/_models/places';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-dept-edit',
//   templateUrl: './dept-edit.component.html',
//   styleUrls: ['./dept-edit.component.css']
// })
// export class DeptEditComponent implements OnInit {

//   constructor(private serv:placesService,private ac:ActivatedRoute,private router:Router) { }
// deptedited:places=new places();
//   ngOnInit(): void {

//     this.ac.params.subscribe(a=>{
//       this.serv.getById(a.id).subscribe(d=>{
//         this.deptedited=d;

//       })
//     })
//   }
//   saveedit(){
//     this.ac.params.subscribe(a=>{
//     this.serv.UpdateDept(this.deptedited,a.id).subscribe(d=>{

//       console.log(d);
//        this.router.navigateByUrl("/places1");
//      })
//     })

//   }

// }

// }