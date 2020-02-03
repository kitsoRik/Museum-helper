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

const loginInError = (error) => {
    return {
        type: "LOGIN_IN_ERROR",
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

const deletePictureSuccessAction = (id) => {
    return {
        type: "DELETE_PICTURE_SUCCESS",
        id
    }
}

const startLoadPictureInfoAction = (id) => {
    return {
        type: "START_LOAD_PICTURE_INFO"
    }
}

const loadPictureInfoSuccessAction = (picture, pictureInfo) => {
    return {
        type: "LOAD_PICTURE_INFO_SUCCESS",
        picture,
        pictureInfo
    }
}

const changePictureInfoSuccessAction = (id, changes) => {
    return {
        type: "CHANGE_PICTURE_INFO_SUCCESS",
        id,
        changes
    }
}

const changePictureSuccessAction = (id, changes) => {
    return {
        type: "CHANGE_PICTURE_SUCCESS",
        id,
        changes
    }
}

const languageInfoAddedAction = (result) => {
    return {
        type: "LANGUAGE_INFO_ADDED",
        pictureInfoPart: result
    }
}

export const languageInfoAddedCreator = (result, dispatch) => {
    dispatch(languageInfoAddedAction(result));
}

export const changePictureSuccessCreator = (id, changes, dispatch) => {
    dispatch(changePictureSuccessAction(id, changes));
}

export const changePictureInfoSuccessCreator = (id, changes, dispatch) => {
    dispatch(changePictureInfoSuccessAction(id, changes));
}

export const loadPictureInfoSuccessCreator = (picture, pictureInfo, dispatch) => {
    dispatch(loadPictureInfoSuccessAction(picture, pictureInfo));
}

export const startLoadPictureInfoCreator = (id, dispatch) => {
    dispatch(startLoadPictureInfoAction(id));
}

export const deletePictureSuccessCreator = (id, dispatch) => {
    dispatch(deletePictureSuccessAction(id));
}

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
    dispatch(loginInError(error));
}


