import { NOT_LOADED, IS_LOADING, LOADED } from "../constants";
import { getPictureData, savePictureData, savePictureInfo, addLanguageInfo } from "../services/api/api";
import { loadPictureInfoSuccess, changePictureSuccess, changePictureInfoSuccess, languageInfoAdded, LOAD_PICTURE_INFO_SUCCESS, CHANGE_PICTURE_SUCCESS, CHANGE_PICTURE_INFO_SUCCESS, LANGUAGE_INFO_ADDED, CHANGE_CURRENT_INDEX, TRIGGERED_ADD_LANGUAGE_INFO, UNTRIGGERED_ADD_LANGUAGE_INFO, ICON_TO_PICTURE_ADDED, ICON_FROM_PICTURE_DELETED } from "../actions/picturesInfoActions";

const initState = {
    loading: NOT_LOADED,
    picture: null,
    pictureInfo: [],
    currentIndex: -1,
    triggeredAdd: false
}

const updatePictureInfo = (state = initState, action) => {
    switch(action.type) {
        case LOAD_PICTURE_INFO_SUCCESS: {
            return {
                currentIndex: -1,
                loading: LOADED,
                picture: action.picture,
                pictureInfo: action.pictureInfo
            }
        }

        case CHANGE_PICTURE_SUCCESS: {
            const { id, changes } = action;
            const picture = { ...state.picture };

            const keys = Object.keys(changes);

            for(let i = 0; i < keys.length; i++) {
                let key = keys[i];
                picture[key] = changes[key];
            }

            return {
                ...state,
                picture
            }
        }

        case CHANGE_PICTURE_INFO_SUCCESS: {
            const { id, changes } = action;

            const pictureInfo = state.pictureInfo.filter(() => true);

            const index = pictureInfo.findIndex(i => i.id == id);
            const newPictureInfo = pictureInfo[index];

            let keys = Object.keys(changes);

            for(let i = 0; i < keys.length; i++) {
                let key = keys[i];
                newPictureInfo[key] = changes[key];
            }
            pictureInfo[index] = newPictureInfo;
            return {
                ...state,
                pictureInfo
            }
        }

        case LANGUAGE_INFO_ADDED: {
            const { pictureInfo } = state;
            const { pictureInfoPart } = action;

            return {
                ...state,
                pictureInfo: pictureInfo.concat(
                    pictureInfoPart
                )
            }
        }

        case CHANGE_CURRENT_INDEX: {
            const { index } = action;
            return {
                ...state,
                currentIndex: index
            }
        }
        
        case TRIGGERED_ADD_LANGUAGE_INFO: {
            return {
                ...state,
                triggeredAdd: true
            }
        }

        case UNTRIGGERED_ADD_LANGUAGE_INFO: {
            return {
                ...state,
                triggeredAdd: false
            }
        }

        case ICON_TO_PICTURE_ADDED: {
            const { picture } = state;
            const { addedIcon } = action;

            return {
                ...state,
                picture: {
                    ...picture,
                    icons: picture.icons.concat([addedIcon])
                }
            }
        }

        case ICON_FROM_PICTURE_DELETED: {
            const { id } = action;
            return {
                ...state,
                picture: {
                    ...state.picture,
                    icons: state.picture.icons.filter(i => i.id !== id)
                }
            }
        }

        default: return state;
    }
}

export default updatePictureInfo;