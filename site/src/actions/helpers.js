export const actionFactory = (
    apiFunc = () => {},
    pendingAction,
    successAction,
    errorAction,
    stateToArgs
) => (...args) => {
    return async (dispatch, getState) => {
        let stateArgs = {};
        if(stateToArgs) {
            const state = getState();
            stateArgs = stateToArgs(state);
        }
        try {
            if(pendingAction) {
                dispatch(pendingAction(...args, stateArgs));
            }
            const data = await apiFunc(...args, stateArgs);
            if(data.success) {
                if(successAction) {
                    dispatch(successAction(data, ...args, stateArgs));
                }
            } else if(errorAction) {
                dispatch(errorAction(data)); 
            }
        }catch(error) {
            console.log(error);
            if(errorAction) {
                dispatch(errorAction(error))
            }
        }
    }
}