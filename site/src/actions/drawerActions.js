const closeDrawerAction = () => {
    return {
        type: "CLOSE_DRAWER"
    }
}

const openDrawerAction = () => {
    return {
        type: "OPEN_DRAWER"
    }
}

export const closeDrawerCreator = (dispatch) => {
    dispatch(closeDrawerAction());
}

export const openDrawerCreator = (dispatch) => {
    dispatch(openDrawerAction());
}