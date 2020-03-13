import api from "../services/api/api";
import { actionFactory } from "./helpers";

export const 
    REGISTER_IN_PENDING = "REGISTER_IN_PENDING",
    REGISTER_IN_SUCCESS = "REGISTER_IN_SUCCESS",
    REGISTER_IN_ERROR = "REGISTER_IN_ERROR",

    CLEAR_REGISTER = "CLEAR_REGISTER";


export const registerInPending = () => ({
    type: REGISTER_IN_PENDING
});

export const registerInSuccess = ({ link }) => ({
    type: REGISTER_IN_SUCCESS,
    verifyLink: link
});

export const registerInError = ({ error }) => ({
    type: REGISTER_IN_ERROR,
    error
});

export const registerIn = actionFactory(
    api.getRegisterIn,
    registerInPending,
    registerInSuccess,
    registerInError
);

export const clearRegister = () => ({
    type: CLEAR_REGISTER
})