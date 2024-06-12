import React from 'react';
import { IMainTask, ISubTask, ISubTaskGroup } from '../../../../../interfaces/TaskInterfaces';
import { Save, Close, Edit, Delete, CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';

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
                  className="border border-gray-300 rounded flex-grow mr-2 text-gray-700"
                  placeholder="Enter sub-task description"
                />
              ) : (
                <p className={`text-sm ${subTask.finished ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                  {subTask.description}
                </p>
              )}
              {subTask.finished ? (
                <CheckBox
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubTaskChange(task.id, subTask.id);
                  }}
                  className="ml-2 cursor-pointer text-gray-600 hover:text-gray-700"
                />
              ) : (
                <CheckBoxOutlineBlank
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubTaskChange(task.id, subTask.id);
                  }}
                  className="ml-2 cursor-pointer text-gray-600 hover:text-gray-700"
                />
              )}
            </label>
            {editingSubTaskId === subTask.id ? (
              <>
                <Save
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdateSubTask(task.id, subTask.id);
                  }}
                  className="bg-green-500 text-white p-2 rounded ml-2 mr-2 hover:bg-green-600 cursor-pointer w-6 h-6"
                  fontSize="medium"
                />
                <Close
                  onClick={(e) => {
                    e.stopPropagation();
                    cancelEditingSubTask();
                  }}
                  className="bg-red-500 text-white p-2 rounded mr-2 hover:bg-red-600 cursor-pointer w-6 h-6"
                  fontSize="medium"
                />
              </>
            ) : (
              <>
                <Edit
                  onClick={(e) => {
                    e.stopPropagation();
                    startEditingSubTask(subTask);
                  }}
                  className="bg-blue-500 text-white p-2 rounded mr-2 hover:bg-blue-600 cursor-pointer w-6 h-6"
                  fontSize="medium"
                />
                <Delete
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSubTask(task.id, subTask.id);
                  }}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 cursor-pointer w-6 h-6"
                  fontSize="medium"
                />
              </>
            )}
          </div>
        ))}
    </>
  );
}

export default SubTask;