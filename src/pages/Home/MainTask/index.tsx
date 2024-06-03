import React from 'react';
import { IMainTask } from '../../../interfaces/TaskInterfaces';
import { MainTaskProps } from './MainTaskProps';

import SubTask from '../SubTask';

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

  return (
    <>
      {mainTasks.map((task: IMainTask) => (
        <div key={task.id} className="flex flex-col bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="flex items-center justify-between">
            <div>
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={editingTaskDescription}
                  onChange={(e) => setEditingTaskDescription(e.target.value)}
                  className="border rounded p-2 flex-grow mr-2"
                  title="Editing Task Description"
                  placeholder="Enter task description"
                />
              ) : (
                <h3 className="text-lg font-semibold">{task.description}</h3>
              )}
            </div>
            <div className="flex items-center">
              {editingTaskId === task.id ? (
                <>
                  <button
                    onClick={handleUpdateMainTask}
                    className="bg-green-500 text-white p-2 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEditingTask(task)}
                    className="text-blue-500 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMainTask(task.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedMainTaskId(task.id)}
                    className="text-green-500"
                  >
                    Add SubTask
                  </button>
                </>
              )}
            </div>
          </div>
          {selectedMainTaskId === task.id && (
            <div className="flex items-center mt-2">
              <input
                type="text"
                value={newSubTaskDescription}
                onChange={(e) => setNewSubTaskDescription(e.target.value)}
                className="border rounded p-2 flex-grow mr-2"
                placeholder="New sub-task description"
              />
              <button
                onClick={() => handleCreateSubTask(task.id)}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Add SubTask
              </button>
            </div>
          )}
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
        </div>
      ))}
    </>
  );
}

export default MainTask;
