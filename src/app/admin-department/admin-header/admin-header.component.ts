import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private service:AuthService,private route:Router) { }

  ngOnInit(): void {
  }
  logOut(){
  //  this.service.logout();
   this.route.navigate(['/'])
   localStorage.removeItem('currentUser');
  }

 }
