const initState = {
    loading: "NOT_LOADED",
    editable: false
}

export const updateFavorites = (state = initState, action) => {

    switch(action.type) {
        case "LOAD_FAVORITES_STARTED": {
            return {
                ...state,
                loading: "LOADING"
            }
        }
        case "LOAD_FAVORITES_SUCCESS": {
            const { groups } = action;
            return {
                ...state, 
                loading: "LOADED",
                groups
            }
        }
        case "LOAD_FAVORITES_FAILED": {
            return state;
        }

        case "CHANGE_FAVORITES_GROUPS": {
            const { groups } = action;
            return {
                ...state,
                groups
            }
        }

        case "SET_EDITABLE": {
            const { editable } = action;
            return {
                ...state,
                editable
            }
        }
        default: return state;
    }
};