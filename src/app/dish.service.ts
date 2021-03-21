import { Injectable } from '@angular/core';

import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Dish } from './../shared/dish';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from "@angular/common/http";
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DishService {
  private readonly API = 'http://10.0.0.7:3000/dishes/'
  constructor(
    public http: HttpClient,
    private processHttpmsgService: ProcessHttpmsgService
    ) {
    console.log('Hello DishProvider Provider');
   }

   getDishes(): Observable<Dish[]> {

    return this.http.get(this.API).pipe(
    map((res: Dish[]) => {return res})
    )
   }

   getDish(id: number): Observable<Dish> {
    return this.http.get(this.API + id).pipe(
      map((res: Dish) => {return res})
      )
   }

   getFeaturedDish(): Observable<Dish> {
    return this.http.get(this.API + '?features=true').pipe(
      map((res: Dish) => {return res[0]}),
      //tap(console.log)
      );
   }


}
