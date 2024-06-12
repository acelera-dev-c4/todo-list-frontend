import React, { useEffect, useState } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../../../helpers/localstorage';

import { IMainTask, ISubTask, ISubTaskGroup } from '../../../interfaces/TaskInterfaces'
import { useAuth } from "../../../context/AuthContext";

import MainTask from './MainTask'
import AddTask from './AddTask'
import api from '../../../api';

function TaskList() {
  const [mainTasks, setMainTasks] = useState<IMainTask[]>(
    () => getFromLocalStorage('mainTasks') || []
  );

  const [subTasks, setSubTasks] = useState<ISubTaskGroup[]>(
    () => getFromLocalStorage('subTasks') || []
  );

  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newSubTaskDescription, setNewSubTaskDescription] = useState('');
  const [selectedMainTaskId, setSelectedMainTaskId] = useState<number | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskDescription, setEditingTaskDescription] = useState('');
  const [editingSubTaskId, setEditingSubTaskId] = useState<number | null>(null);
  const [editingSubTaskDescription, setEditingSubTaskDescription] = useState('');

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
        console.log(newMainTask)
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

  const handleCreateSubTask = async (mainTaskId: number) => {
    if (newSubTaskDescription.trim() !== '') {
      try {
        const { data: newSubTask } = await api('post', `/SubTask`, {
          mainTaskId,
          description: newSubTaskDescription
        });
        const updatedSubTasks = subTasks.map(group =>
          group.mainTaskId === mainTaskId
            ? { ...group, subTasks: [...group.subTasks, newSubTask] }
            : group
        );
        setSubTasks(updatedSubTasks);
        saveToLocalStorage('subTasks', updatedSubTasks);
        setNewSubTaskDescription('');
      } catch (error) {
        console.error('Failed to create sub task', error);
      }
    } else {
      console.log('Invalid data');
    }
  };

  const handleUpdateSubTask = async (mainTaskId: number, subTaskId: number) => {
    const subTaskGroup = subTasks.find(group => group.mainTaskId === mainTaskId);
    if (subTaskGroup) {
      const subTask = subTaskGroup.subTasks.find(subTask => subTask.id === subTaskId);
      if (subTask) {
        try {
          await api('put', `/SubTask/${subTaskId}`, {
            description: editingSubTaskDescription || subTask.description,
            finished: subTask.finished
          });
          const updatedSubTasks = subTasks.map(group =>
            group.mainTaskId === mainTaskId
              ? {
                ...group,
                subTasks: group.subTasks.map(st =>
                  st.id === subTaskId
                    ? { ...st, description: editingSubTaskDescription || st.description }
                    : st
                )
              }
              : group
          );
          setSubTasks(updatedSubTasks);
          saveToLocalStorage('subTasks', updatedSubTasks);
          setEditingSubTaskId(null);
          setEditingSubTaskDescription('');
        } catch (error) {
          console.error('Failed to update sub task', error);
        }
      }
    }
  };

  const handleDeleteSubTask = async (mainTaskId: number, subTaskId: number) => {
    try {
      await api('delete', `/SubTask/${subTaskId}`);
      const updatedSubTasks = subTasks.map(group =>
        group.mainTaskId === mainTaskId
          ? {
            ...group,
            subTasks: group.subTasks.filter(subTask => subTask.id !== subTaskId)
          }
          : group
      );
      setSubTasks(updatedSubTasks);
      saveToLocalStorage('subTasks', updatedSubTasks);
    } catch (error) {
      console.error('Failed to delete sub task', error);
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

  const startEditingSubTask = (subTask: ISubTask) => {
    setEditingSubTaskId(subTask.id);
    setEditingSubTaskDescription(subTask.description);
  };

  const cancelEditingSubTask = () => {
    setEditingSubTaskId(null);
    setEditingSubTaskDescription('');
  };

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-50 rounded-lg shadow">
      <AddTask
        newTaskDescription={newTaskDescription}
        setNewTaskDescription={setNewTaskDescription}
        handleCreateMainTask={handleCreateMainTask}
      />
  
      {mainTasks.length > 0 ? (
        <MainTask
          mainTasks={mainTasks}
          subTasks={subTasks}
          editingTaskId={editingTaskId}
          editingTaskDescription={editingTaskDescription}
          setEditingTaskDescription={setEditingTaskDescription}
          editingSubTaskId={editingSubTaskId}
          editingSubTaskDescription={editingSubTaskDescription}
          startEditingTask={startEditingTask}
          cancelEditing={cancelEditing}
          startEditingSubTask={startEditingSubTask}
          cancelEditingSubTask={cancelEditingSubTask}
          handleUpdateMainTask={handleUpdateMainTask}
          handleDeleteMainTask={handleDeleteMainTask}
          setSelectedMainTaskId={setSelectedMainTaskId}
          handleUpdateSubTask={handleUpdateSubTask}
          handleDeleteSubTask={handleDeleteSubTask}
          selectedMainTaskId={selectedMainTaskId}
          newSubTaskDescription={newSubTaskDescription}
          setNewSubTaskDescription={setNewSubTaskDescription}
          handleCreateSubTask={handleCreateSubTask}
          setEditingSubTaskDescription={setEditingSubTaskDescription}
          handleSubTaskChange={handleSubTaskChange}
        />
      ) : (
        <p className="text-center text-gray-400">Tasks not found</p>
      )}
    </div>
  );
}

export default TaskList;
