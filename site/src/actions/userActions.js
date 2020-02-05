import { getUserData, getLoginIn } from "../services/api/api"
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

export const getDataCreator = (dispatch) => {
    return (dispatch) => {
        getUserData().then((data) => {
            if(data.success) {
                dispatch(alertAddNotificationCreator(`User data has been loaded!`));
                dispatch(setDataCreator(data));
            } else {
                dispatch(failDataCreator(data));
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
