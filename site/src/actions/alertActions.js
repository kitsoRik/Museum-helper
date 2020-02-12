let _id = 0;

export const alertAddNotification = (text, alertType = "default") => {
    _id++;
    return (dispatch) => {
        const copyId = _id;
        setTimeout(() => {
            dispatch((() => {
                return {
                    type: "DELETE_NOTIFICATION",
                    id: copyId
                }
            })());
        }, 4000);

        dispatch((() => {
            return {
                type: "ADD_NOTIFICATION",
                id:_id,
                text,
                alertType
            }
        })());
    }
}