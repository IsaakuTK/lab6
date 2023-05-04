import { Actions, AppState, FavoriteActions,  } from "../types/store";

export const reducer = (previousactions:Actions, currentState:AppState): AppState => {
    const { action, payload } = previousactions; 

    switch (action) {

        case FavoriteActions.ADD:
            return{
                ...currentState,
                favorites:[
                    payload,
                    ...currentState.favorites
                ]
            }

            case FavoriteActions.GET:
            return {
                ...currentState,
                favorites: payload
            }

            break;
    
        default:
            return previousactions;
            break;
    }
}