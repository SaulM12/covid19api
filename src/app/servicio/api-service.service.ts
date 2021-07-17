import { Datos, Total } from './../modelos/datos';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  placeURL = 'https://covid-19-data.p.rapidapi.com/report/country/code'
  placeURL2 = 'https://covid-19-data.p.rapidapi.com/country/code?'
  constructor(private httpClient: HttpClient) {

  }
  public list(code: string, date: string): Observable<Datos> {
    return this.httpClient.get<Datos>(this.placeURL + '?code=' + code + '&date=' + date, {
      headers: {
        "x-rapidapi-key": "0d71718021msh338885a95ddc3a5p1130b4jsn8c3ba9d41490",
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com"
      }
    });
  }
  public listTotal(code:string): Observable<Total>{
    return this.httpClient.get<Total>(this.placeURL2 + 'code=' + code, {
      headers: {
        "x-rapidapi-key": "0d71718021msh338885a95ddc3a5p1130b4jsn8c3ba9d41490",
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com"
      }
    });
  }
  
}
