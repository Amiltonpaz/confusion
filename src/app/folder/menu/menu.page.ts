import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { DishService } from './../../dish.service';
import { Dish } from './../../../shared/dish';
import { FavoritesService } from 'src/app/favorites.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  readonly API = 'http://10.0.0.7:3000/';
  dishes: Dish[];
  errMess: any;
  navigateOptions: NavigationExtras;

  constructor(
    private router: Router,
    public navCtrl: NavController,
    private dishService: DishService,
    private favoriteService: FavoritesService
    ) { }

  ngOnInit() {

    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = errmess);
  }


  dishSelected($event, dish: Dish) {
    let navigationExtras: NavigationExtras = {
      state: {
        dish: dish
      }
    }
    let prom = this.router.navigate(['#dishdetail'], navigationExtras);
  }

  addFavorite(event, dish: Dish) {
    this.favoriteService.addFavorite(dish);
    console.log('Pan execute');
  }


}
