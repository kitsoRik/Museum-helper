import updateUser from "./updateUser";
import updatePictures from "./updatePictures";
import updatePictureInfo from "./updatePictureInfo";
import updateDrawer from "./updateDrawer";
import { combineReducers } from "redux";

const reducer = combineReducers({
    drawer: updateDrawer,
    user: updateUser,
    pictures: updatePictures,
    pictursInfo: updatePictureInfo
});

// const reducer = (state = {}, action) => {
//     return {
//         drawer: updateDrawer(state.drawer, action),
//         user: updateUser(state.user, action),
//         pictures: updatePictures(state.pictures, action),
//         pictursInfo: updatePictureInfo(state.pictursInfo, action)
//     }
// }

export default reducer;