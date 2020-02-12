import { LOAD_FAVORITES_STARTED, LOAD_FAVORITES_SUCCESS, LOAD_FAVORITES_FAILED, CHANGE_FAVORITES_GROUPS, SET_EDITABLE, FAVORITE_GROUP_ADDED, FAVORITE_GROUP_DELETED, MOVE_GROUP } from "../actions/favoritesActions";
import { IS_LOADING, LOADED, NOT_LOADED, DIRECTION_DOWN, DIRECTION_UP } from "../constants";
import { PICTURE_FROM_FAVOTIRES_DELETED } from "../actions/picturesActions";

const initState = {
    loading: NOT_LOADED,
    editable: false,
    groups: []
}

export const updateFavorites = (state = initState, action) => {
    switch(action.type) {
        case LOAD_FAVORITES_STARTED: {
            return {
                ...state,
                loading: IS_LOADING
            }
        }
        case LOAD_FAVORITES_SUCCESS: {
            const { groups } = action;
            return {
                ...state, 
                loading: LOADED,
                groups
            }
        }
        case LOAD_FAVORITES_FAILED: {
            return state;
        }

        case CHANGE_FAVORITES_GROUPS: {
            const { groups } = action;
            return {
                ...state,
                groups
            }
        }

        case SET_EDITABLE: {
            const { editable } = action;
            return {
                ...state,
                editable
            }
        }

        case FAVORITE_GROUP_ADDED: {
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

        case FAVORITE_GROUP_DELETED: {
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

        case MOVE_GROUP: {
            const { id, direction } = action;
            const { groups } = state;

            let newGroups = groups.filter(() => true);
            let moveGroupIndex = newGroups.findIndex(g => g.id === id);
            if((moveGroupIndex === 0 && direction === DIRECTION_UP) 
                || (moveGroupIndex === groups.length - 2 
                    && direction === DIRECTION_DOWN)) {
                return {
                    ...state
                }
            }

            const toIndex = moveGroupIndex + (direction === DIRECTION_UP ? -1 : 1);
            
            const temp = newGroups[moveGroupIndex];
            newGroups[moveGroupIndex] = newGroups[toIndex];
            newGroups[toIndex] = temp;
            return {
                ...state,
                groups: newGroups
            }
        }

        case PICTURE_FROM_FAVOTIRES_DELETED: {
            const { id } = action;
            const { groups } = state;
            const newGroups = groups.filter(() => true);

            if(newGroups.length === 0) return state;
            console.log(id, newGroups);
            const groupWithItem = newGroups.find(g => {
                let flag = false;
                g.items.forEach(i => {
                    if(i.pictureId === id) {
                        flag = true;
                        return true;
                    }
                });
                return flag;
            });

            const itemIndex = groupWithItem.items.findIndex(i => i.pictureId === id);
            groupWithItem.items.splice(itemIndex, 1);

            return {
                ...state,
                groups: newGroups
            }
        }

        default: return state;
    }
};