import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'horse-number-component',
  templateUrl: './horseNumber.component.html',
})

export class HorseNumberComponent {
  @Input() horseNumber: string;
  constructor() {
   
  }
  ngOnInit() {
   
  }
}
