import { trigger, transition, style, animate, state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0.8}),
            animate('1000ms ease',
              style({ opacity: 1}))
          ]
        ),

      ]
    ),
  ]
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
