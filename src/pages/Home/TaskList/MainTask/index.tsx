import { useState } from 'react';
import { IMainTask } from '../../../../interfaces/TaskInterfaces';
import { MainTaskProps } from './MainTaskProps';
import SubTask from './SubTask';

import { Edit, Delete, AddTask, Save, Close } from '@mui/icons-material';

function MainTask({
  mainTasks,
  subTasks,
  editingTaskId,
  editingTaskDescription,
  setEditingTaskDescription,
  editingSubTaskId,
  editingSubTaskDescription,
  startEditingTask,
  cancelEditing,
  startEditingSubTask,
  cancelEditingSubTask,
  handleUpdateMainTask,
  handleDeleteMainTask,
  setSelectedMainTaskId,
  handleUpdateSubTask,
  handleDeleteSubTask,
  selectedMainTaskId,
  newSubTaskDescription,
  setNewSubTaskDescription,
  handleCreateSubTask,
  setEditingSubTaskDescription,
  handleSubTaskChange,
}: MainTaskProps) {
  const [collapsed, setCollapsed] = useState<number | null>(null);

  const toggleCollapse = (taskId: number) => {
    setCollapsed(prev => prev === taskId ? null : taskId);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {mainTasks.map((task: IMainTask) => (
        <div
          key={task.id}
          className={`bg-white p-4 rounded-lg shadow-md hover:bg-gray-100 ${task.isCompleted ? 'bg-green-200 hover:bg-green-300' : selectedMainTaskId === task.id ? 'bg-gray-200' : ''}`}
          // className={`bg-white p-4 rounded-lg shadow-md hover:bg-gray-100 ${selectedMainTaskId === task.id ? 'bg-gray-200' : ''}`}
        >
          <div className="flex items-center justify-between">
            <label
              className="flex-grow cursor-pointer"
              onClick={(e) => {
                if (editingTaskId !== task.id) {
                  e.stopPropagation();
                  toggleCollapse(task.id);
                  setSelectedMainTaskId(task.id);
                }
              }}
            >
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={editingTaskDescription}
                  onChange={(e) => {
                    e.stopPropagation();
                    setEditingTaskDescription(e.target.value);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="border border-gray-300 rounded p-2 flex-grow"
                />
              ) : (
                <h3 className="text-lg font-semibold text-gray-800">{task.description}</h3>
              )}
            </label>
            <div className="flex items-center space-x-2">
              {editingTaskId === task.id ? (
                <>
                  <Save
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdateMainTask();
                      cancelEditing();
                    }}
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 cursor-pointer w-6 h-6"
                    fontSize="large"
                  />
                  <Close
                    onClick={(e) => {
                      e.stopPropagation();
                      cancelEditing();
                    }}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 cursor-pointer w-6 h-6"
                    fontSize="large"
                  />
                </>
              ) : (
                <>
                  <Edit
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditingTask(task);
                    }}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer w-6 h-6"
                    fontSize="large"
                  />
                  <Delete
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteMainTask(task.id);
                    }}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 cursor-pointer w-6 h-6"
                    fontSize="large"
                  />
                </>
              )}
            </div>
          </div>
          {collapsed === task.id && (
            <>
              <div className="flex flex-row items-center justify-between w-full mb-2">
                <input
                  type="text"
                  value={newSubTaskDescription}
                  onChange={(e) => {
                    e.stopPropagation();
                    setNewSubTaskDescription(e.target.value);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-grow w-1/2 border border-gray-300 rounded p-2 text-gray-700 mr-2 mt-2"
                  placeholder="New sub-task description"
                />
                <AddTask
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCreateSubTask(task.id);
                  }}
                  className="ml-auto bg-green-500 text-white p-2 rounded hover:bg-green-600 cursor-pointer w-6 h-6"
                  fontSize="large"
                />
              </div>
              <SubTask
                subTasks={subTasks}
                task={task}
                editingSubTaskId={editingSubTaskId}
                editingSubTaskDescription={editingSubTaskDescription}
                setEditingSubTaskDescription={setEditingSubTaskDescription}
                startEditingSubTask={startEditingSubTask}
                cancelEditingSubTask={cancelEditingSubTask}
                handleUpdateSubTask={handleUpdateSubTask}
                handleDeleteSubTask={handleDeleteSubTask}
                handleSubTaskChange={handleSubTaskChange}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default MainTask;