import { ClimaService } from './../servicio/clima.service';
import { ClimaDiario } from './../modelos/clima-diario';
import { TablaClimaComponent } from './../tabla-clima/tabla-clima.component';
import { PaisesService } from './../servicio/paises.service';
import { CoordenadasComponent } from './../coordenadas/coordenadas.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export interface DialogData {
  dt?: any,
  name?: string,
  country?: string
  temp_min?: number,
  temp_max?: number,
  feels_like?: number,
  humidity?: number,
  pressure?: number,
  sea_level?: number,
  speed?: number,
  description?: number,
  temp?: number,
  icon?: string,
  dt_txt?: Date,
  sunrise?: string,
  sunset?: string,
  lat?: number,
  lon?: number

}

@Component({
  selector: 'app-clima-inicio',
  templateUrl: './clima-inicio.component.html',
  styleUrls: ['./clima-inicio.component.scss']
})
export class ClimaInicioComponent implements OnInit {
  fondo: string = 'https://images8.alphacoders.com/937/thumb-1920-937708.jpg'
  noche: string = 'https://images.wallpaperscraft.com/image/moon_mountains_night_141412_3840x2160.jpg'
  dia: string = 'https://images.unsplash.com/photo-1568912281110-b15d71769ecb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80'
  hora: string
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  clima: ClimaDiario = {
    name: "",
    cnt: "",
  }

  coordenadas: any[] = []
  climaDiario: any[] = []
  @ViewChild('focus') nombre: ElementRef
  constructor(private climaService: ClimaService, private dialog: MatDialog, private paisesService: PaisesService,
    private snackBar: MatSnackBar, private pais: PaisesService) {
    pais.getAllPaises()
  }
  ngOnInit(): void {
  }

  getClimaDiario(nombre: string, dias: string) {
    if (nombre && dias) {
      this.climaService.getClimaDiario(nombre, dias).subscribe(datos => {
        this.climaDiario.push(datos)
        console.log(this.climaDiario);
        this.climaDiario.forEach(data => {
          data.city.country = this.nombrePaises(data.city.country)
          data.city.sunrise = this.tranformadorFechas(data.city.sunrise)
          data.city.sunset = this.tranformadorFechas(data.city.sunset)
          data.city.timezone = new Date(data.city.timezone * 1000)
          if (data.list[0].sys.pod === 'n') {
            this.fondo = this.noche
          } else {
            this.fondo = this.dia
          }
          data.list.forEach((info) => {
            info.dt_txt = this.tranformadorFechas(info.dt_txt)
            info.dt = this.tranformadorFechas(info.dt)
            info.main.temp = Math.round(info.main.temp)
            info.main.temp_max = Math.round(info.main.temp_max)
            info.main.temp_min = Math.round(info.main.temp_min)
            info.main.feels_like = Math.round(info.main.feels_like)
            if (info.sys.pod === 'n') {
              info.sys.pod = 'Noche'
            } else {
              info.sys.pod = 'Mañana'
            }
          })
        })
      })
    } else {
      this.snackBar.open('Datos incompletos', "Aceptar", {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    }

  }
  tranformadorFechas(texto: any) {
    this.climaDiario.forEach(data => {
      data.list.forEach(element => {
        switch (texto) {
          case element.dt_txt:
            texto = new Date(texto).toLocaleDateString("es", {
              year: "numeric", month: "long", day: "numeric"
            })
            break;
          case element.dt:
            texto = new Date(texto * 1000).toLocaleDateString("es", {
              weekday: "long"
            })
            break;
          case data.city.sunrise:
            texto = new Date(data.city.sunrise * 1000).toLocaleTimeString("es", {
              hour12: true
            })
            break;
          case data.city.sunset:
            texto = new Date(data.city.sunset * 1000).toLocaleTimeString("es", {
              hour12: true
            })
            break;
        }
      });
    })
    return texto
  }

  nuevaBusqueda() {
    this.climaDiario = []
    this.clima.name = ''
    this.clima.cnt = ''
    this.fondo = 'https://images8.alphacoders.com/937/thumb-1920-937708.jpg'
    this.nombre.nativeElement.focus()
  }

  openDialog(dt: any, name: string, pais: string, tempMin: number, tempMax: number, siente: number, humedad: number, presion, viento: number,
    descripcion: string, temp: number, icono: string, date: Date, amanecer: string, atardecer: string) {
    this.dialog.open(TablaClimaComponent, {
      data:
      {
        dt: dt,
        name: name,
        country: pais,
        temp_min: tempMin,
        temp_max: tempMax,
        feels_like: siente,
        humidity: humedad,
        pressure: presion,
        speed: viento,
        description: descripcion,
        temp: temp,
        icon: icono,
        dt_txt: date,
        sunrise: amanecer,
        sunset: atardecer

      }
    })
  }
  openCoordenadas(lat: number, lon: number, ciudad: string, pais: string) {
    this.dialog.open(CoordenadasComponent, {
      data: {
        lat: lat,
        lon: lon,
        name: ciudad,
        country: pais
      }
    })
  }
  nombrePaises(codigoPais: string) {
    this.pais.getAllPaises().forEach(data => {
      if (codigoPais === data.code) {
        codigoPais = data.nombre
      }
    })
    return codigoPais
  }
}
