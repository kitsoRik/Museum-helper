import updateUserData from "./updateUserData";
import updatePicturesData from "./updatePicturesData";

const reducer = (state, action) => {
    return {
        userData: updateUserData(state, action),
        picturesData: updatePicturesData(state, action)
    }
}

export default reducer;