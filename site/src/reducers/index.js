
import { combineReducers } from "redux";
import museumsReducer from "./museums-reducer";
import museumReducer from "./museum-reducer";
import registerReducer from "./register-reducer";
import verifyReducer from "./verify-reducer";
import languageReducer from "./language-reducer";
import loginReducer from "./login-reducer";
import drawerReducer from "./drawer-reducer";
import userReducer from "./user-reducer";
import picturesReducer from "./pictures-reducer";
import favoritesReducer from "./favorites-reducer";
import picturesInfoReducer from "./pictureInfo-reducer";

const reducer = combineReducers({
    language: languageReducer,

    register: registerReducer,
    login: loginReducer,
    verify: verifyReducer,

    museum: museumReducer,
    museums: museumsReducer,
    drawer: drawerReducer,
    user: userReducer,
    pictures: picturesReducer,
    favorites: favoritesReducer,
    pictureInfo: picturesInfoReducer
});

export default reducer;