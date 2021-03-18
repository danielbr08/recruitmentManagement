import { TaskStatus } from "./TaskStatus.model";

export interface Task {
    id: number;
    name: string;
    creationDate: Date;
    status: TaskStatus;
    namesListId: number;
    currentTask: boolean;
  }