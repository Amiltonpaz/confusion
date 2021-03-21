import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx'


@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(
    private emailcomposer: EmailComposer,
    private callNumber: CallNumber
  ) { }

  ngOnInit() {
  }

  sendCall() {
    this.callNumber.callNumber('81981372991',true)
    .then((sucess) => console.log(sucess), (err) => console.log(err));
  }

  sendEmail() {

    let email = {
      to: 'amilton.paz@gmail.com',
      subject: '[Confusion] Sugestão',
      body: 'Querido Sr./Srª:',
      isHtml: true
    }

    this.emailcomposer.open(email);
  }

}
