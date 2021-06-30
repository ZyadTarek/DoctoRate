import { Place } from './../_models/place';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';

import { MapsAPILoader } from '@agm/core';
import { ChangeDetectorRef } from '@angular/core';
import { City } from 'src/app/_models/city';
import { Government } from 'src/app/_models/government';
import { PlaceFeatures } from 'src/app/_models/place-features';
import { Type } from 'src/app/_models/type';
import { CitiesService } from 'src/app/_services/cities.service';
import { SearchService } from 'src/app/_services/search.service';
import { TypesService } from 'src/app/_services/types.service';
import { NgwWowService } from 'ngx-wow';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import { PlaceService } from '../_services/place.service';

import { Specialization } from '../_models/specialization';
import { SpecializationService } from '../_services/specialization.service';
import { OfferService } from '../_services/offer.service';
import { Offer } from '../_models/offer';
//import { AlertifyService } from '../_services/alertify.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private searchSer:SearchService,
    private typeSer:TypesService,
    private citySer:CitiesService,
    //private aler:AlertifyService,
    private specSer:SpecializationService,
    private OfferSer:OfferService,

    private changeDetection: ChangeDetectorRef,
    private mapsAPILoader: MapsAPILoader,
    private wowService: NgwWowService,
    private serv:PlaceService
    ) {
      //this.a=aler;
      this.wowService.init();

    }
