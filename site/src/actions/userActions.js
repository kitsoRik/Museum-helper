import api from "../services/api/api"
import { actionFactory } from "./helpers";

export const 
    LOGIN_IN_SUCCESS = "LOGIN_IN_SUCCESS",
    LOGIN_IN_ERROR = "LOGIN_IN_ERROR",

    UNLOGIN_SUCCESS = "UNLOGIN_SUCCESS",
    UNLOGIN_ERROR = "UNLOGIN_ERROR",

    SET_DATA = "SET_DATA",
    FAIL_DATA = "FAIL_DATA";

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

export const setData = (data) => {
    return {
        type: SET_DATA,
        data
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