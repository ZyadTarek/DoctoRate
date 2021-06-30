
import { UserData } from './../_models/user-data';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Place } from '../_models/place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  place:Place = new Place();
  constructor(private http:HttpClient) { }
  getallplaces(){//done
    return this.http.get<Place[]>("https://localhost:44392/api/places");
  }
  gettopdoc(){//done
    return this.http.get<Place[]>("https://localhost:44392/api/places/GetToprate_doc");
  }
  gettophos(){//done
    return this.http.get<Place[]>("https://localhost:44392/api/places/GetToprate_hos");
  }
  gettoppharm(){//done
    return this.http.get<Place[]>("https://localhost:44392/api/places/GetToprate_pharmacy");
  }

  getPlaceById(id:string){
    return this.http.get("https://localhost:44392/api/places/GetplaceFromDB/"+id);
  }

Updateplace(place:Place,id:string){//done
  return this.http.put("https://localhost:44392/api/places/"+id,place);

}
Deleteplace(id:string){
return this.http.delete("https://localhost:44392/api/places/"+id);
}
getPlaceByIdFromGoogle(id:string){
  return this.http.get("https://localhost:44392/api/places/"+id);
}

  savePlace(place:any){
    return this.http.post("https://localhost:44392/api/places/AddPlace",place);//edited because i added/action in api ===>needed to check it
  }
  public saveUserReview(data:UserData){
    // const params = new HttpParams()
    // .set('data', data);
    // console.log(params);


    var headers = new HttpHeaders({

      "Content-Type": "application/json",

      "Accept": "application/json"

    });
    console.log("user servece rate"+ data.rate)

  //    return this.http.post("https://localhost:44392/api/places",{params},{headers:headers});
  //  }
      //return this.http.post("https://localhost:44392/api/places"+"?data="+data,{});
      return this.http.post("https://localhost:44392/api/places",JSON.stringify(data),{headers:headers} );
    // return this.http.post("https://localhost:44392/api/places",{params});
    }

  }

