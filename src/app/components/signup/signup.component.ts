import { getLocaleFirstDayOfWeek } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: any;
  public signedInUsers: [] | undefined;
  existingUsersFromDb: any;
  public collectedData: [] | undefined;
  public errorMessage: string | null = null;

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private contactService: ContactService) {

  }

  ngOnInit() {
    this.getUsers();
    this.signUpForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    })
  }

  getUsers() {
    this.contactService.getAllUsers().subscribe
      ((data) => {
        this.signedInUsers = data;
      }, (error) => {
        this.errorMessage = error;
      }
      )
  }

  signup(form?: NgForm) {
    console.log(this.signedInUsers)
    this.existingUsersFromDb = this.signedInUsers?.filter((data: any) => {
      return data.email === this.signUpForm.value.email
    });
    if (this.existingUsersFromDb?.length > 0) {
      alert("Hi,this email has already registered.So please login.");
      this.router.navigate(["/login"]);
    } else {
      this.http.post<any>("http://localhost:9000/signupUsersList", this.signUpForm.value)
        .subscribe(res => {
          alert('SIGNUP SUCCESFUL');
          localStorage.setItem('signupUser', JSON.stringify(this.signUpForm.value));
          this.signUpForm.reset()
          this.router.navigate(["login"])
        }, (err) => {
          alert("Credentials are wrong.")
        })
    }
  }
}
