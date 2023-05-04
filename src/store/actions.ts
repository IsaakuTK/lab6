import {obtener_pokemon} from '../services/pokeapi'

import { AddFavoriteAction, GetFavoritesAction, FavoriteActions } from "../types/store"


export const getFavorites = async (): Promise<GetFavoritesAction> => {
    const trips = await obtener_pokemon();
    return {
        action: FavoriteActions.GET,
        payload: []
    }   
}

export const addFavorites = ({payload}: Pick<AddFavoriteAction, "payload">): AddFavoriteAction => {
    return {
        action: FavoriteActions.ADD,
        payload
    }
}