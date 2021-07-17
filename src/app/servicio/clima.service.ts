import { ClimaDiario } from '../modelos/clima-diario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {


  apiUrlDaily= 'https://api.openweathermap.org/data/2.5/forecast?'
  apiKeyDaily = '750c9a17be0ca194b111193049f7b6aa'
  constructor(private httpClient: HttpClient) { }

  getClimaDiario(nombre: string, dias: string): Observable<ClimaDiario>{
    return this.httpClient.get<ClimaDiario>(this.apiUrlDaily + `q=${nombre}` + `&cnt=${dias}` +'&units=metric&lang=sp' + `&appid=${this.apiKeyDaily}`)
  }
}
