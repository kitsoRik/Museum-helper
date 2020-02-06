import { getUserData, getLoginIn, unlogin } from "../services/api/api"
import { alertAddNotificationCreator } from "./alertActions";

export const loginInStartCreator = (email, password, ownProps) => {
    return (dispatch) => {
        getLoginIn(email, password)
                .then((data) => {
                    const { success } = data;
                    if(success) {
                        dispatch(loginInSuccessCreator(data, dispatch));
                        ownProps.history.push("/");
                    } else {
                        const { error } = data;
                        dispatch(loginInErrorCreator(error, dispatch));
                    }
                }).catch(() => {
                    dispatch(alertAddNotificationCreator(`Login error! (server problem)`), "error");
                });
    }
}

export const loginInSuccessCreator = (data) => {
    return {
        type: "LOGIN_IN_SUCCESS",
        data
    }
}

export const loginInErrorCreator = (error) => {
    return {
        type: "LOGIN_IN_ERROR",
        error
    }
}

export const unloginCreator = () => {
    return (dispatch) => {
        unlogin().then((data) => {
            if(data.success) {
                dispatch(unloginSuccessCreator());
                dispatch(alertAddNotificationCreator("Unloginned"));
            } else {
                dispatch(unloginSuccessError(data.error));
                dispatch(alertAddNotificationCreator("Not unloginned"), "error");
            }
        });
    }
}

export const unloginSuccessCreator = () => {
    return {
        type: "UNLOGIN_SUCCESS"
    }
}

export const unloginSuccessError = (error) => {
    return {
        type: "UNLOGIN_ERROR",
        error
    }
}

export const getDataCreator = (dispatch) => {
    return (dispatch) => {
        getUserData().then((data) => {
            if(data.success) {
                dispatch(alertAddNotificationCreator(`User data has been loaded!`));
                dispatch(setDataCreator(data));
            } else {
                dispatch(failDataCreator(data));
                dispatch(alertAddNotificationCreator(`User data has not been loaded! (server problem)`, 'error'));
            }
        });
    }
}

export const setDataCreator = (data) => {
    return {
        type: "SET_DATA",
        data
    }
}

export const failDataCreator = (data) => {
    return {
        type: "FAIL_DATA",
        data
    }
}
