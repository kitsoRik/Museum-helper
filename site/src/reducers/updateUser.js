import { LOGIN_IN_SUCCESS, LOGIN_IN_ERROR, UNLOGIN_SUCCESS, SET_DATA, FAIL_DATA } from "../actions/userActions";

const initState = {
    loggedIn: "wait"
}

const updateUser = (state = initState, action) => {

    switch(action.type) {
        case LOGIN_IN_SUCCESS: return loginInSuccess(state, action);
        case LOGIN_IN_ERROR: return loginInError(state, action);

        case UNLOGIN_SUCCESS: return unloginSuccess(state, action);

        case SET_DATA: return setData(state, action);
        case FAIL_DATA: return failData(state, action);
        

        default: return state;
    }
}

const loginInSuccess = (state, action) => {
    const { username, email } = action.data;

    return {
        loggedIn: true,
        username,
        email
    }
}

const loginInError = (state, action) => {
    return {
        loggedIn: false,
        error: action.error
    }
}

const unloginSuccess = (state, action) => {
    return {
        loggedIn: false
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