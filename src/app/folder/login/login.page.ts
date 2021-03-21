import { RegisterPage } from './../register/register.page';
import { Router } from '@angular/router';
import { User } from '../../../shared/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  user: User = {username: '', password: ''};

  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      remember: true
    });
    this.storage.get('user').then( user => {
      if(user) {
        this.user = user;
        this.loginForm.patchValue({
          'username': this.user.username,
          'password': this.user.password
        })
      } else {
        console.log('user not defined');
      }
    })
  }

  async openRegister(){
    let modal = this.modalCtrl.create({
      component: RegisterPage
    });
    (await modal).present();

    (await modal).onDidDismiss().then( () => this.goBack());
  }

  onSubmit() {

    if (this.loginForm.valid) {
      this.user.username = this.loginForm.controls['username'].value;
      this.user.password = this.loginForm.controls['password'].value;

      if (this.loginForm.controls['remember'].value) {
        this.storage.set('user', this.user);

      }else {
        this.storage.remove('user');
      }
      this.goBack();
    }
  }

  goBack() {
    this.modalCtrl.dismiss();
  }

}
