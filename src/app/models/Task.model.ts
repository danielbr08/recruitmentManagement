export interface Task {
    id: number;
    name: string;
    creationDate: Date;
    status: TaskStatus;
    listNameId: number;
    isCurrentTask: boolean;
  }