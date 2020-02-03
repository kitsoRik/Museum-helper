import updateUserData from "./updateUserData";
import updatePicturesData from "./updatePicturesData";
import updatePictureInfoData from "./updatePictureInfo";
import updateDrawer from "./updateDrawer";

const reducer = (state, action) => {
    return {
        drawerData: updateDrawer(state, action),
        userData: updateUserData(state, action),
        picturesData: updatePicturesData(state, action),
        pictureInfoData: updatePictureInfoData(state, action)
    }
}

export default reducer;