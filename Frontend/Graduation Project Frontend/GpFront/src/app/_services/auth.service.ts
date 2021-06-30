import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../_models/login';
import { register } from '../_models/register';
import { User } from '../_models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  Register(user:register)
  {
    console.log(JSON.stringify(user));
    var headers = new HttpHeaders({

      "Content-Type": "application/json",

      "Accept": "application/json"

    });
    return this.http.post<any>("https://localhost:44392/api/Authenticate/register",JSON.stringify(user),{headers:headers});
  }

  Login(user:Login)
   {
     console.log(JSON.stringify(user));
    var headers = new HttpHeaders({

      "Content-Type": "application/json",

      "Accept": "application/json"

    });

     return this.http.post<any>("https://localhost:44392/api/Authenticate/login",JSON.stringify(user),{headers:headers});
   }
   EditUserData(user:User)
   {
     console.log(JSON.stringify(user));
    var headers = new HttpHeaders({

      "Content-Type": "application/json",

      "Accept": "application/json"

    });

     return this.http.post<any>("https://localhost:44392/api/Authenticate/Edituser",JSON.stringify(user),{headers:headers});
   }

   EditUserPhoto(user:User)
   {
     console.log(JSON.stringify(user));
    var headers = new HttpHeaders({

      "Content-Type": "application/json",

      "Accept": "application/json"

    });

     return this.http.post<any>("https://localhost:44392/api/Authenticate/EdituserPhoto",JSON.stringify(user),{headers:headers});
   }
   DeleteProfilePicture(id:any){
    const params = new HttpParams().set('id',id)
     return this.http.delete("https://localhost:44392/api/Authenticate/DeleteUserPicture",{params});
   }


}
