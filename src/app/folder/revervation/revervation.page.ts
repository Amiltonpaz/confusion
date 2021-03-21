import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController,LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-revervation',
  templateUrl: './revervation.page.html',
  styleUrls: ['./revervation.page.scss'],
  providers: [FormBuilder]
})
export class RevervationPage implements OnInit {

  formulario: FormGroup;

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.formulario = this.fb.group({
      guests: [3],
      smoking: [false],
      dateTime: ['', Validators.required]
    })
  }

  async onSubmit() {
    console.log(this.formulario.value);
    // TODO: Snackbar message.

    const toast = await this.toastCtrl.create({
      message: 'Reserva realizada com sucesso!',
      duration: 3000,
      position: 'bottom',
      translucent: true
    });

    const loading = await this.loadingCtrl.create({
      message: 'Criando sua reserva...',
      duration: 3000
    });

    const alert = await this.alertCtrl.create({
      message: 'Tem certeza de que deseja criar a reserva?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Criar',
          handler: () => {
            loading.present();
            toast.present();
            this.goBack();
          }
        }
      ]
    });

    alert.present();


  }

  async presentModal() {

    const modal = await this.modalCtrl.create({
      component: RevervationPage
    });
    return await modal.present();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  goBack() {
    this.navCtrl.back();
  }
}
