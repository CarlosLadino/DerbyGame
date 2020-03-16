export interface EventRaces {
    Id: number;
    EventId: number;
    RaceId: number;
}

export interface VwEventRace {
    id: number;
    eventId: number;
    raceId: number;
    raceName: string;
    raceUrl: string;
    videoName: string;
    numberOfHorses: number;
    eventRaceId: number;
    selected: boolean;
    saved: boolean;
    archived: boolean;
}

export interface VwEventGuestTotals {
    id: number;
    eventId: number;
    guestName: string;
    guestAvatar: string;
    totalAmount: number; 
}
