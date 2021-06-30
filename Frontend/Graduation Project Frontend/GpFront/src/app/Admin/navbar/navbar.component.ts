import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { DashboardService } from 'src/app/_services/dashboard.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../../assets/css/material-dashboard.css']
})
export class NavbarComponent implements OnInit {

  users:User[]=[];

  
  constructor() { }
  
  ngOnInit(): void {
   
   
}}

