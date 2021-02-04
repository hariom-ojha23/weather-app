import * as ActionTypes from './ActionTypes';

export const addFavorite = (city) => ({
    type: ActionTypes.ADD_CITY,
    payload: city
})

export const deleteFavorite = (city) => ({
    type: ActionTypes.DELETE_CITY,
    payload: city
})