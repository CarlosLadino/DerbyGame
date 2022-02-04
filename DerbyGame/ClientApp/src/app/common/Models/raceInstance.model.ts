import { RaceResultService } from "../Services/raceResult.service";
import { EventRaceGuests, VwEventRaceGuests } from "./eventRaceGuest.model";
import { IGuests } from "./guest.model";
import { IVWRaceProgress } from "./raceProgress.model";
import { RaceResults } from "./raceResult.model";

export interface IRaceInstance {
    eventRaceId: number;
    betAmount: number;
    allowSecondGuest: boolean;
    firstPlaceAmount: number;
    secondPlaceAmount: number;
    thirdPlaceAmount: number;
    numberOfHorses: number;
    raceUrl: string;
    raceId: number;
    saved: boolean;
  eventRaceGuests: VwEventRaceGuests[];
    winners: VwEventRaceGuests[];
  raceWasLoadedFromDB: boolean;
  raceResults: RaceResults[];
  raceProgress: IVWRaceProgress[];
}

export class RaceInstance implements IRaceInstance {
    eventRaceId: number;
    betAmount: number;
    allowSecondGuest: boolean;
    firstPlaceAmount: number;
    secondPlaceAmount: number;
    thirdPlaceAmount: number;
    numberOfHorses: number;
    raceUrl: string;
    raceId: number;
    raceVideoName: string;
    finishLineTime: number;
    saved: boolean;
    eventRaceGuests: VwEventRaceGuests[];
    winners: VwEventRaceGuests[];
  raceWasLoadedFromDB: boolean;
  raceResults: RaceResults[];
  raceProgress: IVWRaceProgress[];
    constructor() {
        this.eventRaceId = 0;
        this.betAmount = 0;
        this.allowSecondGuest = false;
        this.firstPlaceAmount = 0;
        this.secondPlaceAmount = 0;
        this.thirdPlaceAmount = 0;
        this.numberOfHorses = 0;
        this.raceUrl = "";
        this.raceId = 0;
        this.raceVideoName = "";
        this.finishLineTime = 0;
        this.saved = false;
        this.eventRaceGuests = [];
        this.winners = [];
      this.raceWasLoadedFromDB = false;
      this.raceResults = [];
      this.raceProgress =[];
  }

  public set setEventRaceGuests(value: VwEventRaceGuests[]) {
    this.eventRaceGuests = value;
  }

  public set setWinners(value: RaceResults[]) {
    this.raceResults = value
  }

  public assignWiningsToEventRaceGuests() {
    this.raceResults.forEach((result: RaceResults) => {
      var erg = this.eventRaceGuests.find(e => e.assignedHorseNumber == result.HorseNumber);
      switch (result.PlaceId) {
        case 1:
          erg.wonAmount = this.firstPlaceAmount;
          break;
        case 2:
          erg.wonAmount = this.secondPlaceAmount;
          break;
        case 3:
          erg.wonAmount = this.thirdPlaceAmount;
          break;
      }
    });
  }

  public get allowGuestSelection(): boolean {
    return this.eventRaceId > 0
      && this.betAmount > 0
      && this.saved == false;
  }

  public get allowHorseSelection(): boolean {
    if (this.allowSecondGuest) {
      return !this.saved && (this.eventRaceGuests.filter(a => a.guest1Id == 0).length > 0) || (this.eventRaceGuests.filter(a => a.guest2Id == 0).length > 0);
    }
    else {
      return !this.saved && (this.eventRaceGuests.filter(a => a.guest1Id == 0).length > 0);
    }
  }

  public get allowToStartNewRace(): boolean {
    return this.saved && this.eventRaceGuests.filter(a => a.placeId > 0).length > 0
  }

  public get getTotalCollected(): number{
    var total: number = 0;
    this.eventRaceGuests.forEach((e) => {
      if (e.guest1Id > 0 && e.guest2Id !== 7003) {
        total = total + this.betAmount;  
      }
      if (e.guest2Id > 0 && e.guest2Id !== 7003)
        total = total = total + this.betAmount;
    });

    return total;
  }

  public get allowRaceViewing(): boolean {
    return this.raceWasLoadedFromDB || this.saved
  }

