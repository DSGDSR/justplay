import { ListState, ListType } from '../enums';

export type TListsState = Record<ListType, ListState>

export type TListsItemsResponse = Record<ListType, IListItem[]>

export interface IList {
    id: string
    slug: string
    user_id: string
    name: string
}

export interface IListItem {
    user_id: string
    list_type: ListType
    custom_list_id: string | null
    game: number
    created_at: string
}