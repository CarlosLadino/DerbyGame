import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'place-component',
  templateUrl: './place.component.html',
})

export class PlaceComponent {
  @Input() place: string;
  @Input() width: string;
  constructor() {
   
  }
  ngOnInit() {
   
  }
}
