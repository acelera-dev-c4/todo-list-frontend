import React from 'react';
import { IMainTask, ISubTask, ISubTaskGroup } from '../../../../../interfaces/TaskInterfaces';

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
          <div key={`${task.id}-${subTask.id}`} className="flex items-center justify-between p-3 bg-white rounded shadow my-2">
            <label className="flex-grow flex items-center">
              {editingSubTaskId === subTask.id ? (
                <input
                  type="text"
                  value={editingSubTaskDescription}
                  onChange={(e) => {
                    e.stopPropagation();
                    setEditingSubTaskDescription(e.target.value);
                  }}
                  className="border border-gray-300 rounded p-2 flex-grow mr-2 text-gray-700"
                  placeholder="Enter sub-task description"
                />
              ) : (
                <p className={`text-sm ${subTask.finished ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                  {subTask.description}
                </p>
              )}
              <input
                type="checkbox"
                checked={subTask.finished}
                onChange={(e) => {
                  e.stopPropagation();
                  handleSubTaskChange(task.id, subTask.id);
                }}
                className="ml-2 form-checkbox h-5 w-5 text-blue-600"
              />
            </label>
            {editingSubTaskId === subTask.id ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdateSubTask(task.id, subTask.id);
                  }}
                  className="bg-green-500 text-white p-2 rounded mr-2 hover:bg-green-600 text-xs"
                >
                  Save
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    cancelEditingSubTask();
                  }}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 text-xs"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startEditingSubTask(subTask);
                  }}
                  className="bg-blue-500 text-white p-2 rounded mr-2 hover:bg-blue-600 text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSubTask(task.id, subTask.id);
                  }}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 text-xs"
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