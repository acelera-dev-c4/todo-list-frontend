import React, { useState } from 'react';
import { IMainTask } from '../../../../interfaces/TaskInterfaces';
import { MainTaskProps } from './MainTaskProps';
import SubTask from './SubTask';

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
    <div className="grid md:grid-cols-2 gap-4">
      {mainTasks.map((task: IMainTask) => (
        <div key={task.id} className="bg-white p-4 rounded-lg shadow-md mb-4 space-y-3">
          <div className="flex items-center justify-between" onClick={() => toggleCollapse(task.id)}>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-800">{task.description}</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  startEditingTask(task);
                }}
                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 text-xs"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteMainTask(task.id);
                }}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 text-xs"
              >
                Delete
              </button>
            </div>
          </div>
          {collapsed === task.id && (
            <>
              <div className="flex items-center">
                <input
                  type="text"
                  value={newSubTaskDescription}
                  onChange={(e) => {
                    e.stopPropagation();
                    setNewSubTaskDescription(e.target.value);
                  }}
                  className="border border-gray-300 rounded p-2 flex-grow mr-2 text-gray-700"
                  placeholder="New sub-task description"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCreateSubTask(task.id);
                  }}
                  className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 text-xs"
                >
                  Add SubTask
                </button>
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