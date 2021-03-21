import { LeaderService } from './../../leader.service';
import { PromotionService } from './../../promotion.service';
import { DishService } from './../../dish.service';
import { Promotion } from './../../../shared/promotion';
import { Dish } from './../../../shared/dish';
import { Leader } from 'src/shared/leader';
import { baseURL } from './../../../shared/baseurl';

import { Component, OnInit, Inject } from '@angular/core';
import 'hammerjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  baseUrl = 'http://10.0.0.7:3000/';
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;
  promoErrMess: string;
  leaderErrMess: string;

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService

    ) { }

  ngOnInit() {

    this.dishService.getFeaturedDish()
    .subscribe(dish => this.dish = dish,
      errmess => this.dishErrMess = <any>errmess);

    this.promotionService.getFeaturedPromotion()
    .subscribe(promo => this.promotion = promo,
      errmess => this.promoErrMess = <any>errmess);

    this.leaderService.getFeaturedLeader()
    .subscribe(leader => this.leader = leader,
      errmess => this.promoErrMess = <any>errmess);
  }

  doSomething() {
    console.log('Gesto acionado!');
  }

}
