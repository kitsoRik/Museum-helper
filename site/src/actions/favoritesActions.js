import API, { getFavotires, saveFavotires } from "../services/api/api";
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

export const loadFavotiresStarted = () => ({
    type: "LOAD_FAVORITES_STARTED"
});

export const loadFavotiresSuccess = (groups) => ({
    type: "LOAD_FAVORITES_SUCCESS",
    groups
});

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

export const addFavoriteGroup = (name, description) => {
    return (dispatch) => {
        
        API.addFavoriteGroup(name, description)
            .then((data) => {
                if(data.success) {
                    dispatch(favoriteGroupAdded(data.addedGroup));
                    dispatch(alertAddNotificationCreator("Added"));
                }
            });
    }
};

export const deleteFavoriteGroup = (id) => {
    return (dispatch) => {
        API.deleteFavoriteGroup(id)
            .then((data) => {
                if(data.success) {
                    dispatch(alertAddNotificationCreator("Deleted"));
                    dispatch(favoriteGroupDeleted(id));
                }
            })
    }
}

export const moveGroup = (id, direction) => ({
    type: "MOVE_GROUP",
    id,
    direction
});

const favoriteGroupAdded = (group) => ({
    type: "FAVORITE_GROUP_ADDED",
    group
});

const favoriteGroupDeleted = (id) => ({
    type: "FAVORITE_GROUP_DELETED",
    id
});