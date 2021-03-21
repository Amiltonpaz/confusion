import { LoadingController, ToastController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { LoginPage } from './folder/login/login.page';
import { ModalController, Platform } from '@ionic/angular';
import { RevervationPage } from './folder/revervation/revervation.page';
import { FavoritesPage } from './folder/favorites/favorites.page';
import { ContactPage } from './folder/contact/contact.page';
import { AboutPage } from './folder/about/about.page';
import { MenuPage } from './folder/menu/menu.page';
import { Component, OnInit } from '@angular/core';
import { HomePage } from './folder/home/home.page';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{

  public appPages = [
    { title: 'Home', url: 'home', icon: 'home' , component: HomePage},
    { title: 'Cardápio', url: '#menu', icon: 'list', component: MenuPage },
    { title: 'Reservas', url: '#revervation', icon: 'restaurant', component: RevervationPage },
    { title: 'Favoritos', url: '#favorites', icon: 'heart', component: FavoritesPage },
    { title: 'Contatos', url: '#contact', icon: 'call', component: ContactPage},
    { title: 'Sobre', url: '#about', icon: 'information-circle', component: AboutPage},
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    public modalCrtl: ModalController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private platform: Platform,
    private network: Network,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
    ) {}

  ngOnInit(): void {
  this.initializeApp();

  }



  initializeApp() {
    this.platform.ready().then(async () => {
      // Depois que a pataforma está pronta os plugins estãoa disponíveis;
      // Aqui podemos fazer coisas de alto nível

      this.statusBar.styleDefault();
      this.splashScreen.hide();

     const loading = await this.loadingCtrl.create({
       spinner: 'dots',
       message: 'Sem conexão com a internet...'
     });

      const toast = await this.toastCtrl.create({
        message: 'Sua conexão foi restabelecida!',
        duration: 5000
      })

      this.network.onDisconnect().subscribe(() => {

        setTimeout(() => {

        }, 3000)
        loading.present();
      });

      this.network.onConnect().subscribe(() => {

        setTimeout(() => {
          if (this.network.Connection.WIFI) {
            console.log('Conectaod via ' + this.network.Connection.WIFI);
          }
       }, 3000)
        loading.dismiss();
        toast.present();
      })
    })
  }

async openReserve() {
  const modal = await this.modalCrtl.create({
    component: RevervationPage
  });

  return (await modal).present();
}

async openLogin() {
  const modal = await this.modalCrtl.create({
    component: LoginPage
  });

  return (await modal).present();
}

}
