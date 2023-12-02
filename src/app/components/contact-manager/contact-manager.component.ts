import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { IContact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {
  public loading: boolean = false;
  public contacts: IContact[] = [];
  public errorMessage: string | null = null;
  public contactMsg: string | undefined;
  myControl = new FormControl('');
  filteredOptions: Observable<string[]> | undefined;
  options: string[] = ['One', 'Two', 'Three'];

  constructor(private contactService: ContactService,
    private spinner: NgxSpinnerService) {

  }
  ngOnInit() {
    this.getAllContacts();
  }

  public getAllContacts() {
    this.contactMsg = "Fetching contacts please wait.."
    // this.spinner.show();
    // setTimeout(() => {
    //   this.spinner.hide();
    //   this.loading = true;
    // },2000);

    // After finding error in ngx spinner , we have to remove loading property form this component
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);

    this.contactService.getAllContacts().subscribe(
      (data: IContact[]) => {
        this.contacts = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    )
  }

  public deleteContact(contactId: any ) {
    this.contactService.deleteContact(contactId).subscribe((data: {}) => {
      this.getAllContacts();
    },
      (error) => {
        this.errorMessage = error;
        console.log(error)
      })
  }
}
