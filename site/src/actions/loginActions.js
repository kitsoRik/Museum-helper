import { actionFactory } from "./helpers";
import api from "../services/api/api";
import { setData } from "./userActions";

const 
    LOGIN_IN_PENDING = "LOGIN_IN_PENDING",
    LOGIN_IN_SUCCESS = "LOGIN_IN_SUCCESS",
    LOGIN_IN_FAIL = "LOGIN_IN_FAIL";

export {
    LOGIN_IN_PENDING,
    LOGIN_IN_SUCCESS,
    LOGIN_IN_FAIL
};

export const loginInPending = () => ({
    type: LOGIN_IN_PENDING
});

export const loginInFail = ({ error }) => ({
    type: LOGIN_IN_FAIL,
    error
});

export const loginInSuccess = () => ({
    type: LOGIN_IN_SUCCESS
});


export const loginIn = actionFactory(
    api.getLoginIn,
    loginInPending,
    [loginInSuccess, setData],
    loginInFail
)