import { NOT_LOADED, IS_LOADING, LOADED, ERROR_LOADING } from "../constants";
import { LOAD_MUSEUMS_PENDING, LOAD_MUSEUMS_SUCCESS, LOAD_MUSEUMS_FAIL } from "../actions/museumsActions";

const initState = {
    error: null,
    loading: NOT_LOADED,
    museums: []
};

export const museumsReducer = (state = initState, action) => {

    switch(action.type) {

        case LOAD_MUSEUMS_PENDING: {

            return {
                ...state,
                loading: IS_LOADING,
            };
        }

        case LOAD_MUSEUMS_SUCCESS: {
            const { museums } = action;

            return {
                ...state,
                loading: LOADED,
                museums
            };
        }

        case LOAD_MUSEUMS_FAIL: {
            const { error } = action;
            return {
                ...state,
                loading: LOADED,
                error
            };
        }

        default: return state;
    }
}