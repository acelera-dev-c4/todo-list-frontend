import React, { useEffect, useState } from 'react';
import api from '../../../api';
import { useAuth } from "../../../context/AuthContext";

function Todo() {
  const [mainTasks, setMainTasks] = useState([]);
  // const [subTasks, setSubTasks] = useState([]);
  const { userData } = useAuth();

  interface IUserData {
    id: number;
    title: string;
    description: string;
  }

  useEffect(() => {
    async function fetchData() {

      if (userData.id) {
        const { data } = await api('get', `/MainTask/${userData.id}`);
        setMainTasks(data);
      }

    }

    fetchData();
  }, [userData]);

  return (
    <div className="flex flex-col">
      {mainTasks.length > 0 ? (
        mainTasks.map((task: IUserData) => (
          <div key={task.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
            <div>
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-500">{task.description}</p>
            </div>
            <div className="flex items-center">
              <button className="text-blue-500 mr-2">Edit</button>
              <button className="text-red-500">Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p>No tasks found</p>
      )}
    </div>
  );
}

export default Todo;