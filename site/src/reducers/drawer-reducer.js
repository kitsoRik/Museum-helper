import { CHANGE_VISIBLE_DRAWER, CLOSE_DRAWER, OPEN_DRAWER, CHANGE_DRAWER_TITLE } from "../actions/drawer-actions";

const initState = {
    opened: localStorage.getItem("DRAWER_VISIBLE") === "true",
    title: "Home"
};

export default (state = initState, action) => {   
    switch(action.type) {
        case CHANGE_VISIBLE_DRAWER: {
            if(state.opened) 
                return closeDrawer(state, action);
            
             return openDrawer(state, action);
        }
        case CLOSE_DRAWER: return closeDrawer();
        case OPEN_DRAWER: return openDrawer();

        case CHANGE_DRAWER_TITLE: {
            const { title } = action;
            return {
                ...state,
                title
            }
        }
        default: return state;
    }
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