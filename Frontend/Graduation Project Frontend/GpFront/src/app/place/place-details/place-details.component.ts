import { UserData } from './../../_models/user-data';
import { CommentService } from './../../_services/comment.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router,Routes } from '@angular/router';
import { Client } from 'src/app/_models/client';
import { Place } from 'src/app/_models/place';
import { ClientService } from 'src/app/_services/client.service';
import { PlaceService } from 'src/app/_services/place.service';
import { NotificationService } from '../../_services/notification.service';
import * as signalR from '@microsoft/signalr';
import { NotificationCountResult, NotificationResult } from '../../_models/notification';

import {MessageService} from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { map, catchError } from 'rxjs/operators';
import { Console } from 'console';
import { TypesService } from 'src/app/_services/types.service';
import { MapsAPILoader } from '@agm/core';
/// <reference path="<relevant path>/node_modules/@types/googlemaps/index.d.ts" />
@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit {
  place:Place = new Place();
  Data:UserData[]=[];
  userRev:UserData;
 //client:Client = new Client("7316918e-99f1-421a-8b2b-eb59a03fcc39","zyad123");
  val:number;
  Commentval:number;
  Userval:number;
  addval:number;
  arr:[];
  arr2:string[];
  arrlen:number;
  yourComment:string;
  addComment:string;
  valu:boolean=true;
  comments;
  dataob;
  show = false;
  public connection!: signalR.HubConnection;
  closeModal: string="";

  notification: NotificationCountResult=new NotificationCountResult() ;
  user:string="";
  count:number=0;
  messages: Array<NotificationResult>=new Array<NotificationResult>();
  @Input() id: string | undefined;
    private element: any;
 comment: any;
 type: any;

  constructor(
    private placeService:PlaceService,
    private clientService:ClientService,
    private ar:ActivatedRoute,
    //private route:Router,
    private messageService: MessageService,
    //httpClient: HttpClient,
    private commentService:CommentService,
    private router:Router,
    private notificationService: NotificationService,
    private typeSer:TypesService,
    private mapsAPILoader: MapsAPILoader,
    private changeDetection: ChangeDetectorRef

  ) {
    // this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyBD77-EivcGrFUZAn0sLFA33xachzYoUkw', 'callback')
    //   .pipe(
    //     map(() => true),
    //     catchError(() => of(false)),
    //   );
  }
  // apiLoaded: Observable<boolean>;


  // options: google.maps.MapOptions = {
  //   center: {lat: 64.48113363780652, lng: 16.33826752001327},
  //   zoom: 4
  // };
  client:Client = new Client();

  // lat:any;
  // long:any;
  googleMapType:any;
  viewMap:boolean = false;
  favBtnTitle = " أضف الي المفضل";
  placeSaved = false;
  userAvailable = false;
  favIcon = "pi pi-star";
  userFav:any;
  display: boolean = false;
  //id:any;
  currentUser:any;
  hasSchedule = true;
  token:any = localStorage.getItem('token');

  ngOnInit(): void {
  //  this.ar.params.subscribe(p=>{
  //    this.placeService.getPlaceById(p.id).subscribe(a=>{
  //      this.place = a;
  //      console.log(this.place);
  //     //  this.val=this.place.result.rating;
  //      this.place.result.reviews.forEach(element => {
  //       this.Commentval=element.rating;
  //       //console.log("aaaaaaaaaaaaaaa");

  //      });

  //      this.arr=this.place.result.reviews;
  //      this.arrlen=this.arr.length;
  //      console.log("comment rate"+this.Commentval);
  //      // get comment

  //    })
  //  })
  //  this.commentService.getCommentsByPlaceId(this.place.result.place_id,2.6,5).subscribe(d=>{this.Data=d;

  //   this.Data.forEach(element => {
  //     this.val=element.finaltotalRate;
  //   });;
  //   console.log("commenddddddts="+this.Data);
  //   console.log("val="+this.val);
  // });
  const promise = new Promise((resolve,reject)=>{
    this.IsThereAnyUser();
    resolve(this.getPlace());
  });
  promise.then((res)=>{
   this.clientService.getUser();
   setTimeout(()=>{
   this.currentUser = this.clientService.currentUser;
   console.log(this.currentUser);
   this.client.id = this.currentUser?.user.id;
   this.client.username = this.currentUser?.username;
   console.log(this.client);
   console.log(this.currentUser.user);
   console.log("Get Comment");
   var rat = this.place.result.rating? this.place.result.rating : 0;
   var lenn = this.arrlen? this.arrlen:0;
   this.commentService.getCommentsByPlaceId(this.id,rat,lenn).subscribe(d=>{this.Data=d;

    this.Data?.forEach(element => {
      this.val=element.finaltotalRate;
    });;
    console.log("commenddddddts="+this.Data);
    console.log("val="+this.val);


  });
 },500)

  });
  promise.catch((err)=>{
  });
  promise.finally(()=>{
  setTimeout(()=>{
   this.IsSavedToFavorites();
  },550)

  });


  /****************************SignalR**********************************/
  this.connection = new signalR.HubConnectionBuilder().withUrl('https://localhost:44392/notify').build();
  //start signal connection*********************
  this.connection.start().then(function () {
    console.log('SignalR Connected!');
  }).catch(function (err: { toString: () => any; }) {
    return console.error(err.toString());
  });
}

getPlace(){
  this.ar.params.subscribe(p=>{
    this.id = p.id;
   this.placeService.getPlaceByIdFromGoogle(p.id).subscribe(a=>{
    // console.log(a);
     this.place = a;
     this.getImage(this.place.result);
     //alert(this.place.result.place_id);
     this.id = this.place.result.place_id;
     this.val=this.place.result.rating;
     if(this.place.result.opening_hours != null) this.hasSchedule = true;
     else this.hasSchedule = false;
     this.place.result.reviews.forEach(element => {
      this.Commentval=element.rating;
     });

     this.arr=this.place.result.reviews;
     this.arrlen=this.arr.length;
     console.log("comment rate"+this.Commentval);

   })

 })
}
getCurrentUser(){
  this.clientService.getCurrentUser(this.token).subscribe(a=>{
    this.currentUser = a;
    this.clientService.currentUser = a;
    console.log(a);
  });
}
IsThereAnyUser(){
  console.log("Is There any user ? "+ this.token);
  if(this.token == null) this.userAvailable = false;
  else this.userAvailable = true;
  console.log("user available: "+this.userAvailable);
}
IsSavedToFavorites(){
 // alert(this.userFav);
  this.clientService.getUserFav(this.client.id,this.id).subscribe(a=>{
    this.userFav = a;
    console.log("Fav: "+this.userFav.ClientId + this.userFav.place_id);
    if(this.userFav == undefined ||this.userFav == null) {
      this.favBtnTitle = "أضف الي المفضل";
      this.favIcon = "pi pi-star";
      this.placeSaved = false;
      console.log("Not Saved!!!!!!");
    }
    else{
      this.favBtnTitle = "مفضله";
      this.favIcon = "pi pi-check";
      this.placeSaved = true;
      console.log("Saved!!!!!!");
    }
  });
  //alert(this.userFav);

}

  addSingle() {
    this.messageService.add({severity:'success', summary:'!!! تم الاضافه بنجاح', detail:`${this.place.result.name} saved successfully to your favorites.`});
}

addMultiple() {
    this.messageService.addAll([{severity:'success', summary:'Saved Successfully!', detail:`${this.place.result.name} saved successfully to your favorites.`},
                                {severity:'info', summary:'Info Message', detail:'Via MessageService'}]);
}

clear() {
    this.messageService.clear();
}
IsOpen(isopen:boolean){
if(isopen) return "نعم";
else return "لا";
}
showDialog() {
  this.display = true;
}
Save(){
  if(this.userAvailable == false){
    this.showDialog();
   }
   else{
  let place = {
    place_id: this.place.result.place_id,
    name: this.place.result.name,
    type:this.getType(this.place.result),
    rate:this.place.result.rating,
    icon:this.place.result.icon
  }
  const savePlace= {
    next:x=>{
      console.log("Place Saved Successfuly!" , place.type);
    //this.route.navigateByUrl("/employees/details/"+this.emp.id)
    this.clientService.AddToClientFavorites(clientFav).subscribe(addFavObserver);
    console.log(clientFav,addFavObserver);
    this.favBtnTitle = "Saved";
    this.favIcon = "pi pi-check";
    this.placeSaved = true;
   },
    error:err=>{console.log(err.error);
      // this.clientService.AddToClientFavorites(clientFav).subscribe(addFavObserver);
      // console.log(clientFav,addFavObserver);
    },
  }
  this.placeService.savePlace(place).subscribe(savePlace);
  const addFavObserver={
    next:(x:any)=>{this.addSingle()
  },
    error: (err: any)=>console.log(err)
  }
   let clientFav = {
     place_id:this.place.result.place_id,
     clientId:this.client.id,
   }
  }
 }

 getType(place):number
  {
    console.log("type",place.types[0]);
    var id:number=4;
    this.typeSer.getTypesForAdmin().forEach(item=>{
      if(place.types.includes(item.type_name.toLowerCase())){id=item.type_id;}
      //else{id=4;}
    })
    return id;
  }
 submit()
 {
  if(this.userAvailable == false){
    this.showDialog();
   }
   else{

  let place = {
    place_id: this.place.result.place_id,
    name: this.place.result.name,
    type:this.getType(this.place.result),
    rate:this.place.result.rating,
    icon:this.place.result.icon
  }
  console.log(this.Userval);
  if(this.Userval==1){
    console.log("invoike");
    this.connection.invoke("lowRate",this.currentUser.username,this.yourComment,this.place.result.name);
  }
  const savePlace= {
    next:x=>{
      console.log("Place Saved Successfuly!");
      console.log(this.client.id);
    //this.route.navigateByUrl("/employees/details/"+this.emp.id)
    this.userRev=new UserData(this.yourComment,this.Userval,this.place.result.place_id,null,null,null,this.client.id);
    this.placeService.saveUserReview(this.userRev).subscribe(a => {console.log(a);
      //this.router.navigateByUrl("/test");
      window.location.reload();
      // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      // this.router.onSameUrlNavigation = 'reload';
      // this.router.navigate(['/test']);
      // this.router.routeReuseStrategy.shouldReuseRoute = function () {
      //   return false;
      // };
      });
   },
    error:err=>{console.log(err.error);
      // this.clientService.AddToClientFavorites(clientFav).subscribe(addFavObserver);
      // console.log(clientFav,addFavObserver);
    },
  }
  this.placeService.savePlace(place).subscribe(savePlace);

   //this.valu=false;
   //this.addComment=this.yourComment;
  //  this.yourComment=null;
  // this.addval=this.Userval;
   //console.log("hiiiiii");
   //console.log(this.place.result.place_id);
   //this.router.navigateByUrl("/test");


    // this.router.navigateByUrl("/placeDetails");
  //console.log("userdataaa"+this.userRev.Ucomment);
  // this.placeService.saveUserReview(this.place.result.place_id,this.yourComment,this.Userval).subscribe();
 }
}



invokeHub(rev_author_name:string,rev_text:string){
this.connection.invoke("reportComment",rev_author_name,rev_text);


 }

 getImage(p)
 {
  var typeID= this.getType(p);
  p.icon="../../assets/img/"+ this.typeSer.getTypes().find(a=>a.type_id==typeID).img_src;
  if(p.photos)
  {
    var request = {
      placeId: p.place_id,
      fields: ['photo']
    };

    this.mapsAPILoader.load().then(() => {
      const service = new google.maps.places.PlacesService(document.createElement('div'));
      service.getDetails(request, (results , status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          console.log(p);
          if(results)
          {
            //console.log("r",results);
            p.icon = results.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100});
            this.changeDetection.detectChanges();
          }

        }
      });
    });

  }
  if(!p.icon)
  {
    //var typeID= this.getType(p);
    p.icon="../../assets/img/"+ this.typeSer.getTypes().find(a=>a.type_id==typeID).img_src;
  }
 }

 getProfilePicture(){
  if(this.currentUser.user.user_Image == null){

    return false;
  }
  else return true;
  // this.data.user.user_Image;
}

}
