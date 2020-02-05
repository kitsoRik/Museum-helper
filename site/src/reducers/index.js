import updateUser from "./updateUser";
import updatePictures from "./updatePictures";
import updatePictureInfo from "./updatePictureInfo";
import updateDrawer from "./updateDrawer";
import updateAlert from "./updateAlert";
import { combineReducers } from "redux";

const reducer = combineReducers({
    alert: updateAlert,
    drawer: updateDrawer,
    user: updateUser,
    pictures: updatePictures,
    pictureInfo: updatePictureInfo
});

// const reducer = (state = {}, action) => {
//     return {
//         drawer: updateDrawer(state.drawer, action),
//         user: updateUser(state.user, action),
//         pictures: updatePictures(state.pictures, action),
//         pictureInfo: updatePictureInfo(state.pictureInfo, action)
//     }
// }

export default reducer;