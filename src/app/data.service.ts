import { map, take, tap } from 'rxjs/operators';
import { Dish } from './../shared/dish';
import { HttpClient } from '@angular/common/http';
import { Comment } from './../shared/comment';
import { Injectable } from '@angular/core';
import { DishService } from './dish.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly API = 'http://10.0.0.7:3000/dishes/';
  dish: Dish;

  constructor(
    private http: HttpClient
  ) { }

    putComment(dish: Dish) {
     this.http.put(this.API+dish.id, dish).subscribe();
    }

}
