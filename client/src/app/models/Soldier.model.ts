import { Pakal } from "./Pakal.model";
import { SoldierPosition } from "./SoldierPosition.model";

export interface Soldier {
    id: number
    personalNumber: number;
    firstName: string;
    lastName: string;
    soldierPosition: SoldierPosition
  }