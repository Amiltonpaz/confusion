import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(
    private emailcomposer: EmailComposer
  ) { }

  ngOnInit() {
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
