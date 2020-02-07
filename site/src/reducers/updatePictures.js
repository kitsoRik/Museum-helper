import { NOT_LOADED, LOADED, ERROR_LOADING } from "../constants";
import { addToFavorite } from "../actions/picturesActions";

const initState = {
    loading: NOT_LOADED,
    pictures: []
}

const updatePictures = (state = initState, action) => {
    switch(action.type) {
        case "LOAD_PICTURES_SUCCESS": return loadPicturesSuccess(state, action);
        case "LOAD_PICTURES_ERROR": return loadPicturesError(state, action);
        
        case "DELETE_PICTURE_SUCCESS": return deletePictureSuccess(state, action);

        case "PICTURE_TO_FAVOTIRES_ADDED": return addDeletePictureInFavorites(state, action, true);
        case "PICTURE_FROM_FAVOTIRES_DELETED": return addDeletePictureInFavorites(state, action, false);

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

const addDeletePictureInFavorites = (state, action, isAdded) => {
    const { id } = action;
            let newPictures = state.pictures.filter(() => true);
            let index = newPictures.findIndex(i => i.id === id);
            newPictures[index].favorite = isAdded;
            return {
                ...state,
                newPictures
            }
}

export default updatePictures;