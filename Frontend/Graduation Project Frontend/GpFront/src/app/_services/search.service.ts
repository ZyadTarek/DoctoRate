//import { MapsAPILoader } from '@agm/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { param } from 'jquery';
import { GoogleRetData } from '../_models/google-ret-data';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient ) { }

  getSearchPlaces(query:string)
  {

    const params = new HttpParams().set('searchString',query)
    var x = this.http.get<GoogleRetData>("https://localhost:44392/api/placeSearch/",{params:params});
    //console.log(x);
    // var headers = new HttpHeaders({
    //   "Content-Type": "application/json",
    //   "Accept": "application/json"
    // });

    // var x = this.http.post<any>('https://localhost:44392/api/placeSearch',JSON.stringify(query),{headers:headers});

    return x;
  }

  // morePlaces(pageToken)
  // {

  //   //const params = new HttpParams().set('pageToken','xxx')

  //   var x = this.http.post<any>('https://localhost:44392/api/placeSearch'+"?pageToken="+pageToken,{});

  //   console.log(x);
  //   return x;

  // }

  morePlaces(pageToken)
  {
    //const headers = new HttpHeaders().set('Content-Type', 'application/json');
    //const params = new HttpParams().set('pageToken','xxx')
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });

    var x = this.http.post<GoogleRetData>('https://localhost:44392/api/placeSearch',JSON.stringify(pageToken),{headers:headers});
    return x;

  }



}
