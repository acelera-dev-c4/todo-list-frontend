import React, { useState, useEffect } from "react"
import SearchForm from './SearchForm'
import api from "../../../../../api"
import Loading from "../../../../../components/Loading"

function Search({
  openSearch,
  index,
  subTask
}: {
  openSearch: number | null,
  index: number,
  subTask: number
}) {

  const [loading, setLoading] = useState(true)
  const [taskData, setTaskData] = useState(null)

  useEffect(() => {
    async function fetchUserTask() {
      if (!subTask) {
        console.error("ID da subtask não fornecido.");
        setLoading(false);
        return;
      }
  
      try {
        setLoading(true);
        const response = await api('get', `/Subscription/SubTaskId?subtaskId=${subTask}`, '', 'notification');
        setTaskData(response.data);
      } catch (error) {
        console.error("Failed to fetch user task", (error as any).response ? (error as any).response.data : error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchUserTask();
  }, [subTask]); // Adicionado subTask como dependência para refazer a requisição se o ID mudar
  
  if(loading) return <Loading />

  return (
    <>
      {openSearch === index && (
        <SearchForm
          subTask={subTask}
          taskData={taskData}
        />
      )}
    </>
  )
}

export default Search