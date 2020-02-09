const initState = {
    loading: "NOT_LOADED",
    editable: false,
    groups: []
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

        case "FAVORITE_GROUP_ADDED": {
            const { group } = action;

            const otherGroup = state.groups.find(g => g.id === -1);
            const newGroups = state.groups.filter(g => g.id !== -1);
            newGroups.push(group);
            if(otherGroup) newGroups.push(otherGroup);
            
            return {
                ...state,
                groups: newGroups
            }
        }

        case "FAVORITE_GROUP_DELETED": {
            const { id } = action;
            const { groups } = state;

            const groupIndex = groups.findIndex(g => g.id === id);

            const newGroups = groups.filter(g => g.id !== id);
            const otherGroupIndex = newGroups.findIndex(g => g.id === -1);
            
            if(otherGroupIndex === -1) {
                newGroups.push({ 
                    id: -1, 
                    items: groups[groupIndex].items
                });
            } else {
                newGroups[groupIndex].items.push(...groups[groupIndex].items);
            }
            
            return {
                ...state,
                groups: newGroups
            }
        }

        case "MOVE_GROUP": {
            const { id, direction } = action;
            const { groups } = state;

            let newGroups = groups.filter(() => true);
            let moveGroupIndex = newGroups.findIndex(g => g.id === id);
            if((moveGroupIndex === 0 && direction === 'up') || (moveGroupIndex === groups.length - 2 && direction === 'down')) {
                return {
                    ...state
                }
            }

            const toIndex = moveGroupIndex + (direction === 'up' ? -1 : 1);
            
            const temp = newGroups[moveGroupIndex];
            newGroups[moveGroupIndex] = newGroups[toIndex];
            newGroups[toIndex] = temp;
            return {
                ...state,
                groups: newGroups
            }
        }

        default: return state;
    }
};