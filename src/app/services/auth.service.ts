import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedInStatus = false;

  constructor() {
    const storedLoginStatus = localStorage.getItem('loggedInUser');
    this.loggedInStatus = storedLoginStatus === 'true';
  }

  ngOnInit() {

  }

  get LoginStatus() {
    if ((localStorage.getItem('loggedInUser'))) {
      return this.loggedInStatus = true
    }
    else {
      return this.loggedInStatus = false;
    }
  }

  // setLoginStatus(value: boolean) {
  //   return this.loggedInStatus = value;
  // }
}
