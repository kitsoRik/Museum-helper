import { SET_ERROR_MODAL } from "../actions/modal-actions";

const initState = {
    has: false,
    typeModal: ""
}

export default (state = initState, action) => {
    switch(action.type) {
        case SET_ERROR_MODAL: {
            return {
                ...state,
                has: true,
                typeModal: "ERROR"
            }
        }

        default: return state;
    }
}