  public guestHasBeenAssigned(selectedGuestId: number): boolean {
    var guest = this.eventRaceGuests.find(e => e.guest1Id === selectedGuestId || e.guest2Id === selectedGuestId);
    return guest != null;
  }

  public assignWithdrawnHorseToRoaster(horseNumber: number , guest: IGuests) {
    var horse = this.eventRaceGuests.find(e => e.assignedHorseNumber == horseNumber);
    horse.guest1Id = horse.guest2Id = guest.id;
    horse.guest1Name = horse.guest2Name = guest.name;
    if (guest.avatarName) {
      horse.guest1Avatar = horse.guest2Avatar = guest.avatarName;
    }
  }

  public assignGuestToRoaster(horse: VwEventRaceGuests, guest: IGuests): number {
    if (horse.guest1Id == 0) {
      horse.guest1Id = guest.id;
      horse.guest1Name = guest.name;
      if (guest.avatarName) {
        horse.guest1Avatar = guest.avatarName;
      }
    }
    else {
      horse.guest2Id = guest.id;
      horse.guest2Name = guest.name;
      if (guest.avatarName) {
        horse.guest2Avatar = guest.avatarName;
      }
    }

    this.calculatePrices();

    return horse.assignedHorseNumber;
  }

  public deleteGuestFromRoaster(guestNumber: number, guestId: number) {
    if (guestNumber == 1) {
      var eventGuestObj = this.eventRaceGuests.find(e => e.guest1Id == guestId);
      eventGuestObj.guest1Id = 0;
      eventGuestObj.guest1Name = '';
      eventGuestObj.guest1Avatar = '';
    }
    else {
      var eventGuestObj = this.eventRaceGuests.find(e => e.guest2Id == guestId);
      eventGuestObj.guest2Id = 0;
      eventGuestObj.guest2Name = '';
      eventGuestObj.guest2Avatar = '';
    }

    this.calculatePrices();
  }

  public getRandomUnassignedHorse(): VwEventRaceGuests {
    var unassignedHorses: VwEventRaceGuests[]; 
    unassignedHorses = this.eventRaceGuests.filter((item: VwEventRaceGuests) => {
      return item.guest1Id == 0;
    });

    if (unassignedHorses.length > 0) {
        
      return this.randomlySelectUnassignedHorse(unassignedHorses);
    }
    else {
      if (this.allowSecondGuest) {
        unassignedHorses = this.eventRaceGuests.filter((item: VwEventRaceGuests) => {
          return item.guest2Id == 0;
        });
        return this.randomlySelectUnassignedHorse(unassignedHorses);
      }
    }
  }

  private randomlySelectUnassignedHorse(evenRaceGuests: VwEventRaceGuests[]): VwEventRaceGuests {
    var selectedIndex = Math.floor(Math.random() * (evenRaceGuests.length));
    var selectedHorseObj = evenRaceGuests[selectedIndex];
    var eventObj = this.eventRaceGuests.find(e => e.assignedHorseNumber === selectedHorseObj.assignedHorseNumber);
    return eventObj;
  }

  private calculatePrices() {
    var tempFirstPlace = this.calculatePercentage(.5);
    var tempSecondPlace = this.calculatePercentage(.3);
    var tempThirdPlace = this.calculatePercentage(.2);
    var initaialAssignedMoney = tempFirstPlace + tempSecondPlace + tempThirdPlace;
    var delta = this.getTotalCollected - initaialAssignedMoney;

    if (delta > 0) {
      if (this.allowSecondGuest) {
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
        if (this.allowSecondGuest) {
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
          if (delta == 1) { delta = 0; }
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
    this.firstPlaceAmount = tempFirstPlace;
    this.secondPlaceAmount = tempSecondPlace;
    this.thirdPlaceAmount = tempThirdPlace;
  }

  private calculatePercentage(percentage: number) {
    var totalCollected = this.getTotalCollected;
    if (totalCollected > 0) {
      if (this.allowSecondGuest) {
        var temp = Math.floor(totalCollected * percentage);
        if (temp % 2 == 1) {
          temp--;
        }
        return temp;
      }
      else {
        return Math.floor(totalCollected * percentage);
      }
    }
  }
}
