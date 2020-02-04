import { getPictureData, savePictureInfo, savePictureData, addLanguageInfo } from "../services/api/api";

export const startLoadPictureInfoCreator = (id) => {
    return (dispatch) => {
        getPictureData(id)
                .then((data) => {
                    if(!data.success) {
                        console.log("NOT SUCCESS");
                        return;
                    }
                    dispatch(loadPictureInfoSuccessCreator(
                        data.picture, 
                        data.pictureInfo, 
                        dispatch));
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
                    dispatch(changePictureInfoSuccessCreator(id, changes));
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
                    dispatch(changePictureSuccessCreator(id, changes, dispatch));
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

export const addLanguageInfoCreator = (id, language) => {
    return (dispatch) => {
        addLanguageInfo(id, language)
                .then((data) => {
                    dispatch(languageInfoAddedCreator(data.addedPictureInfo));
                });
    }
}

export const languageInfoAddedCreator = (result) => {
    return {
        type: "LANGUAGE_INFO_ADDED",
        pictureInfoPart: result
    }
}


