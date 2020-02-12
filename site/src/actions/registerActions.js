import api from "../services/api/api";

export const 
    REGISTER_IN_PENDING = "REGISTER_IN_PENDING",
    REGISTER_IN_SUCCESS = "REGISTER_IN_SUCCESS",
    REGISTER_IN_ERROR = "REGISTER_IN_ERROR";


export const registerInPending = () => ({
    type: REGISTER_IN_PENDING
});

export const registerInSuccess = () => ({
    type: REGISTER_IN_SUCCESS
});

export const registerInError = ({ error }) => ({
    type: REGISTER_IN_ERROR,
    error
});

export const registerIn = (username, email, password, passwordConfirm) => (dispatch) => {
    dispatch(registerInPending());
    api.getRegisterIn(username, email, password, passwordConfirm)
        .then(data => {
            console.log(data);
        });
};