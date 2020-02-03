


const updateDrawer = (state, action) => {
    if(state === undefined) {
        return {
            opened: localStorage.getItem("DRAWER_VISIBLE") === "true"
        }
    }

    switch(action.type) {
        case "CLOSE_DRAWER": {
            localStorage.setItem("DRAWER_VISIBLE", false);
            return {
                ...state.drawerData,
                opened: false
            }
        }
        case "OPEN_DRAWER": {
            localStorage.setItem("DRAWER_VISIBLE", true);
            return {
                ...state.drawerData,
                opened: true
            }
        }
    }

    return state.drawerData;
}

export default updateDrawer;