export interface IRaceWithdrawnHorses {
    id: number;
    raceId: number;
    horseNumber: number
}

export class RaceWithdrawnHorses implements IRaceWithdrawnHorses {
  id: number;
  raceId: number;
  horseNumber: number
  constructor(id: number, raceId: number, horseNumber: number) {
    this.id = id;
    this.raceId = raceId;
    this.horseNumber = horseNumber;
  }
}
