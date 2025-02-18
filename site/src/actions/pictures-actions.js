import api from "../services/api/api";
import { actionFactory } from "./helpers";

export const LOAD_PICTURES_START = "LOAD_PICTURES_START",
	LOAD_PICTURES_SUCCESS = "LOAD_PICTURES_SUCCESS",
	LOAD_PICTURES_ERROR = "LOAD_PICTURES_ERROR",
	ADD_PICTURE_SUCCESS = "ADD_PICTURE_SUCCESS",
	DELETE_PICTURE_SUCCESS = "DELETE_PICTURE_SUCCESS",
	PICTURE_TO_FAVOTIRES_ADDED = "PICTURE_TO_FAVOTIRES_ADDED",
	PICTURE_FROM_FAVOTIRES_DELETED = "PICTURE_FROM_FAVOTIRES_DELETED",
	SET_SEARCH_PARAMS = "SET_SEARCH_PARAMS";

export const loadPicturesStart = (searchParams) => ({
	type: LOAD_PICTURES_START,
	searchParams,
});

export const loadPicturesSuccess = ({
	pictures,
	museumsMinimize,
	pagesData: { pagesCount },
	museumId,
}) => ({
	type: LOAD_PICTURES_SUCCESS,
	pictures,
	pagesCount,
	museumsMinimize,
	museumId,
});

export const loadPicturesError = (error) => ({
	type: LOAD_PICTURES_ERROR,
	error,
});

export const startLoadPictures = actionFactory(
	api.getPicturesData,
	loadPicturesStart,
	loadPicturesSuccess,
	loadPicturesError,
	({ pictures: { searchParams } }) => searchParams
);

export const addPictureSuccess = ({ picture }) => ({
	type: ADD_PICTURE_SUCCESS,
	picture,
});

export const addPicture = actionFactory(
	api.addPicture,
	null,
	addPictureSuccess
);

export const deletePictureSuccess = (data, id) => ({
	type: DELETE_PICTURE_SUCCESS,
	...data,
	id,
});

export const deletePicture = actionFactory(
	api.deletePicture,
	null,
	deletePictureSuccess,
	null,
	({ pictures: { searchParams, pageNumber = 1, limit } }) => ({
		searchParams,
		pageNumber,
		limit,
	})
);

export const pictureToFavotiresAdded = (data, id) => ({
	type: PICTURE_TO_FAVOTIRES_ADDED,
	id,
});

export const addToFavorite = actionFactory(
	api.addPictureToFavorites,
	null,
	pictureToFavotiresAdded
);

export const pictureFromFavotiresDeleted = (data, id) => ({
	type: PICTURE_FROM_FAVOTIRES_DELETED,
	id,
});

export const deleteFromFavorite = actionFactory(
	api.deletePictureFromFavorites,
	null,
	pictureFromFavotiresDeleted
);

export const setSearchParams = (params) => (dispatch, getState) => {
	dispatch({
		type: SET_SEARCH_PARAMS,
		searchParams: {
			...params,
		},
	});

	dispatch(startLoadPictures());
};
