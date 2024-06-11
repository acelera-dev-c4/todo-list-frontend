import { IMainTask, ISubTask, ISubTaskGroup } from '../../../../interfaces/TaskInterfaces';

export interface MainTaskProps {
  mainTasks: IMainTask[];
  subTasks: ISubTaskGroup[];
  editingTaskId: number | null;
  editingTaskDescription: string;
  setEditingTaskDescription: (description: string) => void;
  editingSubTaskId: number | null;
  editingSubTaskDescription: string;
  startEditingTask: (task: IMainTask) => void;
  cancelEditing: () => void;
  startEditingSubTask: (subTask: ISubTask) => void;
  cancelEditingSubTask: () => void;
  handleUpdateMainTask: () => void;
  handleDeleteMainTask: (taskId: number) => void;
  setSelectedMainTaskId: (taskId: number) => void;
  handleUpdateSubTask: (mainTaskId: number, subTaskId: number) => void;
  handleDeleteSubTask: (mainTaskId: number, subTaskId: number) => void;
  selectedMainTaskId: number | null;
  newSubTaskDescription: string;
  setNewSubTaskDescription: (description: string) => void;
  handleCreateSubTask: (mainTaskId: number) => void;
  setEditingSubTaskDescription: (description: string) => void;
  handleSubTaskChange: (mainTaskId: number, subTaskId: number) => void;
}
