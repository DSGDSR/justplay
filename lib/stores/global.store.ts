import { create } from 'zustand'
import { List, ListsItemsResponse } from '../models/lists'
import { persist, createJSONStorage } from 'zustand/middleware'

interface GlobalState {
    lists: List[] | null
    listedGames: ListsItemsResponse | null
    setLists: (lists: List[]) => void
    setListed: (listedGames: ListsItemsResponse) => void
    //setListedGames: (listType: ListTypes, games: ListItem[]) => void
}

export const useGlobalStore = create(
    persist<GlobalState>(
        (set) => ({
            lists: null,
            listedGames: null,
            setLists: (lists: List[]) => set({ lists }),
            setListed: (listedGames: ListsItemsResponse) => set({ listedGames }),
            /*setListedGames: (listType: ListTypes, games: ListItem[]) => set((state) => ({
                listedGames: {
                    ...state.listedGames,
                    [listType]: games
                }
            }))*/
        }),
        {
            name: 'global-storage',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)