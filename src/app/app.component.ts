import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  checkStatus!: boolean;
  checkUser!: boolean;
  isCollapsed = false;
  constructor(private router: Router) { }

  ngOnInit() {
    this.checkStatus = this.localStorageItem();
    this.checkUser = this.localStorageUser();
    // console.log(this.checkUser)
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
  public localStorageUser(): boolean {
    if (localStorage.getItem("sessionUser") == "Admin") {
      return true
    } else {
      return false;
    };
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['login'])
        .then(()=>{
          window.location.reload();
        })
  }
}             