export interface Races {
    id: number;
    name: string;
    url: string;
    numberOfHorses: number;
    archived: boolean;
    videoName: string;
}

export interface IVWRaces {
  id: number;
  name: string;
  url: string;
  numberOfHorses: number;
  archived: boolean;
  videoName: string;
  canDelete: boolean;
  scratchedHorses: number;
}
