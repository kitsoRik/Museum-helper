import { NOT_LOADED, LOADED, ERROR_LOADING, IS_LOADING } from "../constants";
import { LOAD_PICTURES_START, LOAD_PICTURES_SUCCESS, LOAD_PICTURES_ERROR, ADD_PICTURE_SUCCESS, DELETE_PICTURE_SUCCESS, PICTURE_TO_FAVOTIRES_ADDED, PICTURE_FROM_FAVOTIRES_DELETED, SET_SEARCH_PARAMS } from "../actions/pictures-actions";

const initState = {
    loading: NOT_LOADED,
    pictures: [],
    museumsMinimize: [],
    pagesCount: 0,
    searchParams: {
        searchText: '',
        sortedField: 'none',
        sortedType: 'ASC',
        museumId: -1,
        updateId: 'current',
        pageNumber: 1,
        limit: 10
    }
}

export default (state = initState, action) => {
    switch(action.type) {
        case LOAD_PICTURES_START: return loadPicturesStart(state, action);
        case LOAD_PICTURES_SUCCESS: return loadPicturesSuccess(state, action);
        case LOAD_PICTURES_ERROR: return loadPicturesError(state, action);
        
        case ADD_PICTURE_SUCCESS: {
            const { picture } = action;
            const { pictures } = state;
            return {
                ...state,
                pictures: pictures.concat([picture])
            }
        }
        case DELETE_PICTURE_SUCCESS: return deletePictureSuccess(state, action);

        case PICTURE_TO_FAVOTIRES_ADDED: return addDeletePictureInFavorites(state, action, true);
        case PICTURE_FROM_FAVOTIRES_DELETED: return addDeletePictureInFavorites(state, action, false);

        case SET_SEARCH_PARAMS: return setSearchParams(state, action);

        default: return state;
    }
}

const loadPicturesStart = (state) => {
    return {
        ...state,
        loading: IS_LOADING
    }
}

const loadPicturesSuccess = (state, action) => {
    const { searchParams } = state;
    const { pictures, pagesCount, museumsMinimize, museumId } = action;
    let min = !!museumsMinimize ? museumsMinimize : state.museumsMinimize;
    
    return {
        ...state,
        loading: LOADED,
        pictures,
        pagesCount,
        museumsMinimize: min,
        searchParams: {
            ...searchParams,
            museumId
        }
    };
}

const loadPicturesError = (state, action) => {
    return {
        ...state,
        loading: ERROR_LOADING,
        pictures: []
    }
}

const deletePictureSuccess = (state, action) => {
    const { pictures, pagesData: { pagesCount } } = action;

    return {
        ...state,
        loading: LOADED,
        pictures,
        pagesCount
    }
}

const addDeletePictureInFavorites = (state, action, isAdded) => {
    const { id } = action;
    let newPictures = state.pictures.filter(() => true);
    if(newPictures.length === 0) return state;
    let index = newPictures.findIndex(i => i.id === id);
    newPictures[index].favorite = isAdded ? 1 : 0;
    return {
        ...state,
        pictures: newPictures
    }
}

const setSearchParams = (state, action) => {
    return {
        ...state,
        searchParams: {
            ...state.searchParams,
            ...action.searchParams
        }
    }
}