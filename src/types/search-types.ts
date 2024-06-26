export type searchResultItem = {
    id: number
    userId: number
    description: string
    completed: boolean
    urlNotificationWebhook: string
}

export interface taskDataProps {
    id: number
    mainTaskIdTopic: number
    subTaskIdSubscriber: number
}