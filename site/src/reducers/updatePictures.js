import { NOT_LOADED, LOADED, ERROR_LOADING, IS_LOADING } from "../constants";

const initState = {
    loading: NOT_LOADED,
    pictures: [],
    searchParams: {
        searchText: '',
        sortedField: 'none',
        sortedType: 'ASC'
    }
}

const updatePictures = (state = initState, action) => {
    switch(action.type) {
        case "LOAD_PICTURES_START": return loadPicturesStart(state, action);
        case "LOAD_PICTURES_SUCCESS": return loadPicturesSuccess(state, action);
        case "LOAD_PICTURES_ERROR": return loadPicturesError(state, action);
        
        case "ADD_PICTURE_SUCCESS": {
            const { picture } = action;
            const { pictures } = state;
            return {
                ...state,
                pictures: pictures.concat([picture])
            }
        }
        case "DELETE_PICTURE_SUCCESS": return deletePictureSuccess(state, action);

        case "PICTURE_TO_FAVOTIRES_ADDED": return addDeletePictureInFavorites(state, action, true);
        case "PICTURE_FROM_FAVOTIRES_DELETED": return addDeletePictureInFavorites(state, action, false);

        case "SET_SEARCH_PARAMS": return setSearchParam(state, action);

        default: return state;
    }
}

const loadPicturesStart = (state, action) => {
    return {
        ...state,
        loading: IS_LOADING
    }
}

const loadPicturesSuccess = (state, action) => {
    return {
        ...state,
        loading: LOADED,
        pictures: action.data
    }
}

const loadPicturesError = (state, action) => {
    return {
        ...state,
        loading: ERROR_LOADING,
        pictures: []
    }
}

const deletePictureSuccess = (state, action) => {
    const { pictures } = state;
    const { id } = action;
    const newPictures = pictures.filter(v => v.id !== id);

    return {
        ...state,
        loading: LOADED,
        pictures: newPictures
    }
}

const addDeletePictureInFavorites = (state, action, isAdded) => {
    const { id } = action;
    let newPictures = state.pictures.filter(() => true);
    let index = newPictures.findIndex(i => i.id === id);
    console.log(action);
    newPictures[index].favorite = isAdded ? 1 : 0;
    return {
        ...state,
        pictures: newPictures
    }
}

const setSearchParam = (state, action) => {
    return {
        ...state,
        searchParams: {
            ...state.searchParams,
            ...action.searchParams
        }
    }
}

export default updatePictures;