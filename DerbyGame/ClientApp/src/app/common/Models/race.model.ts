export interface Races {
    id: number;
    name: string;
    url: string;
    numberOfHorses: number;
    archived: boolean;
    videoName: string;
    finishLineTime: number;
}

export interface IVWRaces {
  id: number;
  name: string;
  url: string;
  numberOfHorses: number;
  archived: boolean;
  videoName: string;
  finishLineTime: number;
  canDelete: boolean;
  scratchedHorses: number;
}
