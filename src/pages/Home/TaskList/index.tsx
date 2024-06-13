import React, { useEffect, useState } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../../../helpers/localstorage';

import { IMainTask, ISubTask, ISubTaskGroup } from '../../../interfaces/TaskInterfaces'
import { useAuth } from "../../../context/AuthContext";

import MainTask from './MainTask'
import AddTask from './AddTask'
import api from '../../../api';

import Loading from '../../../components/Loading'

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

  const [loading, setLoading] = useState(false);

  const { userData } = useAuth();

  useEffect(() => {
    async function fetchMainTasks() {
      if (userData && userData.id) {
        try {
          setLoading(true);
          const { data: mainTasksData } = await api('get', `/MainTask/${userData.id}`);
          setMainTasks(mainTasksData);
          saveToLocalStorage('mainTasks', mainTasksData);
        } catch (error) {
          console.error("Failed to fetch main tasks", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchMainTasks();
  }, [userData]);

  useEffect(() => {
    async function fetchSubTasks() {
      if (mainTasks.length > 0) {
        try {
          setLoading(true);
          const subTasksDataPromises = mainTasks.map(async (task: IMainTask) => {
            const { data: subTasksData } = await api('get', `/SubTask/${task.id}`);
            return { mainTaskId: task.id, subTasks: subTasksData };
          });

          const subTasksData = await Promise.all(subTasksDataPromises);
          setSubTasks(subTasksData);
          saveToLocalStorage('subTasks', subTasksData);
        } catch (error) {
          console.error("Failed to fetch sub tasks", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchSubTasks();
  }, [mainTasks]);

  const handleSubTaskChange = (mainTaskId: number, subTaskId: number) => {
    const updatedSubTasks = subTasks.map(group =>
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
    );

    setSubTasks(updatedSubTasks);
    saveToLocalStorage('subTasks', updatedSubTasks);
  };

  const handleCreateMainTask = async () => {
    if (newTaskDescription.trim() !== '' && userData && userData.id) {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    } else {
      console.log('Invalid data');
    }
  };

  const handleUpdateMainTask = async () => {
    if (editingTaskId !== null && editingTaskDescription.trim() !== '') {
      console.log(editingTaskDescription)
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    } else {
      console.log('Invalid data');
    }
  };

  const handleDeleteMainTask = async (mainTaskId: number) => {
    try {
      setLoading(true);
      await api('delete', `/MainTask/${mainTaskId}`);
      const updatedMainTasks = mainTasks.filter(task => task.id !== mainTaskId);
      setMainTasks(updatedMainTasks);
      saveToLocalStorage('mainTasks', updatedMainTasks);
      const updatedSubTasks = subTasks.filter(group => group.mainTaskId !== mainTaskId);
      setSubTasks(updatedSubTasks);
      saveToLocalStorage('subTasks', updatedSubTasks);
    } catch (error) {
      console.error('Failed to delete main task', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubTask = async (mainTaskId: number) => {
    if (newSubTaskDescription.trim() !== '') {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
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
          setLoading(true);
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
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleDeleteSubTask = async (mainTaskId: number, subTaskId: number) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
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
      {loading && <Loading />}
      
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
