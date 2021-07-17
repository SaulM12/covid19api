import { PaisesService } from './../servicio/paises.service';
import { Datos, Country, Total } from './../modelos/datos';
import { ApiServiceService } from './../servicio/api-service.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DateAdapter } from '@angular/material/core';
import * as L from 'leaflet';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('0.9s ease-out',
              style({ opacity: 1 }))
          ]
        ),

      ]
    ),
  ]

})
export class HomeComponent implements OnInit {
  myControl = new FormControl();
  country: string = ""
  date: string = ""
  data: Datos
  private map;
  totales: boolean = false
  data2: Total
  options: Country[]
  maxDate = new Date(2020, 5, 5)
  filterOptions: Observable<Country[]>
  private initMap(): void {
    this.map = L.map('map', {
      center: [-1.831239, -78.183406],
      zoom: 4
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }


  constructor(private api: ApiServiceService, private paises: PaisesService, private dateAdapter: DateAdapter<Date>,
    private _snackBar: MatSnackBar) {
    this.dateAdapter.setLocale('en-ZA');
    this.options = this.paises.getCountries()
  }
  ngAfterViewInit(): void {
    this.initMap();
  }


  ngOnInit(): void {
    this.getCountryInfo('ec', '2020-06-05')
    this.filterOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );
  }


  getCountryInfo(country: string, date: string) {
    if (country && date) {
      this.api.list(country, date).subscribe(data => {
        this.data = data[0]
        this.totales = false
        this.map.setView(new L.LatLng(this.data.latitude, this.data.longitude), 6)
        let circle = L.circle([this.data.latitude, this.data.longitude], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 80000,
          tittle: this.data.country + this.data.provinces[0].confirmed
        }).addTo(this.map);
        circle.on('click', function () {
          if (!this._popup) {
            this.bindPopup(pop).openPopup();
          }
        })
        let pop = L.popup()
          .setLatLng([this.data.latitude, this.data.longitude])
          .setContent('Pais: ' + this.data.country + ' Casos: ' + this.data.provinces[0].confirmed+" Fecha: "+this.data.date)
          .openOn(this.map);
      })
    } else {
      this.openSnackBar('Ingrese la fecha y el país', 'aceptar')
    }
  }
  filter(query: string) {
    return this.options.filter(data => {
      return data.name.toLowerCase().indexOf(query.toLowerCase()) > -1
    })
  }
  buscar(code: string, date: any) {
    let formatDate = this.formatDate(date)
    this.getCountryInfo(code, formatDate)
  }
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }
  getTotal(code: string) {
    if (code) {
      this.api.listTotal(code).subscribe(data => {
        this.data2 = data[0]
        this.totales = true
        this.map.setView(new L.LatLng(this.data2.latitude, this.data2.longitude), 6)
        let circle = L.circle([this.data2.latitude, this.data2.longitude], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 80000,
          tittle: this.data2.country + this.data2.confirmed
        }).addTo(this.map);
        circle.on('click', function () {
          if (!this._popup) {
            this.bindPopup(pop).openPopup();
          }
        })
        let pop = L.popup()
          .setLatLng([this.data2.latitude, this.data2.longitude])
          .setContent('Pais: ' + this.data2.country + ' Casos Totales: ' + this.data2.confirmed)
          .openOn(this.map);
      })
    } else {
      this.openSnackBar('Ingrese un país válido', 'aceptar')
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }


}
