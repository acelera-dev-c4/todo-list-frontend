import React, { useState } from "react"
import api from "../../../../../api"

import SearchResult from "./SearchResult"

import { searchResultItem, taskDataProps } from '../../../../../types/search-types'

function SearchForm({
    subTask,
    taskData
}: {
    subTask: number,
    taskData: taskDataProps | null
}) {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [searchType, setSearchType] = useState<string>('UserName')
    const [searchResult, setSearchResult] = useState<searchResultItem[] | null>(null)


    const handleSearch = async () => {

        try {
            const response = await api('get', `/MainTask/search?${searchType}=${searchTerm}`)
            setSearchResult(response.data)
        } catch (error) {
            console.error("error", error)
        }
    }

    return (
        <div>
            <div className="flex flex-col gap-2 p-2">
                <input
                    className="border border-gray-300 rounded p-2 text-gray-700 text-sm"
                    placeholder="Termo de busca"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                />
                <select
                    title="Search Type"
                    className="border border-gray-300 rounded p-2 text-gray-700 text-sm"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                >
                    <option value="UserName">Nome de Usuário</option>
                    <option value="MainTaskId">Id da Task</option>
                    <option value="MainTaskDescription">Descrição da Task</option>
                </select>
                <button
                    onClick={handleSearch}
                    className="bg-green-500 hover:bg-green-600 p-2 rounded text-white"
                >Buscar</button>
            </div>
            {searchResult && searchResult.length > 0 && (
                <SearchResult
                    searchResult={searchResult}
                    subTask={subTask}
                    taskData={taskData}
                />
            )}
            {searchResult && searchResult.length === 0 && (
                <div className="p-2 text-sm">Nenhum resultado foi encontrado</div>
            )}
        </div>
    )
}

export default SearchForm