import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    public contactService: ContactService
  ) {

  }

  ngOnInit(): void {
    console.log(this.contactService.loginStatus,"navbar");
  }

  logout() {
    this.contactService.isLoggedIn = false;
    localStorage.setItem('loggedInUser', 'false');
    this.router.navigate(["login"]);
  }

}
