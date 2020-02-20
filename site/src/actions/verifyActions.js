import { actionFactory } from "./helpers";
import api from "../services/api/api";

export const 
    VERIFY_EMAIL_PENDING = "VERIFY_EMAIL_PENDING",
    VERIFY_EMAIL_SUCCESS = "VERIFY_EMAIL_SUCCESS",
    VERIFY_EMAIL_FAIL = "VERIFY_EMAIL_FAIL";

export const verifyEmailPending = () => ({
    type: VERIFY_EMAIL_PENDING
});

export const verifyEmailSuccess = ({ email }) => ({
    type: VERIFY_EMAIL_SUCCESS,
    email
});

export const verifyEmailFail = ({ error }) => ({
    type: VERIFY_EMAIL_FAIL,
    error
});

export const verifyEmail = actionFactory(
    api.verifyEmail,
    verifyEmailPending,
    verifyEmailSuccess,
    verifyEmailFail
);