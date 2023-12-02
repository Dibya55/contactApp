import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IContact } from 'src/app/models/contact.model';
import { IGroup } from 'src/app/models/group.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  public loading: boolean = false;
  public groups: IGroup[] = [] as IGroup[];
  public contactId: string | null = null;
  public contact: IContact = {} as IContact;
  public errorMessage: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.activatedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get("contactId");
    })
    if (this.contactId) {
      this.contactService.getContact(this.contactId).subscribe(
        (data) => {
          this.contact = data;
          this.contactService.getAllGroups().subscribe((data) => {
            this.groups = data;
          })
        },
        (error) => {
          this.errorMessage = error;
        }
      )
    }
  }

  updateContact() {
    this.contactService.updateContact(this.contact, this.contactId).subscribe(
      (data: IContact) => {
        this.router.navigate(['contacts/admin']).then();
      },
      (error) => {
        this.errorMessage = error;
        this.router.navigate([`/contacts/edit/${this.contactId}`]);
      }
    )
  }


}
