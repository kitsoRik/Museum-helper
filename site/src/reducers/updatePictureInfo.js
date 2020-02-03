import { NOT_LOADED, IS_LOADING, LOADED } from "../constants";


const updatePictureInfoData = (state, action) => {
    if(state === undefined) {
        return {
            loading: NOT_LOADED
        }
    }
    
    switch(action.type) {
        case "START_LOAD_PICTURE_INFO": {
            return {
                loading: IS_LOADING,
                picture: {},
                pictureInfo: []
            }
        }
        case "LOAD_PICTURE_INFO_SUCCESS": {
            return {
                loading: LOADED,
                picture: action.picture,
                pictureInfo: action.pictureInfo
            }
        }

        case "CHANGE_PICTURE_SUCCESS": {
            const { id, changes } = action;

            const picture = { ...state.pictureInfoData.picture };

            const keys = Object.keys(changes);

            for(let i = 0; i < keys.length; i++) {
                let key = keys[i];
                picture[key] = changes[key];
            }

            return {
                ...state.pictureInfoData,
                picture
            }
        }

        case "CHANGE_PICTURE_INFO_SUCCESS": {
            const { id, changes } = action;

            const pictureInfo = state.pictureInfoData.pictureInfo;

            const index = pictureInfo.findIndex(i => i.id == id);

            let keys = Object.keys(changes);
            let changingPictureInfoPart = { ...pictureInfo[index] };

            for(let i = 0; i < keys.length; i++) {
                let key = keys[i];
                changingPictureInfoPart[key] = changes[key];
            }
            return {
                ...state.pictureInfoData,
                pictureInfo:
                    pictureInfo.slice(0, index)
                        .concat(changingPictureInfoPart)
                        .concat(pictureInfo.slice(index + 1))
            }
        }

        case "LANGUAGE_INFO_ADDED": {
            const { pictureInfo } = state.pictureInfoData;
            const { pictureInfoPart } = action;

            return {
                ...state.pictureInfoData,
                pictureInfo: pictureInfo.concat(
                    pictureInfoPart
                )
            }
        }
        default: return state.pictureInfoData;
    }
}

export default updatePictureInfoData;