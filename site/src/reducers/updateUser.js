import { LOGIN_IN_SUCCESS, LOGIN_IN_ERROR, UNLOGIN_SUCCESS, SET_DATA, FAIL_DATA } from "../actions/userActions";

const initState = {
    loggedIn: "wait"
}

const updateUser = (state = initState, action) => {

    switch(action.type) {
        case UNLOGIN_SUCCESS: {
            return {
                loggedIn: false
            }
        }

        case SET_DATA: return setData(state, action);
        case FAIL_DATA: return failData(state, action);
        

        default: return state;
    }
}

const setData = (state, { username, email }) => {
    
    return {
        loggedIn: true,
        username,
        email
    }
}

const failData = (state, action) => {
    return {
        loggedIn: false
    }
}

export default updateUser;