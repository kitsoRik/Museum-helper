export const changeVisibleDrawerCreator = () => {
    return {
        type: "CHANGE_VISIBLE_DRAWER"
    }
}

export const closeDrawerCreator = () => {
    return {
        type: "CLOSE_DRAWER"
    }
}

export const openDrawerCreator = () => {
    return {
        type: "OPEN_DRAWER"
    }
}

export const changeDrawerTitleCreator = (title) => {
    return {
        type: "CHANGE_DRAWER_TITLE",
        title
    }
}