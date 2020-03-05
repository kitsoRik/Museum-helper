export const 
    CHANGE_VISIBLE_DRAWER = "CHANGE_VISIBLE_DRAWER",
    CLOSE_DRAWER = "CLOSE_DRAWER",
    OPEN_DRAWER = "OPEN_DRAWER",
    CHANGE_DRAWER_TITLE = "CHANGE_DRAWER_TITLE";

export const changeVisibleDrawer = () => {
    return {
        type: CHANGE_VISIBLE_DRAWER
    }
}

export const closeDrawer = () => {
    return {
        type: CLOSE_DRAWER
    }
}

export const openDrawer = () => {
    return {
        type: OPEN_DRAWER
    }
}

export const changeDrawerTitle = (title) => {
    return {
        type: CHANGE_DRAWER_TITLE,
        title
    }
}