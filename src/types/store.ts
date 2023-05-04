import { Favorites } from "./favorites"

export type Observer = ({ render: () => void } & HTMLElement);

export type AppState = {
    favorites: Favorites[]
}

export enum FavoriteActions {
    "ADD" = "ADD",
    "GET" = "GET",
}


export interface AddFavoriteAction {
    action: FavoriteActions.ADD,
    payload: Favorites
}

export interface GetFavoritesAction {
    action: FavoriteActions.GET,
    payload: Favorites[]
}

export type Actions = AddFavoriteAction | GetFavoritesAction;