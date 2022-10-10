import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { EventRaceService } from '../common/Services/eventRace.service';
import { EventService } from '../common/Services/event.service';
import { Events } from '../common/Models/event.model';
import { UtilityService } from '../common/Services/utility.service';
import { Races } from '../common/Models/race.model';
import { RaceInstance } from '../common/Models/raceInstance.model';
import { VwEventRace } from '../common/Models/eventRace.model';
import { EventRaceGuests, VwEventRaceGuests } from '../common/Models/eventRaceGuest.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper, MatHorizontalStepper } from '@angular/material/stepper';
import { GuestService } from '../common/Services/guest.service';
import { IGuests } from '../common/Models/guest.model';
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
import { RaceProgressService } from '../common/Services/raceProgress.service';
import { IVWRaceProgress } from '../common/Models/raceProgress.model';
import { places } from '../common/enumerations';
import { SelectGuestDialog } from './selectGuest.dialog';
import { RaceInstanceService } from '../common/Services/raceInstance.service';
import { Observable, timer } from 'rxjs';
import { PreRaceRosterComponent } from '../common/CustomComponents/preRaceRoster.component';

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
  public selectedGuestId: number = 0;
  public selectedEventRaceId: number = 0;
  public horsesAreAvailable: boolean = true;
  private raceResults: RaceResults[];
  private enableWinners: boolean = false;
  private eventId: number = 0;
  @ViewChild('video', { static: false })
  public video: ElementRef;
  @ViewChild('stepper', { static: false })
  private myStepper: MatStepper;
  @ViewChild(PreRaceRosterComponent, { static: false })
  private preRaceRoster: PreRaceRosterComponent;

  private tada = new Audio();
  private videoCurrentTime: number = 0;
  public showingRoster: boolean = false;

  constructor(private eventService: EventService,
    private raceInstanceService: RaceInstanceService,
    public utilityService: UtilityService,
    private eventRaceService: EventRaceService,
    private guestService: GuestService,
    private eventRaceGuestService: EventRaceGuestService,
    private raceProgressService: RaceProgressService,
    public dialog: MatDialog,
    public raceResultService: RaceResultService,
    public raceWithdrawnHorseService: RaceWithdrawnHorseService) {
    this.tada.src = "Content/tada.wav";
  }

  ngOnInit() {
    this.eventService.getActive().subscribe((event: Events) => {
      this.eventId = event.id;
      this.loadRaces();
    });
  }

  canDeactivate() {
    if (!this.raceInstance.raceWasLoadedFromDB && !this.raceInstance.allowToStartNewRace) {
      if (this.raceInstance.getTotalCollected > 0) {
        const message = `If you navigate out of this page all data will be lost. Are you sure you want to do that?`;
        const dialogData = new ConfirmDialogModel("Confirm Leaving Race", message);
        const dialogRef = this.dialog.open(ConfirmDialog, {
          maxWidth: "400px",
          data: dialogData,
          disableClose: true
        });

        return dialogRef.afterClosed()
      }
      else {
        return true;
      }
    }
    else {
      return true;
    }
  }

  onRaceSelectionChange(eventRace:any) {
    if (!this.raceInstance.raceWasLoadedFromDB && !this.raceInstance.allowToStartNewRace) {
      if (this.raceInstance.getTotalCollected > 0) {
        const message = `Betting is in progress. Are you sure you want to reset this race?`;

        const dialogData = new ConfirmDialogModel("Confirm Reset", message);

        const dialogRef = this.dialog.open(ConfirmDialog, {
          maxWidth: "400px",
          data: dialogData,
          disableClose: true
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
    else {
      this.resetRace(eventRace.value);
    }
  }

  onShowRoster() {
    this.preRaceRoster.onStartDisplay();
    this.showingRoster = true
  }

  onPreRosterDisplayDone() {
    this.showingRoster = false;
  }

  onReset() {
    const message = `Are you sure you want to reset this race?`;

    const dialogData = new ConfirmDialogModel("Confirm Reset", message);

    const dialogRef = this.dialog.open(ConfirmDialog, {
      maxWidth: "400px",
      data: dialogData,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.resetRace(this.raceInstance.eventRaceId);

      }
    });

  }

  onSelectHorse() {
    var selectedGuestObj = this.raceInstanceService.getActiveGuest(this.selectedGuestId);
    if (selectedGuestObj.id > 0) {
      if (this.raceInstance.allowHorseSelection) {
        if (this.raceInstance.guestHasBeenAssigned(this.selectedGuestId)) {
          const message = `Guest has already place a bet. Are you sure you want to continue?`;

          const dialogData = new ConfirmDialogModel("Double Betting", message);

          const dialogRef = this.dialog.open(ConfirmDialog, {
            maxWidth: "400px",
            data: dialogData,
            disableClose: true
          });

          dialogRef.afterClosed().subscribe(dialogResult => {
            if (dialogResult == true) {
              if (selectedGuestObj != undefined) {
                this.assignGuestToRoster(selectedGuestObj);
              }             
            }
          });
        }
        else {
          this.assignGuestToRoster(selectedGuestObj);
        }
      }
    }
  }

  onRemoveGuest(guestNumber: number, guestId: number) {
    const message = `Are you sure you want to Remove the Guest from the Roster?`;

    const dialogData = new ConfirmDialogModel("Guest Removal", message);

    const dialogRef = this.dialog.open(ConfirmDialog, {
      maxWidth: "400px",
      data: dialogData,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.raceInstance.deleteGuestFromRoster(guestNumber, guestId);    
      }
    });
  }

  onActivateGuests() {
    const dialogRef = this.dialog.open(ActivateGuestsDialog, {
      width: '350px',
      data: { id: 1 }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.raceInstanceService.getActiveGuests(true);
    });
  }

  onNewGuests() {
    const dialogRef = this.dialog.open(GuestEditDialog, {
      width: '350px',
      data: { Id: 0 },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.raceInstanceService.getActiveGuests(true);
    });
  }

  //onShowWinners() {
  //  this.setRaceWiners();

  //  setTimeout(() => {
  //    const dialogRef = this.dialog.open(ShowWinnersDialog, {
  //      width: '550px',
  //      data: this.raceInstance,
  //      disableClose: true
  //    });

  //  }, 2000);

  //}

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
          erg.placeId = 0;
        }

        records.push(erg);
      }
    });

    this.eventRaceGuestService.saveRace(records).subscribe(() => {
      this.raceInstance.saved = true;
      if (this.myStepper.selected !== undefined) {
        this.myStepper.selected.completed = true;
      }     
      this.myStepper.next();
      this.loadRaces();
    });
  }

  onAddRaceToRoster() {
    const dialogRef = this.dialog.open(AddRaceToEventDialog, {
      width: '350px',
      data: { id: this.eventId },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadRaces();
    });
  }

  onVideoEnded() {
    if (this.video.nativeElement.webkitExitFullscreen) {
      this.video.nativeElement.webkitExitFullscreen();
    }
    
    this.setRaceWiners();
    this.myStepper.previous();
    this.tada.play();
  }

  onTimeUpdate() {
    //Only change values once per second
    if (this.videoCurrentTime != parseInt(this.video.nativeElement.currentTime)) {
      this.updateProgress(parseInt(this.video.nativeElement.currentTime));
      if (this.raceInstance.finishLineTime > 0 && this.raceInstance.raceVideoName.length > 0) {
        if (this.video.nativeElement.currentTime >= this.raceInstance.finishLineTime && this.video.nativeElement.currentTime <= this.raceInstance.finishLineTime + 1) {
          if (this.video.nativeElement.webkitExitFullscreen) {
            this.video.nativeElement.webkitExitFullscreen();
          }
          this.setRaceWiners();
        }
      }
      this.videoCurrentTime = parseInt(this.video.nativeElement.currentTime);
    }
  }

  private generateRoster(eventRaceId: number) {
  ///////////////////////////////////////var raceWithdrawnHorses: IRaceWithdrawnHorses[];
    var selectedRace = this.races.find(x => x.eventRaceId == eventRaceId);
    if (selectedRace != undefined) {
      this.raceInstance.numberOfHorses = selectedRace.numberOfHorses;
      this.raceInstance.raceUrl = selectedRace.raceUrl;
      this.raceInstance.raceVideoName = selectedRace.videoName;
      this.raceInstance.finishLineTime = selectedRace.finishLineTime;
      this.video.nativeElement.src = selectedRace.videoName ? "Races/" + selectedRace.videoName : "";
      this.video.nativeElement.load();

      this.raceInstance.raceId = selectedRace.raceId;

      this.raceProgressService.getRaceProgress(selectedRace.raceId).subscribe((data: IVWRaceProgress[]) => {
        this.raceInstance.raceProgress = data;
      });

      this.eventRaceGuestService.getEventRaceGuestsByEventRaceId(eventRaceId).subscribe((data: VwEventRaceGuests[]) => {
        if (data.length > 0) {
          this.raceInstance.setEventRaceGuests = data;
          this.raceInstance.saved = data[0].id > 0;
          this.raceInstance.raceWasLoadedFromDB = data[0].id > 0;
          if (this.myStepper.selected != undefined) {
            this.myStepper.selected.completed = data[0].id > 0;
            if (data[0].id > 0) {
              let firstplace = data.find(r => r.placeId == places.First);
              let secondPlace = data.find(r => r.placeId == places.Second);
              let thirdPlace = data.find(r => r.placeId == places.Third);
              if (firstplace !== undefined) {
                this.raceInstance.firstPlaceAmount = firstplace.wonAmount;
              }
              if (secondPlace !== undefined) {
                this.raceInstance.secondPlaceAmount = secondPlace.wonAmount;
              }
              if (thirdPlace !== undefined) {
                this.raceInstance.thirdPlaceAmount = thirdPlace.wonAmount;
              }          
            }
          }         
        }
      });
    }
    
   
  }

  private assignGuestToRoster(selectedGuestObj: IGuests) {
    var horse = this.raceInstance.getRandomUnassignedHorse();
    const dialogRef = this.dialog.open(SelectHorseDialog, {
      width: '640px',
      data: { horseNumber: horse.assignedHorseNumber, guestAvatar: selectedGuestObj.avatarName, guestName: selectedGuestObj['name'] },
      disableClose: true
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.raceInstance.assignGuestToRoster(horse, selectedGuestObj);
    });
  }

  private resetRace(eventRaceId: number) {
    if (this.myStepper.selected != undefined) {
      this.myStepper.selected.completed = false;
    }    
    this.raceInstance.firstPlaceAmount = 0;
    this.raceInstance.secondPlaceAmount = 0;
    this.raceInstance.thirdPlaceAmount = 0;
    this.raceInstance.betAmount = 0;
    this.videoCurrentTime = 0;
    this.raceInstance.saved = false;
    this.raceInstance.eventRaceId = eventRaceId
    this.generateRoster(this.raceInstance.eventRaceId);   
    this.raceResultService.getRaceResultByRaceId(this.raceInstance.raceId).subscribe((data: RaceResults[]) => {
      this.raceResults = data;
    });  
  }

  private setRaceWiners() {
    if (!(this.raceInstance.winners.length > 0)) {
      this.raceInstance.eventRaceGuests.forEach((item: VwEventRaceGuests) => {
        item.placeId = 0;
      });
      this.raceInstance.winners = [];
      this.raceResults.forEach((result: RaceResults) => {
        var winners = this.raceInstance.eventRaceGuests.find(e => e.assignedHorseNumber == result['horseNumber']);
        if (winners != undefined) {
          this.raceInstance.winners.push(winners);
          winners.placeId = result['placeId'];
        }       
      });
    } 
  }

  private loadRaces() {
    this.eventRaceService.getSelecteRacesByEventId(this.eventId).subscribe((data: VwEventRace[]) => {
      this.races = data;
    });
  }

  private updateProgress(videoCurrentTime: number) {   
    let timeMaker = this.raceInstance.raceProgress.find(e => e.timeMarker == videoCurrentTime);
    if (timeMaker != undefined) {
      this.raceInstance.eventRaceGuests.forEach((item: VwEventRaceGuests) => {
        if (timeMaker != undefined) {
          if (item.assignedHorseNumber == timeMaker.firstPlace) {
            item.placeId = 1
          }
          else if (item.assignedHorseNumber == timeMaker.secondPlace) {
            item.placeId = 2
          }
          else if (item.assignedHorseNumber == timeMaker.thirdPlace) {
            item.placeId = 3
          }
          else {
            item.placeId = 0;
          }
        }  
      });
    }
  }
}
