export class EventRacesList {
    EventId: number;
    RacesList: string;

    constructor(eventId: number, racesList: string) {
        this.EventId = eventId;
        this.RacesList = racesList;
    }
}

export class RaceRoster {
    horseNumber: number;
    guestOneId: number;
}
