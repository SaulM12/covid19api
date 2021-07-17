import { DialogData } from './../clima-inicio/clima-inicio.component';
import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-coordenadas',
  templateUrl: './coordenadas.component.html',
  styleUrls: ['./coordenadas.component.scss']
})
export class CoordenadasComponent implements OnInit {

  constructor(@Inject (MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}
