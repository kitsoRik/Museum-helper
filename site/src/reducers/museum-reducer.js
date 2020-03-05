import { NOT_LOADED, IS_LOADING, LOADED, LOADED_ERROR } from "../constants";
import { LOAD_MUSEUM_SUCCESS, LOAD_MUSEUM_PENDING, LOAD_MUSEUM_FAIL, CHANGE_MUSEUM_DATA_PENDING, CHANGE_MUSEUM_DATA_SUCCESS, CHANGE_MUSEUM_DATA_FAIL } from "../actions/museum-actions";

const initState = {
    loading: NOT_LOADED,
    id: -1,
    name: "",
    location: "",
    changingFields: [],
    changedField: "",
    notChangedField: ""
}

export default (state = initState, action) => {
    switch(action.type) {
        case LOAD_MUSEUM_PENDING: {
            return {
                ...state,
                loading: IS_LOADING
            }
        }

        case LOAD_MUSEUM_SUCCESS: {
            const { id, name, location } = action;
            return {
                ...state,
                loading: LOADED,
                id,
                name,
                location
            }
        }

        case LOAD_MUSEUM_FAIL: {
            return {
                ...state,
                loading: LOADED_ERROR
            }
        }

        case CHANGE_MUSEUM_DATA_PENDING: {
            const { changingFields } = state;
            const { changes } = action;

            const changingKey = Object.keys(changes)[0];
            

            return {
                ...state,
                changingFields: changingFields.concat([changingKey]),
                changedField: "",
                notChangedField: ""
            }
        }

        case CHANGE_MUSEUM_DATA_SUCCESS: {
            const { changingFields } = state;
            const { changes } = action;

            const changingKey = Object.keys(changes)[0];
            

            return {
                ...state,
                changingFields: changingFields.filter(f => f != changingKey),
                changedField: changingKey
            }
        }

        case CHANGE_MUSEUM_DATA_FAIL: {
            const { changingFields } = state;
            const { changes } = action; 
            const changingKey = Object.keys(changes)[0];
            

            return {
                ...state,
                changingFields: changingFields.filter(f => f != changingKey),
                notChangedField: changingKey
            }
        }

        default: return state;
    }
}