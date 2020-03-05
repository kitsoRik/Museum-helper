import { NOT_VERIFIED, IS_VERIFYING, VERIFIED } from "../constants";
import { VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAIL, VERIFY_EMAIL_PENDING } from "../actions/verify-actions";

const initState = {
    verifying: NOT_VERIFIED,
    email: "",
    error: null
};

export default (state = initState, action) => {
    switch(action.type) {
        case VERIFY_EMAIL_PENDING: {
            return {
                ...state,
                verifying: IS_VERIFYING,
                error: null,
                email: ""
            }
        }

        case VERIFY_EMAIL_SUCCESS: {
            const { email } = action;

            return {
                ...state,
                verifying: VERIFIED,
                email,
                error: null
            }
        }

        case VERIFY_EMAIL_FAIL: {
            const { error } = action;

            return {
                ...state,
                verifying: NOT_VERIFIED,
                error
            }
        }

        default: return state;
    }
};