import { Component, OnInit } from '@angular/core';
import { EventService } from '../common/Services/event.service';
import { Events } from '../common/Models/event.model';
import { RaceViewerDialog } from '../admin/races/raceViewer.dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
    isExpanded = false;
  public eventName: string;
  public eventId: number;
  constructor(private eventService: EventService, public dialog: MatDialog) {

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

  onLogoClick() {
    const dialogRef = this.dialog.open(RaceViewerDialog, {
      width: '1024px',
      data: { videoName: "DerbyCallToPost.mp4" },
      disableClose: true
    });
  }

}
