import { actionFactory } from "./helpers";
import api from "../services/api/api";
import { setData } from "./user-actions";
import { loadMuseums } from "./museums-actions";
import { verifyEmailPending } from "./verify-actions";

export const 
    LOGIN_IN_PENDING = "LOGIN_IN_PENDING",
    LOGIN_IN_SUCCESS = "LOGIN_IN_SUCCESS",
    LOGIN_IN_FAIL = "LOGIN_IN_FAIL",

    EXIT_FROM_VERIFY = "EXIT_FROM_VERIFY",

    VERIFY_EMAIL_AGAIN_PENDING = "VERIFY_EMAIL_AGAIN_PENDING",
    VERIFY_EMAIL_AGAIN_SUCCESS = "VERIFY_EMAIL_AGAIN_SUCCESS";

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
    [loginInSuccess, setData, loadMuseums],
    loginInFail
)

export const exitFromVerify = () => ({
    type: EXIT_FROM_VERIFY
});

export const verifyEmailAgainPending = () => ({
    type: VERIFY_EMAIL_AGAIN_PENDING
});

export const verifyEmailAgainSuccess = () => ({
    type: VERIFY_EMAIL_AGAIN_SUCCESS
});

export const verifyEmailAgain = actionFactory(
    api.verifyEmailAgain,
    verifyEmailAgainPending,
    verifyEmailAgainSuccess
)