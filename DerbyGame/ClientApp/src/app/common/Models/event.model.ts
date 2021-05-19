export interface Events {
    id: number;
    name: string;
    eventDate: Date;
    active: boolean;
}

export interface IVWEvents {
  id: number;
  name: string;
  eventDate: Date;
  active: boolean;
  canDelete: boolean;
}

