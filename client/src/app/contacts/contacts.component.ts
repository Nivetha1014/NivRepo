import { Component, OnInit } from '@angular/core';
import { ContactsService} from '../contacts.service';
import { Contact} from '../contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers : [ContactsService]
})
export class ContactsComponent implements OnInit {

  contacts: Contact[] = [];
  contact: Contact = new Contact;
  first_name: string;
  last_name: string;
  phone: string;


  constructor(private contactService : ContactsService) { }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(contacts =>{
      this.contacts = contacts;
    });
  }

  addContact()
  {
    const newContact = {
      first_name : this.first_name,
      last_name : this.last_name,
      phone  : this.phone
    }
    this.contactService.addContact(newContact).subscribe(data=>{
      this.contacts.push(data);
    });
  }

  deleteContact(id:any){
    var contacts = this.contacts;
    this.contactService.deleteContact(id).subscribe(data=>{
      if(data.n==1)
      {
        for(var i=0;i<contacts.length;i++)
        {
          if(contacts[i]._id == id)
          {
            contacts.splice(i,1);
          }
        }
      }

    })
  }
}
