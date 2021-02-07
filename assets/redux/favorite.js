import * as ActionTypes from './ActionTypes';

const initialState = {
    favorites : []
}

export const favorites = (state = initialState, action) => {
    switch (action.type) {

        case (ActionTypes.ADD_CITY):

            if (state.favorites.some((el) => el == action.payload)) {
                return {...state};
            }
            else {
                
                return {
                    ...state,
                    favorites: [...state.favorites, action.payload]
                }
            }

        case (ActionTypes.DELETE_CITY):
            return {
                ...state,
                favorites: [...state.favorites.filter((el) => el != action.payload)]
            }

        default:
            return {...state};
    }
}