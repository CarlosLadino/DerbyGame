import { EventRaceGuests, VwEventRaceGuests } from "./eventRaceGuest.model";

export interface IRaceInstance {
    eventRaceId: number;
    betAmount: number;
    allowSecondGuest: boolean;
    totalCollected: number;
    firstPlaceAmount: number;
    secondPlaceAmount: number;
    thirdPlaceAmount: number;
    numberOfHorses: number;
    raceUrl: string;
    raceId: number;
    saved: boolean;
    winners: VwEventRaceGuests[];
    raceWasLoadedFromDB: boolean;
}

export class RaceInstance implements IRaceInstance {
    eventRaceId: number;
    betAmount: number;
    allowSecondGuest: boolean;
    totalCollected: number;
    firstPlaceAmount: number;
    secondPlaceAmount: number;
    thirdPlaceAmount: number;
    numberOfHorses: number;
    raceUrl: string;
    raceId: number;
    raceVideoName: string;
    saved: boolean;
    winners: VwEventRaceGuests[];
    raceWasLoadedFromDB: boolean;
    constructor() {
        this.eventRaceId = 0;
        this.betAmount = 2;
        this.allowSecondGuest = false;
        this.totalCollected = 0;
        this.firstPlaceAmount = 0;
        this.secondPlaceAmount = 0;
        this.thirdPlaceAmount = 0;
        this.numberOfHorses = 0;
        this.raceUrl = "";
        this.raceId = 0;
        this.raceVideoName = "";
        this.saved = false;
        this.winners = [];
        this.raceWasLoadedFromDB = false;
    }
}
