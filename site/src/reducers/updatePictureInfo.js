import { NOT_LOADED, IS_LOADING, LOADED } from "../constants";
import { getPictureData, savePictureData, savePictureInfo, addLanguageInfo } from "../services/api/api";
import { loadPictureInfoSuccessCreator, changePictureSuccessCreator, changePictureInfoSuccessCreator, languageInfoAddedCreator } from "../actions/picturesInfoActions";

const initState = {
    loading: NOT_LOADED,
    picture: null,
    pictureInfo: [],
    currentIndex: -1,
    triggeredAdd: false
}

const updatePictureInfo = (state = initState, action) => {
    switch(action.type) {
        case "LOAD_PICTURE_INFO_SUCCESS": {
            return {
                currentIndex: -1,
                loading: LOADED,
                picture: action.picture,
                pictureInfo: action.pictureInfo
            }
        }

        case "CHANGE_PICTURE_SUCCESS": {
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

        case "CHANGE_PICTURE_INFO_SUCCESS": {
            const { id, changes } = action;

            const pictureInfo = state.pictureInfo;

            const index = pictureInfo.findIndex(i => i.id == id);

            let keys = Object.keys(changes);
            let changingPictureInfoPart = { ...pictureInfo[index] };

            for(let i = 0; i < keys.length; i++) {
                let key = keys[i];
                changingPictureInfoPart[key] = changes[key];
            }
            return {
                ...state,
                pictureInfo:
                    pictureInfo.slice(0, index)
                        .concat(changingPictureInfoPart)
                        .concat(pictureInfo.slice(index + 1))
            }
        }

        case "LANGUAGE_INFO_ADDED": {
            const { pictureInfo } = state;
            const { pictureInfoPart } = action;

            return {
                ...state,
                pictureInfo: pictureInfo.concat(
                    pictureInfoPart
                )
            }
        }

        case "CHANGE_CURRENT_INDEX": {
            const { index } = action;
            return {
                ...state,
                currentIndex: index
            }
        }
        
        case "TRIGGERED_ADD_LANGUAGE_INFO": {
            return {
                ...state,
                triggeredAdd: true
            }
        }

        case "UNTRIGGERED_ADD_LANGUAGE_INFO": {
            return {
                ...state,
                triggeredAdd: false
            }
        }

        default: return state;
    }
}

export default updatePictureInfo;