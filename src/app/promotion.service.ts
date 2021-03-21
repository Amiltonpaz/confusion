import { Promotion } from '../shared/promotion';
import { Injectable } from '@angular/core';


import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from "@angular/common/http";
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private readonly API = 'http://10.0.0.7:3000/promotions';

  constructor(
    public http: HttpClient,
    private processHttpmsgService: ProcessHttpmsgService
    ) {
    console.log('Hello PromotionProvider Provider');
   }

   getPromotions(): Observable<Promotion[]> {

    return this.http.get(this.API).pipe(
    map((res: Promotion) => {return res[0]})
    )
   }

   getPromotion(id: number): Observable<Promotion> {
    return this.http.get(this.API + '/' +id).pipe(
      map((res: Promotion) => {return res})
      )
   }

   getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get(this.API + '?features=true').pipe(
      map((res: Promotion[]) => {return res[0]}),
      //tap(console.log)
      )
   }
}
