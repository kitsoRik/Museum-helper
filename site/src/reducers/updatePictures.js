import { NOT_LOADED, LOADED, ERROR_LOADING } from "../constants";

const initState = {
    loading: NOT_LOADED,
    pictures: []
}

const updatePictures = (state = initState, action) => {
    switch(action.type) {
        case "LOAD_PICTURES_SUCCESS": return loadPicturesSuccess(state, action);
        case "LOAD_PICTURES_ERROR": return loadPicturesError(state, action);
        
        case "DELETE_PICTURE_SUCCESS": return deletePictureSuccess(state, action);


        default: return state;
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
    const { pictures } = state;
    const { id } = action;
    const index = pictures.findIndex((v) => v.id === id);
    
    return {
        loading: LOADED,
        pictures:
            pictures.slice(0, index).concat(
                pictures.slice(index + 1, pictures.length))
    }

}

export default updatePictures;