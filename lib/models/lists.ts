import { ListState, ListType } from "../enums";

export type ListsState = Record<ListType, ListState>

export interface List {
    id: number
    user_id: string
    name: string
    emoji: string
}