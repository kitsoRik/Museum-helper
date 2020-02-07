import { getFavotires, saveFavotires } from "../services/api/api";
import { alertAddNotificationCreator } from './alertActions';

export const loadFavotires = () => {
    return (dispatch) => {
        dispatch(loadFavotiresStarted());
        getFavotires()
            .then((data) => {
                if(data.success) {
                    dispatch(loadFavotiresSuccess(data.groups));
                } else {
                    dispatch(loadFavotiresFailed(data.error));
                }
            })
    }
}

export const loadFavotiresStarted = () => {
    return {
        type: "LOAD_FAVORITES_STARTED"
    }
}

export const loadFavotiresSuccess = (groups) => {
    return {
        type: "LOAD_FAVORITES_SUCCESS",
        groups
    }
}

export const loadFavotiresFailed = (error) => {
    return {
        type: "LOAD_FAVORITES_FAILED",
        error
    }
}

export const changeFavoritesGroups = (groups) => {
    return {
        type: "CHANGE_FAVORITES_GROUPS",
        groups
    }
}

export const changeEditable = (editable, groups) => {
    return (dispatch) => {
        if(!editable) {
            console.log(groups);
            saveFavotires(groups)
                .then(data => {
                    if(data.success) {
                        dispatch(alertAddNotificationCreator("Favorites has been saved!"));
                    } else {
                        dispatch(alertAddNotificationCreator("Favorites has not been saved!", "error"))
                    }
                })
                .catch(() => {   
                    dispatch(alertAddNotificationCreator("Favorites has not been saved! (server problem)", "error"))
                });
        }
        dispatch(setEditable(editable));
    }
}

const setEditable = (editable) => {
    return {
        type: "SET_EDITABLE",
        editable
    }
}

export const addPictureToFavorites = (id) => {
    return (dispatch) => {
        
    }
}

const addPictureToFavoritesSuccess = (item) => {
    return (dispatch) => {
        
    }
}