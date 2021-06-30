import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientService } from '../_services/client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  currentUser :any;
  result:any;
  token = localStorage.getItem('token');
  constructor(
    private router:Router,
    private clientService:ClientService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const promise = new Promise((resolve,reject)=>{
        setTimeout(()=>{
          resolve(this.clientService.getUser());

        },400)
      });

      promise.then((res)=>{
        setTimeout(()=>{
          this.currentUser = this.clientService.currentUser;
          console.log("currentUser: "+this.currentUser.role);
           this.result = this.IsAdmin(this.currentUser,route.url);

        },500)
      });
      promise.catch((err)=>{
      });
      promise.finally(()=>{

      })
 return this.result;

 }
 IsAdmin(user,url):boolean{

  if (user) {
    // check if route is restricted by role
    if (user.role ==="User") {
        // role not authorised so redirect to home page
        // this.router.navigate(['/']);
        window.location.href="/home";


        return false;
    }
    else{
     // this.route.
    this.router.navigate([url[0].path]);
    //window.location.href = "/dashboard";
    console.log(url[0].path);
    return true;
    }
}

 }
}
