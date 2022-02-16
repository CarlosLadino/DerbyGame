export interface EventRaces {
    id: number;
    eventId: number;
    raceId: number;
}

export interface VwEventRace {
    id: number;
    eventId: number;
    raceId: number;
    raceName: string;
    raceUrl: string;
    videoName: string;
    finishLineTime: number;
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
