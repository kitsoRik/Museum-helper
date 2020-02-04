import { getUserData, getLoginIn } from "../services/api/api";
import { setDataCreator, failDataCreator, loginInSuccessCreator, loginInErrorCreator } from "../actions/userActions"

const initState = {
    loggedIn: "wait"
}

const updateUser = (state = initState, action) => {

    switch(action.type) {
        case "LOGIN_IN_SUCCESS": return loginInSuccess(state, action);
        case "LOGIN_IN_ERROR": return loginInError(state, action);

        case "SET_DATA": return setData(state, action);
        case "FAIL_DATA": return failData(state, action);

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