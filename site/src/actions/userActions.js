import api from "../services/api/api"
import { actionFactory } from "./helpers";

export const 
    LOGIN_IN_SUCCESS = "LOGIN_IN_SUCCESS",
    LOGIN_IN_ERROR = "LOGIN_IN_ERROR",

    UNLOGIN_SUCCESS = "UNLOGIN_SUCCESS",
    UNLOGIN_ERROR = "UNLOGIN_ERROR",

    SET_DATA = "SET_DATA",
    FAIL_DATA = "FAIL_DATA",
    
    CHANGE_DATA_PENDING = "CHANGE_DATA_PENDING",
    CHANGE_DATA_SUCCESS = "CHANGE_DATA_SUCCESS",
    CHANGE_DATA_FAIL = "CHANGE_DATA_FAIL";

export const unloginSuccess = () => {
    return {
        type: UNLOGIN_SUCCESS
    }
}

export const unloginError = ({ error }) => {
    return {
        type: UNLOGIN_ERROR,
        error
    }
}

export const unlogin = actionFactory(
    api.unlogin,
    null,
    unloginSuccess,
    unloginError
);

export const setData = ({ email, username }) => {
    return {
        type: SET_DATA,
        email,
        username
    }
}

export const failData = (data) => {
    return {
        type: FAIL_DATA,
        data
    }
}

export const getData = actionFactory(
    api.getUserData,
    null,
    setData,
    failData
);

export const changeDataPending = () => ({
    type: CHANGE_DATA_PENDING
});

export const changeDataSuccess = ({ newData }) => ({
    type: CHANGE_DATA_SUCCESS,
    newData
});

export const changeDataFail = ({ error }) => ({
    type: CHANGE_DATA_FAIL,
    error
});

export const changeUserData = actionFactory(
    api.changeUserData,
    changeDataPending,
    changeDataSuccess,
    changeDataFail
);