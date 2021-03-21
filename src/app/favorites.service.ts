import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Storage } from '@ionic/storage';
import { map, tap } from 'rxjs/operators';
import { DishService } from './dish.service';
import { Dish } from './../shared/dish';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';






@Injectable({
  providedIn: 'root'
})
export class FavoritesService implements OnInit{

  favorites: Array<Dish> = [];
  private readonly API = 'http://10.0.0.7:3000/';


  constructor(
    private dishService: DishService,
    private storage: Storage,
    private localNotifications: LocalNotifications
  ) {

  }
  ngOnInit(): void {
  this.carregaFavoritos();


  }

    carregaFavoritos() {

      if (!this.favorites.length) {
      //  console.log(this.favorites.length);
        let registros = this.storage.keys();
        registros.then(dados => dados.forEach(chave => {
          this.storage.get(chave).then(valor => {this.favorites.push(valor)})
        }));
      }

      return this.favorites;
    }

    seTemFavoritosLocais() {
      if (this.storage.length) {
        return true;
      } else {
        return false;
      }
    }

    getFavorites(): Observable<Dish[]> {

      return this.dishService.getDishes().pipe(
        map(dishes => dishes.filter(dish => this.favorites.some(el => el.id === dish.id)))
      );
    }

  addFavorite(dish: Dish): boolean {

    let index = this.favorites.indexOf(dish);

    console.log('add favorito - indice nao vazio');
    this.favorites.push(dish);
    this.storage.set(dish.name, dish);

    this.localNotifications.schedule({
      id: 2,
      title:'Seu Prato Favorito',
      icon: this.API + dish.image,
      text: dish.name+' adicionado aos Favoritos com sucesso!',
      attachments: [this.API + dish.image],
      actions: [
        {id: 'ok', title: 'Ok', foreground: true, launch: true},
        {id: 'fechar', title: 'Fechar', foreground: true, launch: true}
      ],
      vibrate: true
    })
    // console.log(this.favorites);
    return true;
  }

  removeFavorite(dish: Dish) {

    let index = this.favorites.indexOf(dish);
    this.favorites.splice(index, 1);
    this.storage.remove(dish.name);

    this.localNotifications.schedule({
      id: 1,
      icon: 'https://image.flaticon.com/icons/png/512/39/39887.png',
      title:'🤗Nosso Clube de Vantagens!🤗',
      text: '💥Faça login e ganhe desconto!',
      vibrate: true,
      attachments: ['https://acisa.com.br/wp-content/uploads/2020/10/clube-de-descontos-e-vantagens-logo.png' ],
      actions: [
        {id: 'ok', title: 'Ok', foreground: true, launch: true},
        {id: 'fechar', title: 'Fechar', launch: false, foreground: true}
      ]

    })
    return false;

  }

 async isFavorite(id: number) {

   return await this.dishService.getDish(id).pipe(
      map(dish => this.favorites.some(el => {return el.id === dish.id})),
      tap(console.log));

    //return this.favorites.some(el => {return el.id === id});

  }

}
