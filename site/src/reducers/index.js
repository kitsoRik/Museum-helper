import updateUser from "./updateUser";
import updatePictures from "./updatePictures";
import updatePictureInfo from "./updatePictureInfo";
import updateDrawer from "./updateDrawer";
import updateAlert from "./updateAlert";
import { combineReducers } from "redux";
import { updateFavorites } from "./updateFavorites";
import loginReducer from "./login-reducer";
import { museumsReducer } from "./museums-reducer";
import museumReducer from "./museum-reducer";

const reducer = combineReducers({
    museum: museumReducer,
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