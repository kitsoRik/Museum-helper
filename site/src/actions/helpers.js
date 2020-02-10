export const actionFactory = (
    apiFunc = () => {},
    pendingAction,
    successAction,
    errorAction
) => (...args) => {
    return async (dispatch) => {
        try {
            if(pendingAction) {
                dispatch(pendingAction(...args));
            }
            const data = await apiFunc(...args);
            console.log({ data, ...args});
            if(data.success) {
                if(successAction) {
                    dispatch(successAction(data, ...args));
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