doc:Place[]=[]
  ngOnInit(): void {
    this.getOffer();
    this.getLocation();
    this.serv.gettopdoc().subscribe(a=>{
      this.doc=a;
      console.log(this.doc);

    })
    this.serv.gettophos().subscribe(a=>{
      console.log(a);

    })
    this.serv.gettoppharm().subscribe(a=>{
      console.log(a);

    })
  }


  //selected values
  selectedType:number=0;
  searchText:string="";
  selectedGover:string="0";
  selectedCity:string="0";
  selectedSpec:number=0;

  openNowFlag:boolean=false;

  //array
  types:Type[]=this.typeSer.getTypes();
  govers:Government[]=this.citySer.getgovernment();
  cities:City[]=this.citySer.getciyies("0");

  Specializations:Specialization[]=this.specSer.getSpecialization();

  //flags
  //cityFlag:boolean=false;
  moreFlag:boolean=false;
  searchFlag:boolean=false;

  searchRetFlag:boolean=false;

  //query
  queryText:string="";

  pageToken;

  places:PlaceFeatures[];
  display_places:PlaceFeatures[];

  clearFilter()
  {
    this.selectedType=0;
    this.searchText="";
    this.selectedGover="0";
    this.selectedCity="0";
    this.openNowFlag=false;

    this.selectedSpec=0;
  }
  search()
  {
    this.moreFlag=false;
    var query:string="";
    var typesearch:string="";

    //text search
    if(this.searchText!="")
      {query = this.searchText;}

    //type
    var typevalue=this.typeSer.types.find(a=>a.type_id==this.selectedType).type_name;
    if (this.selectedType !=0)
    {
      console.log("!= 0");
      if(this.selectedType==4 || this.selectedType==5)   //lab or Radiology
      {
        query=query+typevalue+" ";
      }
      else
      {
        //console.log("== doc");
        if(this.selectedType==1 && this.selectedSpec!=0) //doctor
        {
          query=query+this.Specializations.find(a=>a.id==this.selectedSpec).spec_name_ar +" ";
        }
        if(query == "")
          {query = typevalue+" "; }
        typesearch="&type="+typevalue.toLowerCase();
      }
    }
    //City
    if(this.selectedGover!="0")
    {
      if(query==""){query="hospital pharmacy "}
      if(this.selectedCity!="0")
      {
        query=query+this.cities.find(a=>a.id==this.selectedCity).city_name_ar+" ";
      }
      query=query+this.govers.find(a=>a.id==this.selectedGover).governorate_name_en+" ";
    }

    if(query!= "")
    {
      this.queryText=query+typesearch;
      if(this.openNowFlag) //open place only
      {
        this.queryText=this.queryText+"&opennow";
      }
      console.log("query= "+this.queryText);
      this.getData(this.queryText);
    }


  }

  // show 6 by 6
  page_number:number=1;
  nextFlag:boolean=false;
  prevFlag:boolean=false;
  paginate() {
    var page_size=6;
    if(this.page_number==1){this.prevFlag=true}
    else {this.prevFlag=false;}

    if(this.places.length/page_size < this.page_number){this.nextFlag=true;}
    else{this.nextFlag=false;}

    // send token to see more if exist
    var x = this.places.slice((this.page_number - 1+1) * page_size, (this.page_number+1) * page_size);
    if(x.length <6 && this.moreFlag)
    {
      this.seeMore();
      console.log(x.length);
      this.nextFlag=false;
    }
    if(x.length ==0 && !this.moreFlag){
      this.nextFlag=true;
    }
    this.display_places = this.places.slice((this.page_number - 1) * page_size, this.page_number * page_size);
    console.log(this.display_places);
  }
  next()
  {
    this.page_number+=1;
    this.paginate();
  }
  prev()
  {
    this.page_number-=1;
    this.paginate();
  }

  getData(query)
  {
    this.page_number=1;
    this.searchSer.getSearchPlaces(query).subscribe(a=>{
      if(a.results.length!=0)
      {
        this.searchFlag=true;
        var healthPlaces = a.results.filter(function(item){
        //console.log(item);

          return item.types.includes("health");
        })
        this.places=healthPlaces;
        if(this.places.length < 3 && a.next_page_token!= null)
        {
          this.pageToken=a.next_page_token;
          this.seeMore();
        }
        else
         {if(a.next_page_token ){this.moreFlag=true;  this.pageToken=a.next_page_token;}}
        //this.changeDetection.detectChanges();
        //console.log(this.places);
        //console.log(a);

        this.getImage(this.places);
        this.paginate();

      }
      else
      {
        this.searchRetFlag=true;
        this.places=[];

      }

    })
  }

  changeGover()
  {

    this.cities=this.citySer.getciyies(this.selectedGover);

  //console.log(this.selectedGover);
  }

  seeMore()
  {

    this.searchSer.morePlaces(this.pageToken).subscribe(data=>{
       console.log(data);
       var healthPlaces = data.results.filter(function(item){
        return item.types.includes("health");
      })

      this.getImage(healthPlaces);
      //console.log("dat",dat);
      this.places=this.places.concat(healthPlaces);
      //console.log("see more",this.places);

      this.pageToken=data.next_page_token;
      if(this.places.length < 3 && this.pageToken!= null)
        {
          this.seeMore();
        }
      if(data.next_page_token == null)
      {
        this.moreFlag=false;
        if(this.places.length == 0)
        {this.searchRetFlag=true;}
      }

    });
  }
  /*xx(){
this.a.success("Ok");
  console.log("show");
  }*/

  getImage(array:PlaceFeatures[]) {
    array.forEach(p=>{
      p.rating=Math.round(p.rating);
      //open hours
      if(p.opening_hours?.open_now == true){p.opening_hours="المكان مفتوح" ; p.color="#ccffcc"}
      else if(p.opening_hours?.open_now == false){p.opening_hours="المكان مغلق" ; p.color= "#ffcccc";}
      else {p.color="#cce6ff"}
      //photoes
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
        var typeID= this.getType(p);
        p.icon="../../assets/img/"+ this.types.find(a=>a.type_id==typeID).img_src;
      }
    })
  }

  getType(place:PlaceFeatures):number
  {
    console.log("type",place.types[0]);
    var id:number=4;
    this.types.forEach(item=>{
      if(place.types.includes(item.type_name.toLowerCase())){id=item.type_id;}
      //else{id=4;}
    })

    return id;
  }
  /////////////home page
  public selCard(type:string)
  {
    var query = type+" &type="+type;
    this.getData(query);
  }
  public selOther()
  {
    var query = "Laboratory or Radiology center";
    this.getData(query);
  }

  ///// recommendation
  offers:Offer[] ;
  getOffer()
  {
    this.OfferSer.getThreeOffer().subscribe(a=>
      {
        a.forEach(item =>
          {
            item.img_src= "../../assets/img/"+ this.types.find(a=>a.type_id==item.type).img_src;
          });
        this.offers = a;
      });
  }

  /// near places
  UserLat;UserLng;
  allowLocationFlag:boolean=false;
  getLocation()
  {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position ) => {
          if (position) {
              this.UserLat = position.coords.latitude;
              this.UserLng = position.coords.longitude;
              console.log(position)

              this.getNearPlaces();
              this.allowLocationFlag=true;
          }
          else
          {
            this.allowLocationFlag=false;
          }
      })
  }
  }

  nearPlaces:PlaceFeatures[];
  getNearPlaces()
  {
    this.OfferSer.getNearPlaces(this.UserLat,this.UserLng).subscribe(a=>
      {
        this.nearPlaces=a;
        //console.log(a);
      });
  }


}
