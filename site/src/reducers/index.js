import updateUser from "./updateUser";
import updatePictures from "./updatePictures";
import updatePictureInfo from "./updatePictureInfo";
import updateDrawer from "./updateDrawer";
import updateAlert from "./updateAlert";
import { combineReducers } from "redux";
import { updateFavorites } from "./updateFavorites";

const reducer = combineReducers({
    alert: updateAlert,
    drawer: updateDrawer,
    user: updateUser,
    pictures: updatePictures,
    favorites: updateFavorites,
    pictureInfo: updatePictureInfo
});

export default reducer;