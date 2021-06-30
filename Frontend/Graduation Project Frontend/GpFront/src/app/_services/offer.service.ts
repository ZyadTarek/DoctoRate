import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Offer } from '../_models/offer';
import { PlaceFeatures } from '../_models/place-features';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http:HttpClient ) { }

  getAllOffer()
  {
    return this.http.get<Offer[]>("https://localhost:44392/api/Offers");
  }

  getThreeOffer()
  {
    return this.http.get<Offer[]>("https://localhost:44392/api/offerThree");
  }

  getNearPlaces(lat,lng)
  {
    const params = new HttpParams().set('lat',lat).set('lng',lng);
    return this.http.get<PlaceFeatures[]>("https://localhost:44392/api/nearPlaces",{params:params});
  }
  addOffer(offer:Offer){
    return this.http.post<Offer>("https://localhost:44392/api/offers1",offer);
  }
  getAllOfferFromDB()
  {
    return this.http.get<Offer[]>("https://localhost:44392/api/offers1");  
  }
  DeleteOffer(id:number): Observable<any> {
    return this.http.delete("https://localhost:44392/api/offers1/"+id);
  }

}
