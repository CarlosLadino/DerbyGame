import { Component, OnInit } from '@angular/core';
import { EventService } from '../Common/Services/event.service';
import { Events } from '../Common/Models/event.model';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
    isExpanded = false;
  public eventName: string;
  public eventId: number;
    constructor(private eventService: EventService) {

    }

    ngOnInit() {
        this.eventService.getActive().subscribe((data: Events) => {
          this.eventName = data.name;
          this.eventId = data.id;
        });
    }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
