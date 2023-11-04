import { ListState, ListType } from "../enums";

export type ListsState = Record<ListType, ListState>

export type ListsItemsResponse = Record<ListType, ListItem[]>

export interface List {
    id: number
    user_id: string
    name: string
    emoji: string
}

export interface ListItem {
    user_id: string
    list_type: ListType
    custom_list_id: number | null
    game: number
}