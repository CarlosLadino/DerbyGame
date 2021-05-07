export interface IGuests {
    id: number;
    name: string;
    isActive: boolean;
    avatarName: string;
    selected: boolean;
    isSystem: boolean;
}

export class Guest implements IGuests {
  id: number;
  name: string;
  isActive: boolean;
  avatarName: string;
  selected: boolean;
  isSystem: boolean;

  constructor(id: number, name: string, isActive: boolean, avatarName: string, selected: boolean, isSystem: boolean) {
    this.id = id;
    this.name = name;
    this.isActive = isActive;
    this.avatarName = avatarName;
    this.selected = selected;
    this.isSystem = isSystem;
  }
}

