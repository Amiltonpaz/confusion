import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  image: string = 'assets/images/logo.png';



  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private camera: Camera
    ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      userName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      password: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      telnum: [null, Validators.required, Validators.pattern],
      email: [null, Validators.required, Validators.email]
    })
  }

  dismiss() {
    this.modalCtrl.dismiss(true);
  }

  getPicture() {

    const options: CameraOptions = {
      quality: 100,
      targetHeight: 100,
      targetWidth: 100,
      allowEdit: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: this.camera.Direction.FRONT,

    }

    this.camera.getPicture(options).then((imageData) => {
      this.image = imageData;
    },
    (err) => { console.log('Erro obtendo imagem' + err)});
  }

  getPictureFromLibrary() {
    const libOptions: CameraOptions = {

      mediaType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true
    }

    this.camera.getPicture(libOptions);
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.dismiss();
  }

}
