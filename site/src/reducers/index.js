import updateUser from "./updateUser";
import updatePictures from "./updatePictures";
import updatePictureInfo from "./updatePictureInfo";
import updateDrawer from "./updateDrawer";
import updateAlert from "./updateAlert";
import { combineReducers } from "redux";
import { updateFavorites } from "./updateFavorites";
import loginReducer from "./login-reducer";
import { museumsReducer } from "./museums-reducer";

const reducer = combineReducers({
    museums: museumsReducer,
    login: loginReducer,
    alert: updateAlert,
    drawer: updateDrawer,
    user: updateUser,
    pictures: updatePictures,
    favorites: updateFavorites,
    pictureInfo: updatePictureInfo
});

export default reducer;