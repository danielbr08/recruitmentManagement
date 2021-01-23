import { Pakal } from "./Pakal.model";

export interface SoldierPosition {
    id: number;
    taskId: number;
    squad: string;
    department: string;
    class: string;
    role: string;
    pakal: Pakal;
  }