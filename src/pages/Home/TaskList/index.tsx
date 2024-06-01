import React, { useEffect, useState } from 'react';
import api from '../../../api';
import { getFromLocalStorage, saveToLocalStorage } from '../../../helpers/localstorage';
import { useAuth } from "../../../context/AuthContext";

interface IMainTask {
  id: number;
  userId: number;
  description: string;
}

interface ISubTask {
  id: number;
  mainTaskId: number;
  description: string;
  finished: boolean;
}

interface ISubTaskGroup {
  mainTaskId: number;
  subTasks: ISubTask[];
}

function Todo() {
  const [mainTasks, setMainTasks] = useState<IMainTask[]>(
    () => getFromLocalStorage('mainTasks') || []
  );

  const [subTasks, setSubTasks] = useState<ISubTaskGroup[]>(
    () => getFromLocalStorage('subTasks') || []
  );

  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskDescription, setEditingTaskDescription] = useState('');

  const { userData } = useAuth();

  useEffect(() => {
    async function fetchMainTasks() {
      if (userData && userData.id) {
        try {
          const { data: mainTasksData } = await api('get', `/MainTask/${userData.id}`);
          setMainTasks(mainTasksData);
          saveToLocalStorage('mainTasks', mainTasksData);
        } catch (error) {
          console.error("Failed to fetch main tasks", error);
        }
      }
    }

    fetchMainTasks();
  }, [userData]);

  useEffect(() => {
    async function fetchSubTasks() {
      if (mainTasks.length > 0) {
        try {
          const subTasksDataPromises = mainTasks.map(async (task: IMainTask) => {
            const { data: subTasksData } = await api('get', `/SubTask/${task.id}`);
            return { mainTaskId: task.id, subTasks: subTasksData };
          });

          const subTasksData = await Promise.all(subTasksDataPromises);
          setSubTasks(subTasksData);
          saveToLocalStorage('subTasks', subTasksData);
        } catch (error) {
          console.error("Failed to fetch sub tasks", error);
        }
      }
    }

    fetchSubTasks();
  }, [mainTasks]);

  const handleSubTaskChange = (mainTaskId: number, subTaskId: number) => {
    setSubTasks(prevSubTasks =>
      prevSubTasks.map(group =>
        group.mainTaskId === mainTaskId
          ? {
            ...group,
            subTasks: group.subTasks.map(subTask =>
              subTask.id === subTaskId
                ? {
                  ...subTask,
                  finished: !subTask.finished
                }
                : subTask
            ),
          }
          : group
      )
    );
  };

  const handleCreateMainTask = async () => {
    if (newTaskDescription.trim() !== '' && userData && userData.id) {
      try {
        const { data: newMainTask } = await api('post', '/MainTask', {
          userId: userData.id,
          description: newTaskDescription
        });
        setMainTasks([...mainTasks, newMainTask]);
        saveToLocalStorage('mainTasks', [...mainTasks, newMainTask]);
        setNewTaskDescription('');
      } catch (error) {
        console.error('Failed to create main task', error);
      }
    } else {
      console.log('Invalid data');
    }
  };

  const handleUpdateMainTask = async () => {
    if (editingTaskId !== null && editingTaskDescription.trim() !== '') {
      try {
        await api('put', `/MainTask/${editingTaskId}`, {
          description: editingTaskDescription
        });
        const updatedMainTasks = mainTasks.map(task =>
          task.id === editingTaskId ? { ...task, description: editingTaskDescription } : task
        );
        setMainTasks(updatedMainTasks);
        saveToLocalStorage('mainTasks', updatedMainTasks);
        setEditingTaskId(null);
        setEditingTaskDescription('');
      } catch (error) {
        console.error('Failed to update main task', error);
      }
    } else {
      console.log('Invalid data');
    }
  };

  const handleDeleteMainTask = async (mainTaskId: number) => {
    try {
      await api('delete', `/MainTask/${mainTaskId}`);
      const updatedMainTasks = mainTasks.filter(task => task.id !== mainTaskId);
      setMainTasks(updatedMainTasks);
      saveToLocalStorage('mainTasks', updatedMainTasks);
      const updatedSubTasks = subTasks.filter(group => group.mainTaskId !== mainTaskId);
      setSubTasks(updatedSubTasks);
      saveToLocalStorage('subTasks', updatedSubTasks);
    } catch (error) {
      console.error('Failed to delete main task', error);
    }
  };

  const startEditingTask = (task: IMainTask) => {
    setEditingTaskId(task.id);
    setEditingTaskDescription(task.description);
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditingTaskDescription('');
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          className="border rounded p-2 flex-grow mr-2"
          placeholder="New task description"
        />
        <button
          onClick={handleCreateMainTask}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Task
        </button>
      </div>
      {mainTasks.length > 0 ? (
        mainTasks.map((task: IMainTask) => (
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
                  </>
                )}
              </div>
            </div>
            {subTasks
              .filter((subTaskGroup) => subTaskGroup.mainTaskId === task.id)
              .flatMap((subTaskGroup) => subTaskGroup.subTasks)
              .map((subTask: ISubTask) => (
                <div key={subTask.id} className="flex items-center justify-between mt-2">
                  <label>
                    <p className="text-sm">{subTask.description}</p>
                    <input
                      type="checkbox"
                      checked={subTask.finished}
                      onChange={() => handleSubTaskChange(task.id, subTask.id)}
                    />
                  </label>
                </div>
              ))}
          </div>
        ))
      ) : (
        <p>No tasks found</p>
      )}
    </div>
  );
}

export default Todo;
