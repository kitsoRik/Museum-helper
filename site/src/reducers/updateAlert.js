const initState = {
    notifications: []
}

const updateAlert = (state = initState, action) => {
    switch(action.type) {

        case "DELETE_NOTIFICATION": {
            const { id } = action;
            return {
                ...state,
                notifications: state.notifications.filter((i) => i.id !== id)
            }
        }

        case "ADD_NOTIFICATION": {
            const { id, text, alertType = "default" } = action;

            return {
                ...state,
                notifications: state.notifications.concat(
                    {
                        id,
                        text,
                        alertType
                    }
                )
                    
                
            }
        }

        default: return state;
    }
}

export default updateAlert;