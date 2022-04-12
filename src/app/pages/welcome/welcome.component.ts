import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  checkStatus!: boolean;
  isCollapsed = false;
  constructor(private router: Router) { }

  ngOnInit() {
    this.checkStatus = this.localStorageItem();
    if(this.checkStatus == false){
      this.router.navigate(['login'])
    }
  }

  public localStorageItem(): boolean {
    if (localStorage.getItem("sessionUser") == "Admin" || localStorage.getItem("sessionUser") == "User") {
      return true
    } else {
      return false;
    };
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }
  carousel = [1, 2, 3, 4];
  effect = 'scrollx';
}
