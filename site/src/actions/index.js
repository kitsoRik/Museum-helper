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

const startLoadPictures = () => {
    return {
        type: "START_LOAD_PICTURES"
    }
};

const loadPicturesSuccess = (data) => {
    return {
        type: "LOAD_PICTURES_SUCCESS",
        data
    }
};

const loadPicturesError = (error) => {
    return {
        type: "LOAD_PICTURES_ERROR",
        error
    }
};

export const startLoadPicturesCreator = (dispatch) => {
    dispatch(startLoadPictures());
}

export const loadPicturesSuccesssCreator = (data, dispatch) => {
    dispatch(loadPicturesSuccess(data));
}

export const loadPicturesErrorCreator = (error, dispatch) => {
    dispatch(loadPicturesError(error));
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


