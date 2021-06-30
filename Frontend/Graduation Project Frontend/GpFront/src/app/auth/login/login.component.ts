import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { Login } from 'src/app/_models/login';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
//user:Login=new Login("","");
/*loginForm: FormGroup;
socialUser: SocialUser;
isLoggedin: boolean; */ 
// name:string="";
// pass:string="";
  // constructor(private RegSer:AuthService ) { }
  constructor(private RegSer:AuthService ,private router:Router) { }
  // ngAfterViewInit(): void {
  //  this.elementref.nativeElement.ownerDocument.body.style.backgroundColor="#89cff0";
  // }
 

  ngOnInit() {
   /* this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });  
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      console.log(this.socialUser);
    });*/
  }
/*

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }*/
name:string="";
pass:string="";

logError:string="";
login()
{
  var user:Login = new Login(this.name,this.pass);
  // console.log("Hellllooooo");
  // alert("aa");
  this.RegSer.Login(user).subscribe(
    result => {
      // Handle result
      console.log(result.token);
      localStorage.setItem('token',result.token);
      //this.router.navigateByUrl("/home");
      window.location.href = "http://localhost:4200/dashboard";
    },
    error => {
      //this.errors = error;
      //console.log("err");
      this.logError="you data is wrong";

    }
    // ,
    // () => {
    //   // No errors, route to new page
    //   this.router.navigateByUrl("/home");
      
    // }
  );
    
}

//  onSignIn(googleUser) {
//   var profile = googleUser.getBasicProfile();
//   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   console.log('Name: ' + profile.getName());
//   console.log('Image URL: ' + profile.getImageUrl());
//   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
// }
}
