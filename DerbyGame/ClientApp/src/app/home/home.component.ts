import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { EventRaceService } from '../common/Services/eventRace.service';
import { EventService } from '../Common/Services/event.service';
import { Events } from '../Common/Models/event.model';
import { UtilityService } from '../common/Services/utility.service';
import { Races } from '../Common/Models/race.model';
import { RaceInstance } from '../common/Models/raceInstance.model';
import { VwEventRace } from '../common/Models/eventRace.model';
import { EventRaceGuests, VwEventRaceGuests } from '../common/Models/eventRaceGuest.model';
import { MatTableDataSource, MatDialog, MatStepper } from '@angular/material';
import { GuestService } from '../Common/Services/guest.service';
import { Guests } from '../Common/Models/guest.model';
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
    public activeGuests: Guests[];
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
        public raceResultService: RaceResultService) {
    }

    ngOnInit() {       
        this.eventService.getActive().subscribe((event: Events) => {
            this.eventRaceService.getSelecteRacesByEventId(event.id).subscribe((data: VwEventRace[]) => {
                this.eventId = event.id;
                this.races = data;
            });           
        });

        this.guestService.getActiveGuests().subscribe((guests: Guests[]) => {
            this.activeGuests = guests;
        });        
    }

    canDeactivate() {
        if (this.raceInstance.totalCollected > 0) {
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

    onSelectionChange(eventRace) {
        if (this.raceInstance.totalCollected > 0) {
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
        if (this.raceInstance.raceVideoName) {
            this.myStepper.next();
        }
        else {
            window.open(this.raceInstance.raceUrl, '_blank');
        }
       
        if (!this.raceInstance.raceWasLoadedFromDB) {
            this.enableWinners = true;
        }        
    }

    onAllowSecondGuest(item) {
        this.raceInstance.allowSecondGuest = item.checked;
        this.setAvailableHorsesFlag();
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
        var eventGuestObj: VwEventRaceGuests;
        var guestNumberToBeAssigned: number;
        var selectedGuestObj = this.activeGuests.find(guest => guest['id'] === this.selectedGuestId);
        var horseWasAvailable: boolean = true;

        // add validation to UI so they cannot select a GUEST until the race has been selected and also a guest.

        // See if there are available horses for guest 1
        if (this.thereAreAvailableHorses(1)) {
            eventGuestObj = this.getRandomUnassignedHorse(1);
            guestNumberToBeAssigned = 1;
        }
        else {
            if (this.raceInstance.allowSecondGuest) {
                if (this.thereAreAvailableHorses(2)) {
                    eventGuestObj = this.getRandomUnassignedHorse(2);
                    guestNumberToBeAssigned = 2;
                }
                else {
                    horseWasAvailable = false;
                }
            }
            else {
                horseWasAvailable = false;
            }
           
        }
       
        if (this.guestHasBeenAssigned()) {
            const message = `Guest has already place a bet. Are you sure you want to continue?`;

            const dialogData = new ConfirmDialogModel("Double Betting", message);

            const dialogRef = this.dialog.open(ConfirmDialog, {
                maxWidth: "400px",
                data: dialogData
            });

            dialogRef.afterClosed().subscribe(dialogResult => {
                if (dialogResult == true) {
                    if (horseWasAvailable) {
                        this.assignGuestToRoster(eventGuestObj, guestNumberToBeAssigned, selectedGuestObj);
                        this.setAvailableHorsesFlag();
                    }
                }
            });
        }
        else {
            if (horseWasAvailable) {
                this.assignGuestToRoster(eventGuestObj, guestNumberToBeAssigned, selectedGuestObj);
                this.setAvailableHorsesFlag();
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
                if (guestNumber == 1) {
                    var eventGuestObj = this.eventRaceGuests.find(e => e.guest1Id == guestId);
                    eventGuestObj.guest1Id = 0;
                    eventGuestObj.guest1Name = '';
                }
                else {
                    var eventGuestObj = this.eventRaceGuests.find(e => e.guest2Id == guestId);
                    eventGuestObj.guest2Id = 0;
                    eventGuestObj.guest2Name = '';
                }

                this.setAvailableHorsesFlag();
            }
        });
    }

    onActivateGuests() {
        const dialogRef = this.dialog.open(ActivateGuestsDialog, {
            width: '350px',
            data: { id: 1 }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.guestService.getActiveGuests().subscribe((guests: Guests[]) => {
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
            this.guestService.getActiveGuests().subscribe((guests: Guests[]) => {
                this.activeGuests = guests;
            });
        });
    }

    onShowWinners() {
        this.eventRaceGuests.forEach((item: VwEventRaceGuests) => {
            item.placeId = 0;
        });
        this.raceInstance.winners = [];
        this.raceResults.forEach((result: RaceResults) => {
            var winners = this.eventRaceGuests.find(e => e.assignedHorseNumber == result['horseNumber']);
            this.raceInstance.winners.push(winners);
            winners.placeId = result['placeId'];
        });

        setTimeout(() => {
            const dialogRef = this.dialog.open(ShowWinnersDialog, {
                width: '550px',
                data: this.raceInstance
            });

        }, 2000);
        
    }

    onLockRace() {
        var records: EventRaceGuests[] = [];
        this.eventRaceGuests.forEach((verg: VwEventRaceGuests) => {
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

        this.eventRaceGuestService.saveRace(records).subscribe();
        this.raceInstance.saved = true;     
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

    private generateRoster(eventRaceId: number) {
        var selectedRace: VwEventRace = this.races.find(x => x.eventRaceId == eventRaceId);
        this.raceInstance.numberOfHorses = selectedRace.numberOfHorses;
        this.raceInstance.raceUrl = selectedRace.raceUrl;
        this.raceInstance.raceVideoName = selectedRace.videoName;
        this.video.nativeElement.src = selectedRace.videoName ? "Races/" + selectedRace.videoName : "";
        this.video.nativeElement.load();
        
        this.raceInstance.raceId = selectedRace.raceId;
        this.enableWinners = false;
        this.eventRaceGuestService.getEventRaceGuestsByEventRaceId(eventRaceId).subscribe((data: VwEventRaceGuests[]) => {
            if (data.length > 0) {
                this.eventRaceGuests = data;
                this.raceInstance.saved = true;
                this.raceInstance.raceWasLoadedFromDB = true;
            }
            else {
                var eventRacesG: Array<VwEventRaceGuests> = [];
                for (var index = 0; index < this.raceInstance.numberOfHorses; index++) {
                    var item = new VwEventRaceGuests(selectedRace.eventRaceId, index + 1);
                    eventRacesG.push(item);
                }
                this.eventRaceGuests = eventRacesG;
                this.raceInstance.saved = false;
                this.raceInstance.raceWasLoadedFromDB = false;
            }
           
            this.setAvailableHorsesFlag();
        });
       
    }

    private assignGuestToRoster(eventGuestObj: VwEventRaceGuests, guestNumberToBeAssigned: number, selectedGuestObj: Guests) {
        const dialogRef = this.dialog.open(SelectHorseDialog, {
            width: '640px',
            data: { horseNumber: eventGuestObj.assignedHorseNumber, guestAvatar: selectedGuestObj.avatarName, guestName: selectedGuestObj['name'] }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (guestNumberToBeAssigned == 1) {
                eventGuestObj.guest1Id = selectedGuestObj['id'];
                eventGuestObj.guest1Name = selectedGuestObj['name'];
                if (selectedGuestObj.avatarName) {
                    eventGuestObj.guest1Avatar = selectedGuestObj.avatarName;
                }                
            }
            else {
                eventGuestObj.guest2Id = selectedGuestObj['id'];
                eventGuestObj.guest2Name = selectedGuestObj['name'];
                if (selectedGuestObj.avatarName) {
                    eventGuestObj.guest2Avatar = selectedGuestObj.avatarName;
                }                
            }
            this.setAvailableHorsesFlag();
        });
       
        this.raceInstance.totalCollected = this.raceInstance.totalCollected + this.raceInstance.betAmount;
        this.calculatePrices();
    }

    private getRandomUnassignedHorse(guestNumber: number): VwEventRaceGuests {
        var unassignedHorse = this.eventRaceGuests.filter((item: VwEventRaceGuests) => {
            return guestNumber == 1 ? item.guest1Id == 0 : item.guest2Id == 0 ;
        });

        var selectedIndex = Math.floor(Math.random() * (unassignedHorse.length));
        
        var selectedHorseObj = unassignedHorse[selectedIndex];
        var eventObj = this.eventRaceGuests.find(e => e.assignedHorseNumber === selectedHorseObj.assignedHorseNumber);
        return eventObj;
    }

    private thereAreAvailableHorses(guestNumber: number) {
        var availableHorses: VwEventRaceGuests[]; 
        if (guestNumber === 1) {
            availableHorses = this.eventRaceGuests.filter(a => a.guest1Id == 0);
        }
        else {
            availableHorses = this.eventRaceGuests.filter(a => a.guest2Id == 0);
        }

        return availableHorses.length > 0; 
    }

    private setAvailableHorsesFlag() {
        var availableHorses: VwEventRaceGuests[];
        if (this.raceInstance.allowSecondGuest) {
            this.horsesAreAvailable = (this.eventRaceGuests.filter(a => a.guest1Id == 0).length > 0) || (this.eventRaceGuests.filter(a => a.guest2Id == 0).length > 0);
        }
        else {
            this.horsesAreAvailable = (this.eventRaceGuests.filter(a => a.guest1Id == 0).length > 0);
        }
    }

    private guestHasBeenAssigned() {
        var guest = this.eventRaceGuests.find(e => e.guest1Id === this.selectedGuestId || e.guest2Id === this.selectedGuestId);
        return guest != null; 
    }

    private calculatePrices() {
        var tempFirstPlace = this.calculatePercentage(.6);
        var tempSecondPlace = this.calculatePercentage(.3);
        var tempThirdPlace = this.calculatePercentage(.1);
        var initaialAssignedMoney = tempFirstPlace + tempSecondPlace + tempThirdPlace;
        var delta = this.raceInstance.totalCollected - initaialAssignedMoney;

        if (delta > 0) {
            if (this.raceInstance.allowSecondGuest) {
                if (tempFirstPlace == 0 && delta >= 2) {
                    tempFirstPlace = tempFirstPlace + 2;
                    delta = delta - 2;
                }
                if (tempSecondPlace == 0 && delta >= 2) {
                    tempSecondPlace = tempSecondPlace + 2;
                    delta = delta - 2;
                }
                if (tempThirdPlace == 0 && delta >= 2) {
                    tempThirdPlace = tempThirdPlace + 2;
                    delta = delta - 2;
                }
            }
            else {
                if (tempFirstPlace == 0 && delta >= 1) {
                    tempFirstPlace = tempFirstPlace + 1;
                    delta = delta - 1;
                }
                if (tempSecondPlace == 0 && delta >= 1) {
                    tempSecondPlace = tempSecondPlace + 1;
                    delta = delta - 1;
                }
                if (tempThirdPlace == 0 && delta >= 1) {
                    tempThirdPlace = tempThirdPlace + 1;
                    delta = delta - 1;
                }
            }
                
            do {
                if (this.raceInstance.allowSecondGuest) {
                    if (delta >= 2) {
                        tempFirstPlace = tempFirstPlace + 2;
                        delta = delta - 2;
                    }
                    if (delta >= 2) {
                        tempSecondPlace = tempSecondPlace + 2;
                        delta = delta - 2;
                    }
                    if (delta >= 2) {
                        tempThirdPlace = tempThirdPlace + 2;
                        delta = delta - 2;
                    }
                    // avoid staying in an infinite loop
                    if (delta == 1) { delta = 0;}
                }
                else {
                    if (delta >= 1) {
                        tempFirstPlace = tempFirstPlace + 1;
                        delta = delta - 1;
                    }
                    if (delta >= 1) {
                        tempSecondPlace = tempSecondPlace + 1;
                        delta = delta - 2;
                    }
                    if (delta >= 1) {
                        tempThirdPlace = tempThirdPlace + 1;
                        delta = delta - 1;
                    }
                }
            } while (delta > 0);

        }


        this.raceInstance.firstPlaceAmount = tempFirstPlace;
        this.raceInstance.secondPlaceAmount = tempSecondPlace;
        this.raceInstance.thirdPlaceAmount = tempThirdPlace;
    }

    private calculatePercentage(percentage: number) {
        if (this.raceInstance.totalCollected > 0) {
            if (this.raceInstance.allowSecondGuest) {
                var temp = Math.floor(this.raceInstance.totalCollected * percentage);
                if (temp % 2 == 1) {
                    temp--;
                }
                return temp;
            }
            else {
                return Math.floor(this.raceInstance.totalCollected * percentage);
            }
        }
    }

    private resetRace(eventRaceId: number) {
        this.raceInstance.eventRaceId = eventRaceId
        this.generateRoster(this.raceInstance.eventRaceId);
        this.raceInstance.firstPlaceAmount = 0;
        this.raceInstance.secondPlaceAmount = 0;
        this.raceInstance.thirdPlaceAmount = 0;
        this.raceInstance.totalCollected = 0;
        //this.setAvailableHorsesFlag();
        this.raceResultService.getRaceResultByRaceId(this.raceInstance.raceId).subscribe((data: RaceResults[]) => {
            this.raceResults = data;
        });
        this.raceInstance.saved = this.races.find(race => race.eventRaceId == eventRaceId).saved
    }
}
