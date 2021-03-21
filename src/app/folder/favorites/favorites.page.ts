
import { Component, OnInit } from '@angular/core';

import { Dish } from './../../../shared/dish';
import { IonItemSliding, ToastController,
  LoadingController, AlertController, ActionSheetController} from '@ionic/angular';
import { FavoritesService } from 'src/app/favorites.service';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  readonly API = 'http://10.0.0.7:3000/';
  favorites: Array<any> = [];
  errMess: string;

  constructor(
    private favoriteService: FavoritesService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private actionCtrl: ActionSheetController
  ) { }

  ngOnInit() {
    //this.favoriteService.getFavorites()
   // .subscribe(favorites => this.favorites = favorites,
    //  errmess => this.errMess = errmess);

      if (this.favoriteService.seTemFavoritosLocais()) {
        this.favorites = this.favoriteService.carregaFavoritos();
        //console.log(this.favstor);
      }
  }

  async deleteFavorite(item: IonItemSliding, dish: Dish) {
    //console.log('delete', id);

    const loading = await this.loadingController.create({
      message: 'Removendo favorito...',
      spinner: 'dots',
      duration: 3000
    });

    const toast = await this.toastController.create({
      message: 'Removido com sucesso!',
      duration: 3000,
      position: 'bottom'
    });

    const alert = await this.alertController.create({
      message: 'Tem certeza de que deseja remover o Favorito?',
      buttons:  [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Delete cancelado.');
          }
        },
        {
          text: 'Delete',
          handler: () =>  {

            loading.present();
            this.favoriteService.removeFavorite(dish);
            this.favorites = this.favoriteService.carregaFavoritos();
            toast.present();

          }
        }
      ]
    })

    alert.present();
    item.close();
  }


}
