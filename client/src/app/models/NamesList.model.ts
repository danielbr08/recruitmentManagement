import { Soldier } from "./Soldier.model";

export interface NamesList {
    id: number;
    name: string;
    soldiersCount: number;
    taskId: number;
    creationDate: Date
  }