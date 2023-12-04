import { ListStates, ListTypes } from "../enums";

export type ListsState = Record<ListTypes, ListStates>

export type ListsItemsResponse = Record<ListTypes, ListItem[]>

export interface List {
    id: number
    user_id: string
    name: string
}

export interface ListItem {
    user_id: string
    list_type: ListTypes
    custom_list_id: number | null
    game: number
}