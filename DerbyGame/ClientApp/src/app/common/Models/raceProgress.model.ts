export interface RaceProgress {
  Id: number;
  RaceId: number;
  PlaceId: number;
  TimeMarker: number;
  HorseNumber: number
}

export interface IVWRaceProgress {
  id: number;
  raceId: number;
  timeMarker: number;
  firstPlace: number;
  secondPlace: number;
  thirdPlace: number;
}

export class VWRaceProgress implements IVWRaceProgress {
  id: number;
  raceId: number;
  timeMarker: number;
  firstPlace: number;
  secondPlace: number;
  thirdPlace: number;

  constructor(raceId: number) {
    this.id = 0;
    this.raceId = raceId;
    this.timeMarker = 0;
    this.firstPlace = 0;
    this.secondPlace = 0;
    this.thirdPlace = 0;
  }
}
