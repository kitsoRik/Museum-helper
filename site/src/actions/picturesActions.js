import { getPicturesData, deletePicture, addPicture, addPictureToFavorites, deletePictureFromFavorites } from "../services/api/api";
import { alertAddNotificationCreator } from "./alertActions";
import { actionFactory } from "./helpers";

export const loadPicturesStart = (searchParams) => ({
    type: "LOAD_PICTURES_START",
    searchParams,
});

export const loadPicturesSuccessCreator = ({ pictures, pagesData: { pagesCount }}) => ({
    type: "LOAD_PICTURES_SUCCESS",
    pictures,
    pagesCount
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

export const addPictureSuccess = ({ picture }) => ({
    type: "ADD_PICTURE_SUCCESS",
    picture
})

export const addPictureCreator = actionFactory(
    addPicture,
    null,
    addPictureSuccess
);

export const deletePictureSuccessCreator = (data) => ({
    type: "DELETE_PICTURE_SUCCESS",
    ...data
})

export const deletePictureCreator = actionFactory(
    deletePicture,
    null,
    deletePictureSuccessCreator,
    null,
    ({ pictures: { searchParams, pageNumber = 1, limit }}) => 
        ({ searchParams, pageNumber, limit })
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