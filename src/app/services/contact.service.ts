import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IContact } from '../models/contact.model';
import { IGroup } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService implements OnInit {

  private serverUrl: string = "http://localhost:9000";
  private user = localStorage.getItem("loggedInUser");
  private _loginStatus: boolean = false;
  public isLoggedIn: boolean = false;

  constructor(private httpClient: HttpClient) {
    const storedLoginStatus = localStorage.getItem('loggedInUser');
   
    this.isLoggedIn = storedLoginStatus === 'true';
  }

  ngOnInit() {
    // console.log()


  }

  // Get All Contacts
  public getAllContacts(): Observable<IContact[]> {
    let dataUrl: string = `${this.serverUrl}/contacts`;
    return this.httpClient.get<IContact[]>(dataUrl).pipe(catchError(this.handleError));
  }

  // Get Single Contact
  public getContact(contactId: string): Observable<IContact> {
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.get<IContact>(dataUrl).pipe(catchError(this.handleError));
  }

  // Creating a new contact
  public CreateContact(contact: IContact): Observable<IContact> {
    let dataUrl: string = `${this.serverUrl}/contacts`;
    return this.httpClient.post<IContact>(dataUrl, contact).pipe(catchError(this.handleError));
  }

  // Update a contact
  public updateContact(contact: IContact, contactId: string | null): Observable<IContact> {
    let dataUrl = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.put<IContact>(dataUrl, contact).pipe(catchError(this.handleError));
  }

  // Delete a contact
  public deleteContact(contactId: string): Observable<{}> {
    let dataUrl = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.delete<{}>(dataUrl).pipe(catchError(this.handleError));
  }

  // Get All Groups
  public getAllGroups(): Observable<IGroup[]> {
    let dataUrl = `${this.serverUrl}/groups`;
    return this.httpClient.get<IGroup[]>(dataUrl).pipe(catchError(this.handleError));
  }

  //Get Single Group
  public getGroup(contact: IContact): Observable<IGroup> {
    let dataUrl = `${this.serverUrl}/groups/${contact.groupId}`;
    return this.httpClient.get<IGroup>(dataUrl).pipe(catchError(this.handleError));
  }

  // Get All Users from db
  public getAllUsers() {
    let dataUrl = `${this.serverUrl}/signupUsersList`;
    return this.httpClient.get<any>(dataUrl).pipe(catchError(this.handleError));
  }

  //Error Handling
  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error :${error.error.message}`
    }
    else {
      errorMessage = `Status: ${error.status} \n Message:${error.message}`;
    }
    return throwError(errorMessage);
  }


  get loginStatus() {
    console.log(this._loginStatus, "get method login status");
    return this._loginStatus;
  }

  setloginStatus(value: boolean) {
    console.log(this._loginStatus, "set method login status");
    this._loginStatus = value
  }


}
