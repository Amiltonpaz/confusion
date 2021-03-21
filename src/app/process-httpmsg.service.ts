
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { StringifyOptions } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class ProcessHttpmsgService {

  constructor(public http: HttpClient) {
    console.log('Hello ProcessHtmlmsgProvider Provider');
  }

  public extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  public handleError(error: Response | any) {
    let errMsg: string;

    if(error instanceof Response) {
      const body = error.json();
      const err = body.console.error() || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;


    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(errMsg);
    return Observable.throw(errMsg);
  }
}
