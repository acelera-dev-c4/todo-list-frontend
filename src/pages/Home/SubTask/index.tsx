import React from 'react';
import { IMainTask, ISubTask, ISubTaskGroup } from '../../../interfaces/TaskInterfaces';

function SubTask(
  {
    subTasks,
    task,
    editingSubTaskId,
    editingSubTaskDescription,
    setEditingSubTaskDescription,
    startEditingSubTask,
    cancelEditingSubTask,
    handleUpdateSubTask,
    handleDeleteSubTask,
    handleSubTaskChange,
  }: {
    subTasks: ISubTaskGroup[];
    task: IMainTask;
    editingSubTaskId: number | null;
    editingSubTaskDescription: string;
    setEditingSubTaskDescription: (description: string) => void;
    startEditingSubTask: (subTask: ISubTask) => void;
    cancelEditingSubTask: () => void;
    handleUpdateSubTask: (mainTaskId: number, subTaskId: number) => void;
    handleDeleteSubTask: (mainTaskId: number, subTaskId: number) => void;
    handleSubTaskChange: (mainTaskId: number, subTaskId: number) => void;
  }
) {

  return (
    <>
      {subTasks
        .filter((subTaskGroup) => subTaskGroup.mainTaskId === task.id)
        .flatMap((subTaskGroup) => subTaskGroup.subTasks)
        .map((subTask: ISubTask) => (
          <div key={`${task.id}-${subTask.id}`} className="flex items-center justify-between mt-2">
            <label>
              {editingSubTaskId === subTask.id ? (
                <input
                  type="text"
                  value={editingSubTaskDescription}
                  onChange={(e) => setEditingSubTaskDescription(e.target.value)}
                  className="border rounded p-2 flex-grow mr-2"
                  title="Editing SubTask Description"
                  placeholder="Enter sub-task description"
                />
              ) : (
                <p className="text-sm">{subTask.description}</p>
              )}
              <input
                type="checkbox"
                checked={subTask.finished}
                onChange={() => handleSubTaskChange(task.id, subTask.id)}
              />
            </label>
            {editingSubTaskId === subTask.id ? (
              <>
                <button
                  onClick={() => handleUpdateSubTask(task.id, subTask.id)}
                  className="bg-green-500 text-white p-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={cancelEditingSubTask}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => startEditingSubTask(subTask)}
                  className="text-blue-500 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteSubTask(task.id, subTask.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
    </>
  );
}

export default SubTask;
