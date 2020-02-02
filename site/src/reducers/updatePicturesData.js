import { NOT_LOADED, IS_LOADING, LOADED, ERROR_LOADING } from "../constants";

const startLoadPictures = (state, action) => {
    return {
        loading: IS_LOADING,
        pictures: []
    }
}

const loadPicturesSuccess = (state, action) => {
    return {
        loading: LOADED,
        pictures: action.data
    }
}

const loadPicturesError = (state, action) => {
    return {
        loading: ERROR_LOADING,
        pictures: []
    }
}

const deletePictureSuccess = (state, action) => {
    const { pictures } = state.picturesData;
    const { id } = action;
    const index = pictures.findIndex((v) => v.id === id);
    
    return {
        loading: LOADED,
        pictures:
            pictures.slice(0, index).concat(
                pictures.slice(index + 1, pictures.length))
    }

}

const updatePicturesData = (state, action) => {
    if(state === undefined) {
        return {
            loading: NOT_LOADED,
            pictures: []
        }
    }

    switch(action.type) {
        case "START_LOAD_PICTURES": return startLoadPictures(state, action);
        case "LOAD_PICTURES_SUCCESS": return loadPicturesSuccess(state, action);
        case "LOAD_PICTURES_ERROR": return loadPicturesError(state, action);
        
        case "DELETE_PICTURE_SUCCESS": return deletePictureSuccess(state, action);


        default: return state.picturesData;
    }
}

export default updatePicturesData;