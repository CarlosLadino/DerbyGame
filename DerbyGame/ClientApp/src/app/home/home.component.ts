import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { EventRaceService } from '../common/Services/eventRace.service';
import { EventService } from '../Common/Services/event.service';
import { Events } from '../Common/Models/event.model';
import { UtilityService } from '../common/Services/utility.service';
import { Races } from '../Common/Models/race.model';
import { RaceInstance } from '../common/Models/raceInstance.model';
import { VwEventRace } from '../common/Models/eventRace.model';
import { EventRaceGuests, VwEventRaceGuests } from '../common/Models/eventRaceGuest.model';
import { MatTableDataSource, MatDialog, MatStepper, MatHorizontalStepper } from '@angular/material';
import { GuestService } from '../Common/Services/guest.service';
import { IGuests } from '../Common/Models/guest.model';
import { ConfirmDialogModel } from '../common/CustomComponents/ConfirmationDialog/confirmDialog.model';
import { ConfirmDialog } from '../common/CustomComponents/ConfirmationDialog/confirm.dialog';
import { SelectHorseDialog } from './selectHorse.dialog';
import { ActivateGuestsDialog } from './activateGuests.dialog';
import { GuestEditDialog } from '../admin/guests/guestEdit.dialog';
import { RaceResultService } from '../common/Services/raceResult.service';
import { RaceResults } from '../common/Models/raceResult.model';
import { EventRaceGuestService } from '../common/Services/eventRaceGuest.service';
import { ShowWinnersDialog } from './showWinners.dialog';
import { AddRaceToEventDialog } from './addRaceToEvent.dialog';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { RaceWithdrawnHorseService } from '../common/Services/raceWithdrawnHorse.service';
import { IRaceWithdrawnHorses, RaceWithdrawnHorses } from '../common/Models/raceWithdrawnHorse.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class HomeComponent implements OnInit {
  public sidenavOpen = false;
  public races: VwEventRace[];
  public raceInstance: RaceInstance = new RaceInstance();
  public eventRaceGuests: VwEventRaceGuests[];
  public activeGuests: IGuests[];
  private selectedGuestId: number = 0;
  private selectedEventRaceId: number = 0;
  public horsesAreAvailable: boolean = true;
  private raceResults: RaceResults[];
  private enableWinners: boolean = false;
  private eventId: number = 0;
  @ViewChild('video', { static: false })
  public video: ElementRef;
  @ViewChild('stepper', { static: false })
  private myStepper: MatStepper;

  constructor(private eventService: EventService,
    private utilityService: UtilityService,
    private eventRaceService: EventRaceService,
    private guestService: GuestService,
    private eventRaceGuestService: EventRaceGuestService,
    public dialog: MatDialog,
    public raceResultService: RaceResultService,
    public raceWithdrawnHorseService: RaceWithdrawnHorseService) {
  }

  ngOnInit() {
    this.eventService.getActive().subscribe((event: Events) => {
      this.eventRaceService.getSelecteRacesByEventId(event.id).subscribe((data: VwEventRace[]) => {
        this.eventId = event.id;
        this.races = data;
      });
    });

    this.guestService.getActiveGuests().subscribe((guests: IGuests[]) => {
      this.activeGuests = guests;
    });
  }

  canDeactivate() {
    if (this.raceInstance.getTotalCollected > 0 && !this.raceInstance.raceWasLoadedFromDB) {
      const message = `If you navigate out of this page all data will be lost. Are you sure you want to do that?`;
      const dialogData = new ConfirmDialogModel("Confirm Leaving Race", message);
      const dialogRef = this.dialog.open(ConfirmDialog, {
        maxWidth: "400px",
        data: dialogData
      });

      return dialogRef.afterClosed()
    }
    else {
      return true;
    }

  }

  onRaceSelectionChange(eventRace) {
    if (this.raceInstance.getTotalCollected > 0 && !this.raceInstance.raceWasLoadedFromDB && !this.raceInstance.allowToStartNewRace) {
      const message = `Betting is in progress. Are you sure you want to reset this race?`;

      const dialogData = new ConfirmDialogModel("Confirm Reset", message);

      const dialogRef = this.dialog.open(ConfirmDialog, {
        maxWidth: "400px",
        data: dialogData
      });

      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult == true) {
          this.resetRace(eventRace.value);
        }
      });
    }
    else {
      this.resetRace(eventRace.value);
    }
  }

  onGotoRace() {
    this.setRaceWiners();
    window.open(this.raceInstance.raceUrl, '_blank');
  }

  onAllowSecondGuest(item) {
    this.raceInstance.allowSecondGuest = item.checked;
  }

  onReset() {
    const message = `Are you sure you want to reset this race?`;

    const dialogData = new ConfirmDialogModel("Confirm Reset", message);

    const dialogRef = this.dialog.open(ConfirmDialog, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.resetRace(this.raceInstance.eventRaceId);

      }
    });

  }

  onSelectHorse() {
    var selectedGuestObj = this.activeGuests.find(guest => guest['id'] === this.selectedGuestId);
    if (this.raceInstance.allowHorseSelection) {
      if (this.raceInstance.guestHasBeenAssigned(this.selectedGuestId)) {
        const message = `Guest has already place a bet. Are you sure you want to continue?`;

        const dialogData = new ConfirmDialogModel("Double Betting", message);

        const dialogRef = this.dialog.open(ConfirmDialog, {
          maxWidth: "400px",
          data: dialogData
        });

        dialogRef.afterClosed().subscribe(dialogResult => {
          if (dialogResult == true) {
            this.assignGuestToRoster(selectedGuestObj);           
          }
        });
      }
      else {
          this.assignGuestToRoster(selectedGuestObj);        
      }
    }
  }

  onRemoveGuest(guestNumber: number, guestId: number) {
    const message = `Are you sure you want to Remove the Guest from the Roster?`;

    const dialogData = new ConfirmDialogModel("Guest Removal", message);

    const dialogRef = this.dialog.open(ConfirmDialog, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.raceInstance.deleteGuestFromRoaster(guestNumber, guestId);    
      }
    });
  }

  onActivateGuests() {
    const dialogRef = this.dialog.open(ActivateGuestsDialog, {
      width: '350px',
      data: { id: 1 }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.guestService.getActiveGuests().subscribe((guests: IGuests[]) => {
        this.activeGuests = guests;
      });
    });
  }

  onNewGuests() {
    const dialogRef = this.dialog.open(GuestEditDialog, {
      width: '350px',
      data: { Id: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.guestService.getActiveGuests().subscribe((guests: IGuests[]) => {
        this.activeGuests = guests;
      });
    });
  }

  onShowWinners() {
    this.setRaceWiners();

    setTimeout(() => {
      const dialogRef = this.dialog.open(ShowWinnersDialog, {
        width: '550px',
        data: this.raceInstance
      });

    }, 2000);

  }

  onLockRace() {
    var records: EventRaceGuests[] = [];
    this.raceInstance.eventRaceGuests.forEach((verg: VwEventRaceGuests) => {
      if (verg.id == 0 && verg.guest1Id > 0) {
        var erg = new EventRaceGuests(verg.eventRaceId, verg.assignedHorseNumber);
        erg.guest1Id = verg.guest1Id;
        erg.guest2Id = verg.guest2Id;
        var result = this.raceResults.find(r => r['horseNumber'] == verg.assignedHorseNumber);
        if (result) {
          erg.placeId = result['placeId'];
          switch (result['placeId']) {
            case 1:
              erg.wonAmount = this.raceInstance.firstPlaceAmount;
              verg.wonAmount = this.raceInstance.firstPlaceAmount;
              break;
            case 2:
              erg.wonAmount = this.raceInstance.secondPlaceAmount;
              verg.wonAmount = this.raceInstance.secondPlaceAmount;
              break;
            case 3:
              erg.wonAmount = this.raceInstance.thirdPlaceAmount;
              verg.wonAmount = this.raceInstance.thirdPlaceAmount;
              break;
          }
        }
        else {
          erg.placeId = null;
        }

        records.push(erg);
      }
    });

    this.eventRaceGuestService.saveRace(records).subscribe(() => {
      this.raceInstance.saved = true;
      this.myStepper.selected.completed = true;
      this.myStepper.next();
    });
  }

  onAddRaceToRoster() {
    const dialogRef = this.dialog.open(AddRaceToEventDialog, {
      width: '350px',
      data: { id: this.eventId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.eventRaceService.getSelecteRacesByEventId(this.eventId).subscribe((data: VwEventRace[]) => {
        this.races = data;
      });
    });
  }

  onVideoEnded() {
    this.setRaceWiners();
    this.myStepper.previous();
  }

  private generateRoster(eventRaceId: number) {
    var raceWithdrawnHorses: IRaceWithdrawnHorses[];
    var selectedRace: VwEventRace = this.races.find(x => x.eventRaceId == eventRaceId);
    this.raceInstance.numberOfHorses = selectedRace.numberOfHorses;
    this.raceInstance.raceUrl = selectedRace.raceUrl;
    this.raceInstance.raceVideoName = selectedRace.videoName;
    this.video.nativeElement.src = selectedRace.videoName ? "Races/" + selectedRace.videoName : "";
    this.video.nativeElement.load();

    this.raceInstance.raceId = selectedRace.raceId;
    
    this.eventRaceGuestService.getEventRaceGuestsByEventRaceId(eventRaceId).subscribe((data: VwEventRaceGuests[]) => {
      if (data.length > 0) {
        this.raceInstance.setEventRaceGuests = data;
        this.raceInstance.saved = true;
        this.raceInstance.raceWasLoadedFromDB = true;
        this.myStepper.selected.completed = true;
      }
      else {
        this.raceWithdrawnHorseService.getRaceWithdrawnHorses(selectedRace.raceId).subscribe((data: IRaceWithdrawnHorses[]) => {
          raceWithdrawnHorses = data;
          var eventRacesG: Array<VwEventRaceGuests> = [];
          for (var index = 0; index < this.raceInstance.numberOfHorses; index++) {
            var item = new VwEventRaceGuests(selectedRace.eventRaceId, index + 1);
            eventRacesG.push(item);
          }
          this.raceInstance.setEventRaceGuests = eventRacesG;
          // Block withdrawn horses by assigning them first
          if (raceWithdrawnHorses.length > 0) {
            raceWithdrawnHorses.forEach((horse: IRaceWithdrawnHorses) => {
              this.raceInstance.assignWithdrawnHorseToRoaster(horse.horseNumber, this.utilityService.WithdrawnGuest);              
            });            
          }
          this.raceInstance.saved = false;
          this.raceInstance.raceWasLoadedFromDB = false;          
        });        
      }
    });
  }

  private assignGuestToRoster(selectedGuestObj: IGuests) {
    var horse = this.raceInstance.getRandomUnassignedHorse();
    const dialogRef = this.dialog.open(SelectHorseDialog, {
      width: '640px',
      data: { horseNumber: horse.assignedHorseNumber, guestAvatar: selectedGuestObj.avatarName, guestName: selectedGuestObj['name'] }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.raceInstance.assignGuestToRoaster(horse, selectedGuestObj);
    });
  }

  private resetRace(eventRaceId: number) {
    this.myStepper.selected.completed = false;
    this.raceInstance.firstPlaceAmount = 0;
    this.raceInstance.secondPlaceAmount = 0;
    this.raceInstance.thirdPlaceAmount = 0;
    this.raceInstance.betAmount = 0;
    this.raceInstance.saved = false;
    this.raceInstance.eventRaceId = eventRaceId
    this.generateRoster(this.raceInstance.eventRaceId);   
    this.raceResultService.getRaceResultByRaceId(this.raceInstance.raceId).subscribe((data: RaceResults[]) => {
      this.raceResults = data;
    });  
  }

  private setRaceWiners() {
    this.raceInstance.eventRaceGuests.forEach((item: VwEventRaceGuests) => {
      item.placeId = 0;
    });
    this.raceInstance.winners = [];
    this.raceResults.forEach((result: RaceResults) => {
      var winners = this.raceInstance.eventRaceGuests.find(e => e.assignedHorseNumber == result['horseNumber']);
      this.raceInstance.winners.push(winners);
      winners.placeId = result['placeId'];
    });
  }
}
