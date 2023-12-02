import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/contact.model';
import { IGroup } from 'src/app/models/group.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  public loading: boolean = false;
  selectedGroupId: any = null;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public groups: IGroup[] = [] as IGroup[];

  constructor(private contactService: ContactService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.loading = true;
    this.contactService.getAllGroups().subscribe((data: IGroup[]) => {
      this.groups = data;
      this.loading = false;
    }, (error) => {
      this.errorMessage = error;
      this.loading = false;
    })
  }

  public createSubmit(addContactForm: NgForm) {
      this.contactService.CreateContact(this.contact).subscribe((data: IContact) => {
        this.router.navigate(["/contacts/admin"]).then();
      }, (error) => {
        this.errorMessage = error;
        this.router.navigate(["/contacts/add"]);
      }
      )
  }

}
