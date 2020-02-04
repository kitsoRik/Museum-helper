const initState = {
    opened: localStorage.getItem("DRAWER_VISIBLE") === "true"
};

const updateDrawer = (state = initState, action) => {   
    switch(action.type) {
        case "CHANGE_VISIBLE_DRAWER": {
            if(state.opened) 
                return closeDrawer(state, action);
            
             return openDrawer(state, action);
        }
        case "CLOSE_DRAWER": return closeDrawer();
        case "OPEN_DRAWER": return openDrawer();
    }

    return state;
}

const closeDrawer = (state, action) => {
    localStorage.setItem("DRAWER_VISIBLE", false);
    return {
        ...state,
        opened: false
    }
}

const openDrawer = (state, action) => {
    localStorage.setItem("DRAWER_VISIBLE", true);
    return {
        ...state,
        opened: true
    }
}

export default updateDrawer;