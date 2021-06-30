import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './../_models/user';
import { Admin } from './../_models/admin';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }
  getNumOfUsers(){
    return this.http.get("https://localhost:44392/api/Admin/count-Users");
  }
  getNumOfAdmins(){
    return this.http.get("https://localhost:44392/api/Admin/count-admins");

  }
  getNumOfEntites(){
    return this.http.get("https://localhost:44392/api/Admin/count-place");
  }
  getNumOfSpecificEntity(num:number){
    return this.http.get("https://localhost:44392/api/Admin/count-place-WithType?x="+num);
  }
  getAllMember(){//done
    return this.http.get<User[]>("https://localhost:44392/api/Admin/count-Member");
  }
  getAllUsers(){//done
    return this.http.get<User[]>("https://localhost:44392/api/Admin/List-Users");
  }
  getAllAdmins(){//done
    return this.http.get<Admin[]>("https://localhost:44392/api/Admin/List-Admins");
  }
  addAdmin(admin:Admin){
    return this.http.post<Admin>("https://localhost:44392/api/Admin/addnew-admin",admin);
  }
  DeleteUser(id:string): Observable<any> {
    return this.http.delete("https://localhost:44392/api/Admin/"+id);
  }
  UpgradetoAdmin(id:string)
  {
    var headers =new HttpHeaders({
      "Content-Type":"application/json",
      "Accept":"application/json"
    });
    return this.http.post("https://localhost:44392/api/Admin/add-admin",JSON.stringify(id),{headers:headers});
  }
  FromAdminToUser(id:string)
  {
    var headers =new HttpHeaders({
      "Content-Type":"application/json",
      "Accept":"application/json"
    });
    return this.http.post("https://localhost:44392/api/Admin/delete-admin",JSON.stringify(id),{headers:headers});
  }
}
