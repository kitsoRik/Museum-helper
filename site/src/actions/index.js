const loginInStart = (login) => {
    return {
        type: "LOGIN_IN_START",
        login
    }
}

const loginInSuccess = (data) => {
    return {
        type: "LOGIN_IN_SUCCESS",
        data
    }
}

const loginInNotSuccess = (error) => {
    return {
        type: "LOGIN_IN_NOT_SUCCESS",
        error
    }
}

const setDataAction = (data) => {
    return {
        type: "SET_DATA",
        data
    }
}

const failDataAction = (data) => {
    return {
        type: "FAIL_DATA",
        data
    }
}

export const setDataCreator = (data, dispatch) => {
    dispatch(setDataAction(data));
}

export const failDataCreator = (data, dispatch) => {
    dispatch(failDataAction(data));
}

export const startLoginIn = (login, dispatch) => {
    dispatch(loginInStart(login));
}

export const successLoginIn = (data, dispatch) => {
    dispatch(loginInSuccess(data));
}

export const errorLoginIn = (error, dispatch) => {
    dispatch(loginInNotSuccess(error));
}


