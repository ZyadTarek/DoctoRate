import { MapsAPILoader } from '@agm/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { City } from 'src/app/_models/city';
import { Government } from 'src/app/_models/government';
import { PlaceFeatures } from 'src/app/_models/place-features';
import { Type } from 'src/app/_models/type';
import { CitiesService } from 'src/app/_services/cities.service';
import { SearchService } from 'src/app/_services/search.service';
import { TypesService } from 'src/app/_services/types.service';



@Component({
  selector: 'app-place-search',
  templateUrl: './place-search.component.html',
  styleUrls: ['./place-search.component.css']
})

export class PlaceSearchComponent implements OnInit {

  lat;lng;

  getLocation()
  {
    if (navigator.geolocation) {  
      navigator.geolocation.getCurrentPosition((position ) => {  
          if (position) {  
              this.lat = position.coords.latitude;  
              this.lng = position.coords.longitude;  
              console.log(position)
          }
      })  
  }  
  }

  // items:PlaceFeatures[]=[
  //   {name: "صيدليه طارق مهدى دمنهور", place_id: "ChIJ6xNaJi9r9hQR4gTc-6RUViU", icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/pharmacy-71.png", formatted_address: "الجيش المصري، طاموس، قسم دمنهور، البحيرة", rating: "0",opening_hours:null ,photos:null}
  //   ,{name: "صيدليه د. حسام وعمرو البغدادي", place_id: "ChIJQ6Kk7pJr9hQRi81GlFz8v0E", icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/pharmacy-71.png", formatted_address: "خلف الدارس، طاموس، قسم دمنهور، البحيرة", rating: "0",opening_hours:null ,photos:null}
  //   ,{name: "صيدلية المتوسطة", place_id: "ChIJdd30zrdr9hQRYER_AS79lh4", icon: "https://maps.googleapis.com/maps/api/place/js/Phot…aSyBD77-EivcGrFUZAn0sLFA33xachzYoUkw&token=119819", formatted_address: "نقرها، قسم دمنهور، البحيرة", rating: "5",opening_hours:null ,photos:null}
  //   ,{name: "صيدلية دكتور هادي", place_id: "ChIJdbj9AjRr9hQRd65doKs25HQ", icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/pharmacy-71.png", formatted_address: "سعد زغلول، طاموس، قسم دمنهور، البحيرة", rating: "5",opening_hours:null ,photos:null}
  //   ,{name: "صيدلية عثمان", place_id: "ChIJzQCD2blr9hQRcFY0vi6oAlg", icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/pharmacy-71.png", formatted_address: "طاموس، قسم دمنهور، البحيرة", rating: "0",opening_hours:null ,photos:null}
  //   ,{name: "صيدلية خميس الشعر", place_id: "ChIJg5gsXahr9hQRgum_PZ4snPY", icon: "https://maps.googleapis.com/maps/api/place/js/Phot…zaSyBD77-EivcGrFUZAn0sLFA33xachzYoUkw&token=26579", formatted_address: "طاموس، قسم دمنهور،،, طاموس، قسم دمنهور، البحيرة", rating: "0",opening_hours:null ,photos:null}
  //   ,{name: "صيدلية النور", place_id: "ChIJdd30zrdr9hQRN4Je5NcguKE", icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/pharmacy-71.png", formatted_address: "نقرها، قسم دمنهور، البحيرة", rating: "0",opening_hours:null ,photos:null}
  //  ]

  constructor(
    private searchSer:SearchService,
    private typeSer:TypesService,
    private citySer:CitiesService,
    private changeDetection: ChangeDetectorRef,
    private mapsAPILoader: MapsAPILoader,
  ) { }

  ngOnInit(): void {
  }

  //selected values
  selectedType:number=0;
  searchText:string="";
  selectedGover:string="0";
  selectedCity:string="0";

  openNowFlag:boolean=false;

  //array
  types:Type[]=this.typeSer.getTypes();
  govers:Government[]=this.citySer.getgovernment();
  cities:City[]=this.citySer.getciyies("0");

  //flags
  cityFlag:boolean=false;
  moreFlag:boolean=false;

  //query
  queryText:string="";

  pageToken;

  places;

  clearFilter()
  {
    this.selectedType=0;
    this.searchText="";
    this.selectedGover="0";
    this.selectedCity="0";
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
        console.log("== doc");
        if(query == "") 
          {query = typevalue+" "; }
        typesearch="&type="+typevalue.toLowerCase();
      }
    }
    //City
    if(this.cityFlag)   
    {
      if(query==""){query="hospital pharmacy "}
      if(this.selectedCity!="0")
      {
        query=query+this.cities.find(a=>a.id==this.selectedCity).city_name_en+" ";
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

  getData(query)
  {
    this.searchSer.getSearchPlaces(query).subscribe(a=>{       
      this.places=a.results;
      if(a.next_page_token){this.moreFlag=true;  this.pageToken=a.next_page_token;}
      //this.changeDetection.detectChanges();
      console.log(this.places);

      this.getImage(this.places);
    
    })
  }

  changeGover()
  {
    if(this.selectedGover=="0"){this.cityFlag=false;}
    else
    {
      this.cities=this.citySer.getciyies(this.selectedGover);
      this.cityFlag=true;
    }
    //console.log(this.selectedGover);
  }

  seeMore()
  {

    this.searchSer.morePlaces(this.pageToken).subscribe(data=>{
       console.log(data);       
      this.getImage(data.results);
      //console.log("dat",dat);
      this.places=this.places.concat(data.results);

      this.pageToken=data.next_page_token;
      if(data.next_page_token == null){this.moreFlag=false;}

    });
  }


  getImage(array:PlaceFeatures[]) {
    array.forEach(p=>{
      //open hours
      if(p.opening_hours?.open_now == true){p.opening_hours="المكان مفتوح"}
      else if(p.opening_hours?.open_now == false){p.opening_hours="المكان مغلق" }
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
    })
    //return array;
  }
  // getImage(array)
  // {
   
  // }
}
