import { Soldier } from "./Soldier.model";

export interface NamesList {
    id: number;
    name: string;
    soldiers: Soldier[];
  }