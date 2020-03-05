import { LOAD_FAVORITES_STARTED, LOAD_FAVORITES_SUCCESS, LOAD_FAVORITES_FAILED, CHANGE_FAVORITES_GROUPS, SET_EDITABLE, FAVORITE_GROUP_ADDED, FAVORITE_GROUP_DELETED, MOVE_GROUP } from "../actions/favorites-actions";
import { IS_LOADING, LOADED, NOT_LOADED, DIRECTION_DOWN, DIRECTION_UP } from "../constants";
import { PICTURE_FROM_FAVOTIRES_DELETED, DELETE_PICTURE_SUCCESS } from "../actions/pictures-actions";

const initState = {
    loading: NOT_LOADED,
    editable: false,
    groups: [],
    otherGroup: {
        id: -1,
        name: "Other",
        description: "For items without group",
        items: []
    }
}

export default (state = initState, action) => {
    switch(action.type) {
        case LOAD_FAVORITES_STARTED: {
            return {
                ...state,
                loading: IS_LOADING
            }
        }
        case LOAD_FAVORITES_SUCCESS: {
            const { otherGroup } = state;
            const { groups } = action;
            const rGroups = groups.filter(g => g.id !== -1);
            const oGroup = groups.find(g => g.id === -1);
            let rOtherGroup = otherGroup;
            if(oGroup) rOtherGroup = oGroup;

            return {
                ...state, 
                loading: LOADED,
                groups: rGroups,
                otherGroup: rOtherGroup
            }
        }
        case LOAD_FAVORITES_FAILED: {
            return state;
        }

        case CHANGE_FAVORITES_GROUPS: {
            const { otherGroup } = state;
            const { groups } = action;
            const rGroups = groups.filter(g => g.id !== -1);
            const oGroup = groups.find(g => g.id === -1);
            let rOtherGroup = otherGroup;
            if(oGroup) rOtherGroup = oGroup;

            return {
                ...state,
                groups: rGroups,
                otherGroup: rOtherGroup
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
            const { groups, otherGroup, otherGroup: { items } } = state;

            const deletedGroup = groups.find(g => g.id === id);

            return {
                ...state,
                groups: groups.filter(g => g.id !== id),
                otherGroup: {
                    ...otherGroup,
                    items: items.concat(deletedGroup.items)
                }
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

        case DELETE_PICTURE_SUCCESS: {
            const { id } = action;
            const { groups, otherGroup } = state;

            const newGroups = groups.filter(() => true);
            newGroups.forEach(g => {
                g.items = g.items.filter(i => i.pictureId !== id);
            });

            const newOtherGroup = otherGroup;
            
            newOtherGroup.items = otherGroup.items.filter(i => i.pictureId !== id);


            return {
                ...state,
                groups: newGroups,
                otherGroup: newOtherGroup
            }
        }

        default: return state;
    }
};