export const actionFactory = (
    apiFunc = () => {},
    pendingAction,
    successAction,
    errorAction,
    stateToArgs
) => (...args) => async (dispatch, getState) => {
    let stateArgs = {};
    if(stateToArgs) {
        const state = getState();
        stateArgs = stateToArgs(state);
    }
    try {
        if(pendingAction) {
            if(Array.isArray(pendingAction)) 
                pendingAction.forEach(p => dispatch(p(...args, stateArgs))); 
            else dispatch(pendingAction(...args, stateArgs));
        }
        const data = await apiFunc(...args, stateArgs);
        if(data.success) {
            if(successAction) {
                if(Array.isArray(successAction)) 
                    successAction.forEach(s => dispatch(s(data, ...args, stateArgs)));
                else dispatch(successAction(data, ...args, stateArgs));
            }
        } else if(errorAction) {
            if(Array.isArray(errorAction)) 
                errorAction.forEach(e => dispatch(e(data, ...args, stateArgs)))
            else dispatch(errorAction(data, ...args, stateArgs)); 
        }
    }catch(error) {
        console.log(error);
        if(errorAction) {
            if(Array.isArray(errorAction)) 
                errorAction.forEach(e => dispatch(e()))
            else dispatch(errorAction()); 
        }
    }
}