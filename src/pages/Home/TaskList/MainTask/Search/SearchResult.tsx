import { searchResultItem, taskDataProps } from '../../../../../types/search-types'
import api from "../../../../../api"

function SearchResult({
    searchResult,
    subTask,
    taskData
}: {
    searchResult: searchResultItem[]
    subTask: number,
    taskData: taskDataProps | null
}) {

    const handleCheckbox = async (itemId: number) => {
        console.log("itemId", itemId)
        try {
            const response = await api('post', '/Subscription', {
                subTaskIdSubscriber: subTask,
                mainTaskIdTopic: itemId
            }, 'notification')
            console.log("response", response.data)
        } catch (error) {
            console.error("error", error)
        }
    }

    return (
        <div className="bg-white flex flex-col gap-2 px-2">
            {searchResult.map((item: searchResultItem, index: number) => (
                <div
                    key={index}
                    className="flex items-center justify-between py-2"
                >
                    <div>{item.description} - {item.id}</div>
                    <input
                        title="Checkbox"
                        className="cursor-pointer"
                        type="checkbox"
                        checked={taskData ? item.id === taskData.mainTaskIdTopic : false}
                        onChange={(e) => handleCheckbox(item.id)}
                    />
                </div>
            ))}
        </div>
    )
}

export default SearchResult