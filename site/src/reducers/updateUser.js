import { UNLOGIN_SUCCESS, SET_DATA, FAIL_DATA, CHANGE_DATA_PENDING, CHANGE_DATA_SUCCESS, CHANGE_DATA_FAIL } from "../actions/userActions";
import { CHANGED, IS_CHANGING, ERROR_CHANGING } from "../constants";

const initState = {
    loggedIn: "wait",
    username: "",
    email: "",
    changing: CHANGED,
    error: null
}

const updateUser = (state = initState, action) => {

    switch(action.type) {
        case UNLOGIN_SUCCESS: {
            return {
                ...state,
                loggedIn: false
            }
        }

        case SET_DATA: {
            const { username, email } = action;
            return {
                ...state,
                loggedIn: true,
                username,
                email
            }
        }
        case FAIL_DATA: {
            return {
                ...state,
                loggedIn: false
            }
        }

        case CHANGE_DATA_PENDING: {

            return {
                ...state,
                changing: IS_CHANGING
            }
        }

        case CHANGE_DATA_SUCCESS: {

            return {
                ...state,
                changing: CHANGED
            }
        }

        case CHANGE_DATA_FAIL: {
            const { error } = action;

            return {
                ...state,
                changing: ERROR_CHANGING,
                error
            }
        }
        

        default: return state;
    }
}

export default updateUser;