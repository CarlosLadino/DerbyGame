export interface IEventRaceGuests {
    id: number;
    eventRaceId: number;
    guest1Id: number;
    guest2Id: number;
    assignedHorseNumber: number;
    placeId: number;
    wonAmount: number;
}

export class EventRaceGuests implements IEventRaceGuests {
    id: number;
    eventRaceId: number;
    guest1Id: number;
    guest2Id: number;
    assignedHorseNumber: number;
    placeId: number;
    wonAmount: number;
    constructor(eventRaceId: number, assignedHorseNumber: number) {
        this.id = 0
        this.eventRaceId = eventRaceId;
        this.assignedHorseNumber = assignedHorseNumber;
        this.guest1Id = 0;
        this.guest2Id = 0;
        this.placeId = 0;
        this.wonAmount =0;

    }
}

export class VwEventRaceGuests {
    id: number;
    eventRaceId: number;
    guest1Id: number;
    guest1Name: string;
    guest1Avatar: string;
    guest2Id: number;
    guest2Name: string;
    guest2Avatar: string;
    assignedHorseNumber: number;
    placeId: number;
  wonAmount: number;
  isProtagonist: boolean;
    constructor(eventRaceId: number, assignedHorseNumber: number) {
        this.id = 0
        this.eventRaceId = eventRaceId;
        this.assignedHorseNumber = assignedHorseNumber;
        this.guest1Id = 0;
        this.guest2Id = 0;
        this.guest1Name = '';
        this.guest2Name = '';
        this.guest1Avatar = 'person.png';
        this.guest2Avatar = 'person.png';
        this.placeId = -1;
      this.wonAmount = 0;
      this.isProtagonist = false;
    }
}
