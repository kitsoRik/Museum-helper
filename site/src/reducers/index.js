import updateUserData from "./updateUserData";

const reducer = (state, action) => {
    return {
        userData: updateUserData(state, action)
    }
}

export default reducer;