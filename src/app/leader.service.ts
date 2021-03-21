import { Leader } from './../shared/leader';
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
export class LeaderService {

  private readonly API = 'http://10.0.0.7:3000/leaders';

  constructor(
    public http: HttpClient,
    private processHttpmsgService: ProcessHttpmsgService
    ) {
    console.log('Hello LeaderProvider Provider');
   }

   getLeaders(): Observable<Leader[]> {

    return this.http.get(this.API).pipe(
    map((res: Leader[]) => {return res})
    )
   }

   getLeader(id: number): Observable<Leader> {
    return this.http.get(this.API + '/' +id).pipe(
      map((res: Leader) => {return res})
      )
   }

   getFeaturedLeader(): Observable<Leader> {
    return this.http.get(this.API + '?features=true').pipe(
      map((res: Leader) => {return res[0]}),
      //tap(console.log)
      )
   }

}
