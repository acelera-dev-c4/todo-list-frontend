export interface IMainTask {
  id: number;
  userId: number;
  description: string;
  isCompleted?: boolean;
}

export interface ISubTask {
  id: number;
  mainTaskId: number;
  description: string;
  finished: boolean;
}

export interface ISubTaskGroup {
  mainTaskId: number;
  subTasks: ISubTask[];
}