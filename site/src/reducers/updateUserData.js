const loginInStart = (state, action) => {
    const { email, password } = action;

    return state.userData;
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
    const { error } = action;

    return {
        ...state.userData,
        loggedIn: false
    }
}

const setData = (state, { data: { username, email }}) => {
    
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

const updateUserData = (state, action) => {

    if(state === undefined) {
        return {
            loggedIn: "wait"
        }
    }

    switch(action.type) {
        case "LOGIN_IN_START": return loginInStart(state, action);
        case "LOGIN_IN_SUCCESS": return loginInSuccess(state, action);
        case "LOGIN_IN_ERROR": return loginInError(state, action);

        case "SET_DATA": return setData(state, action);
        case "FAIL_DATA": return failData(state, action);
    }

    return state.userData;
}

export default updateUserData;