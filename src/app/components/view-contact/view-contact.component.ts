import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IContact } from 'src/app/models/contact.model';
import { IGroup } from 'src/app/models/group.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
  public loading: boolean = false;
  public contactId: string | null = null;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  group: IGroup = {} as IGroup;

  constructor(private activatedRoute: ActivatedRoute,
    private contactService: ContactService) { }

  ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
    this.activatedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get("contactId");
    })
    if (this.contactId) {
      this.contactService.getContact(this.contactId).subscribe(
        (data: IContact) => {
          this.loading = false;
          this.contact = data;
          this.contactService.getGroup(data).subscribe((data: IGroup) => {
            this.group = data;
          })
        },
        (error) => {
          this.errorMessage = error;
          this.loading = false;
        }

      )
    }
  }
  public isNotEmpty() {
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
  }


}

