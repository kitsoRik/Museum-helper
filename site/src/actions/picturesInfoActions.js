import api, { getPictureData, savePictureInfo, savePictureData, addLanguageInfo, addIconToPicture } from "../services/api/api";
import { alertAddNotificationCreator } from "./alertActions";

export const startLoadPictureInfoCreator = (id) => {
    return (dispatch) => {
        getPictureData(id)
        .then((data) => {
            if(!data.success) { 
                dispatch(alertAddNotificationCreator(`Picture info has not been loaded`), "error");
                console.log("NOT SUCCESS");
                return;
            }
            dispatch(alertAddNotificationCreator("Picture info has been loaded!"));
            dispatch(loadPictureInfoSuccessCreator(
                data.picture, 
                data.pictureInfo, 
                dispatch));
        }).catch(() => {
            
            dispatch(alertAddNotificationCreator(`Picture info has not been loaded (server problem)`), "error");
        });
    }
}

export const loadPictureInfoSuccessCreator = (picture, pictureInfo) => {
    return {
        type: "LOAD_PICTURE_INFO_SUCCESS",
        picture,
        pictureInfo
    }
}

export const changePictureInfoCreator = (id, changes) => {
    
    return (dispatch) => {
        savePictureInfo(id, changes)
                .then((data) => {
                    dispatch(alertAddNotificationCreator(`${Object.keys(changes)[0]} info has been changed!`));
                    dispatch(changePictureInfoSuccessCreator(id, changes));
                }).catch(() => {
                    dispatch(alertAddNotificationCreator(`${Object.keys(changes)[0]} info has been changed (server problem)`), "error");
                });
    }
}

export const changePictureInfoSuccessCreator = (id, changes) => {
    return {
        type: "CHANGE_PICTURE_INFO_SUCCESS",
        id,
        changes
    }
}

export const changePictureCreator = (id, changes) => {
    return (dispatch) => {
        savePictureData(id, changes)
                .then((data) => {
                    dispatch(alertAddNotificationCreator(`${Object.keys(changes)[0]} has been changed!`));
                    dispatch(changePictureSuccessCreator(id, changes, dispatch));
                }).catch(() => {
                    dispatch(alertAddNotificationCreator(`${Object.keys(changes)[0]} has not been changed! (server problem)`), "error");
                });
    }
}

export const changePictureSuccessCreator = (id, changes) => {
    return {
        type: "CHANGE_PICTURE_SUCCESS",
        id,
        changes
    }
}

export const triggeredAddLanguageInfoCreator = () => {
    return {
        type: "TRIGGERED_ADD_LANGUAGE_INFO"
    }
}

export const untriggeredAddLanguageInfoCreator = () => {
    return {
        type: "UNTRIGGERED_ADD_LANGUAGE_INFO"
    }
}

export const addLanguageInfoCreator = (id, title, description, language) => {
    return (dispatch) => {
        addLanguageInfo(id, title, description, language)
                .then((data) => {
                    dispatch(alertAddNotificationCreator(`Language '${language}' has been added!`));
                    dispatch(languageInfoAddedCreator(data.addedPictureInfo));
                    dispatch(untriggeredAddLanguageInfoCreator());
                }).catch(() => {
                    dispatch(alertAddNotificationCreator(`Language '${language}' has not been added! (server problem)`), "error");
                });
    }
}

export const languageInfoAddedCreator = (result) => {
    return {
        type: "LANGUAGE_INFO_ADDED",
        pictureInfoPart: result
    }
}

export const changeCurrentIndexCreator = (index) => {
    return {
        type: "CHANGE_CURRENT_INDEX",
        index
    }
}

export const addIcon = (id, iconFile) => {
    return (dispatch) => {
        api.addIconToPicture(id, iconFile)
            .then((data) => {
                if(data.success) {
                    dispatch(iconToPictureAdded(data.addedIcon));
                    dispatch(alertAddNotificationCreator("ADDED"));
                } else {
                    dispatch(alertAddNotificationCreator("NOT ADDED", "error"));
                }
            })
    }
}

export const deleteIcon = (id) => {
    return (dispatch) => {
        api.deleteIconFromPicture(id)
            .then((data) => {
                if(data.success) {
                    dispatch(iconfromPictureDeleted(data.id));
                } else {
                    dispatch(alertAddNotificationCreator("NOT DELETED", "error"));
                }
            });
    }
}

const iconToPictureAdded = (addedIcon) => ({
    type: "ICON_TO_PICTURE_ADDED",
    addedIcon
});

const iconfromPictureDeleted = (id) => ({
    type: "ICON_FROM_PICTURE_DELETED",
    id
});