import { DialogData } from './../clima-inicio/clima-inicio.component';
import { Component, OnInit, Input, Inject } from '@angular/core';


import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-tabla-clima',
  templateUrl: './tabla-clima.component.html',
  styleUrls: ['./tabla-clima.component.scss']
})
export class TablaClimaComponent implements OnInit {

  constructor(@Inject (MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}
