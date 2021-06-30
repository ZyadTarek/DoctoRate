import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from '../_models/user-data';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }

  getCommentsByPlaceId(placeId,totalRate,commNum){
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('placeId', placeId);
    // let params = new URLSearchParams();
    // params.append("placeId", placeId);
    // // params = params.set("placeId", placeId)
    // let params = new HttpParams().set("placeId",placeId);
    const params = new HttpParams()
  .set('placeId', placeId)
   .set('totalRate',totalRate).set('commNum',commNum);

   return this.http.get<UserData[]>('https://localhost:44392/api/comments',{ params: params });

    }
}
