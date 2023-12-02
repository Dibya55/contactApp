import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private contactService: ContactService) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
      // Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
    })
  }

  login(form?: NgForm) {
    this.http.get<any>("http://localhost:9000/signupUsersList")
      .subscribe(res => {
        console.log(this.loginForm.value.password);
        const user = res.find((a: any) => {
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        });
        if (user) {
          alert('Login Succesful');
          localStorage.setItem('loggedInUser', 'true');
          this.loginForm.reset();
          this.contactService.isLoggedIn = true;
          this.router.navigate(["contacts/admin"])
        } else {
          alert("user not found")
        }
      }, err => {
        alert("Something went wrong")
      })
  }


}
