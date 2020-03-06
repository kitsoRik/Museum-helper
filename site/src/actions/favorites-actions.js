import api from "../services/api/api";
import { actionFactory } from "./helpers";

export const   
    LOAD_FAVORITES_STARTED = "LOAD_FAVORITES_STARTED",
    LOAD_FAVORITES_SUCCESS = "LOAD_FAVORITES_SUCCESS",
    LOAD_FAVORITES_FAILED = "LOAD_FAVORITES_FAILED",

    CHANGE_FAVORITES_GROUPS = "CHANGE_FAVORITES_GROUPS",

    SET_EDITABLE = "SET_EDITABLE",

    MOVE_GROUP = "MOVE_GROUP",
    FAVORITE_GROUP_ADDED = "FAVORITE_GROUP_ADDED",
    FAVORITE_GROUP_DELETED = "FAVORITE_GROUP_DELETED",

    REMOVE_PICTURE_INFO_PENDING = "REMOVE_PICTURE_INFO_PENDING",
    REMOVE_PICTURE_INFO_SUCCESS = "REMOVE_PICTURE_INFO_SUCCESS",
    REMOVE_PICTURE_INFO_FAIL = "REMOVE_PICTURE_INFO_FAIL";

export const loadFavotiresStarted = () => ({
    type: LOAD_FAVORITES_STARTED
});

export const loadFavotiresSuccess = ({groups}) => ({
    type: LOAD_FAVORITES_SUCCESS,
    groups
});

export const loadFavotiresFailed = (error) => {
    return {
        type: LOAD_FAVORITES_FAILED,
        error
    }
}

export const loadFavotires = actionFactory(
    api.getFavotires,
    null,
    loadFavotiresSuccess,
    loadFavotiresFailed
)

export const changeFavoritesGroups = (groups) => {
    return {
        type: CHANGE_FAVORITES_GROUPS,
        groups
    }
}

const setEditable = ({editable}) => {
    return {
        type: SET_EDITABLE,
        editable
    }
}

export const changeEditable = actionFactory(
    api.saveFavotires,
    setEditable
);
const favoriteGroupAdded = ({ group }) => ({
    type: FAVORITE_GROUP_ADDED,
    group
});

export const addFavoriteGroup = actionFactory(
    api.addFavoriteGroup,
    null,
    favoriteGroupAdded
);

const favoriteGroupDeleted = (data, id) => ({
    type: FAVORITE_GROUP_DELETED,
    id
});

export const deleteFavoriteGroup = actionFactory(
    api.deleteFavoriteGroup,
    null,
    favoriteGroupDeleted
);

export const moveGroup = (id, direction) => ({
    type: MOVE_GROUP,
    id,
    direction
});

export const removePictureInfoPending = (id) => ({
    type: REMOVE_PICTURE_INFO_PENDING,
    id
});

export const removePictureInfoSuccess = (data, id) => ({
    type: REMOVE_PICTURE_INFO_SUCCESS,
    id
});

export const removePictureInfoFail = () => ({
    type: REMOVE_PICTURE_INFO_FAIL
});

export const removePictureInfo = actionFactory(
    api.removePictureInfo,
    removePictureInfoPending,
    removePictureInfoSuccess,
    removePictureInfoFail
);