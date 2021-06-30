import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../_models/client';
import { Place } from '../_models/place';
import { User } from '../_models/user';



@Injectable({
  providedIn: 'root'
})
export class ClientService {

  place:Place = new Place();
  client:Client = new Client();
  public currentUser:any;
  //token:any = localStorage.getItem('token');
  constructor(private http:HttpClient) { }
  AddToClientFavorites(clientFavorite:any){
    return this.http.post("https://localhost:44392/api/UserFavorites/",clientFavorite);
  }
  getUserFav(ClientId:string,place_id:string){
    const params = new HttpParams().set('ClientId',ClientId).set('place_id',place_id)
    console.log("service: "+place_id);
    return this.http.get("https://localhost:44392/api/UserFavorites",{params:params});
  }
  getCurrentUser(token:any){
    const tokenParams = new HttpParams().set('token',token);

    return this.http.get("https://localhost:44392/api/Authenticate/User",{params:tokenParams});
  }
    getallUsers(){//done
      return this.http.get<User[]>("https://localhost:44392/api/Admin");
    }
  getUserFavorites(ClientId:string){
    ///api/UserFavorites/{ClientId}
    const params = new HttpParams().set('ClientId',ClientId);

    return this.http.get("https://localhost:44392/api/UserFavorites/GetFavorites",{params:params});

  }
  RemoveUserFavorite(ClientId:string,place_id:string){
    const params = new HttpParams().set('ClientId',ClientId).set('place_id',place_id)
    return this.http.delete("https://localhost:44392/api/UserFavorites",{params:params});
  }
    getUser(){
      console.log("Getting User ....");
      this.getCurrentUser(localStorage.getItem('token')).subscribe(a=>{
        this.currentUser = a;
        console.log(a);
      });
 }


}
