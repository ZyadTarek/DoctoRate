import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'src/app/_models/register';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private RegSer:AuthService,private route:Router) { }

  ngOnInit(): void {
  }
  name:string="";
  email:string="";
   pass:string="";
  register()
{
  var user:register = new register( this.name,this.email,this.pass);
//  console.log(user);
  // alert("aa");
  this.RegSer.Register(user).subscribe(a=>{
    //console.log(a.token);
    //localStorage.setItem('token',a.token);
    console.log(a.status);
    console.log(a.message);
    console.log("Welcome (MR/MRs) "+" "+this.name);
    this.route.navigateByUrl('/Login');
  })

}
}