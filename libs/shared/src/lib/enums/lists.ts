export enum ListType {
    Favorite = 1,
    Playlist = 2,
    Finished = 3,
    Custom = 4
}

export enum ListState {
    Active = 1,
    Inactive = 2,
    Loading = 3
}

export enum ListAction {
    AddGame = 1,
    RemoveGame = 2,
    GetGame = 3,
    GetAllGames = 4,
    GetLists = 5,
    CreateList = 6,
    DeleteList = 7,
}