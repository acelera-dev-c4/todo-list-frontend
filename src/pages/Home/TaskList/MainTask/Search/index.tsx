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
      try {
        setLoading(true)
        const response = await api('get', `/Subscription/SubTaskId?subtaskId=${subTask}`, '', 'notification')
        console.log("Response", response)
        setTaskData(response.data)
      } catch (error) {
        console.error("Failed to fetch user task", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserTask()
  }, [])

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