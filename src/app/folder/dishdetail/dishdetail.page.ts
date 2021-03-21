import { AddCommentPage } from './../add-comment/add-comment.page';
import { FavoritesService } from './../../favorites.service';
import { ActivatedRoute, Router } from '@angular/router';

import { ActionSheetController, LoadingController, NavController, NavParams, ToastController, ModalController } from "@ionic/angular";
import { DishService } from './../../dish.service';
import { Dish } from './../../../shared/dish';

import { Component, OnInit } from '@angular/core';
import { ViewChild } from "@angular/core";
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.page.html',
  styleUrls: ['./dishdetail.page.scss'],
  providers:[NavParams]
})
export class DishdetailPage implements OnInit {

  @ViewChild('nav') nav: NavController;

  public readonly API = 'http://10.0.0.7:3000/';
  dish: Dish;
  errMess: string;
  avgStars: string;
  numComments: number;
  favorite: boolean;
  grupo: any[] = [];

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public dishService: DishService,
    private route: ActivatedRoute,
    private router: Router,
    private favoriteService: FavoritesService,
    private toastController: ToastController,
    private actionCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private socialSharing: SocialSharing
    ) {}

  ngOnInit() {

      this.capturaPrato();
      this.favoriteService.carregaFavoritos();
     // Verifica se é um prato favorito
     this.favoriteService.isFavorite(this.dish.id).then(el => {
       el.subscribe(dado => this.favorite = dado);
     });
      console.log(this.favorite);

    // Calcula a quantidade de comentários e a média das estrelas/avaliações
      this.numComments = this.dish.comments.length;
      let total =0;
      this.dish.comments.forEach(comment => total += comment.rating);
      this.avgStars = (total/this.numComments).toFixed(2);

  }

  capturaPrato() {
    this.route.params.subscribe(params =>{

      if (params && params.dish) {
        this.dish = JSON.parse(params.objeto);
      }

      if (this.router.getCurrentNavigation()) {
          this.dish = <Dish>this.router.getCurrentNavigation().extras.state.dish;
        //console.log(this.dish);
      }
    });
  }


  goBack() {
    //this.router.navigate(['#menu']);
    this.navCtrl.back();
  }


  async addFavorite() {

    this.favorite = this.favoriteService.addFavorite(this.dish);

    const toast = await this.toastController.create({
      message: 'Adicionado aos Favoritos!',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  async removeFavorite() {
   this.favorite = this.favoriteService.removeFavorite(this.dish);
    // this.favoriteService.isFavorite(this.dish.id).then(dado => {
      // dado.subscribe(el => this.favorite = el);
    // });

    const toast = await this.toastController.create({
      message: 'Removido dos Favoritos!',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  estrelas(ratings: number) {

    this.grupo = [];
    for (let i = 0;i < ratings; ++i ) {

      this.grupo.push(i);
    }
    return this.grupo;
  }
  async mostraActionSheet() {

    const loading = await this.loadingCtrl.create({
      message: 'Aguarde...',
      duration: 3000,
      spinner: 'dots'
    });

    const toastSuccess = await this.toastController.create({
      message: 'Adicionado aos Favoritos!',
      duration: 3000
    });

    const toastError = await this.toastController.create({
      message: 'Falha ao adicionar Favorito!',
      duration: 3000
    });

    const modal = await this.modalCtrl.create({
      component: AddCommentPage,
      swipeToClose: true,
      componentProps: {
        id: this.dish.id
      }

    });

    var options = {
      message: this.dish.name.toUpperCase + ': O prato maravilhoso eu experimentei no Restaurante conFusion!', // not supported on some apps (Facebook, Instagram)
      files: [this.API + this.dish.image], // an array of filenames either locally or remotely
      url: 'https://www.confusion.net',
      chooserTitle: 'Restaurante conFusion' // Android only, you can override the default share sheet title
    }

    const actionSheet = await this.actionCtrl.create({
      header: 'Ações',
      buttons: [
        {
          text: 'Add Favoritos',
          icon: 'heart',
          handler: () => {
            this.addFavorite().then(m => {
              toastSuccess.present(),
              toastError.present() // TODO verificar ordem na promise
            });
          }
        },
        {
          text: 'Add Comentário',
          icon: 'chatbox-ellipses',
          handler: () => {
            modal.present();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        },
        {
          text: 'Compartilhar no Facebook',
          icon: 'logo-facebook',
          handler: () => {
            this.socialSharing.shareViaFacebookWithPasteMessageHint(
              'Gente, olha que prato maravilhoso eu experimentei no Restaurante conFusion!',
              this.API + this.dish.image,
              'http://www.confusion.net',
              'COLE A MENSAGEM!'
            )
          }
        },
        {
          text: 'Compartilhar no Instagram',
          icon: 'logo-instagram',
          handler: () => {
            this.socialSharing.shareViaInstagram(
              'Gente, olha que prato maravilhoso eu experimentei no Restaurante conFusion!',
              this.API + this.dish.image
            )
          }
        },
        {
          text: 'Compartilhar com Whatsapp',
          icon: 'logo-whatsapp',
          handler: () => {
            this.socialSharing.shareViaWhatsApp(
              this.dish.name + '\n -- '+ this.dish.description,
              this.API + this.dish.image
            )
          }
        }
      ]
    });

    actionSheet.present();
  }


}
