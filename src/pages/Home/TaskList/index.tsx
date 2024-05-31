import React, { useEffect, useState } from 'react';
import api from '../../../api';
import { useAuth } from "../../../context/AuthContext";

function Todo() {
  const [mainTasks, setMainTasks] = useState([]);
  // const [subTasks, setSubTasks] = useState([]);
  console.log(mainTasks)
  const { userData } = useAuth();

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
    <div>
      <p>Hello world! TaksList</p>
    </div>
  );
}

export default Todo;