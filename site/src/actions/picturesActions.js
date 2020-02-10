import { getPicturesData, deletePicture, addPicture, addPictureToFavorites, deletePictureFromFavorites } from "../services/api/api";
import { alertAddNotificationCreator } from "./alertActions";
import { actionFactory } from "./helpers";

export const loadPicturesStart = () => ({
    type: "LOAD_PICTURES_START"
});

export const loadPicturesSuccessCreator = ({ pictures }) => ({
    type: "LOAD_PICTURES_SUCCESS",
    data: pictures
});

export const loadPicturesErrorCreator = (error) => ({
    type: "LOAD_PICTURES_ERROR",
    error
});

export const startLoadPicturesCreator = actionFactory(
    getPicturesData, 
    loadPicturesStart, 
    loadPicturesSuccessCreator, 
    loadPicturesErrorCreator
);

export const addPictureSuccess = ({ picture }, id) => ({
    type: "ADD_PICTURE_SUCCESS",
    picture
})

export const addPictureCreator = actionFactory(
    addPicture,
    null,
    addPictureSuccess
);

export const deletePictureSuccessCreator = (data, id) => ({
    type: "DELETE_PICTURE_SUCCESS",
    id
})

export const deletePictureCreator = actionFactory(
    deletePicture,
    null,
    deletePictureSuccessCreator
);

export const pictureToFavotiresAdded = (data, id) => ({
    type: "PICTURE_TO_FAVOTIRES_ADDED",
    id
});

export const addToFavorite = actionFactory(
    addPictureToFavorites,
    null,
    pictureToFavotiresAdded
);

export const pictureFromFavotiresDelete = (data, id) => ({
    type: "PICTURE_FROM_FAVOTIRES_DELETED",
    id
});

export const deleteFromFavorite = actionFactory(
    deletePictureFromFavorites,
    null,
    pictureFromFavotiresDelete
);

export const setSearchParams = (params) => ({
    type: "SET_SEARCH_PARAMS",
    searchParams: {
        ...params
    }
})